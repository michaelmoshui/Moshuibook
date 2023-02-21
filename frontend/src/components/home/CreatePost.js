import "../../css/createPost.css";
import { Feeling, Photo } from "../../svg";

export default function CreatePost({ user, setCreatePost }) {
  return (
    <div className="create-post">
      <div className="create-post-header">
        <img src={user.picture} alt=""></img>
        <div className="open-post hover2">
          What's on your mind, {user?.firstName}?
        </div>
      </div>
      <div className="create-splitter"></div>
      <div className="create-post-body">
        <div
          className="create-post-icon hover1"
          onClick={() => {
            setCreatePost(true);
          }}
        >
          <Photo color="#4bbf67 " />
          Photo/Video
        </div>
        {/* <div className="create-post-icon hover1">
          <Feeling color="#f7b928" />
          Feeling/Activity
        </div> */}
      </div>
    </div>
  );
}
