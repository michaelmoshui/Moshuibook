import { Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import LoginInputs from "../inputs/loginInputs";
import * as Yup from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function ChangePassword({
  userInfo,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  error,
  setError,
  loading,
  setLoading,
}) {
  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match!"),
  });

  const changePass = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`, {
        email: userInfo.email,
        password: password,
      });
      setLoading(false);
      setError("");
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="reset-form">
      <div className="reset-form-header">Chang Password</div>
      <div className="reset-form-text">Choose a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{ password: password, confirmPassword: confirmPassword }}
        validationSchema={validatePassword}
        onSubmit={() => {
          changePass();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInputs
              name="password"
              type="password"
              placeholder="New password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <LoginInputs
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            {error && <div className="error-text">{error}</div>}
            <div type="submit" className="reset-form-btns">
              <Link to="/login">
                <button className="gray-btn">Cancel</button>
              </Link>
              <button type="submit" className="blue-btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
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
