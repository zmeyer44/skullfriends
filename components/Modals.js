import { useState, useEffect, useRef } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import Image from "next/image";
import { ethers } from "ethers";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineAddReaction, MdKeyboardHide } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { RiUserAddLine } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";
import Modal from "./Modal";
import FormInput from "./FormInput";
import FormTextAreaInput from "./FormTextAreaInput";
import Button from "./Button";
import {
  newPost,
  checkUniqueUsername,
  updateUser,
} from "../config/firebase/functions";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../config/firebase";
import MetamaskLogo from "../assets/metamaskLogo";
import { checkOwnership } from "../utils";
import Loader from "../assets/Loader";

export const PostModal = ({ open, onClose, titleOption }) => {
  const imagePickerRef = useRef(null);

  const [showEmojis, setShowEmojis] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [focusedTitle, setFocusedTitle] = useState(true);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const router = useRouter();
  const { asPath } = router;

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    if (focusedTitle) {
      setTitle(title + emoji);
    } else {
      setText(text + emoji);
    }
    setShowEmojis(false);
  };

  const handleNewPost = async () => {
    setLoading(true);
    await newPost(title, text, image, user, `communities${asPath}`);
    onClose();
    setText("");
    setTitle("");
    setImage(null);
    setLoading(false);
  };
  return (
    <Modal open={open} onClose={onClose}>
      <form className="w-full rounded-lg py-6 px-6 flex flex-col justify-center">
        <h2 className="text-[1.5em] text-black dark:text-slate-200 font-medium mb-4">
          New Post
        </h2>
        {titleOption && (
          <FormInput
            label="Title"
            value={title}
            setValue={setTitle}
            type="text"
            placeholder="Important Announcement"
            onFocus={() => setFocusedTitle(true)}
          />
        )}
        <FormTextAreaInput
          label="Body"
          value={text}
          setValue={setText}
          type="text"
          placeholder="ElonMusk69"
          rows={6}
          onFocus={() => setFocusedTitle(false)}
        />
        {image ? (
          <div className="relative flex bg-white dark:bg-slate-900 mb-2">
            <div
              className="absolute w-8 h-8 center top-1 left-1 cursor-pointer text-[1.5em] rounded-full bg-slate-100 dark:bg-slate-800"
              onClick={() => setImage(null)}
            >
              <IoCloseOutline />
            </div>
            <img
              src={image}
              alt="upload"
              className="rounded-lg max-h-60 object-contain"
            />
          </div>
        ) : null}
        <div className="relative flex space-x-2 text-slate-500 dark:text-slate-400  transition-colors text-[1.5em]">
          {showEmojis && (
            <Picker
              onSelect={addEmoji}
              style={{
                position: "absolute",
                bottom: 30,
                left: 0,
                maxWidth: "320px",
                borderRadius: "20px",
              }}
              theme="light"
            />
          )}
          <span
            className="cursor-pointer hover:text-slate-800 dark:hover:text-slate-300 hidden sm:inline"
            onClick={() => setShowEmojis((prev) => !prev)}
          >
            {showEmojis ? <MdKeyboardHide /> : <MdOutlineAddReaction />}
          </span>
          {!image && (
            <span
              className="cursor-pointer hover:text-slate-800 dark:hover:text-slate-300"
              onClick={() => imagePickerRef.current.click()}
            >
              <BiImageAdd />
              <input
                type="file"
                hidden
                onChange={addImage}
                ref={imagePickerRef}
              />
            </span>
          )}
        </div>
        <div className="mt-3">
          <Button
            disabled={!text}
            label={loading ? "Loading" : "Post"}
            onClick={handleNewPost}
          />
        </div>
      </form>
    </Modal>
  );
};
export const EditProfileModal = ({ open, onClose }) => {
  const pfpPickerRef = useRef(null);
  const coverPickerRef = useRef(null);
  const { user, refreshUserInfo } = useAuth();

  const [username, setUsername] = useState(user?.displayName || "");
  const [pfp, setPfp] = useState(user?.pfp);
  const [pfpLoading, setPfpLoading] = useState(false);
  const [cover, setCover] = useState(user?.cover);
  const [coverLoading, setCoverLoading] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdateUsername = async () => {
    try {
      if (username.includes(" ")) {
        setUsernameError("Username can't contain spaces");
        return false;
      }
      if (username.length < 4) {
        setUsernameError("Username is to short");
        return false;
      }
      const unique = await checkUniqueUsername(username.toLowerCase());
      if (!unique) {
        setUsernameError("Username already taken");
        return false;
      } else {
        return true;
      }
    } catch (err) {
      console.log("ERROR", err);
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
    let updatedData = {};
    if (user.pfp !== pfp) {
      updatedData.pfp = pfp;
    }
    if (user.cover !== cover) {
      updatedData.cover = cover;
    }
    if (user.displayName !== username) {
      const validUsername = await handleUpdateUsername();
      if (validUsername) {
        updatedData.displayName = username;
        updatedData.username = username.toLowerCase();
      } else {
        return;
      }
    }
    try {
      const result = await updateUser(user.uid, {
        ...updatedData,
      });
      if (!result?.error) {
        setLoading(false);
        await refreshUserInfo();
        return onClose();
      } else {
        alert("An error occured", result.error);
        console.log("An error occured", result.error);
        onClose();
      }
    } catch (err) {
      alert("An error occured", result.error);
      console.log("ERROR", err);
    }
  };
  useEffect(() => {
    if (username !== user.displayName) {
      setUsernameError("");
      handleUpdateUsername();
    }
  }, [username]);

  return (
    <Modal open={open} onClose={onClose}>
      <form className="w-full rounded-lg py-6 px-6 flex flex-col justify-center">
        <h2 className="text-[1.5em] text-black dark:text-slate-200 font-medium mb-4">
          Edit Profile
        </h2>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0">
            <div className="flex flex-col w-full">
              <label className="block text-black dark:text-slate-200 font-medium mb-2">
                Profile photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="center h-[60px] w-[60px] rounded-full overflow-hidden bg-neutral-200 dark:bg-slate-700 text-[1.5em]">
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
                    className="ml-5 bg-white dark:bg-slate-700  hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
                  >
                    Choose NFT
                  </button>
                ) : null}

                <button
                  type="button"
                  className="ml-5 bg-white dark:bg-slate-700 hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
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
            <div className="flex w-full">
              <FormInput
                label="Username"
                value={username}
                setValue={setUsername}
                error={usernameError}
                type="text"
              />
            </div>
          </div>
          <div>
            <label className="block text-black dark:text-slate-200 font-medium mb-2">
              Cover photo
            </label>
            <div className="relative mt-1 flex min-h-[150px] justify-center border-2 border-gray-300 border-dashed rounded-md">
              {coverLoading ? (
                <div className="center w-full h-[150px">
                  <Loader size={30} />
                </div>
              ) : (
                <Image src={cover} layout="fill" objectFit="cover" />
              )}
              <div
                className="center absolute top-2 left-3  bg-white dark:bg-slate-200 hover:dark:bg-slate-700 text-black dark:text-slate-900 hover:dark:text-slate-200 w-10 h-10 rounded-full cursor-pointer transition-all"
                onClick={() => coverPickerRef.current.click()}
              >
                <FiEdit />
              </div>

              <input
                type="file"
                accept="image/png, image/jpeg"
                hidden
                onChange={addCover}
                ref={coverPickerRef}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <Button
            disabled={loading || coverLoading || pfpLoading}
            label={loading || coverLoading || pfpLoading ? "Loading" : "Update"}
            onClick={handleFinish}
          />
        </div>
      </form>
    </Modal>
  );
};

