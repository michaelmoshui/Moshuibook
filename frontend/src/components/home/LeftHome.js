import { useSelector } from "react-redux";
import "../../css/leftHome.css";
import LeftLink from "./LeftLink";
import { left } from "../../data/home";
import { Link } from "react-router-dom";
import { ArrowDown1 } from "../../svg";
import { useState } from "react";
import Shortcut from "./Shortcut";

export default function LeftHome() {
  // show more
  const [more, setMore] = useState(false);

  const { user } = useSelector((user) => ({ ...user }));
  return (
    <div className="left-home scrollbar">
      <Link to="/profile">
        <div className="left-link hover1">
          <img src={user?.picture}></img>
          <span>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </Link>
      {left.slice(0, 8).map((val, ind) => {
        // first eight element!
        return (
          <LeftLink
            key={ind}
            image={val.img}
            text={val.text}
            notification={val.notification}
          />
        );
      })}
      <div
        className="left-link hover1"
        onClick={() => {
          setMore(!more);
        }}
      >
        <div className={more ? "small-circle rotate180" : "small-circle"}>
          <ArrowDown1 />
        </div>
        <span>{more ? "Show less" : "See more"}</span>
      </div>
      {more && (
        <div className="more-left">
          {left.slice(8, left.length).map((val, ind) => {
            // rest of the element
            return (
              <LeftLink
                key={ind}
                image={val.img}
                text={val.text}
                notification={val.notification}
              />
            );
          })}
        </div>
      )}
      <div className="splitter"></div>
      <div className="shortcut">
        <div className="shortcut-header">Your Shortcuts</div>
        <div className="edit-shortcut">Edit</div>
      </div>
      <div className="shortcut-list">
        <Shortcut
          link="https://www.youtube.com/@moshuimusic5869"
          img="../../../images/ytb.png"
          name="My YouTube Channel"
        />
        <Shortcut
          link="https://www.instagram.com/michaelmoshui"
          img="../../../images/insta.png"
          name="My Instagram Account"
        />
      </div>
    </div>
  );
}
