import { useEffect } from "react";
import axios from "axios";
import { getApi } from "utils/http";

const KakaoRedirectHandler = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get("code");

  useEffect(() => {
    console.log(code);
  }, [code]);

  return <div>와빠</div>;
};

export default KakaoRedirectHandler;
