import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "../../context/AuthContext";
import Avatar from "../../components/Avatar";
import PillButton from "../../components/PillButton";
import CommunityCard from "../../components/CommunityCard";
import Verified from "../../assets/Verified";
import ItemCard from "../../components/ItemCard";
import CollectionCard from "../../components/CollectionCard";
import {
  fetchCommunities,
  getUserInfoByUsername,
  newConnection,
  removeConnection,
} from "../../config/firebase/functions";
import { QrCodeModal } from "../../components/Modal";
import { EditProfileModal } from "../../components/Modals";
import { AiOutlineQrcode, AiOutlineLink } from "react-icons/ai";
import { fetchAssets, fetchCollections, cleanUrl } from "../../utils";
import icons from "../../assets/icons";
import Loader from "../../assets/Loader";

const emailList = [
  "stratowerx@gmail.com",
  "irishnftgal@gmail.com",
  "frank.poncelet@gmail.com",
  "renepupala@outlook.com",
  "elliot@notanothernft.io",
  "emeralds.diamonds@gmail.com",
  "theboardroom@me.com",
  "hello@psyborg.gallery",
  "jon.hgilman@gmail.com",
  "connorwells111@gmail.com",
  "davidtoko60@gmail.com",
  "ragoigong@gmail.com",
  "zmmeyer44@gmail.com",
];
export default function ProfilePage() {
  const router = useRouter();
  const { user } = useAuth();
  const { username } = router.query;
  const [userData, setUserData] = useState(null);
  const [qrModal, setQrModal] = useState(false);
  const [communities, setCommunities] = useState([]);
  const [assets, setAssets] = useState([]);
  const [collections, setCollections] = useState([]);
  const [tab, setTab] = useState("Collections");
  const [avatarSize, setAvatarSize] = useState(110);
  const [loading, setLoading] = useState(true);
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false);

  const handleConnect = async () => {
    if (!user) {
      return router.push("/login");
    }

    if (
      userData?.connections?.length &&
      userData?.connections.includes(user?.uid)
    ) {
      //Disconnect
      const res = await removeConnection(userData.uid, user.uid);
      if (!res?.error) {
        return setUserData((prev) => ({
          ...prev,
          connections: prev?.connections?.filter((id) => id !== user?.uid),
        }));
      }
    } else {
      const res = await newConnection(userData?.uid, user?.uid);
      return setUserData((prev) => ({
        ...prev,
        connections: prev?.connections?.length
          ? prev?.connections?.push(user?.uid)
          : [user.uid],
      }));
    }
  };
  const editProfile = () => {
    setEditProfileModalOpen(true);
  };
  const init = async () => {
    const res = await getUserInfoByUsername(username);
    if (!res?.error) {
      setUserData(res);
      if (res?.communities?.length) {
        const retreivedCommunities = await fetchCommunities(res?.communities);
        setCommunities(retreivedCommunities);
      }
      if (res?.wallets?.length) {
        const retreivedAssets = await fetchAssets(res.wallets[0]);
        setAssets(retreivedAssets);
        const retreivedCollections = await fetchCollections(res.wallets[0]);
        setCollections(retreivedCollections);
      }
      setLoading(false);
    } else {
      console.error("Error:", res.error);
    }
  };

  useEffect(() => {
    if (username) {
      init();
    }
  }, [username, editProfileModalOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth > 1024) {
        setAvatarSize(140);
      }
    }
  }, []);

  function renderPillButton() {
    if (user?.uid === userData?.uid) {
      return (
        <PillButton label="Edit Profile" styles="mt-2" onClick={editProfile} />
      );
    } else if (
      userData?.connections?.length &&
      userData?.connections?.includes(user?.uid)
    ) {
      return (
        <PillButton label="Remove" styles="mt-2" onClick={handleConnect} />
      );
    } else {
      return (
        <PillButton
          label="Follow"
          styles="mt-2"
          accent
          onClick={handleConnect}
        />
      );
    }
  }

  function renderStats() {
    return (
      <div className="flex justify-evenly py-3 w-full mt-2 max-w-[400px]">
        <div className="flex flex-col items-center justify-center w-[70px]">
          <span className="font-semibold text-slate-200 lg:text-[1.1em]">
            {userData?.connections?.length || 0}
          </span>
          <span className="font-light text-[.8em] lg:text-[1em] text-slate-400">
            Friends
          </span>
        </div>
        <div className="flex flex-col items-center justify-center w-[70px]">
          <span className="font-semibold text-slate-200 lg:text-[1.1em]">
            {assets?.length}
            {assets?.length === 200 && "+"}
          </span>
          <span className="font-light text-[.8em] lg:text-[1em] text-slate-400">
            NFTs
          </span>
        </div>
      </div>
    );
  }

  function renderSocial() {
    if (!userData?.twitter && !userData?.opensea) return;
    return (
      <div className="flex flex-col justify-evenly py-3 w-full">
        <div className="flex justify-center text-[2.5em] space-x-4">
          {userData?.twitter && (
            <a href={userData.twitter} target="_blank" rel="noreferrer">
              {icons["twitter"]}
            </a>
          )}
          {userData?.opensea && (
            <a href={userData.opensea} target="_blank" rel="noreferrer">
              {icons["openSea"]}
            </a>
          )}
        </div>
      </div>
    );
  }
  function renderWebsite() {
    if (!userData?.website) return;
    return (
      <div className="flex center py-1 w-full ">
        <span className="text-[1.2em] mr-1 text-slate-300">
          <AiOutlineLink />
        </span>
        <a
          href={userData.website}
          className="text-blue-600  text-sky-500 text-[.9em]"
        >
          {cleanUrl(userData.website).split("/")[0]}
        </a>
      </div>
    );
  }
  function renderTabs() {
    const tabs = ["Collections", "Events"];
    return (
      <div className="flex w-full border-b border-slate-500">
        <ul className="flex overflow-x-auto -mb-px text-sm font-medium text-center">
          {tabs.map((label) => (
            <li>
              <button
                className={`inline-block p-4 rounded-t-lg border-b-2 border-transparent hover:text-gray-300 hover:border-slate-300 text-slate-200 border-slate-500`}
                style={{
                  borderColor: tab == label && "#0000ff",
                }}
                onClick={() => setTab(label)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function renderLoading() {
    return (
      <div className="center h-[200px]">
        <Loader size={30} />
      </div>
    );
  }

  function renderEvents() {
    if (emailList.includes(userData?.email)) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-3 xl:gap-y-5 xl:gap-x-5 px-2 py-4 md:py-8 lg:py-10">
          <a
            href={`https://www.eventbrite.co.uk/e/nftuk-july-22-tickets-373549595897?keep_tld=1`}
            target="_blank"
            rel="noreferrer"
          >
            <div className="flex flex-col bg-slate-800 border border-slate-500 rounded-lg overflow-hidden relative w-full max-w-[375px]">
              <div className="relative h-[80px]">
                <Image
                  src="https://s3-eu-west-1.amazonaws.com/onin.london/assets/unnamed6-1024x682.jpg"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex justify-center relative h-[130px] px-4 py-3">
                <div className="absolute top-[-40px] ">
                  <Avatar
                    src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F310504999%2F236244935012%2F1%2Foriginal.20220629-100543?w=800&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C246%2C2160%2C1080&s=2cf7174fac658bddec7731346d0fd81f"
                    size={70}
                  />
                </div>
                <div className="flex flex-col pt-[30px] text-center space-y-1">
                  <div className="center">
                    <h3 className="font-semibold text-slate-100 text-center mr-1">
                      NFT UK - JUJU's Bar
                    </h3>
                    <Verified />
                  </div>
                  <h3 className="text-[.7em] leading-4 text-slate-300 max-h-[100px] max-w-[300px] line-clamp-3">
                    NFTUK has grown exponentially and as part of our monthly
                    commitment to the community, We are gathering again on July
                    22. Bring your best vibes, your stickers and your awesome
                    swag we are taking the NFTs Culture lingo on another level.
                  </h3>
                </div>
              </div>
            </div>
          </a>
        </div>
      );
    } else {
      return (
        <div className="center h-[200px] text-slate-300">
          <h3>No Events Found</h3>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 md:gap-4 lg:grid-cols-5 gap-2 px-2 py-4 md:py-8 lg:py-10">
        {assets?.map((item, index) => (
          <ItemCard {...item} key={index} />
        ))}
      </div>
    );
  }
  function renderCollections() {
    if (!collections || collections?.length === 0) {
      return (
        <div className="center h-[200px] text-slate-300">
          <h3>No Collections Found</h3>
        </div>
      );
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-3 xl:gap-y-5 xl:gap-x-5 px-2 py-4 md:py-8 lg:py-10">
        {collections?.map((item, index) => (
          <CollectionCard {...item} key={index} />
        ))}
      </div>
    );
  }
  function renderComingSoon() {
    return (
      <div className="center h-[200px] text-slate-300">
        <h3>Comming Soon</h3>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col grow min-h-screen">
        <div className="center w-full py-10 text-[1.25em] bg-black text-white">
          <h3 className="font-player mb-[70px]">SKULL FRIENDS</h3>
        </div>

        <div className="flex justify-center relative grow mt-[-20px]">
          <div className="absolute top-[-50px] lg:top-[-80px]">
            <Avatar
              src={userData?.pfp}
              uid={userData?.uid}
              size={avatarSize}
              noRole
              borderWidth={0}
              styles="shadow-lg"
            />
          </div>
          <div
            className="center rounded-full w-[40px] h-[40px] md:w-auto md:px-4  md:text-[1.6em] absolute top-3 right-3 bg-gradient-to-br from-pink-500 to-orange-300 text-black text-[1.4em] shadow-md cursor-pointer"
            onClick={() => setQrModal(true)}
          >
            <span className="hidden md:inline mr-2 text-[.6em] ">Scan</span>{" "}
            <AiOutlineQrcode />
          </div>
          <QrCodeModal
            open={qrModal}
            onClose={() => setQrModal(false)}
            url={`https://skullfriends.vercel.app/u/${username}`}
          />
          <div className="flex flex-col w-full pt-10 bg-gray-700 dark:bg-slate-800 rounded-t-[24px] grow">
            <div className="flex flex-col items-center mt-8 pt-10">
              <h1 className="font-semibold text-slate-200 lg:text-[1.2em] font-player ">
                {userData?.displayName}
              </h1>
              <span className=" text-sm text-slate-400">
                {userData?.wallets?.length ? (
                  <a
                    href={`https://etherscan.io/address/${userData.wallets[0]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {userData?.wallets?.length
                      ? `${userData.wallets[0]?.slice(
                          0,
                          5
                        )}...${userData.wallets[0]?.slice(-4)}`
                      : "Connect Wallet"}
                  </a>
                ) : userData?.uid === user?.uid ? (
                  <span>Connect Wallet</span>
                ) : (
                  <span></span>
                )}
              </span>

              {renderPillButton()}

              {renderStats()}
              {renderSocial()}
              {renderWebsite()}
              {renderTabs()}
              {loading
                ? renderLoading()
                : tab == "Events"
                ? renderEvents()
                : tab == "Collections"
                ? renderCollections()
                : renderComingSoon()}
            </div>
          </div>
        </div>
      </div>
      <EditProfileModal
        open={editProfileModalOpen}
        onClose={() => setEditProfileModalOpen(false)}
      />
    </>
  );
}
