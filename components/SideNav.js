import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useCommunity } from "../context/CommunityContext";
import SideNavListItem from "./SideNavListItem";
import SideNavDivider from "./SideNavDivider";
import Avatar from "./Avatar";
import { BiChevronRight, BiLogOutCircle } from "react-icons/bi";
import { MdBrightness4, MdBrightness6 } from "react-icons/md";
import { ConnectWalletModal } from "./Modals";
import icons from "../assets/icons";

const SideNav = () => {
  const [menuOpen, setMenuOpen] = useState(true);
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
      className={`${
        menuOpen ? "w-60 " : "w-20"
      } hidden sm:flex h-full bg-white sticky font-poppins transition-width duration-300 ease-in-out z-20`}
      id="sidenav"
      onMouseEnter={() => {
        if (!menuOpen) {
          setMenuOpen(true);
        }
      }}
    >
      <div
        className={`fixed bg-white dark:bg-slate-900 bottom-0 top-0 min-h-screen h-full flex flex-col overflow-y-scroll scrollbar-thin shadow-md  pb-[50px] ${
          menuOpen ? "w-60 " : "w-20"
        }`}
      >
        <div className="pt-4 pb-2 px-4">
          <a href="#!">
            <div
              className={`flex items-center ${!menuOpen && "justify-center"}`}
            >
              <div className="shrink-0">
                <Avatar src={user?.pfp} uid={user?.uid} size={50} />
              </div>
              <div
                className={`grow ml-3 ${!menuOpen && "hidden"} transition-all`}
              >
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
        <div className={`pt-3 ${menuOpen && "space-y-4"}`}>
          {navigation?.map((section, index) => {
            return (
              <div className="" key={index}>
                <SideNavDivider label={section.label} menuOpen={menuOpen} />
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
                          menuOpen={menuOpen}
                          asPath={asPath}
                          active={
                            tab.href && `/${communityId}/${tab.href}` == asPath
                          }
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
          <div className={`${!menuOpen && "hidden"}`}>
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
          className={`${
            menuOpen ? "w-60 " : "w-20"
          } text-center fixed bottom-0 bg-white dark:bg-slate-700`}
        >
          <div
            className={`flex ${
              menuOpen ? "pl-6 pr-4" : "justify-center"
            }  h-12 items-center cursor-pointer`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <p
              className={`text-sm truncate text-slate-400 ${
                menuOpen ? "flex" : "hidden"
              }`}
            >
              SKULLISH
            </p>
            <span
              className={`text-[1.7em] transition-transform ${
                menuOpen && "rotate-180 ml-auto"
              }`}
            >
              <BiChevronRight />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;
