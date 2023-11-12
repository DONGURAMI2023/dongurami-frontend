// import { Address, Restaurant } from "./model/Restaurant";
// import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Guide from "./pages/Guide";
import Mypage from "./pages/Mypage";
import KakaoRedirectHandler from "./pages/Login/KakaoRedirectHandler";

// const data: Restaurant = {
//   name: "누나네",
//   category: "한식",
//   address: {
//     city: "서울",
//     detail: "서초구",
//     zipcode: 12323,
//   },
//   menu: [
//     { name: "김치찌개", price: 5000, category: "PASTA" },
//     { name: "된장찌개", price: 5000, category: "PASTA" },
//   ],
// };

const App: React.FC = () => {
  // const [myRestaurant, setMyRestaurant] = useState<Restaurant>(data);
  // const changeAddress = (address: Address) => {
  //   setMyRestaurant({ ...myRestaurant, address: address });
  // };
  // const showBestMenuName = (name: string) => {
  //   return name;
  // };

  return (
    <div id="App">
      <Routes>
        <Route path="/" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/oauth" element={<KakaoRedirectHandler />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/map" element={<Map />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </div>
  );
};

const Test = () => {
  return (
    <div className="flex flex-col gap-10 text-2xl font-bold w-full items-center p-40">
      <Link to="/login">login</Link>
      <Link to="/guide">guide</Link>
      <Link to="/map">map</Link>
    </div>
  );
};

export default App;
