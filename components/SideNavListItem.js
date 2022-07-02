import { useState, useEffect } from "react";
import Link from "next/link";
import { BiChevronDown } from "react-icons/bi";
import { HiLockClosed } from "react-icons/hi";
import icons from "../assets/icons";
import { useRouter } from "next/router";

const SideNavListItem = ({
  label,
  icon,
  href,
  options,
  locked,
  menuOpen,
  onClick,
  active,
  asPath,
}) => {
  const router = useRouter();
  const { communityId } = router.query;

  const [open, setOpen] = useState(false);

  if (onClick) {
    return (
      <>
        <div
          className={`flex items-center py-4 ${
            menuOpen ? "pl-6 pr-4" : "justify-center"
          } h-12 text-sm text-zinc-700 dark:text-slate-500 ${
            active && "text-zinc-900 font-semibold dark:text-slate-400"
          } text-ellipsis overflow-hidden whitespace-nowrap rounded hover-effect `}
          onClick={onClick}
        >
          <span
            className={` ${menuOpen ? "text-[1.3em] pr-4" : "text-[2em]"} `}
          >
            {icon}
          </span>
          <p className={`${!menuOpen && "hidden"}`}>{label}</p>
        </div>
        {active && (
          <div className="absolute bg-zinc-900 dark:bg-slate-400 top-0 left-1 w-1 h-1/2 translate-y-1/2 rounded-full" />
        )}
      </>
    );
  }
  if (options) {
    return (
      <div className="flex flex-col relative">
        <>
          <div
            className={`flex items-center py-4 ${
              menuOpen ? "pl-6 pr-4" : "justify-center"
            }  h-12 text-sm text-zinc-700 dark:text-slate-500 ${
              active && "text-zinc-900 dark:text-slate-300"
            } text-ellipsis overflow-hidden  whitespace-nowrap rounded hover-effect `}
            onClick={() => setOpen(!open)}
          >
            <span
              className={` ${menuOpen ? "text-[1.3em] pr-4" : "text-[2em]"} `}
            >
              {icon}
            </span>

            <p className={`${!menuOpen && "hidden"}`}>{label}</p>
            <span
              className={`ml-auto text-[1.7em] transition-transform ${
                open && "rotate-180"
              } ${!menuOpen && "hidden"}`}
            >
              <BiChevronDown />
            </span>
          </div>
          {/* {active && (
            <div className="absolute bg-zinc-900 dark:bg-slate-400 top-0 left-1 w-1 h-1/2 translate-y-1/2 rounded-full" />
          )} */}
        </>
        <ul
          className={` overflow-hidden  ${
            open && menuOpen ? "h-auto" : "h-0"
          } transition-height duration-300 ease-in-out`}
        >
          {options.map(({ label, icon, href, locked }) =>
            href !== "" ? (
              <Link className="" href={`/${communityId}/${href}`} key={label}>
                <div
                  className={`relative flex items-center py-4 pl-10 pr-4 h-8 text-sm text-zinc-700 dark:text-slate-500 ${
                    `/${communityId}/${href}` == asPath &&
                    "font-semibold dark:text-slate-100"
                  } text-ellipsis overflow-hidden  whitespace-nowrap rounded hover-effect ${
                    open && menuOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="pr-4">{icons[icon]}</span>
                  <p className={`${!menuOpen && "hidden"}`}>{label}</p>
                  {locked && (
                    <span
                      className={` ${
                        menuOpen ? "text-[1.1em ml-auto opacity-70" : "hidden"
                      } `}
                    >
                      <HiLockClosed />
                    </span>
                  )}
                  {`/${communityId}/${href}` == asPath && (
                    <div className="absolute bg-zinc-900 dark:bg-slate-100 top-0 right-1 w-1 h-1/2 translate-y-1/2 rounded-full" />
                  )}
                </div>
              </Link>
            ) : (
              <div
                key={label}
                onClick={() => alert("Comming Soon!")}
                className={`relative flex items-center py-4 pl-10 pr-4 h-8 text-sm text-zinc-700 dark:text-slate-500 ${
                  `/${communityId}/${href}` == asPath && "font-semibold"
                } text-ellipsis overflow-hidden  whitespace-nowrap rounded hover-effect ${
                  open && menuOpen ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="pr-4">{icons[icon]}</span>
                <p className={`${!menuOpen && "hidden"}`}>{label}</p>
                {locked && (
                  <span
                    className={` ${
                      menuOpen ? "text-[1.1em ml-auto opacity-70" : "hidden"
                    } `}
                  >
                    <HiLockClosed />
                  </span>
                )}
                {`/${communityId}/${href}` == asPath && (
                  <div className="absolute bg-zinc-900 dark:bg-slate-400 top-0 right-1 w-1 h-1/2 translate-y-1/2 rounded-full" />
                )}
              </div>
            )
          )}
        </ul>
      </div>
    );
  } else {
    if (href !== "") {
      return (
        <>
          <Link className="" href={`/${communityId}/${href}`}>
            <div
              className={`flex items-center py-4 ${
                menuOpen ? "pl-6 pr-4" : "justify-center"
              } h-12 text-sm text-zinc-700 dark:text-slate-500 ${
                active && "text-zinc-900 font-medium dark:text-slate-100"
              } text-ellipsis overflow-hidden whitespace-nowrap rounded hover-effect `}
            >
              <span
                className={` ${menuOpen ? "text-[1.3em] pr-4" : "text-[2em]"} `}
              >
                {icon}
              </span>
              <p className={`${!menuOpen && "hidden"}`}>{label}</p>
              {locked && (
                <span
                  className={` ${
                    menuOpen ? "text-[1.1em ml-auto opacity-70" : "hidden"
                  } `}
                >
                  <HiLockClosed />
                </span>
              )}
            </div>
          </Link>
          {active && (
            <div className="absolute bg-zinc-900 dark:bg-slate-100 top-0 right-1 w-1 h-1/2 translate-y-1/2 rounded-full" />
          )}
        </>
      );
    } else {
      return (
        <div
          onClick={() => alert("Comming Soon!")}
          className={`flex items-center py-4 ${
            menuOpen ? "pl-6 pr-4" : "justify-center"
          } h-12 text-sm text-zinc-700 dark:text-slate-500 ${
            active && "text-zinc-900 font-medium dark:text-slate-100"
          } text-ellipsis overflow-hidden whitespace-nowrap rounded hover-effect `}
        >
          <span
            className={` ${menuOpen ? "text-[1.3em] pr-4" : "text-[2em]"} `}
          >
            {icon}
          </span>
          <p className={`${!menuOpen && "hidden"}`}>{label}</p>
          {locked && (
            <span
              className={` ${
                menuOpen ? "text-[1.1em ml-auto opacity-70" : "hidden"
              } `}
            >
              <HiLockClosed />
            </span>
          )}
        </div>
      );
    }
  }
};

export default SideNavListItem;
