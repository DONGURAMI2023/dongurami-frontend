import Loading from "components/Loading";
import { useEffect } from "react";
import { getApi } from "utils/http";
import axios from "axios";
import { useState } from "react";

const REACT_REST_API_KEY = "3d92f7078f51f3e20afad84b56b54d79";
const REDIRECT_URL = "http://localhost:5173/login/oauth";

const kakaoURL =
  "https://kauth.kakao.com/oauth/authorize?client_id=" +
  REACT_REST_API_KEY +
  "&redirect_uri=" +
  REDIRECT_URL +
  "&response_type=code";

const KakaoRedirectHandler = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");
  // const [accessToken, setAccessToken] = useState("");

  // 토큰 받아오기
  // const getToken = async () => {
  //   const grant_type = "authorization_code";
  //   const client_id = REACT_REST_API_KEY;
  //   const REDIRECT_URI = REDIRECT_URL;

  //   const res = await axios.post(
  //     `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${REDIRECT_URI}&code=${code}`,
  //     {
  //       headers: {
  //         "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  //       },
  //     }
  //   );

  //   const token = res.data.access_token;
  //   console.log("token:", token);
  //   setAccessToken(token);

  //   // ... 생략
  // };

  // 토큰으로 내 정보 받아오기
  // const getKaKaoUserData = async (accessToken) => {
  //   const kakaoUser = await axios.get(`https://kapi.kakao.com/v2/user/me`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });

  //   console.log(kakaoUser.data);
  // };

  // authCode넘겨주기
  const sendAuthCode = async () => {
    try {
      const response = await getApi({
        url: `users/kakao/callback`,
        params: { code: code },
      });
      // 로그인 성공
      if (response?.status === 200) {
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (code) {
      // console.log(code);
      sendAuthCode();
      // getToken();
    }
  }, [code]);

  // useEffect(() => {
  //   if (accessToken) {
  //     getKaKaoUserData(accessToken);
  //   }
  // }, [accessToken]);

  return <Loading />;
};

export default KakaoRedirectHandler;
