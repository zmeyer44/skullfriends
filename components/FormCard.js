import Link from "next/link";
import React from "react";
import FormInput from "./FormInput";

const FormCard = ({ children, title, elements, options, noDark }) => {
  return (
    <div className="flex flex-col w-full max-w-lg mx-4 md:mx-0">
      <span className="text-white mb-3 text-[1.4em] font-semibold">
        {title}
      </span>
      <form className="w-full bg-gradient-to-br from-blue-300 via-pink-500 to-orange-300 rounded-lg py-6 px-6 flex flex-col justify-center shadow-lg">
        {elements?.map((props) => (
          <FormInput {...props} key={props.label} noDark />
        ))}
        {children}
      </form>
      <div className="flex items-center justify-around mt-3">
        {options?.map(({ label, onClick, href }, index) => {
          if (onClick) {
            return (
              <span
                key={index}
                className="text-slate-200 text-[.9em] cursor-pointer hover:underline"
                onClick={onClick}
              >
                {label}
              </span>
            );
          }
          return (
            <Link href={href} key={index}>
              <span className="text-slate-200 text-[.9em] cursor-pointer hover:underline text-center">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default FormCard;
