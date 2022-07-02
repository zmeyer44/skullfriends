import React from "react";

const EmojiOptions = ({ onClick, offset = 33 }) => {
  const options = [
    { value: "👍", key: "thumbsUp" },
    { value: "💀", key: "skull" },
    { value: "💪", key: "flex" },
    { value: "💯", key: "hun" },
    { value: "❤️", key: "heart" },
    { value: "👎", key: "thumbsDown" },
  ];
  return (
    <div className="relative flex bg-white dark:bg-slate-700 text-[1.3em] rounded-full px-3 py-2 space-x-2 mr-2 mt-2 shadow-md">
      {options.map((emoji) => {
        return (
          <span
            className="center hover-effect rounded-full w-[1.3em] h-[1.3em] z-10"
            onClick={() => onClick(emoji.key)}
            key={emoji.key}
          >
            {emoji.value}
          </span>
        );
      })}
      <div
        className={`w-4 h-4 bg-white dark:bg-slate-700  absolute rotate-45 -top-1`}
        style={{
          right: offset,
        }}
      ></div>
    </div>
  );
};

export default EmojiOptions;
