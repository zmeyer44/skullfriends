import Link from "next/link";
const ButtonWrapper = ({ type, href, children }) => {
  if (type == "anchor") {
    return (
      <a href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  } else if (type == "link") {
    return <Link href={href}>{children}</Link>;
  } else return children;
};

const Button = ({
  label,
  icon,
  styles,
  onClick,
  secondary,
  type,
  href,
  small,
  disabled,
}) => {
  if (secondary) {
    return (
      <ButtonWrapper type={type} href={href}>
        <div
          className={`center bg-white text-blue-600 border-2 border-blue-600 font-medium rounded-lg ${
            small ? "text-[.8em] px-6 py-3" : "text-[1em] px-5 py-3"
          } px-7 py-3 cursor-pointer hover:opacity-60 transition-all ${styles} ${
            disabled && "opacity-60 pointer-events-none cursor-not-allowed"
          }`}
          onClick={onClick}
        >
          {icon ? <span className="text-[1.5em] mr-2">{icon}</span> : null}
          {label}
        </div>
      </ButtonWrapper>
    );
  } else {
    return (
      <ButtonWrapper type={type} href={href}>
        <div
          className={`center bg-gray-800 text-white font-medium rounded-lg ${
            small ? "text-[.8em] px-6 py-3" : "text-[1em] px-5 py-3"
          } px-7 py-3 cursor-pointer hover:opacity-60 transition-all ${styles} ${
            disabled && "opacity-60 pointer-events-none cursor-not-allowed"
          }`}
          onClick={onClick}
        >
          {icon ? <span className="text-[1.5em] mr-2">{icon}</span> : null}
          {label}
        </div>
      </ButtonWrapper>
    );
  }
};

export default Button;
