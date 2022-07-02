import { useState } from "react";
import Image from "next/image";
import Avatar from "./Avatar";
import IconButtonContainer from "./IconButtonContainer";
import { MdOutlineAddReaction } from "react-icons/md";
import { GoKebabVertical } from "react-icons/go";
import { RiShareBoxLine } from "react-icons/ri";
import EmojiOptions from "./EmojiOptions";
import { shortTimeDifference, postProcessText } from "../utils";
import ReactionButton from "./ReactionButton";
import { emitReaction } from "../config/firebase/functions";
import { urlify } from "../utils";

const Post = ({ post, uid, feedRef }) => {
  const [showReactions, setShowReactions] = useState(false);
  const {
    title,
    text,
    image,
    createdAt,
    displayName,
    pfp,
    author,
    reactions,
    id,
  } = post;
  const handleReaction = async (emoji, active) => {
    setShowReactions(false);
    await emitReaction(feedRef, id, emoji, uid, active);
  };
  return (
    <div className="flex flex-col bg-white dark:bg-slate-800 px-5 pt-4 pb-3">
      {/* Header */}
      <div className="flex ">
        <Avatar src={pfp} uid={author} size={50} />
        <div className="flex flex-col justify-center pl-3">
          <h3 className="font-semibold dark:text-slate-300">{displayName}</h3>
          <span className="text-xs truncate text-slate-400 dark:text-slate-500">
            {shortTimeDifference(createdAt)}
          </span>
        </div>
        <div className="flex flex-col items-end ml-auto ">
          <div className="flex border border-slate-300 dark:border-slate-500 divide-x divide-slate-300 dark:divide-slate-500 rounded ">
            <div className=" relative center h-8 w-8 text-slate-500 hover-effect group">
              <MdOutlineAddReaction />
              <div className="absolute top-[30px] -right-[70px] hidden group-hover:block">
                <EmojiOptions
                  offset={70}
                  onClick={(v) => handleReaction(v, false)}
                />
              </div>
            </div>
            <div className="center h-8 w-8 text-slate-500 hover-effect">
              <RiShareBoxLine />
            </div>
            <div className="center h-8 w-8 text-slate-500 hover-effect">
              <GoKebabVertical />
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex flex-col pt-4 px-4 mb-1">
        <h3 className="text-[1.1em] font-semibold mb-1 dark:text-slate-300 whitespace-pre-line">
          {title}
        </h3>
        <span
          className={`${
            title ? "text-sm" : "text-[.95em]"
          } text-sm dark:text-slate-400 mb-1 whitespace-pre-line`}
          dangerouslySetInnerHTML={{ __html: urlify(text) }}
        ></span>
        {image && (
          <div className="relative w-auto max-w-full mt-1">
            <img
              src={image}
              alt="upload"
              className="rounded-lg max-h-60 object-contain mb-1"
            />
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2 flex-wrap max-w-[250px] px-4">
        {reactions &&
          reactions.map((key) => {
            return (
              <ReactionButton
                key={key}
                reactionKey={key}
                count={post[key]?.length}
                active={post[key]?.includes(uid)}
                onClick={() => handleReaction(key, post[key]?.includes(uid))}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Post;
