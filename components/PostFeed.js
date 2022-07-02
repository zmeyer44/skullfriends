import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../config/firebase";
import Post from "./Post";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { PostModal } from "./Modals";
import { useAuth } from "../context/AuthContext";
import { BsPlusLg } from "react-icons/bs";

const PostFeed = ({ feedRef, metaData }) => {
  const [posts, setPosts] = useState([]);
  const [readAccess, setReadAccess] = useState(false);
  const [writeAccess, setWriteAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [postModal, setPostModal] = useState(false);

  const { user } = useAuth();
  const router = useRouter();
  const { communityId } = router.query;

  const fetchPosts = async () => {
    const q = query(
      collection(db, feedRef),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setPosts(temp);
    });
    return unsubscribe;
  };

  const init = () => {
    if (!metaData?.private) {
      fetchPosts();
      setReadAccess(true);
      setWriteAccess(true);
      setLoading(false);
    } else {
      if (
        !metaData?.viewers ||
        metaData?.viewers.some((item) =>
          user[communityId]?.roles.includes(item)
        )
      ) {
        setReadAccess(true);
        fetchPosts();
      } else {
        router.push(`/${communityId}/home`);
      }
      if (
        !metaData?.writers ||
        metaData?.writers.some((item) =>
          user[communityId]?.roles.includes(item)
        )
      ) {
        setWriteAccess(true);
      } else {
        setWriteAccess(false);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    return init();
  }, [feedRef, router]);

  return (
    <div className="divide-y divide-slate-200 dark:divide-slate-500">
      {posts.map((post) => {
        return (
          <Post
            post={post}
            key={post.createdAt}
            uid={user.uid}
            feedRef={feedRef}
          />
        );
      })}
      <div className="center bg-white dark:bg-slate-800 py-4 text-slate-400 hover-effect">
        <span className="text-sm ">
          {posts?.length <= 20 ? "No more posts" : "Load more"}
        </span>
      </div>
      {writeAccess && (
        <>
          <div
            className="fixed lg:hidden center w-[50px] h-[50px] rounded-full bottom-5 right-3 bg-blue-600 shadow-lg text-white cursor-pointer"
            onClick={() => setPostModal(true)}
          >
            <BsPlusLg />
          </div>
          <PostModal
            open={postModal}
            onClose={() => setPostModal(false)}
            titleOption={metaData?.title}
          />
        </>
      )}
    </div>
  );
};

export default PostFeed;
