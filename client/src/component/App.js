import { Route, useLocation } from "react-router-dom";
import Header from "../route/Header";
import Footer from "../route/Footer";
import "bootstrap/dist/css/bootstrap.css";
import "../css/toy.css";

import Board from "../component/board/Board";
import Login from "../component/login/Login";
import Register from "../component/register/Register";
import Product from "../component/product/Product";
import Cart from "../component/cart/Cart";
import History from "../component/history/History";
import Naver from "./naver/Naver";
import { useEffect, useState } from "react";
import cookie from "react-cookies";
import axios from "axios";

function App() {
  const [userId, setUserId] = useState("");

  const location = useLocation();

  useEffect(() => {
    if ("/register" !== location.pathname) {
      handleCheckSession();
    }
  }, [location.pathname]);

  const handleCheckSession = async () => {
    const tId = cookie.load("token_id");
    const tName = cookie.load("token_name");
    const tPwd = cookie.load("user_password");

    if (tId && tName) {
      axios
        .post("/api/user?type=sessionCheck", {
          token_id: tId,
          token_name: tName,
        })
        .then((res) => {
          // 유저 아이디 세팅
          setUserId(res.data.decrypt_id.user_email);
          // 쿠키의 password 검증
          if (tPwd) {
            axios
              .post("/api/user?type=sessionSignin", {
                user_email: res.data.decrypt_id.user_email,
                user_password: tPwd,
              })
              .then((res) => {
                if (!res.data[0].user_email) {
                  // 로그인 상태 해제
                  handleNotLogin();
                }
              })
              .catch((err) => {});
          } else {
            // 로그인 상태 해제
            handleNotLogin();
          }
        });
    } else {
      // 로그인 상태 해제
      handleNotLogin();
    }
  };

  const handleNotLogin = () => {
    if (window.location.hash !== "nocookie") {
      handleRemoveCookie();
    }
    setTimeout(() => {
      window.location.href = "/login/#nocookie";
    }, 1000);
  };
  const handleRemoveCookie = () => {
    cookie.remove("token_id", { path: "/" });
    cookie.remove("token_name", { path: "/" });
    cookie.remove("user_password", { path: "/" });
  };

  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/naverApi" component={Naver} />
      <Route exact path="/board" component={Board} />
      <Route path="/product" render={() => <Product userId={userId} />} />
      <Route path="/cart" render={() => <Cart userId={userId} />} />
      <Route path="/history" render={() => <History userId={userId} />} />
      <Footer />
    </div>
  );
}

export default App;
