import { useMediaQuery } from "react-responsive";

export default function GenderSelect(props) {
  const { genderError, handleRegisterChange } = props;
  const view1 = useMediaQuery({
    query: "(min-width: 960px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 1600px)",
  });
  return (
    <div className="register-col">
      <div className="register-col-header">
        Gender <i className="info_icon"></i>
      </div>
      <div className="register-grid">
        <label htmlFor="male-gender">
          Male
          <input
            type="radio"
            id="male-gender"
            name="gender"
            value="male"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="female-gender">
          Female
          <input
            type="radio"
            id="female-gender"
            name="gender"
            value="female"
            onChange={handleRegisterChange}
          />
        </label>
        <label htmlFor="other-gender">
          Other
          <input
            type="radio"
            id="other-gender"
            onChange={handleRegisterChange}
            name="gender"
            value="other"
          />
        </label>
      </div>
      {genderError && (
        <div className="input-error-message gender-selection-error">
          <div
            className={view2 ? "error-arrow-left" : "error-arrow-bottom"}
          ></div>
          {genderError}
        </div>
      )}
    </div>
  );
}
