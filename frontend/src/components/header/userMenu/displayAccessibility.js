export default function DisplayAccessibility(props) {
  return (
    <div className="absolute-wrap">
      <div className="absolute-wrap-header">
        <div
          className="circle hover1"
          onClick={() => {
            props.setVisible(0);
          }}
        >
          <i className="arrow_back_icon "></i>
        </div>
        Display & Accessibility
      </div>
      <div className="mmenu-main">
        <div className="small-circle">
          <i className="dark_filled_icon"></i>
        </div>
        <div className="mmenu-col" style={{ width: "80%" }}>
          <span className="mmenu-span1">Dark Mode</span>
          <span className="mmenu-span1">
            Make sure you don't blind your eyes when you go on your phone at
            night!
          </span>
        </div>
      </div>
      <label htmlFor="darkOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="dark" id="darkOff"></input>
      </label>
      <label htmlFor="darkOn" className="hover1">
        <span>On</span>
        <input type="radio" name="dark" id="darkOn"></input>
      </label>
      <div className="mmenu-main">
        <div className="small-circle">
          <i className="compact_icon"></i>
        </div>
        <div className="mmenu-col" style={{ width: "80%" }}>
          <span className="mmenu-span1">Compact Mode</span>
          <span className="mmenu-span1">
            Make your font size smaller so more content can fit on your screen.
          </span>
        </div>
      </div>
      <label htmlFor="compactOff" className="hover1">
        <span>Off</span>
        <input type="radio" name="compact" id="compactOff"></input>
      </label>
      <label htmlFor="compactOn" className="hover1">
        <span>On</span>
        <input type="radio" name="compact" id="compactOn"></input>
      </label>
      <div className="mmenu-item hover3">
        <div className="small-circle">
          <i className="keyboard_icon"></i>
        </div>
        <span>keyboard</span>
        <div className="rArrow">
          <i className="right_icon"></i>
        </div>
      </div>
    </div>
  );
}
