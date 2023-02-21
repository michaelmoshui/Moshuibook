import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInputs from "../inputs/loginInputs";
import * as Yup from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function SearchAccount({
  email,
  setEmail,
  setUserInfo,
  loading,
  setLoading,
  setError,
  error,
  setVisible,
}) {
  const search = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/findUser`,
        {
          email: email,
        }
      );
      setError("");
      setUserInfo({
        email: data.email,
        picture: data.picture,
        firstName: data.firstName,
        lastName: data.lastName,
      });
      setLoading(false);
      setVisible(1);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  const validateEmail = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Invalid email syntax"),
  });
  return (
    <div className="reset-form">
      <div className="reset-form-header">Find your account</div>
      <div className="reset-form-text">
        Please enter your email address to search for your account
      </div>
      <Formik
        enableReinitialize
        initialValues={{ email: email }}
        validationSchema={validateEmail}
        onSubmit={() => {
          search();
        }}
      >
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
