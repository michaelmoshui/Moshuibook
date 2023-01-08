import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import LoginInputs from "../inputs/loginInputs";
import { useState } from "react";
import * as Yup from "yup";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginForm(props) {
  const navigate = useNavigate(); // navigate function for React App...takes in navigate url as input

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  // login is changed after handleLoginChange function, NOT after setLogin()!
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  // Validation using Yup. Very ez!
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Enter your email")
      .email("Must be a valid email address"),
    password: Yup.string().required("Password is required"),
  });

  // handle submission
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const loginSubmit = async () => {
    console.log(process.env.REACT_APP_BACKEND_URL);
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          email: login.email,
          password: login.password,
        }
      ); // get the data from the backend post request
      dispatch({ type: "login", payload: data });
      Cookies.set("user", JSON.stringify(data)); // make JSON object {key: 5} into {"key", "5"}
      navigate("/");
    } catch (error) {
      setError(error.response.data.message); // response is from the post route in backend
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login-title">
        <img src="../../icons/moshuibook.svg" />
        <span>
          Moshuibook helps you connect and share with the people in your life
        </span>
      </div>
      <div className="login-wrapper">
        <div className="login-fields">
          <Formik
            enableReinitialize
            initialValues={{
              email: login.email,
              password: login.password,
            }}
            // Yup validation right here
            validationSchema={loginValidation}
            onSubmit={() => {
              loginSubmit();
            }}
          >
            {(formik) => (
              <Form>
                <LoginInputs
                  type="text"
                  name="email"
                  placeholder="Email address"
                  onChange={handleLoginChange}
                />
                <LoginInputs
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleLoginChange}
                  bottom={true} // pass in a "boolean" that says this is the bottom so have the error message displayed at the bottom!
                />
                <button type="submit" className="blue-btn">
                  Log In
                </button>
              </Form>
            )}
          </Formik>
          {/* the link tag redirect to new webpages but DOES NOT refresh the state! (a tag does) */}
          <Link to="/reset" className="forgot-password">
            Forgotten password?
          </Link>
          <div className="login-line-splitter"></div>
          <button
            className="blue-btn sign-up-btn"
            onClick={() => {
              props.setSignUp(true);
            }}
          >
            Create Account
          </button>
          <Link to="/" className="create-page-link">
            <b>Create a Page </b>
            for a celebrity, brand, or business
          </Link>
          <HashLoader // This is the loading thingy!
            color="#1876f2"
            loading={loading}
            size={30}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          {error && <div className="error-text">{error}</div>}
        </div>
      </div>
    </div>
  );
}
