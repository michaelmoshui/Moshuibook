import { useState } from "react";
import DisplayAccessibility from "./displayAccessibility";
import HelpSupport from "./helpSupport";

import MainUserMenu from "./mainUserMenu";
import SettingsPrivacy from "./settingsPrivacy";

export default function UserMenu(props) {
  // which user menu to show
  const [visible, setVisible] = useState(0);

  return (
    <div className="mmenu">
      {visible === 0 && (
        <MainUserMenu user={props.user} setVisible={setVisible} />
      )}
      {visible === 1 && <SettingsPrivacy setVisible={setVisible} />}
      {visible === 2 && <HelpSupport setVisible={setVisible} />}
      {visible === 3 && <DisplayAccessibility setVisible={setVisible} />}
    </div>
  );
}
