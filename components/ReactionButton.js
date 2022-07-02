import React from "react";

const ReactionButton = ({ reactionKey, count, active, onClick }) => {
  const options = {
    thumbsUp: "👍",
    skull: "💀",
    flex: "💪",
    hun: "💯",
    heart: "❤️",
    thumbsDown: "👎",
  };
  if (count == 0) return <></>;
  return (
    <div
      className={`flex items-center border px-[5px] shadow-md ${
        !active
          ? "border-neutral-50 bg-neutral-50 text-neutral-800 dark:bg-slate-700 dark:border-slate-900 dark:text-slate-300 "
          : "border-neutral-400 bg-neutral-300 bg-opacity-30 text-neutral-700 dark:text-slate-300 dark:bg-slate-900 dark:border-slate-600"
      }  hover:bg-opacity-60 rounded-md cursor-pointer`}
      onClick={onClick}
    >
      <span className="text-[1em] mr-[3px]">{options[reactionKey]}</span>
      <span className="text-[.85em]">{count}</span>
    </div>
  );
};

export default ReactionButton;
