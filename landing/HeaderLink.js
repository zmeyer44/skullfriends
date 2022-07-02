import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
const HeaderLink = ({ label, href, hidden = false, large }) => {
  const { asPath } = useRouter();

  return (
    <Link href={href}>
      <div
        className={`${
          hidden && "hidden md:inline-flex"
        } flex items-center cursor-pointer text-black/60 hover:text-black  ${
          asPath === href && "!text-accent"
        }`}
      >
        <h4
          className={`text-lg tracking-wide font-crush ${large && "text-4xl"}`}
        >
          {label}
        </h4>
      </div>
    </Link>
  );
};

export default HeaderLink;
