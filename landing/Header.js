import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import HeaderLink from "./HeaderLink";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import Button from "./Button";

const Header = () => {
  const modalRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showSignUpOptions, setShowSignUpOptions] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const listenScrollEvent = (event) => {
    if (window.scrollY < 73) {
      return setScrolled(false);
    } else if (window.scrollY > 70) {
      return setScrolled(true);
    }
  };

  const { user, logout } = useAuth();

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);
  return (
    <header
      className={`fixed top-0 bg-white w-full py-4 z-50 ${
        scrolled && "shadow-lg"
      }`}
    >
      <div className="flex justify-between items-center w-full sm:w-5/6 max-w-[1400px] mx-auto">
        <div className="relative w-36 h-10 z-20">
          <Image
            src="/assets/images/orbit.png"
            layout="fill"
            objectFit="contain"
            alt="cryptoskulls"
          />
        </div>

        <div className="flex items-center">
          {user ? (
            <div className="hidden sm:flex items-center space-x-6 xl:space-x-8">
              <div className="relative">
                <Button
                  label="My Profile"
                  type="link"
                  href={`/u/${user.username}`}
                />
              </div>
              <div className="cursor-pointer hover:underline underline-offset-2">
                <span onClick={logout}>Logout</span>
              </div>
            </div>
          ) : (
            <div className="hidden sm:flex items-center space-x-6 xl:space-x-8">
              <div className="relative">
                <Button label="Join the Orbit" type="link" href="/signup" />
                {/* <div
                  className={`origin-top-right  ${
                    showSignUpOptions ? "opacity-100" : "opacity-40"
                  } absolute flex-col right-0 mt-2 focus:outline-none w-full md:w-auto md:min-w-[15rem] border border-gray-300  bg-white rounded-lg shadow-lg overflow-hidden transition-opacity`}
                  style={{
                    display: showSignUpOptions ? "flex" : "none",
                  }}
                >
                  <span className="pt-2 pb-1 px-2 hover:bg-gray-200 transition-colors cursor-pointer" onClick={handleWalletAuth}>
                    Connect Wallet
                  </span>
                  <span className="pb-2 pt-1 px-2 hover:bg-gray-200 transition-colors cursor-pointer">
                    Sign up with email
                  </span>
                </div> */}
              </div>
              <div className="cursor-pointer hover:underline underline-offset-2">
                <Link href="/login">Log In</Link>
              </div>
            </div>
          )}

          <button
            className={`menu ${menuOpen} z-20 sm:hidden`}
            onClick={toggleMenu}
          >
            <div className="">
              <span className="top"></span>
              <span className="bottom"></span>
            </div>
          </button>
        </div>
      </div>
      <nav
        className={`bg-slate-800 flex-col flex mt-[72px] pb-[216px] h-screen w-screen fixed top-0 center space-y-7 sm:hidden transition-all translate-x-full ${
          menuOpen && "translate-x-0"
        }`}
      >
        {user ? (
          <div className="flex flex-col items-center space-y-6">
            <Button
              label="My Profile"
              type="link"
              href={`/u/${user.username}`}
            />
            <div className="cursor-pointer text-slate-200 hover:underline underline-offset-2">
              <span onClick={logout}>Logout</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <Button label="Join the Orbit" type="link" href="/signup" />
            <div className="cursor-pointer text-slate-200 hover:underline underline-offset-2">
              <Link href="/login">Log In</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
