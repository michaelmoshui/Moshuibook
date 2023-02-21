import "../../css/stories.css";
import { ArrowRight, Plus } from "../../svg";
import { stories } from "../../data/home";
import StoryItem from "./StoryItem";
import { useMediaQuery } from "react-responsive";

export default function Stories() {
  const query1200px = useMediaQuery({
    query: "(max-width: 1200px)",
  });
  const query850px = useMediaQuery({
    query: "(max-width: 850px)",
  });
  const query770px = useMediaQuery({
    query: "(max-width: 770px)",
  });
  const max = query770px ? 4 : query850px ? 5 : query1200px ? 4 : 5;
  return (
    <div className="stories">
      <div className="create-story-card">
        <img src="../../images/default_pic.png"></img>
        <div className="plus-story">
          <Plus color="#fff" />
        </div>
        <div className="create-story-text">Create Story</div>
      </div>
      {stories.slice(0, max).map((val, ind) => {
        return <StoryItem story={val} key={ind} />;
      })}
      <div className="white-circle">
        <ArrowRight color="#65676b" />
      </div>
    </div>
  );
}
