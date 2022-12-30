import { menu, create } from "../../data/allMenu.js";

export default function AllMenu() {
  return (
    <div className="all-menu ">
      <div className="all-menu-header">Menu</div>
      <div className="all-menu-wrap scrollbar">
        <div className="all-menu-left">
          <div className="all-menu-search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu"></input>
          </div>
          <div className="all-menu-group">
            <div className="all-menu-group-header">Social</div>
            {menu.map((val, ind) => {
              if (ind <= 5) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
            <div className="all-menu-group-header">Entertainment</div>
            {menu.map((val, ind) => {
              if (ind > 5 && ind <= 8) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
            <div className="all-menu-group-header">Shopping</div>
            {menu.map((val, ind) => {
              if (ind > 8 && ind <= 10) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
            <div className="all-menu-group-header">Personal</div>
            {menu.map((val, ind) => {
              if (ind > 10 && ind <= 14) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
            <div className="all-menu-group-header">Professional</div>
            {menu.map((val, ind) => {
              if (ind > 14 && ind <= 16) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
            <div className="all-menu-group-header">Community Resources</div>
            {menu.map((val, ind) => {
              if (ind > 16 && ind <= 20) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
            <div className="all-menu-group-header">More from Meta</div>
            {menu.map((val, ind) => {
              if (ind > 20 && ind <= 22) {
                return (
                  <div className="all-menu-item hover1">
                    <img src={`../../left/${val.icon}.png`} alt=""></img>
                    <div className="all-menu-col">
                      <span>{val.name}</span>
                      <span>{val.description}</span>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="all-right">
          <div className="all-right-header">Create</div>
          {create.map((val, ind) => {
            return (
              <div className="all-right-item hover1">
                <div className="all-right-circle">
                  <div className={val.icon}></div>
                </div>
                <span>{val.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
