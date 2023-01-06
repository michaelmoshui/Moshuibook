import { Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginInputs from "../components/inputs/loginInputs";
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
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
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
        <div className="reset-form">
          <div className="reset-form-header">Find your account</div>
          <div className="reset-form-text">
            Please enter your email address to search for your account
          </div>
          <Formik enableReinitialize initialValues={{ email: email }}>
            {(formik) => (
              <Form>
                <LoginInputs
                  name="email"
                  type="text"
                  placeholder="Email address"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                {error && <div className="error-text">{error}</div>}
                <div type="submit" className="reset-form-btns">
                  <Link to="/login">
                    <button className="gray-btn">Cancel</button>
                  </Link>
                  <button type="submit" className="blue-btn">
                    Search
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
