import { useMediaQuery } from "react-responsive";

export default function BirthDaySelect(props) {
  const {
    bDay,
    handleRegisterChange,
    days,
    bMonth,
    months,
    bYear,
    years,
    dateError,
  } = props;

  const view1 = useMediaQuery({
    query: "(min-width: 960px)",
  });
  const view2 = useMediaQuery({
    query: "(min-width: 1600px)",
  });

  return (
    <div className="register-col">
      <div className="register-col-header">
        Date of Birth <i className="info_icon"></i>
      </div>
      <div className="register-grid">
        <select name="bDay" value={bDay} onChange={handleRegisterChange}>
          {days.map((val, index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
        <select name="bMonth" value={bMonth} onChange={handleRegisterChange}>
          {months.map((val, index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
        <select name="bYear" value={bYear} onChange={handleRegisterChange}>
          {years.map((val, index) => (
            <option value={val} key={index}>
              {val}
            </option>
          ))}
        </select>
      </div>
      {dateError && (
        <div className="input-error-message birthday-selection-error">
          <div
            className={view2 ? "error-arrow-right" : "error-arrow-bottom"}
          ></div>
          {dateError}
        </div>
      )}
    </div>
  );
}
