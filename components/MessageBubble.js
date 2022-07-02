import { useState } from "react";
import Avatar from "./Avatar";
import { shortTimeDifference, urlify } from "../utils";
import IconButtonContainer from "./IconButtonContainer";
import { MdOutlineAddReaction } from "react-icons/md";
import { HiOutlineReply } from "react-icons/hi";
import EmojiOptions from "./EmojiOptions";
import { emitReaction } from "../config/firebase/functions";
import ReactionButton from "./ReactionButton";

const MessageBubble = ({ message, uid, chatRef }) => {
  const [showReactions, setShowReactions] = useState(false);
  const { id, displayName, author, createdAt, pfp, text, image, reactions } =
    message;

  const handleReaction = async (emoji, active) => {
    setShowReactions(false);
    await emitReaction(chatRef, id, emoji, uid, active);
  };
  return (
    <div className="flex relative space-x-3 py-1 px-3 hover:bg-slate-200 hover:dark:bg-slate-800 w-full group">
      <div className="flex flex-col min-w-fit">
        <Avatar src={pfp} uid={author} size={40} />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-[.9em] text-black dark:text-slate-200">
            {displayName}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {shortTimeDifference(createdAt)}
          </span>
        </div>
        <div className="space-y-1">
          <div
            className={`dark:text-slate-300 text-[.87em] whitespace-pre-line break-all`}
            dangerouslySetInnerHTML={{ __html: urlify(text) }}
          ></div>
          {image ? (
            <img
              src={image}
              alt="upload"
              className="rounded-lg max-h-60 object-contain mb-1"
            />
          ) : null}
          <div className="flex items-center space-x-2 flex-wrap max-w-[250px]">
            {reactions &&
              reactions.map((key) => {
                return (
                  <ReactionButton
                    reactionKey={key}
                    count={message[key]?.length}
                    active={message[key]?.includes(uid)}
                    onClick={() =>
                      handleReaction(key, message[key]?.includes(uid))
                    }
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className="hidden group-hover:flex flex-col items-end absolute top-0 right-2 rounded-lg">
        <div className="bg-slate-100 dark:bg-slate-900">
          <IconButtonContainer
            items={[
              {
                icon: <MdOutlineAddReaction />,
                onClick: () => setShowReactions((prev) => !prev),
              },
              {
                icon: <HiOutlineReply />,
                onClick: () => console.log("Clicked"),
              },
            ]}
          />
        </div>
        {showReactions && (
          <EmojiOptions onClick={(v) => handleReaction(v, false)} />
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
