import { useState } from "react";
import Link from "next/link";
import { MdOutlineChat } from "react-icons/md";
import { RiInformationLine } from "react-icons/ri";
import { IoMdCompass } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { useRouter } from "next/router";

const Tab = ({ icon, href, onClick }) => {
  const router = useRouter();
  const { pathname } = router;
  if (onClick) {
    return (
      <div
        className="flex h-full w-full items-center justify-center whitespace-nowrap hover:text-blue-600 hover:bg-blue-50 hover:dark:bg-slate-700 dark:text-slate-400 hover:dark:text-slate-200 transition duration-300 ease-in-out cursor-pointer"
        onClick={onClick}
      >
        <span className={`text-[2em]`}>{icon}</span>
      </div>
    );
  }
  return (
    <Link href={href} className="">
      <div className="flex h-full w-full items-center justify-center whitespace-nowrap hover:text-blue-600 hover:bg-blue-50 hover:dark:bg-slate-700 dark:text-slate-400 hover:dark:text-slate-200 transition duration-300 ease-in-out cursor-pointer">
        <span className={`text-[2em]`}>{icon}</span>
      </div>
    </Link>
  );
};

const BottomNav = ({ pathname }) => {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 h-[70px] bg-white dark:bg-slate-900 flex sm:hidden items-center justify-evenly transition-transform"
      style={{
        transform: pathname.includes("/chat/") ? "translateY(70px)" : null,
        transform: navOpen ? "translateX(15rem)" : null,
      }}
    >
      <Tab
        icon={<AiOutlineMenuUnfold />}
        onClick={() => setNavOpen((prev) => !prev)}
      />
      <Tab
        icon={<MdOutlineChat />}
        href="/chat/gen"
        path="/[communityId]/chat"
      />
      <Tab icon={<RiInformationLine />} href="/" />
      <Tab icon={<CgProfile />} href="/" />
    </nav>
  );
};

export default BottomNav;
