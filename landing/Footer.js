import Image from "next/image";
import { BsTwitter } from "react-icons/bs";
import { ImLinkedin2 } from "react-icons/im";

const Footer = () => {
  return (
    <footer className=" bg-slate-200 ">
      <div className=" flex flex-col px-6 py-5 max-w-[1000px] space-y-6 mx-auto">
        <div className="flex justify-between items-center">
          <div className="relative w-[100px] h-12">
            <Image
              src="/assets/images/orbit.png"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex space-x-4 text-zinc-600 transition-color text-[2em]">
            <a
              href="https://twitter.com/zmeyer44"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-800"
            >
              <BsTwitter />
            </a>
            <a
              href="https://www.linkedin.com/in/zach-meyer-68a558168/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-800"
            >
              <ImLinkedin2 />
            </a>
          </div>
        </div>
        <div className="text-md flex flex-col lg:flex-row space-y lg:space-y-0 lg:space-x-3">
          <span className="hover:underline">Contact:</span>
          <a href="mailto:zach@joinorbit.xyz" className="hover:underline">
            zach@joinorbit.xyz
          </a>
          <span className="hidden lg:inline">|</span>
          <a href="tel:516-477-3745" className="hover:underline">
            +1 (516) 477-3745
          </a>
        </div>

        <div className="text-sm md:text-md flex flex-col md:flex-row space-y md:space-y-0 md:space-x-4">
          <span>Orbit © {new Date().getFullYear()}</span>
          <span>All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
