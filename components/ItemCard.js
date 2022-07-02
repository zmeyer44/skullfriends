import Verified from "../assets/Verified";
const ItemCard = (item) => {
  return (
    <a
      href={item.permalink}
      target="_blank"
      rel="noreferrer"
      className="flex w-full max-w-[230px]"
    >
      <div className="flex flex-col p-1 border border-gray-300 dark:border-slate-500 rounded-md bg-white dark:bg-slate-900 w-full max-w-[230px]">
        <img
          src={item?.image_preview_url}
          alt=""
          className="w-full rounded-md"
        />
        <div className="flex flex-col py-2 px-2">
          <div className="flex">
            <span className="text-[.7em] text-gray-500 dark:text-slate-400 mr-1 truncate text-ellipsis overflow-hidden max-w-[130px]">
              {item?.collection?.name}
            </span>
            {item?.collection?.safelist_request_status == "verified" && (
              <Verified />
            )}
          </div>
          <h3 className="text-[.9em] font-medium text-black dark:text-slate-200 mt-[2px]">
            {item?.name}
          </h3>
        </div>
      </div>
    </a>
  );
};

export default ItemCard;
