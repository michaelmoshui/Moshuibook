import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginInputs from "../components/inputs/loginInputs";
import LoginFooter from "../components/login/loginFooter";
import ChangePassword from "../components/reset/ChangePassword";
import CodeVerification from "../components/reset/CodeVerification";
import SearchAccount from "../components/reset/SearchAccount";
import SendEmail from "../components/reset/SendEmail";
import "../css/reset.css";

export default function Reset() {
  const { user } = useSelector((user) => ({ ...user }));
  const navigate = useNavigate();
  //logout function
  const dispatch = useDispatch();
  const logoutSubmit = async () => {
    try {
      dispatch({ type: "logout", payload: null });
      Cookies.set("user", null);
      navigate("/");
    } catch (error) {
      navigate("/");
    }
  };
  const [visible, setVisible] = useState(0); // 0 for first card, 1 for second, 2 for third, 3 for fourth
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    picture: "",
    firstName: "",
    lastName: "",
  });

  return (
    <div className="reset">
      <div className="reset-header">
        <Link to="/">
          <img src="../../icons/moshuibook.svg"></img>
        </Link>
        {user ? (
          <div className="right-reset">
            <Link to="profile">
              <img src={user.picture}></img>
            </Link>
            <button
              className="blue-btn"
              onClick={() => {
                logoutSubmit();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to="/login" className="right-reset">
            <button className="blue-btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset-wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            error={error}
            setVisible={setVisible}
          />
        )}
        {visible === 1 && (
          <SendEmail
            userInfo={userInfo}
            loading={loading}
            setLoading={setLoading}
            setError={setError}
            error={error}
            setVisible={setVisible}
          />
        )}
        {visible === 2 && (
          <CodeVerification
            userInfo={userInfo}
            code={code}
            setCode={setCode}
            loading={loading}
            setLoading={setLoading}
            error={error}
            setError={setError}
            setVisible={setVisible}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            userInfo={userInfo}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            error={error}
            setError={setError}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </div>
      <LoginFooter />
    </div>
  );
}
