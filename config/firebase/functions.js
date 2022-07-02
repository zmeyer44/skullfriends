import {
  doc,
  arrayUnion,
  arrayRemove,
  limit,
  query,
  collection,
  where,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { db, storage } from ".";
import { checkOwnership } from "../../utils";

export const sendMessage = async (text, image, user, chatRef) => {
  const docRef = await addDoc(collection(db, chatRef), {
    author: user.uid,
    displayName: user.displayName,
    pfp: user.pfp,
    text,
    createdAt: Date.now(),
  });
  if (image) {
    const imageRef = ref(storage, `${chatRef}/${user.uid}/${docRef.id}`);
    await uploadString(imageRef, image, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, chatRef, docRef.id), {
        image: downloadURL,
      });
    });
  }
};
export const newPost = async (title, text, image, user, postRef) => {
  const docRef = await addDoc(collection(db, postRef), {
    author: user.uid,
    displayName: user.displayName,
    pfp: user.pfp,
    title,
    text,
    createdAt: Date.now(),
  });
  if (image) {
    const imageRef = ref(storage, `${postRef}/${user.uid}/${docRef.id}`);
    await uploadString(imageRef, image, "data_url").then(async () => {
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, postRef, docRef.id), {
        image: downloadURL,
      });
    });
  }
};

export const emitReaction = async (
  collectionRef,
  id,
  reaction,
  uid,
  active
) => {
  if (!active) {
    await updateDoc(doc(db, collectionRef, id), {
      [reaction]: arrayUnion(uid),
      reactions: arrayUnion(reaction),
    });
  } else {
    await updateDoc(doc(db, collectionRef, id), {
      [reaction]: arrayRemove(uid),
    });
  }
};

export const checkUniqueUsername = async (username) => {
  const q = query(collection(db, "users"), where("username", "==", username));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;
};

export const getMemberInfo = async (ref, uid) => {
  const docRef = doc(db, ref, uid);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
};
export const getUserInfo = async (uid) => {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  return snapshot.data();
};

export const getUserInfoByUsername = async (username) => {
  const q = query(
    collection(db, "users"),
    where("username", "==", username),
    limit(1)
  );
  let userData;
  const querySnapshot = await getDocs(q);
  querySnapshot?.forEach((doc) => (userData = doc.data()));
  return userData;
};

export const updateUser = async (uid, data) => {
  const docRef = doc(db, "users", uid);
  return await updateDoc(docRef, data);
};

export const newRequest = async (email, projectName, more) => {
  return await addDoc(collection(db, "requests"), {
    email,
    projectName,
    more,
    createdAt: Date.now(),
  });
};

export const newConnection = async (otherUid, uid) => {
  const userOne = doc(db, "users", otherUid);
  await updateDoc(userOne, {
    connections: arrayUnion(uid),
  });
  const userTwo = doc(db, "users", uid);
  await updateDoc(userTwo, {
    connections: arrayUnion(otherUid),
  });
  return;
};
export const removeConnection = async (otherUid, uid) => {
  const userOne = doc(db, "users", otherUid);
  await updateDoc(userOne, {
    connections: arrayRemove(uid),
  });
  const userTwo = doc(db, "users", uid);
  await updateDoc(userTwo, {
    connections: arrayRemove(otherUid),
  });
  return;
};

export const fetchCommunity = async (slug) => {
  const result = await getDoc(doc(db, "communities", slug));
  return result.data();
};

export const fetchCommunities = async (communities) => {
  return await Promise.all(
    communities.map(async (community) => {
      return await fetchCommunity(community);
    })
  );
};

export const joinCommunity = async (uid, wallet, community) => {
  const userRef = doc(db, "users", uid);
  const assetsOwned = await checkOwnership(wallet, community);
  let roles = ["member"];
  if (assetsOwned) {
    console.log("ASSERS", assetsOwned);
    if (assetsOwned >= 10) {
      roles = ["whale", "owner", "member"];
    } else {
      roles = ["owner", "member"];
    }
  }
  return await updateDoc(userRef, {
    [community]: { roles: roles },
    communities: arrayUnion(community),
  });
};
