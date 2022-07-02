import Image from "next/image";
const Loader = ({ size = 50 }) => {
  return (
    <Image src="/assets/images/loading_gif.gif" width={size} height={size} />
  );
};

export default Loader;
