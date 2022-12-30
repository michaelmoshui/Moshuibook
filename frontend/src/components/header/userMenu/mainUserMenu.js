import { Link } from "react-router-dom";
export default function MainUserMenu(props) {
  return (
    <div>
      <Link to="/profile" className="mmenu-header hover3">
        <img src={props.user?.picture}></img>
        <div className="mmenu-col">
          <span>
            {props.user?.firstName} {props.user?.lastName}
          </span>
          <span>See your profile</span>
        </div>
      </Link>
      <div className="mmenu-splitter"></div>
      <div className="mmenu-main hover3">
        <div className="small-circle">
          <i className="report_filled_icon"></i>
        </div>
        <div className="mmenu-col">
          <div className="mmenu-span1">Give feedback</div>
          <div className="mmenu-span2">Help us improve Facebook</div>
        </div>
      </div>
      <div className="mmenu-splitter"></div>
      <div
        className="mmenu-item hover3"
        onClick={() => {
          props.setVisible(1);
        }}
      >
        <div className="small-circle">
          <i className="settings_filled_icon" />
        </div>
        <span>Settings & Privacy</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div
        className="mmenu-item hover3"
        onClick={() => {
          props.setVisible(2);
        }}
      >
        <div className="small-circle">
          <i className="help_filled_icon" />
        </div>
        <span>Help & Support</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div
        className="mmenu-item hover3"
        onClick={() => {
          props.setVisible(3);
        }}
      >
        <div className="small-circle">
          <i className="dark_filled_icon" />
        </div>
        <span>Display and Accessibility</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="logout_filled_icon" />
        </div>
        <span>Logout</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}
