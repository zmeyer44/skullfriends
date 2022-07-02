import { HiHeart } from "react-icons/hi";

const Author = () => {
  return (
    <div className="flex items-center mt-4 text-slate-400 text-[.9em] self-center mb-3">
      <p className="">Made with</p>
      <HiHeart className="mx-2 text-red-600" />
      <p>
        by{" "}
        <a
          href="https://twitter.com/zmeyer44"
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 ml-1"
        >
          Zachm.eth
        </a>
      </p>
    </div>
  );
};

export default Author;
