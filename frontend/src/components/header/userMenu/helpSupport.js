export default function HelpSupport(props) {
  return (
    <div className="absolute-wrap">
      <div className="absolute-wrap-header">
        <div
          className="circle hover3"
          onClick={() => {
            props.setVisible(0);
          }}
        >
          <i className="arrow_back_icon "></i>
        </div>
        Help & Support
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle ">
          <i className="help_center_icon"></i>
        </div>
        <span>Help Center</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="support_inbox_icon"></i>
        </div>
        <span>Support Inbox</span>
      </div>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="info_filled_icon"></i>
        </div>
        <span>Report a Problem</span>
      </div>
    </div>
  );
}
