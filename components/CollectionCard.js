import Image from "next/image";
import Verified from "../assets/Verified";
import Avatar from "./Avatar";

const CollectionCard = (item) => {
  return (
    <a
      href={`https://opensea.io/collection/${item?.slug}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="flex flex-col bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-500 rounded-lg overflow-hidden relative w-full max-w-[375px]">
        <div className="relative h-[70px]">
          {item?.banner_image_url || item?.large_image_url ? (
            <Image
              src={item?.banner_image_url || item?.large_image_url}
              layout="fill"
              objectFit="cover"
            />
          ) : null}
        </div>
        <div className="flex justify-center relative h-[130px] px-4 py-3">
          <div className="absolute top-[-30px] ">
            {item?.image_url ? (
              <Avatar src={item?.image_url} size={70} />
            ) : null}
          </div>
          <div className="flex flex-col pt-[40px] text-center space-y-2">
            <div className="center">
              <h3 className="font-semibold dark:text-slate-100 text-center mr-1">
                {item?.name}
              </h3>
              {item?.safelist_request_status == "verified" ? (
                <Verified />
              ) : null}
            </div>
            <h3 className="text-[.7em] text-gray-400 dark:text-slate-300 max-h-[100px] max-w-[300px] line-clamp-3">
              {item?.description}
            </h3>
          </div>
        </div>
      </div>
    </a>
  );
};

export default CollectionCard;
