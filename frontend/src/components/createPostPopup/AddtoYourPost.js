import React from "react";
import { Dots, Feeling, Photo } from "../../svg";

export default function AddtoYourPost({ preview, setPreview }) {
  return (
    <div className="add-to-your-post">
      <div className="add-to-text">Add to your post</div>
      <div
        className="post-header-right hover1"
        onClick={() => {
          setPreview(true);
        }}
      >
        <Photo color="#45bd62" />
      </div>
      <div className="post-header-right hover1">
        <i className="tag_icon"></i>
      </div>
      <div className="post-header-right hover1">
        <Feeling color="#f7b928" />
      </div>
      <div className="post-header-right hover1">
        <i className="maps_icon"></i>
      </div>
      <div className="post-header-right hover1">
        <Dots color="#65676b" />
      </div>
    </div>
  );
}
