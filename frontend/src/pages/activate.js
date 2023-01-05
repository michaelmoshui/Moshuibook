import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/header";
import CreatePost from "../components/home/CreatePost";
import LeftHome from "../components/home/LeftHome";
import RightHome from "../components/home/rightHome";
import Stories from "../components/home/Stories";
import "../css/home.css";
import ActivateForm from "../components/home/ActivateForm";
import axios from "axios";
import Cookies from "js-cookie";

export default function Activate() {
  const { user } = useSelector((user) => ({ ...user }));
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { token } = useParams(); // get token from :token in the url
  useEffect(() => {
    activateAccount();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activateAccount = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/activate`,
        { token: token }, // this is token from the url
        { headers: { Authorization: `Bearer ${user.token}` } } // this is token from user that is signed up doing the authentication process
      );
      setSuccess(data.message);
      Cookies.set("user", JSON.stringify({ ...user, verified: true }));
      dispatch({ type: "verify", payload: true });
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message); // response from the post route
      setTimeout(() => {
        navigate("/");
      }, 2500);
    }
  };

  return (
    <div className="home">
      {success && (
        <ActivateForm
          type="success"
          header="Account verification succeeded"
          text={success}
          loading={loading}
        />
      )}
      {error && (
        <ActivateForm
          type="error"
          header="Account verification failed"
          text={error}
          loading={loading}
        />
      )}
      <Header user={user} />
      <LeftHome user={user} />
      <div className="home-middle">
        <Stories />
        <CreatePost user={user} />
      </div>
      <RightHome user={user} />
    </div>
  );
}
