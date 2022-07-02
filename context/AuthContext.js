import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { ErrorCode } from "../config/firebase/ErrorCode";
import { auth, db } from "../config/firebase";
import { fetchEnsName } from "../utils";
import { useRouter } from "next/router";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getUserInfo(user.uid).then((e) => {
          const profileData = e.data();
          setUser((prev) => ({ ...prev, ...profileData }));
          checkEns(profileData?.wallets);
          if (profileData.communities) {
            if (router.pathname === "/login" || router.pathname === "/signup") {
              router.push(`/${profileData?.communities[0]}/home`);
            }
          }
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  async function checkEns(wallets) {
    if (wallets?.length) {
      const walletName = await fetchEnsName(wallets[0]);
      setUser((prev) => {
        return { ...prev, walletName };
      });
    }
  }

  async function getUserInfo(uid) {
    return await getDoc(doc(db, "users", uid));
  }

  const refreshUserInfo = async () => {
    if (user) {
      return await getUserInfo(user.uid).then((e) => {
        const profileData = e.data();
        setUser({ ...user, ...profileData });
        checkEns(profileData?.wallets);
        return { ...user, ...profileData };
      });
    }
  };

  const signup = async (email, password) => {
    try {
      const registerResponse = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (registerResponse) {
        const uid = registerResponse.user.uid;
        const data = {
          uid,
          email,
          pfp: "https://firebasestorage.googleapis.com/v0/b/discovr-98d5c.appspot.com/o/images%2Fdefault.jpg?alt=media&token=309521b5-1798-44a2-907d-46d499e41a5d",
          image:
            "https://firebasestorage.googleapis.com/v0/b/discovr-98d5c.appspot.com/o/images%2Fdefault.jpg?alt=media&token=309521b5-1798-44a2-907d-46d499e41a5d",
          nonce: Math.floor(Math.random() * 1000000).toString(),
          createdAt: Date.now(),
        };
        const res = await setDoc(doc(db, "users", uid), data);
        if (res?.error) {
          return { error: "Error creating account" };
        } else {
          return data;
        }
      }
    } catch (error) {
      console.log("_error:", error);
      var errorCode = ErrorCode.serverError;
      if (error.code === "auth/email-already-in-use") {
        errorCode = ErrorCode.emailInUse;
      }
      return { error: errorCode };
    }
  };

  const login = async (email, password) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (!res?.error) {
      return;
    } else {
      return res;
    }
  };

  const logout = async () => {
    setUser(null);
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, refreshUserInfo }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
