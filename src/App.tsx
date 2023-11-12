// import { Address, Restaurant } from "./model/Restaurant";
// import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  Outlet,
} from "react-router-dom";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Guide from "./pages/Guide";
import Mypage from "./pages/Mypage";
import KakaoRedirectHandler from "./pages/Login/KakaoRedirectHandler";
import Point from "pages/Mypage/Point";
import Badge from "pages/Mypage/badge";
import { userState } from "pages/Store/userState";
import { useRecoilState } from "recoil";

const AuthRoutes = () => {
  const [user] = useRecoilState(userState);
  if (!user.token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Test />} />
      <Route path="/login" element={<Login />} />
      <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
      <Route path="/" element={<AuthRoutes />}>
        <Route path="/guide" element={<Guide />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/point" element={<Point />} />
        <Route path="/mypage/badge" element={<Badge />} />
      </Route>
    </Routes>
  );
};

const Test = () => {
  return <Navigate to="/login" />;

  return (
    <div className="flex flex-col gap-10 text-2xl font-bold w-full items-center p-40">
      <Link to="/login">login</Link>
      <Link to="/guide">guide</Link>
      <Link to="/map">map</Link>
    </div>
  );
};

export default App;
