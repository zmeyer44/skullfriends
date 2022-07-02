import React from "react";

const SmallButton = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className=" bg-white hover:bg-zinc-700 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-zind-700 hover:text-white focus:outline-none transition-colors"
    >
      {children}
    </button>
  );
};

export default SmallButton;
