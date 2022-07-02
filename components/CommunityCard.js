import Image from "next/image";
import Verified from "../assets/Verified";
import Avatar from "./Avatar";
import PillButton from "./PillButton";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

const CommunityCard = (item) => {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-500 rounded-lg overflow-hidden relative w-full max-w-[375px]">
      <div className="relative h-[70px]">
        <Image src={item?.cover} layout="fill" objectFit="cover" />
      </div>
      <div className="flex justify-center relative h-[130px] px-4 py-3">
        <div className="absolute top-[-30px] left-5">
          <Avatar src={item?.image} size={70} />
        </div>
        <div className="absolute top-0 right-0 dark:text-slate-200 pt-3 pr-4">
          {user && user?.communities?.includes(item?.slug) ? (
            <PillButton
              label="View"
              accent
              styles="text-[.8em]  !px-4 !py-[3px]"
              href={`/${item.slug}/home`}
            />
          ) : (
            <PillButton
              label="Join"
              accent
              styles="text-[.8em]  !px-4 !py-[3px]"
              onClick={() => {
                if (!user) return router.push("/login");
              }}
            />
          )}
        </div>
        <div className="flex flex-col mt-[45px] space-y">
          <div className="flex items-center">
            <h3 className="font-semibold dark:text-slate-100 mr-1">
              {item?.displayName}
            </h3>
            {item?.safelist_request_status == "verified" ? <Verified /> : null}
          </div>
          <h3 className="text-[.7em] text-gray-400 dark:text-slate-300 max-h-[100px] max-w-[300px] line-clamp-3">
            {item?.description}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CommunityCard;
