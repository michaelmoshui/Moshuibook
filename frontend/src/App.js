import { Route, Routes } from "react-router-dom";
import Login from "./pages/login.js";
import Profile from "./pages/profile.js";
import Home from "./pages/home.js";
import LoggedInRoutes from "./routes/loggedInRoutes.js";
import NotLoggedInRoutes from "./routes/notLoggedInRoutes.js";
import Activate from "./pages/activate.js";

function App() {
  return (
    <div>
      {/* wrapper for the different routes */}
      {/* A "route" consists of the path (url) amd an element which is the React file for that page...route is displayed when we enter that specific path! */}
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route path="/activate/:token" element={<Activate />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