export const ConnectWalletModal = ({ open, onClose }) => {
  const { user, refreshUserInfo } = useAuth();
  const router = useRouter();
  const { communityId } = router.query;
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
              [communityId]: user[communityId],
            };
            const ownership = await checkOwnership(account, communityId);
            if (ownership) {
              if (ownership >= 10) {
                newData[communityId].roles = [
                  "whale",
                  "owner",
                  ...user[communityId].roles,
                ];
              } else {
                newData[communityId].roles = [
                  "owner",
                  ...user[communityId].roles,
                ];
              }
            }
            await updateUser(user.uid, { ...newData });
            await refreshUserInfo();
            return onClose();
          } else {
            alert("SIGNATURE does not match");
          }
        })
        .catch((err) => console.log("ETHEREUM ERROR", err));
    } else {
      alert("Please install MetaMask");
    }
  };
  // For now, 'eth_accounts' will continue to always return an array
  function handleAccountsChanged(accounts) {
    if (accounts?.length === 0) {
      // MetaMask is locked or the user has not connected any accounts
      console.log("Please connect to MetaMask.");
    } else if (accounts[0]) {
      return accounts[0];
      // Do any other work!
    }
  }
  if (window.ethereum) {
    ethereum.on("accountsChanged", handleAccountsChanged);
  }
  return (
    <Modal open={open} onClose={onClose}>
      <form className="w-full rounded-lg py-6 px-6 flex flex-col justify-center">
        <h2 className="text-[1.5em] text-black dark:text-slate-200 font-medium mb-4">
          Edit Profile
        </h2>
        <div
          className="center self-center dark:bg-slate-200 hover:bg-zinc-500 hover:dark:bg-slate-400 transition-colors text-zinc-600 border-2 border-zinc-600 w-1/2 rounded-lg px-8 py-4 my-4 cursor-pointer"
          onClick={connectWallet}
        >
          <div className="center h-[40px] w-11/12">
            <MetamaskLogo />
          </div>
        </div>
      </form>
    </Modal>
  );
};
