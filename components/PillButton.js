import Link from "next/link";

const PillButton = ({ label, accent, styles, onClick, href }) => {
  if (href) {
    return (
      <Link href={href}>
        <div
          className={`flex rounded-full px-6 py-1 cursor-pointer transition-colors ${
            accent
              ? "bg-blue-600 text-white hover:bg-blue-500 hover:text-slate-50"
              : "dark:bg-slate-600 dark:text-slate-300 hover:dark:bg-slate-700 hover:dark:text-slate-400 bg-gray-200 hover:bg-gray-100 text-zinc-600 hover:text-zinc-500"
          } ${styles}`}
          onClick={onClick}
        >
          {label}
        </div>
      </Link>
    );
  }
  return (
    <div
      className={`flex rounded-full px-6 py-1 cursor-pointer transition-colors ${
        accent
          ? "bg-blue-600 text-white hover:bg-blue-500 hover:text-slate-50"
          : "bg-slate-600 text-slate-300 hover:g-slate-700 hover:text-slate-400 b"
      } ${styles}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default PillButton;
