import React, { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImagePreview({
  text,
  setText,
  user,
  images,
  setImages,
  setPreview,
}) {
  const imageInput = useRef(null);
  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((img) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = (readerEvent) => {
        setImages((images) => [...images, readerEvent.target.result]);
      };
    });
  };
  return (
    <div className="overflow-a scrollbar">
      {/* type 2 indicates that this is the image preview...when we enter EmojiPickerBackgrounds attribute will be true only for here! */}
      <EmojiPickerBackgrounds user={user} text={text} setText={setText} type2 />
      <div className="add-picture-wrap">
        {/* The file input is hidden! Must be accessed through ref */}
        <input
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={handleImages}
          accept="video/*,image/*"
        ></input>
        {images && images.length ? (
          // Have images
          <div className="add-picture-inside1 p0">
            <div className="preview-actions">
              <button className="hover1">
                <i className="edit_icon"></i>
                Edit
              </button>
              {/* Add more photos */}
              <button
                className="hover1"
                onClick={() => {
                  imageInput.current.click();
                }}
              >
                <i className="addPhoto_icon"></i>
                Add Photos/Videos
              </button>
            </div>
            {/* exit, so get rid of current selection */}
            <div
              className="small-white-circle"
              onClick={() => {
                setImages([]);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            {/* map out images */}
            <div
              className={
                images.length === 1
                  ? "preview1"
                  : images.length === 2
                  ? "preview2"
                  : images.length === 3
                  ? "preview3"
                  : images.length === 4
                  ? "preview4"
                  : images.length === 5
                  ? "preview5"
                  : images.length % 2 === 0
                  ? "preview-even"
                  : "preview-odd"
              }
            >
              {images.map((image, i) => {
                if (image.substring(0, 10) === "data:image") {
                  return (
                    <img
                      src={image}
                      alt=""
                      key={i}
                      className="preview-item"
                    ></img>
                  );
                } else {
                  return (
                    <video key={i} controls className="preview-item">
                      <source src={image}></source>
                    </video>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          // No images
          <div className="add-picture-inside1">
            <div
              className="small-white-circle"
              onClick={() => {
                setPreview(false);
              }}
            >
              <i className="exit_icon"></i>
            </div>
            <div
              className="add-col"
              //// Need this because actual input is hidden! So we need to access by ref
              onClick={() => {
                imageInput.current.click();
              }}
            >
              <div className="add-circle">
                <i className="addPhoto_icon"></i>
              </div>
              <span>Add Photos/Videos</span>
              <span>or drag and drop</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
