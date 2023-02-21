import { useState } from "react";
import { useSelector } from "react-redux";
import CreatePostPopup from "../components/createPostPopup/CreatePostPopup";
import Header from "../components/header/header";
import CreatePost from "../components/home/CreatePost";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/rightHome";
import SendVerification from "../components/home/SendVerification";
import Stories from "../components/home/Stories";
import "../css/home.css";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  const [createPost, setCreatePost] = useState(false);
  return (
    <div className="home">
      <Header user={user} />
      <LeftHome user={user} />
      <div className="home-middle">
        <Stories />
        {!user.verified && <SendVerification user={user} />}
        <CreatePost user={user} setCreatePost={setCreatePost} />
        {createPost && (
          <CreatePostPopup user={user} setCreatePost={setCreatePost} />
        )}
      </div>
      <RightHome user={user} />
    </div>
  );
}
