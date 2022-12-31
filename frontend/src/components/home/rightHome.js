import "../../css/rightHome.css";
import { Dots, NewRoom, Search } from "../../svg";
import Contact from "./Contact";

export default function RightHome() {
  const color = "#65676b";
  return (
    <div className="right-home">
      <div className="sponsor">
        <div className="sponsor-title">Sponsored</div>
        <div className="sponsor-list"></div>
      </div>
      <div className="splitter1"></div>
      <div className="contacts">
        <div className="contact-header">
          <span className="contact-title">Contacts</span>
          <div className="contact-icons">
            <div className="contact-circle hover1">
              <NewRoom color={color} />
            </div>
            <div className="contact-circle hover1">
              <Search color={color} />
            </div>
            <div className="contact-circle hover1">
              <Dots color={color} />
            </div>
          </div>
        </div>
        <div className="contact-list">
          <Contact
            img={`../../../images/default_pic.png`}
            firstName={"Michael"}
            lastName={"Mo"}
          />
        </div>
      </div>
    </div>
  );
}
