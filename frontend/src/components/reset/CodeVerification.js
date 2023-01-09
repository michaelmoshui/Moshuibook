import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInputs from "../inputs/loginInputs";
import * as Yup from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

export default function CodeVerification({
  userInfo,
  code,
  setCode,
  error,
  setError,
  setVisible,
  loading,
  setLoading,
}) {
  const validateCode = Yup.object({
    code: Yup.string()
      .required("Code is required")
      .matches(/^[0-9]+$/, "Invalid code format"),
  });

  const verifyCode = async () => {
    try {
      setLoading(true);
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/verifyCode`, {
        code: code,
        email: userInfo.email,
      });
      setError("");
      setLoading(false);
      setVisible(3);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <div className="reset-form">
      <div className="reset-form-header">Code Verification</div>
      <div className="reset-form-text">Please enter the verification code</div>
      <Formik
        enableReinitialize
        initialValues={{ code: code }}
        validationSchema={validateCode}
        onSubmit={() => {
          verifyCode();
        }}
      >
        {(formik) => (
          <Form>
            <LoginInputs
              name="code"
              type="text"
              placeholder="code"
              onChange={(e) => {
                setCode(e.target.value);
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
