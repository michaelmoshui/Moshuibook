export default function SettingsPrivacy(props) {
  return (
    <div className="absolute-wrap">
      <div className="absolute-wrap-header">
        <div
          className="circle  hover3"
          onClick={() => {
            props.setVisible(0);
          }}
        >
          <i className="arrow_back_icon "></i>
        </div>
        Settings & Privacy
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="settings_filled_icon"></i>
        </div>
        <span>Settings</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="privacy_checkup_icon"></i>
        </div>
        <span>Privacy Checkup</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="privacy_shortcuts_icon"></i>
        </div>
        <span>Privacy Shortcuts</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="activity_log_icon"></i>
        </div>
        <span>Activity Log</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="news_icon"></i>
        </div>
        <span>News Feed Preferences</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="language_icon"></i>
        </div>
        <span>Language</span>
      </div>
    </div>
  );
}
