import React from "react";

const IconButtonContainer = ({ items }) => {
  return (
    <div className="flex border border-slate-300 dark:border-slate-500 divide-x divide-slate-300 dark:divide-slate-500 rounded ">
      {items?.map(({ icon, onClick }, index) => {
        return (
          <div
            className="center h-8 w-8 text-slate-500 dark:text-slate-400 hover-effect"
            onClick={onClick}
            key={index}
          >
            {icon}
          </div>
        );
      })}
    </div>
  );
};

export default IconButtonContainer;
