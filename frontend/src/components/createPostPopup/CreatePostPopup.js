import { useRef, useState } from "react";
import "../../css/createPostPopup.css";
import useClickOutside from "../../helper/clickOutside";
import AddtoYourPost from "./AddtoYourPost";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import ImagePreview from "./ImagePreview";
import { PulseLoader } from "react-spinners";
import PostError from "./PostError";
import dataURItoBlob from "../../helper/dataURItoBlob";
import axios from "axios";

export default function CreatePostPopup({ user, setCreatePost }) {
  const [text, setText] = useState("");
  const [preview, setPreview] = useState(false);
  // "images" contain image and videos
  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("");
  const [showBackground, setShowBackground] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // click outside
  const postRef = useRef(null);
  useClickOutside(postRef, () => {
    setCreatePost(false);
  });
  // submit post function
  const submitPost = async () => {
    if (background) {
      try {
        setLoading(true);
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/createPost`,
          {
            user: user,
            text: text,
            images: null,
            background: background,
            token: user.token,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setLoading(false);
        setBackground("");
        setText("");
        setCreatePost(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error.response.data);
      }
    } else if (images && images.length) {
      try {
        setLoading(true);
        const postImages = images.map((img) => {
          // change base64 to binary data for cloudinary
          return dataURItoBlob(img);
        });
        // cloudinary path to upload images
        const path = `${user.username}/post-images`;
        //// file transfer to backend are done through formData
        //// formData is an object
        let formData = new FormData();
        formData.append("path", path);
        let count = 0;
        // add blobs to formData
        postImages.forEach((img) => {
          let num = new Date().getTime() + count;
          count += 1;
          formData.append("file", img, "File uploaded at " + num.toString());
        });
        // upload images to cloudinary
        const { data } = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/uploadImages`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              "Content-Type": "multipart/form-data",
            },
          },
          { withCredentials: true }
        );
        // add cloudinary link to post
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/createPost`,
          {
            user: user,
            text: text,
            images: data,
            background: null,
            token: user.token,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setLoading(false);
        setBackground("");
        setText("");
        setImages([]);
        setCreatePost(false);
      } catch (error) {
        setLoading(false);
        setError(error.response.data.message);
      }
    } else if (text) {
      try {
        setLoading(true);
        await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/createPost`,
          {
            user: user,
            text: text,
            images: null,
            background: null,
            token: user.token,
          },
          { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setLoading(false);
        setBackground("");
        setText("");
        setCreatePost(false);
      } catch (error) {
        setLoading(false);
        setError(error);
        console.log(error.response.data);
      }
    } else {
      console.log("nothing");
    }
  };
  return (
    <div className="blur">
      <div className="postBox" ref={postRef}>
        {error && <PostError error={error} setError={setError} />}
        <div className="box-header">
          <div
            className="small-circle"
            onClick={() => {
              setCreatePost(false);
            }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box-profile">
          <img src={user?.picture} alt=""></img>
          <div className="box-col">
            <div className="box-profile-name">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="box-privacy">
              <img src="../../../icons/public.png" alt=""></img>
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>
        {!preview ? (
          <EmojiPickerBackgrounds
            user={user}
            text={text}
            setText={setText}
            background={background}
            setBackground={setBackground}
            showBackground={showBackground}
            setShowBackground={setShowBackground}
          />
        ) : (
          <ImagePreview
            user={user}
            text={text}
            setText={setText}
            images={images}
            setImages={setImages}
            setPreview={setPreview}
          />
        )}
        <AddtoYourPost preview={preview} setPreview={setPreview} />
        {error && (
          <div
            className="error-text"
            style={{
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Error text
          </div>
        )}
        <button
          className="post-submit"
          onClick={() => {
            submitPost();
          }}
          disabled={loading}
        >
          {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
        </button>
      </div>
    </div>
  );
}
