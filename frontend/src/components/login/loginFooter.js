import { Link } from "react-router-dom";

export default function LoginFooter() {
  return (
    <footer className="login-footer">
      <div className="login-footer-wrap">
        <Link to="/">English</Link>
        <Link to="/">Francais</Link>
        <Link to="/">中文（简体）</Link>
      </div>
      <div className="footer-line-splitter"></div>
      <div className="login-footer-wrap">
        <Link to="/">Facebook @ 2022</Link>
      </div>
    </footer>
  );
}
