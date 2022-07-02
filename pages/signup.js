import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../config/firebase";
import detectEthereumProvider from "@metamask/detect-provider";
import { ethers } from "ethers";
import FormCard from "../components/FormCard";
import Button from "../components/Button";
import MetaMaskLogo from "../assets/metamaskLogo.js";
import MetaMaskIcon from "../assets/metaMaskIcon";
import { RiUserAddLine } from "react-icons/ri";
import { HiOutlineMail } from "react-icons/hi";
import { BsArrowLeft } from "react-icons/bs";
import { validateEmail, validatePassword, checkOwnership } from "../utils";
import { useAuth } from "../context/AuthContext";
import {
  updateUser,
  checkUniqueUsername,
  joinCommunity,
} from "../config/firebase/functions";
import { localizedErrorMessage } from "../config/firebase/ErrorCode";
import Loader from "../assets/Loader";

const signup = () => {
  const pfpPickerRef = useRef(null);
  const imagePickerRef = useRef(null);

  const router = useRouter();
  const { join } = router.query;

  const [currentStep, setCurrentStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [username, setUsername] = useState(user?.displayName || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wallet, setWallet] = useState(null);
  const [pfp, setPfp] = useState(null);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [cover, setCover] = useState(null);
  const [coverLoading, setCoverLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, signup, refreshUserInfo } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password) return;
    if (!validateEmail(email, setEmailError)) return;
    if (!validatePassword(password, setPasswordError)) return;
    setLoading(true);
    try {
      const result = await signup(email, password);
      if (result?.error) {
        if (result.error == "emailInUse") {
          setEmailError("Email already in use");
        } else {
          setEmailError(localizedErrorMessage(result.error));
        }
        setLoading(false);
      } else {
        if (result.uid) {
          setLoading(false);
          setCurrentStep(currentStep + 1);
        } else {
          setLoading(false);
          setEmailError("Unable to Create Account");
        }
      }
    } catch (err) {
      setEmailError(localizedErrorMessage(err?.code));
      console.log("Sign Up error", err);
    }
  };
  const handleUpdateUsername = async () => {
    try {
      if (username.includes(" "))
        return setUsernameError("Username can't contain spaces");

      const unique = await checkUniqueUsername(username.toLowerCase());
      if (!unique) return setUsernameError("Username already taken");
      const result = await updateUser(user.uid, {
        username: username.toLowerCase(),
        displayName: username,
      });
      if (!result?.error) {
        setCurrentStep(currentStep + 1);
      } else {
        setUsernameError("An error occured");
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  const connectWallet = async () => {
    const provider = await detectEthereumProvider();
    if (provider) {
      ethereum
        .request({ method: "eth_requestAccounts" })
        .then(handleAccountsChanged)
        .then(async (account) => {
          let message = `Welcome! \n\n To authenticate please sign this message \n\n nonce: ${user.nonce}`;
          const signature = await ethereum.request({
            method: "personal_sign",
            params: [message, account],
          });

          const res = ethers.utils
            .verifyMessage(message, signature)
            .toLowerCase();

          if (res === account) {
            let newData = {
              wallets: [account],
            };
            await updateUser(user.uid, { ...newData });
            await refreshUserInfo();
            setCurrentStep(currentStep + 1);
            return;
          } else {
            alert("SIGNATURE does not match");
          }
        })
        .catch((err) => console.log("ETHEREUM ERROR", err));
    } else {
      alert("Please install MetaMask");
    }
  };
  const addPfp = (e) => {
    setPfpLoading(true);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = async (readerEvent) => {
      const imageRef = ref(storage, `${user.uid}/pfp`);
      await uploadString(imageRef, readerEvent.target.result, "data_url").then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);
          setPfp(downloadURL);
          setPfpLoading(false);
        }
      );
    };
  };
  const addImage = (e) => {
    setImageLoading(true);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = async (readerEvent) => {
      const imageRef = ref(storage, `${user.uid}/image`);
      await uploadString(imageRef, readerEvent.target.result, "data_url").then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);
          setImage(downloadURL);
          setImageLoading(false);
        }
      );
    };
  };
  const addCover = (e) => {
    setCoverLoading(true);
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = async (readerEvent) => {
      const imageRef = ref(storage, `${user.uid}/cover`);
      await uploadString(imageRef, readerEvent.target.result, "data_url").then(
        async () => {
          const downloadURL = await getDownloadURL(imageRef);
          setCover(downloadURL);
          setCoverLoading(false);
        }
      );
    };
  };

  const handleFinish = async () => {
    setLoading(true);
    if (join) {
      const res = await joinCommunity(
        user?.uid,
        user?.wallets?.length ? user?.wallets[0] : "",
        join
      );
    }
    const newData = {
      pfp:
        pfp ||
        "https://firebasestorage.googleapis.com/v0/b/discovr-98d5c.appspot.com/o/images%2Fdefault.jpg?alt=media&token=309521b5-1798-44a2-907d-46d499e41a5d",
      image:
        image ||
        "https://firebasestorage.googleapis.com/v0/b/discovr-98d5c.appspot.com/o/images%2Fdefault.jpg?alt=media&token=309521b5-1798-44a2-907d-46d499e41a5d",
      cover:
        cover ||
        "https://firebasestorage.googleapis.com/v0/b/neptune-94d06.appspot.com/o/defaults%2Fgalaxy.jpeg?alt=media&token=1880ade4-49a9-4e29-aa45-1a8fe5d4b411",
    };

    try {
      const result = await updateUser(user.uid, {
        ...newData,
      });
      if (!result?.error) {
        setLoading(false);
        const newInfo = await refreshUserInfo();
        // console.log("NEw", newInfo);
        // console.log("User", user);
        // setTimeout(() => console.log("user Wait", user), 100);
        router.push(`/u/${newInfo.username}`);
      } else {
        console.log("An error occured", result.error);
      }
    } catch (err) {
      console.log("ERROR", err);
    }
  };

  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts?.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0] !== wallet) {
      return accounts[0];
      // Do any other work!
    }
  }
  if (window.ethereum) {
    ethereum.on("accountsChanged", handleAccountsChanged);
  }

  const steps = [
    // {
    //   title: "Create Account",
    //   content: (
    //     <div className="flex flex-col">
    //       <div
    //         className="center self-center hover:bg-zinc-500 transition-colors text-zinc-600 border-2 border-zinc-600 w-[260px] rounded-lg px-8 py-4 my-4 cursor-pointer"
    //         onClick={connectWallet}
    //       >
    //         Sign up with Email
    //       </div>
    //       <div
    //         className="center self-center hover:bg-zinc-500 transition-colors text-zinc-600 border-2 border-zinc-600 w-[260px] rounded-lg px-8 py-4 my-4 cursor-pointer"
    //         onClick={connectWallet}
    //       >
    //         <div className="center h-[20px] w-1/4 mr-2">
    //           <MetaMaskIcon />
    //         </div>
    //         <span>Connect Wallet</span>
    //       </div>
    //     </div>
    //   ),
    //   options: [{ label: "Already have an account?", href: "/login" }],
    // },
    {
      title: "Create Account",
      formElements: [
        {
          label: "Email",
          value: email,
          setValue: setEmail,
          error: emailError,
          type: "email",
          placeholder: "elon@tesla.com",
        },
        {
          label: "Password",
          value: password,
          setValue: setPassword,
          error: passwordError,
          type: "password",
          placeholder: "sKu771sH",
        },
      ],
      options: [{ label: "Already have an account?", href: "/login" }],
      action: {
        label: "Sign Up",
        onClick: handleSignUp,
      },
    },
    {
      title: "Find a Username",
      formElements: [
        {
          label: "Username",
          value: username,
          setValue: setUsername,
          error: usernameError,
          type: "text",
          placeholder: "ElonMusk69",
          minLength: 3,
        },
      ],
      action: {
        label: "Next",
        onClick: handleUpdateUsername,
      },
    },
    {
      title: "Connect Wallet",
      content: (
        <div
          className="center self-center hover:bg-zinc-500 transition-colors text-zinc-600 border-2 border-zinc-600 w-1/2 rounded-lg px-8 py-4 my-4 cursor-pointer"
          onClick={connectWallet}
        >
          <div className="center h-[40px] w-11/12">
            <MetaMaskLogo />
          </div>
        </div>
      ),
      options: [
        {
          label: "Skip for now",
          onClick: () => {
            setCurrentStep(currentStep + 1);
            setMaxStep(maxStep + 1);
          },
        },
      ],
      action: {
        label: "Next",
        onClick: () => console.log("here"),
      },
    },
    {
      title: "Complete Profile",
      content: (
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-black font-medium mb-2">
              NFT Profile photo
            </label>
            <div className="mt-1 flex items-center">
              <span className="center h-[60px] w-[60px] rounded-full overflow-hidden bg-neutral-200 text-[1.5em]">
                {pfpLoading ? (
                  <Loader size={25} />
                ) : pfp ? (
                  <Image src={pfp} width={60} height={60} objectFit="cover" />
                ) : (
                  <RiUserAddLine />
                )}
              </span>
              {false ? (
                <button
                  type="button"
                  className="ml-5 bg-white hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
                >
                  Choose NFT
                </button>
              ) : null}

              <button
                type="button"
                className="ml-5 bg-white hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
                onClick={() => pfpPickerRef.current.click()}
              >
                Upload Image
              </button>
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={addPfp}
                ref={pfpPickerRef}
              />
            </div>
          </div>
          <div>
            <label className="block text-black font-medium mb-2">
              IRL Profile photo
            </label>
            <div className="mt-1 flex items-center">
              <span className="center h-[60px] w-[60px] rounded-full overflow-hidden bg-neutral-200 text-[1.5em]">
                {imageLoading ? (
                  <Loader size={25} />
                ) : image ? (
                  <Image src={image} width={60} height={60} objectFit="cover" />
                ) : (
                  <RiUserAddLine />
                )}
              </span>
              {false ? (
                <button
                  type="button"
                  className="ml-5 bg-white hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
                >
                  Choose NFT
                </button>
              ) : null}

              <button
                type="button"
                className="ml-5 bg-white hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
                onClick={() => imagePickerRef.current.click()}
              >
                Upload Image
              </button>
              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={addImage}
                ref={imagePickerRef}
              />
            </div>
          </div>
        </div>
      ),
      action: {
        label: "Finish",
        onClick: handleFinish,
      },
    },
  ];

  useEffect(() => {
    if (user && currentStep === 0) {
      setCurrentStep(1);
      setMaxStep(1);
      if (user.username) {
        setCurrentStep(2);
        setMaxStep(4);
      }
    }
    if (email && password) {
      if (maxStep === 0) {
        setMaxStep(1);
      }
    }
    if (username.length > 2) {
      if (maxStep === 1) {
        setMaxStep(4);
      }
    }
  }, [user, email, password, username, wallet]);

  return (
    <div className="center bg-black min-h-screen w-full font-player">
      <FormCard
        title={steps[currentStep].title}
        elements={steps[currentStep].formElements}
        options={steps[currentStep]?.options}
      >
        {steps[currentStep]?.content}
        {steps[currentStep]?.action && (
          <div className="mt-3">
            <Button
              disabled={maxStep === currentStep}
              label={loading ? "Loading" : steps[currentStep].action.label}
              onClick={steps[currentStep].action.onClick}
            />
          </div>
        )}
      </FormCard>
      <Link href="/">
        <div className="absolute top-0 left-0 flex items-center text-white mt-4 ml-3 cursor-pointer group">
          <span className="text-[1.5em] mr-4 translate-x-2 group-hover:translate-x-0 transition-all">
            <BsArrowLeft />
          </span>
          <span className="group-hover:underline underline-offset-1 font-player text-[12px]">
            Return
          </span>
        </div>
      </Link>
    </div>
  );
};

export default signup;
