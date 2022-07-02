import { useState, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { BsArrowLeftShort } from "react-icons/bs";

import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCommunity } from "../context/CommunityContext";
import SideNavListItem from "./SideNavListItem";
import SideNavDivider from "./SideNavDivider";
import { BiChevronRight, BiLogOutCircle } from "react-icons/bi";
import { MdBrightness4, MdBrightness6 } from "react-icons/md";
import { ConnectWalletModal } from "./Modals";
import icons from "../assets/icons";

const SideNav = ({ onClose }) => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [navigation, setNavigation] = useState([]);

  const router = useRouter();
  const { asPath } = router;
  const { communityId } = router.query;
  const { user, logout } = useAuth();
  const community = useCommunity();

  const toggleMode = (mode) => {
    localStorage.setItem("theme", mode);
    if (mode === "light") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  useEffect(() => {
    if (community && community.navigation !== navigation) {
      setNavigation(community.navigation);
    }
  }, [community, router]);

  return (
    <div
      className={`w-[15em] flex h-full bg-white sticky font-poppins transition-width duration-300 ease-in-out z-20 pointer-events-auto`}
      id="sidenav"
    >
      <div
        className={`fixed bg-white dark:bg-slate-900 bottom-0 top-0 min-h-screen h-full flex flex-col overflow-y-scroll shadow-md  pb-[130px] w-[15em]`}
      >
        <div className="pt-4 pb-2 px-4">
          <a href="#!">
            <div className={`flex items-center`}>
              <div className="shrink-0">
                <Avatar src={user?.pfp} uid={user?.uid} size={50} />
              </div>
              <div className={`grow ml-3 transition-all`}>
                <p className="text-sm truncate font-semibold text-black dark:text-slate-400">
                  {user?.displayName}
                </p>
                {user?.walletName ? (
                  <p className="text-[.8em] truncate font-light text-slate-400 dark:text-slate-500">
                    {user?.walletName}
                  </p>
                ) : (
                  <p
                    className="text-[.8em] truncate font-light text-slate-400 dark:text-slate-500"
                    onClick={() => setShowWalletModal(true)}
                  >
                    Connect Wallet
                  </p>
                )}

                <ConnectWalletModal
                  open={showWalletModal}
                  onClose={() => setShowWalletModal(false)}
                />
              </div>
            </div>
          </a>
        </div>
        <div className={`pt-3  space-y-4`}>
          {navigation?.map((section, index) => {
            return (
              <div className="" key={index}>
                <SideNavDivider label={section.label} menuOpen />
                <ul className="relative px-1">
                  {section?.tabs?.map((tab) => {
                    return (
                      <li className="relative" key={tab?.label}>
                        <SideNavListItem
                          label={tab.label}
                          icon={icons[tab.icon]}
                          href={tab.href}
                          options={tab?.options}
                          locked={tab?.private}
                          menuOpen
                          asPath={asPath}
                          active={
                            tab.href && `/${communityId}/${tab.href}` == asPath
                          }
                          mobile={onClose}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div className="">
            <div className="px-1 hidden dark:block">
              <SideNavListItem
                label="Light Mode"
                icon={<MdBrightness6 />}
                onClick={() => toggleMode("light")}
                menuOpen
              />
            </div>
            <div className="px-1 dark:hidden">
              <SideNavListItem
                label="Dark Mode"
                icon={<MdBrightness4 />}
                onClick={() => toggleMode("dark")}
                menuOpen
              />
            </div>
            <div className="px-1">
              <SideNavListItem
                label="Log Out"
                icon={<BiLogOutCircle />}
                onClick={logout}
                menuOpen
              />
            </div>
          </div>
        </div>
        <div
          className={`w-[15em] text-center fixed bottom-0 bg-white dark:bg-slate-700`}
        >
          <div
            className={`flex pl-6 pr-4 h-12 items-center cursor-pointer`}
            onClick={onClose}
          >
            <p className={`text-sm truncate text-slate-400 flex`}>SKULLISH</p>
            <span
              className={`text-[1.7em] transition-transform rotate-180 ml-auto`}
            >
              <BiChevronRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const TopNav = ({ pathname }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setNavOpen(false);
  }, [router.asPath]);
  useEffect(() => {
    if (navOpen) {
      document.body.style.position = "fixed";
      document.body.style.top = `0`;
      document.body.style.left = `0`;
      document.body.style.right = `0`;
    } else {
      document.body.style.position = "";
      document.body.style.top = "";
    }
  }, [navOpen]);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 h-[60px] bg-white dark:bg-slate-900 flex sm:hidden items-center justify-between px-4 shadow-lg transition-transform z-40"
        style={{
          transform: navOpen ? "translateX(15em)" : null,
        }}
        onClick={() => setNavOpen((prev) => !prev)}
      >
        <div
          className="absolute left-3 text-[2em] text-zinc-900 dark:text-slate-200 transition-transform"
          style={{
            transform: !navOpen && "translateX(-2em)",
          }}
        >
          <BsArrowLeftShort />
        </div>
        <div
          className="transition-transform pointer-events-none"
          style={{
            transform: navOpen ? "translateX(3em)" : null,
          }}
        >
          <Avatar src={user.pfp} uid={user.uid} size={30} />
        </div>
        <div className="block dark:hidden relative w-[100px] h-[35px]">
          <Image
            src="/assets/images/orbit.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="hidden dark:block relative w-[100px] h-[35px]">
          <Image
            src="/assets/images/orbit_dark.png"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="text-[1.2em] text-zinc-900 dark:text-slate-200">
          <AiOutlineMenuUnfold />
        </div>
      </nav>

      <div
        className="fixed top-0 left-0 bottom-0 w-[15em] bg-white transition-transform z-40"
        style={{
          transform: navOpen ? "translateX(0)" : "translateX(-15em)",
        }}
      >
        <SideNav onClose={() => setNavOpen(false)} />
      </div>
      <div
        className={`${
          navOpen ? "block" : "hidden"
        } fixed top-0 left-0 bottom-0 right-0 bg-neutral-600 opacity-70 pointer-events-auto`}
        onClick={() => setNavOpen(false)}
      />
    </>
  );
};

export default TopNav;
