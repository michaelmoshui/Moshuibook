import { Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function SendEmail({
  userInfo,
  setError,
  loading,
  setLoading,
  setVisible,
}) {
  const send = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/resetPasswordCode`,
        {
          email: userInfo.email,
        }
      );
      setError("");
      setLoading(false);
      setVisible(2);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset-form dynamic-height">
      <div className="reset-form-header">Reset your password</div>
      <div className="reset-grid">
        <div className="reset-left">
          <div className="reset-form-text">Receive your code through:</div>
          <label htmlFor="email">
            <input type="radio" id="email" checked readOnly></input>
            <div className="label-col">
              <span>Send code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className="reset-right">
          <img src={userInfo.picture} alt=""></img>
          <span>{userInfo.email}</span>
          <span>
            {userInfo.firstName} {userInfo.lastName}
          </span>
          <div type="submit" className="reset-form-btns">
            <Link to="/login">
              <button
                className="gray-btn"
                onClick={() => {
                  setVisible(0);
                }}
              >
                Not You?
              </button>
            </Link>
            <button
              className="blue-btn"
              onClick={() => {
                send();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
      {loading && (
        <div style={{ margin: "20px" }}>
          <ClipLoader // This is the loading thingy!
            color="#1876f2"
            loading={loading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </div>
  );
}
