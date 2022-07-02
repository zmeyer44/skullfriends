import { GoKebabVertical } from "react-icons/go";

const MainContentHeader = ({ label }) => {
  return (
    <div className="relative h-[50px] w-full dark:bg-slate-900">
      <div className="absolute h-full w-full  bg-gradient-to-l from-blue-300 dark:from-slate-400" />
      <div className="flex items-center justify-between px-4 relative h-full">
        <h1 className="text-black dark:text-slate-300 font-medium text-[1.3em]">
          {label}
        </h1>
        <div className="">
          <GoKebabVertical />
        </div>
      </div>
    </div>
  );
};

export default MainContentHeader;
