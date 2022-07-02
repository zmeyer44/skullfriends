import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import { useCommunity } from "../context/CommunityContext";
import UserInfo from "./UserInfo";
import LinksListContainer from "./LinksListContainer";
import Button from "./Button";
import { PostModal } from "./Modals";
import { IoMdAdd } from "react-icons/io";
import { newPost } from "../config/firebase/functions";

const SideInfo = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const { communityId, feedId } = router.query;
  const community = useCommunity();
  const [postModal, setPostModal] = useState(false);
  const [sideLinks, setSideLinks] = useState([]);
  const [showPostButton, setShowPostButton] = useState(false);

  useEffect(() => {
    if (community && community.sideInfo) {
      const fullTemp = [];
      community.sideInfo.forEach((box) => {
        const tempLinks = [];
        community[box.slug].forEach((link) => {
          tempLinks.push(link);
        });
        fullTemp.push({
          label: box.label,
          internal: box.internal,
          links: tempLinks,
        });
      });
      setSideLinks(fullTemp);
    }
  }, [community]);

  useEffect(() => {
    if (feedId && community) {
      const metaData = community?.feeds[feedId];
      if (!metaData?.private) {
        setShowPostButton(true);
      } else if (
        !metaData?.writers ||
        metaData?.writers.some((item) =>
          user[communityId]?.roles.includes(item)
        )
      ) {
        setShowPostButton(true);
      } else {
        setShowPostButton(false);
      }
    }
  }, [feedId, community]);

  return (
    <div className="hidden lg:flex h-full  grow">
      <div className="flex flex-col px-3 py-2 space-y-4 grow max-w-[400px] 2xl:max-w-[450px] relative h-full">
        <UserInfo user={user} />
        <div className="flex">
          {showPostButton && (
            <>
              <Button
                label="New Post"
                icon={<IoMdAdd />}
                onClick={() => setPostModal(true)}
              />
              <PostModal
                open={postModal}
                onClose={() => setPostModal(false)}
                titleOption={community?.feeds[feedId]?.title}
              />
            </>
          )}
        </div>
        <div className="sticky top-3 space-y-4 ">
          {sideLinks?.map((box) => {
            return (
              <LinksListContainer
                title={box.label}
                links={box.links}
                internal={box.internal}
                key={box.label}
              />
            );
          })}

          {children}
        </div>
      </div>
    </div>
  );
};

export default SideInfo;
