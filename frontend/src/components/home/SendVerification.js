import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../css/home.css";

export default function SendVerification({ user }) {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const sendEmail = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setSuccess(data.message);
      setError("");
    } catch (error) {
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <div className="send-verification">
      <span>
        Your account is not verified, verify your account before it gets deleted
        after a month from creating.
      </span>
      <a
        onClick={() => {
          sendEmail();
        }}
      >
        Click here to resend verification link
      </a>
      {success && <div className="success-text">{success}</div>}
      {error && <div className="error-text">{error}</div>}
    </div>
  );
}
