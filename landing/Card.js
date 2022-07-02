import React from "react";

const Card = ({
  title,
  subtitle,
  text,
  bgColor = "bg-sky-200",
  titleColor = "text-sky-900",
  subtitleColor = "text-sky-500",
  textColor = "text-sky-800",
}) => {
  return (
    <div
      className={`flex flex-col items-center lg:items-start py-8 px-4 space-y-4 text-center lg:text-left ${bgColor} lg:px-20 lg:py-10`}
    >
      <div className="flex flex-col space-y-2 lg:space-y-4">
        <h5 className={`text-[1.3em] font-semibold ${subtitleColor}`}>
          {subtitle}
        </h5>
        <h3
          className={`text-[1.7em] lg:text-[3em] max-w-[450px] font-semibold leading-[1em] ${titleColor}`}
        >
          {title}
        </h3>
      </div>
      <p className={`max-w-[600px] lg:text-[1em] ${textColor}`}>{text}</p>
    </div>
  );
};

export default Card;
