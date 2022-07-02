const SideNavDivider = ({ label, menuOpen }) => {
  return (
    <div className="flex items-center">
      <span
        className={`${
          menuOpen ? "inline" : "hidden"
        } text-sm text-slate-600 dark:text-slate-500 mx-3`}
      >
        {label}
      </span>
      <div className="bg-slate-400 dark:bg-slate-700 w-full h-[1px]" />
    </div>
  );
};

export default SideNavDivider;
