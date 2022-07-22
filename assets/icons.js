import {
  RiLightbulbLine,
  RiInformationLine,
  RiLightbulbFlashLine,
  RiTShirt2Line,
  RiShoppingBasket2Line,
} from "react-icons/ri";
import {
  BiChevronRight,
  BiSupport,
  BiMoney,
  BiCartAlt,
  BiPulse,
} from "react-icons/bi";
import { IoMdCompass } from "react-icons/io";
import { IoSkullOutline, IoDiamondOutline } from "react-icons/io5";
import { GiCoffin, GiVote } from "react-icons/gi";
import { FaRegHandshake } from "react-icons/fa";
import { BsTools, BsBuilding, BsNewspaper } from "react-icons/bs";
import {
  MdOutlinePalette,
  MdOutlineChat,
  MdPoll,
  MdOutlineCached,
  MdOutlineVerified,
} from "react-icons/md";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineQrcode,
  AiOutlineLink,
} from "react-icons/ai";

export const icons = {
  home: <IoMdCompass />,
  skull: <IoSkullOutline />,
  art: <MdOutlinePalette />,
  tools: <BsTools />,
  money: <BiMoney />,
  cart: <BiCartAlt />,
  pulse: <BiPulse />,
  support: <BiSupport />,
  coffin: <GiCoffin />,
  lightBulb: <RiLightbulbLine />,
  lightBulbAlt: <RiLightbulbFlashLine />,
  info: <RiInformationLine />,
  vote: <GiVote />,
  diamond: <IoDiamondOutline />,
  handShake: <FaRegHandshake />,
  building: <BsBuilding />,
  chat: <MdOutlineChat />,
  poll: <MdPoll />,
  documentVerified: <MdOutlineVerified />,
  documentPending: <MdOutlineCached />,
  merch: <RiShoppingBasket2Line />,
  alpha: <BsNewspaper />,

  twitter: (
    <span className="text-sky-400">
      <AiFillTwitterCircle />
    </span>
  ),
  instagram: (
    <span className="text-[#E1306C]">
      <AiFillInstagram />
    </span>
  ),
  linkedIn: (
    <span className="text-[#0e76a8]">
      <AiFillLinkedin />
    </span>
  ),
  openSea: (
    <img
      src="https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.svg"
      className="h-[35px]"
    />
  ),
};

export default icons;
