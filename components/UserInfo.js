import { useState } from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { EditProfileModal, ConnectWalletModal } from "./Modals";

const UserInfo = ({ user }) => {
  const { logout } = useAuth();
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);

  return (
    <div className="flex flex-col rounded-lg bg-white dark:bg-slate-800 overflow-hidden relative max-w-[500px] shadow-sm">
      <div className="relative h-[70px]">
        <Image
          src={
            user?.cover ||
            "https://lh3.googleusercontent.com/uiZChinsg0BhAxrjXsIfT9rkb4caayD5ktYPrh9MPXmX_EdICz3lnPgrtkXGVL25IpM7RpG94N0kY4h3QYFphrGJGwSWlQdtxNrx=h600"
          }
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex relative h-[110px] px-4 py-3">
        <div className="absolute top-[-30px] left-4 ">
          <Avatar src={user?.pfp} uid={user?.uid} size={70} />
        </div>
        <div className="flex flex-col justify-end">
          <h3 className="font-semibold dark:text-slate-300">
            {user?.displayName}
          </h3>
          {user?.walletName ? (
            <span className="font-light text-slate-500 dark:text-slate-400 text-[.8em]">
              {user?.walletName}
            </span>
          ) : (
            <span
              className="font-light text-slate-500 dark:text-slate-400 text-[.8em]"
              onClick={() => setShowWalletModal(true)}
            >
              Connect Wallet
            </span>
          )}

          <ConnectWalletModal
            open={showWalletModal}
            onClose={() => setShowWalletModal(false)}
          />
        </div>
        <div className="flex flex-col grow items-end justify-between">
          <div className="flex items-center">
            <div className="rounded-full bg-green-400 w-[5px] h-[5px] mr-1"></div>
            <span className=" text-slate-500 dark:text-slate-400 text-sm ml-1">
              Online
            </span>
          </div>
          <div className="flex flex-col items-end text-blue-600 dark:text-blue-500">
            <span
              className="text-sm  hover:underline cursor-pointer"
              onClick={logout}
            >
              Logout
            </span>
            <span
              className="text-sm  hover:underline cursor-pointer"
              onClick={() => setShowEditProfileModal(true)}
            >
              Edit profile
            </span>
            <EditProfileModal
              open={showEditProfileModal}
              onClose={() => setShowEditProfileModal(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
