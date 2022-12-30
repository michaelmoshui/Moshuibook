import { Formik, Form } from "formik";
import { useRef, useState } from "react";
import RegisterInputs from "../inputs/registerInputs";
import * as Yup from "yup";
import BirthDaySelect from "../inputs/birthdaySelect";
import GenderSelect from "../inputs/genderSelect";
import HashLoader from "react-spinners/HashLoader";
import axios from "axios";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../../helper/clickOutside";

export default function RegisterForm(props) {
  const navigate = useNavigate(); // navigate function for React App...takes in navigate url as input
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bYear: new Date().getFullYear(),
    bMonth: new Date().getMonth() + 1,
    bDay: new Date().getDate(),
    gender: "a",
  });
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Working with dates
  const bYear = user.bYear;
  const bMonth = user.bMonth;
  const bDay = user.bDay;

  const years = Array.from(
    new Array(120),
    (val, index) => new Date().getFullYear() - index
  );

  const months = Array.from(new Array(12), (val, index) => 1 + index);

  const days = Array.from(
    new Array(new Date(bYear, bMonth, 0).getDate()), // get number of days based on year and month
    (val, index) => 1 + index
  );

  // Registration Validation
  const registerValidation = Yup.object({
    firstName: Yup.string()
      .required("You don't have a name? Just put 'dum dum'!!")
      .matches(
        /^[aA-zZ]+$/,
        "Don't try to be cool with me with your fancy names!"
      ),
    lastName: Yup.string()
      .required("You must be a DiSaPpOiNtMeNt to your family haiyaa")
      .matches(
        /^[aA-zZ]+$/,
        "Don't try to be cool with me with your fancy names!"
      ),
    email: Yup.string().required("EMAILL!!!!").email("type carefully dum dum!"),
    password: Yup.string().required(
      "I'm gonna steal your account first if you leave this blank!"
    ),
    gender: Yup.string().required("Be proud to express your gender!"),
  });

  const [dateError, setDateError] = useState(null);
  const [genderError, setGenderError] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const registerSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password,
          bYear: user.bYear,
          bMonth: user.bMonth,
          bDay: user.bDay,
          gender: user.gender,
        }
      ); // get the data from the backend post request
      setError("");
      setSuccess(data.message);
      const { message, ...rest } = data; // "rest" includes all fields other than message from the post action (eg. firstname, lastName, email, etc.)
      setTimeout(() => {
        console.log(rest);
        dispatch({ type: "login", payload: rest });
        Cookies.set("user", JSON.stringify(rest)); // make JSON object {key: 5} into {"key", "5"}
        setLoading(false);
        navigate("/");
      }, 2000); // do the function AFTER a 2 second break
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message); // response is from the post route in backend
      setLoading(false);
    }
  };

  // getting rid of sign up
  const el = useRef(null); //// useRef is a React Hook that lets you reference a value that’s not needed for rendering...in this case it's the html element
  useClickOutside(el, () => {
    props.setSignUp(false);
    console.log("reached here");
  });

  return (
    <div className="blur">
      <div className="register-wrapper">
        <div className="register" ref={el}>
          {/* el is now referred to this HTML element object "register". ref.current holds the value of this HTML element */}
          <div className="register-header">
            <i
              className="exit_icon"
              onClick={() => {
                props.setSignUp(false);
              }}
            ></i>
            <span>Sign Up</span>
            <span>It's quick and easy!</span>
          </div>
          <Formik
            enableReinitialize
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              password: user.password,
              bYear: user.bYear,
              bMonth: user.bMonth,
              bDay: user.bDay,
              gender: user.gender,
            }}
            validationSchema={registerValidation}
            onSubmit={() => {
              // check valid date
              let currentDate = new Date(); // new Date() returns date in millisecond from 1970 Jan 1
              let pickedDate = new Date(bYear, bMonth - 1, bDay);
              let fourteenYears = new Date(1970 + 14, 0, 1);
              // code to display the correct error(s)...all necessary only due to fking asynchronous programming :<
              if (
                currentDate - pickedDate < fourteenYears &&
                user.gender === "a"
              ) {
                setDateError("Too young for social media!");
                setGenderError("Be proud of your gender and pick!");
              } else if (user.gender === "a") {
                setDateError(null);
                setGenderError("Be proud of your gender and pick!");
              } else if (currentDate - pickedDate < fourteenYears) {
                setDateError("Too young for social media!");
                setGenderError(null);
              } else {
                setGenderError(null);
                setDateError(null);
                registerSubmit();
              }
            }}
          >
            {(formik) => (
              <Form className="register-form">
                <div className="register-line">
                  <RegisterInputs
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    onChange={handleRegisterChange}
                  />
                  <RegisterInputs
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    onChange={handleRegisterChange}
                    lastName
                  />
                </div>
                <div className="register-line">
                  <RegisterInputs
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="register-line">
                  <RegisterInputs
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleRegisterChange}
                  />
                </div>
                <BirthDaySelect
                  bDay={bDay}
                  handleRegisterChange={handleRegisterChange}
                  days={days}
                  bMonth={bMonth}
                  months={months}
                  bYear={bYear}
                  years={years}
                  dateError={dateError}
                />
                <GenderSelect
                  handleRegisterChange={handleRegisterChange}
                  genderError={genderError}
                />
                <div className="register-info">
                  By clicking the "Sign Up" button, you agree to give up all
                  your privacy to the almighty creator of this web app.
                </div>
                <button type="submit" className="blue-btn sign-up-btn">
                  Sign Up
                </button>
                <HashLoader // This is the loading thingy!
                  color="#1876f2"
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                {error && <div className="error-text">{error}</div>}
                {success && <div className="success-text">{success}</div>}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
