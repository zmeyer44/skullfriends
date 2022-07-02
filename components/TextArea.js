import { useState, useEffect, useRef } from "react";
import { BiImageAdd } from "react-icons/bi";
import { MdOutlineAddReaction, MdKeyboardHide } from "react-icons/md";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

const AutoTextArea = ({
  text,
  setText,
  handleSendMessage,
  addImage,
  disabled,
}) => {
  const textAreaRef = useRef(null);
  const imagePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [textAreaHeight, setTextAreaHeight] = useState("auto");
  const [parentHeight, setParentHeight] = useState("auto");

  useEffect(() => {
    if (text === "") {
      setParentHeight("auto");
      setTextAreaHeight("auto");
    } else {
      setParentHeight(`${textAreaRef.current.scrollHeight}px`);
      setTextAreaHeight(`${textAreaRef.current.scrollHeight}px`);
    }
  }, [text]);

  const onChangeHandler = (event) => {
    setTextAreaHeight("auto");
    setParentHeight(`${textAreaRef.current.scrollHeight}px`);
    setText(event.target.value);
  };
  const handleKeyDown = (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setText(text + emoji);
    setShowEmojis(false);
  };

  return (
    <div
      className={`relative flex items-center grow w-full border border-slate-400 rounded-lg py-2 px-4  focus:bg-white dark:bg-slate-700 focus:dark:bg-slate-700 ${
        disabled && "opacity-50"
      }`}
      style={{
        minHeight: parentHeight,
      }}
    >
      <textarea
        className={`appearance-none w-full bg-gray-200 text-gray-700 dark:text-slate-200 bg-transparent border-none p-0 outline-none focus:outline-none ring-0 focus:ring-0 `}
        ref={textAreaRef}
        rows={1}
        style={{
          height: textAreaHeight,
          resize: "none",
        }}
        value={text}
        placeholder={disabled ? "This chat is read only" : "Start typing..."}
        onKeyDown={handleKeyDown}
        onChange={onChangeHandler}
        disabled={disabled}
      />
      <div className="relative flex space-x-2 text-slate-500  transition-colors text-[1.5em]">
        {showEmojis && (
          <Picker
            onSelect={addEmoji}
            style={{
              position: "absolute",
              bottom: 20,
              right: 50,
              maxWidth: "320px",
              borderRadius: "20px",
            }}
            theme="light"
          />
        )}
        <span
          className="cursor-pointer hover:text-slate-800 hidden sm:inline"
          onClick={() => setShowEmojis((prev) => !prev)}
        >
          {showEmojis ? <MdKeyboardHide /> : <MdOutlineAddReaction />}
        </span>
        <span
          className="cursor-pointer hover:text-slate-800"
          onClick={() => imagePickerRef.current.click()}
        >
          <BiImageAdd />
          <input type="file" hidden onChange={addImage} ref={imagePickerRef} />
        </span>
      </div>
    </div>
  );
};

export default AutoTextArea;
