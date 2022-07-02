import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";
import MessageBubble from "./MessageBubble";
import TextArea from "./TextArea";
import { db } from "../config/firebase";
import { sendMessage } from "../config/firebase/functions";
import {
  collection,
  query,
  onSnapshot,
  orderBy,
  limit,
} from "firebase/firestore";
import { IoCloseOutline } from "react-icons/io5";

const ChatBox = ({ chatRef, metaData }) => {
  const endOfMessages = useRef(null);
  const { user } = useAuth();
  const router = useRouter();
  const { communityId } = router.query;

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [initialLoad, setInitialLoad] = useState(false);
  const [chatLoading, setChatLoading] = useState(true);
  const [loading, setLoading] = useState(true);
  const [readAccess, setReadAccess] = useState(false);
  const [writeAccess, setWriteAccess] = useState(false);
  const [lastMsg, setLastMsg] = useState("");
  const handleSendMessage = async () => {
    if (text === "") return;
    const messageText = text;
    const messageImage = image;
    setText("");
    setImage(null);
    await sendMessage(messageText, messageImage, user, chatRef);
  };

  const fetchMessages = async () => {
    const q = query(
      collection(db, chatRef),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      setMessages(temp.reverse());
    });
    return unsubscribe;
  };

  const init = () => {
    if (!metaData?.private) {
      fetchMessages();
      setReadAccess(true);
      setWriteAccess(true);
      setLoading(false);
    } else {
      if (
        !metaData?.viewers ||
        metaData?.viewers.some((item) => user[communityId].roles.includes(item))
      ) {
        setReadAccess(true);
        fetchMessages();
      } else {
        router.back();
        alert("You do not have access to this chat");
      }
      if (
        !metaData?.writers ||
        metaData?.writers.some((item) => user[communityId].roles.includes(item))
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
  }, [chatRef, router]);
  const scrollToBottom = () => {
    endOfMessages.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    if (!chatLoading && !initialLoad) {
      if (messages[messages?.length - 1]?.createdAt !== lastMsg) {
        scrollToBottom();
        setLastMsg(messages[messages?.length - 1]?.createdAt);
      }
      //   setInitialLoad(true);
    }
    if (messages?.length && chatLoading) {
      setChatLoading(false);
    }
  }, [messages, chatLoading]);

  const addImage = (e) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImage(readerEvent.target.result);
    };
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white dark:bg-slate-900 px-2 py-3">
      <div className="flex grow overflow-y-clip h-20">
        <div className=" h-full w-full scrollbar-thin scrollbar-thumb-rounded-full overflow-y-scroll overflow-x-clip bg-slate-100 dark:bg-slate-700 rounded-lg space-y-4 pt-2 pb-4">
          {messages.map((message) => {
            return (
              <MessageBubble
                message={message}
                key={message?.createdAt}
                uid={user.uid}
                chatRef={chatRef}
              />
            );
          })}
          <div ref={endOfMessages} />
          <div className="sm:hidden w-full h-[66px]" />
        </div>
      </div>
      {image ? (
        <div className="relative flex bg-white dark:bg-slate-900">
          <div
            className="absolute w-8 h-8 center top-1 left-1 cursor-pointer text-[1.5em] rounded-full bg-slate-100"
            onClick={() => setImage(null)}
          >
            <IoCloseOutline />
          </div>
          <img
            src={image}
            alt="upload"
            className="rounded-lg max-h-60 object-contain"
          />
        </div>
      ) : null}
      {/* <div className="sm:hidden w-full h-[66px]"></div> */}
      <div className="fixed bottom-0 left-0 right-0 sm:relative flex px-2 pt-2 pb-4 bg-white dark:bg-slate-900">
        <TextArea
          text={text}
          setText={setText}
          handleSendMessage={handleSendMessage}
          addImage={addImage}
          disabled={!writeAccess}
        />
        <div
          className={`center cursor-pointer mx-4 ${
            text ? "text-blue-500 font-medium" : "text-slate-400"
          }`}
          onClick={handleSendMessage}
        >
          Send
        </div>
        {!writeAccess && (
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-300 dark:bg-slate-700 opacity-20 rounded-b-xl cursor-not-allowed" />
        )}
      </div>
    </div>
  );
};

export default ChatBox;
