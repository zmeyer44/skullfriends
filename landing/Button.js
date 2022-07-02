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

const Button = ({ label, secondary, href, type, onClick, styles, icon }) => {
  if (secondary) {
    return (
      <ButtonWrapper type={type} href={href}>
        <div
          className={`center h-10 border border-sky-500 hover:bg-sky-500 hover:text-sky-900 shadow-sm rounded-md font-medium text-sky-400 py-1 px-4 transition-all cursor-pointer ${styles}`}
          onClick={onClick}
        >
          {label}
        </div>
      </ButtonWrapper>
    );
  }
  return (
    <ButtonWrapper type={type} href={href}>
      <div
        className={`center h-10 bg-gradient-to-r from-cyan-500 to-blue-500 hover:to-cyan-500 shadow-md rounded-md font-medium text-zinc-50 py-1 px-4 transition-all cursor-pointer ${styles}`}
        style={{
          transition: "all ease 1s",
        }}
        onClick={onClick}
      >
        {icon && <span className="text-[1.5em] mr-3">{icon}</span>}
        {label}
      </div>
    </ButtonWrapper>
  );
};

export default Button;
