import "../css/login.css";
import LoginForm from "../components/login/loginForm";
import LoginFooter from "../components/login/loginFooter";
import RegisterForm from "../components/login/registerForm";
import { useState } from "react";

export default function Login() {
  // getting rid of sign up form...
  const [signUp, setSignUp] = useState(false);

  return (
    <div>
      <LoginForm setSignUp={setSignUp} />
      {signUp && <RegisterForm setSignUp={setSignUp} />}
      <LoginFooter />
    </div>
  );
}
