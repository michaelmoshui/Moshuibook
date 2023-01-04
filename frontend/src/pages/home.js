import { useSelector } from "react-redux";
import Header from "../components/header/header";
import CreatePost from "../components/home/CreatePost";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/rightHome";
import Stories from "../components/home/Stories";
import "../css/home.css";

export default function Home() {
  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="home">
      <Header user={user} />
      <LeftHome user={user} />
      <div className="home-middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
