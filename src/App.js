import React from "react";
import "./App.css";

import Login from "./pages/Login";
import Join from "./pages/Join";
import Main from "./pages/Main";
import Algorithm from "./pages/Algorithm";
import Detail from "./pages/Detail";
import { Route, Routes } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

export const StoreContext = React.createContext({});

function App() {
  const [loginUser, setLoginUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const 자동로그인 = async () => {
    await axios({
      url: "http://localhost:4000/autoLogin",
      method: "POST",
    }).then((response) => {
      setLoginUser(response.data);
      setLoading(false);
    });
  };
  React.useEffect(() => {
    자동로그인();
  }, []);

  if (loading === true) {
    return <div>로딩중..</div>;
  }

  return (
    <StoreContext.Provider
      value={{
        loginUser: loginUser,
      }}
    >
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/algorithm" element={<Algorithm />} />
        <Route exact path="/detail/:algorithmSeq" element={<Detail />} />
        <Route exact path="/join" element={<Join />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </StoreContext.Provider>
  );
}

export default App;
