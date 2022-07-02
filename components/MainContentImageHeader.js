import Image from "next/image";

const MainContentImageHeader = ({ src, name, description }) => {
  return (
    <div className="relative h-[200px] w-full">
      <Image src={src} layout="fill" objectFit="cover" />
      <div className="absolute h-full w-full bg-gradient-to-t from-zinc-900" />
      <div className="flex flex-col absolute bottom-2 py-2 px-4">
        <h1 className="text-white font-semibold text-[1.7em]">{name}</h1>
        <span className="text-slate-300 text-[.8em] font-light">
          {description}
        </span>
      </div>
    </div>
  );
};

export default MainContentImageHeader;
