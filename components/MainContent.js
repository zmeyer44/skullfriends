const MainContent = ({ header, children, footer }) => {
  return (
    <div className="scrollbar-thin flex flex-col grow-3 overflow-hidden relative w-36">
      {header}
      <div className="flex flex-col grow">{children}</div>
      {footer}
    </div>
  );
};

export default MainContent;
