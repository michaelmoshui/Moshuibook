export default function StoryItem({ story }) {
  return (
    <div className="story">
      <img src={story.image} className="story-img"></img>
      <div className="story-profile-picture">
        <img src={story.profile_picture}></img>
      </div>
      <div className="story-profile-name">{story.profile_name}</div>
    </div>
  );
}
