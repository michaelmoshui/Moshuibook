import { useEffect, useRef, useState } from "react";
import "../../css/createPostPopup.css";
import Picker from "emoji-picker-react";

export default function EmojiPickerBackgrounds({
  text,
  setText,
  user,
  type2,
  setShowBackground,
  showBackground,
  background,
  setBackground,
}) {
  const [cursorPos, setCursorPos] = useState();
  const [emoPicker, setEmoPicker] = useState(false);
  const textRef = useRef(null);

  // add emoji to text

  // handle emoji function from emoji-picker-react npm
  const handleEmoji = ({ emoji }) => {
    const ref = textRef.current; // access current textbox
    ref.focus();
    //// selectionStart gets the first index of selected text (or the index of cursor if no element selected)
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    setText(start + emoji + end);
    setCursorPos(start.length + emoji.length); // set cursor position to be after emojis
  };

  // make sure cursor stays at the end of emoji input
  // runs everytime cursor position changes
  useEffect(() => {
    textRef.current.selectionEnd = cursorPos; // make the cursor go to the cursor position
  }, [cursorPos]);

  // post bg images
  const postBackgrounds = [
    "../../../images/postBackgrounds/1.jpg",
    "../../../images/postBackgrounds/2.jpg",
    "../../../images/postBackgrounds/3.jpg",
    "../../../images/postBackgrounds/4.jpg",
    "../../../images/postBackgrounds/5.jpg",
    "../../../images/postBackgrounds/6.jpg",
    "../../../images/postBackgrounds/7.jpg",
    "../../../images/postBackgrounds/8.jpg",
    "../../../images/postBackgrounds/9.jpg",
    "../../../images/postBackgrounds/10.jpg",
  ];
  const bgRef = useRef(null);
  const handleBackgroundChange = (i) => {
    bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
    setBackground(postBackgrounds[i]);
    bgRef.current.classList.add("bgHandler"); // add new className to textarea background
  };
  const removeBackground = () => {
    bgRef.current.style.backgroundImage = "";
    setBackground(null);
    bgRef.current.classList.remove("bgHandler"); // remove new className from textarea background
  };

  return (
    <div className={type2 && "image-input"}>
      <div className={type2 ? "preview-textarea" : "flex-center"} ref={bgRef}>
        <textarea
          ref={textRef}
          className={`post-input ${type2 && "input2"}`}
          maxLength="360"
          value={text}
          placeholder={`What's on your mind? ${user?.firstName}`}
          onChange={(e) => {
            setText(e.target.value);
          }}
          style={{
            paddingTop: `${background ? 30 - text.length * 0.08 : 2}% `,
            color: `${
              background === "../../../images/postBackgrounds/1.jpg" ||
              background === "../../../images/postBackgrounds/4.jpg" ||
              background === "../../../images/postBackgrounds/5.jpg" ||
              background === "../../../images/postBackgrounds/6.jpg" ||
              background === "../../../images/postBackgrounds/8.jpg" ||
              background === "../../../images/postBackgrounds/9.jpg"
                ? "#fff"
                : "black"
            }`,
          }}
        ></textarea>
      </div>
      <div className={!type2 && "post-emoji-wrap"}>
        {!type2 && (
          <img
            src="../../../icons/colorful.png"
            alt=""
            onClick={() => {
              setShowBackground(!showBackground);
            }}
          ></img>
        )}
        {showBackground && (
          <div className="background-picker scrollbar">
            <div
              className="no-bg"
              onClick={() => {
                removeBackground();
              }}
            ></div>
            {postBackgrounds.map((val, i) => {
              return (
                <img
                  src={val}
                  key={i}
                  alt=""
                  onClick={() => {
                    handleBackgroundChange(i);
                  }}
                ></img>
              );
            })}
          </div>
        )}
        {emoPicker && (
          <div
            className={`comment-emoji-picker ${
              type2 ? "move-picker-2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        <i
          className={`emoji_icon_large ${type2 && "move-left"}`}
          onClick={() => {
            setEmoPicker(!emoPicker);
          }}
        ></i>
      </div>
    </div>
  );
}
