import React from "react";

const IconButton = ({ icon, href }) => {
  return (
    <a
      className="text-[26px] text-slate-500 cursor-pointer hover:text-red-700 transition-all"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {icon}
    </a>
  );
};

export default IconButton;
