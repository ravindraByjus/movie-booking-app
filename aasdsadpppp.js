import React, { useState, useEffect } from "react";
import { Container } from "reactstrap";
import axios from 'axios';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from 'history';
import Header from "./components/Header";
import UserContext from "./components/UserContext"
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

export default function App() {
  const history = createBrowserHistory();

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");

      if(token === null){
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await axios.post(
        "http://localhost:5000/users/tokenIsValid",
        null,
        { headers: { "x-auth-token": token } }
      );
      
      if (tokenRes.data){
        const userRes = await axios.get("http://localhost:5000/users",
        { headers: { "x-auth-token": token } }
        );
        console.log(userRes)
        setUserData({
        token,
        user: userRes.data
        });
        if(userRes.data){
          console.log(userData)
          setLoading(false)
        }
      }
    }
    checkLoggedIn();
  },[]);
  
  return (
    <>
    <BrowserRouter history={history}>
      <UserContext.Provider value={{userData, loading, setUserData}}>
      <Header />
          <Switch>
            <Route path = "/dashboard">
              <Dashboard />
            </Route>
            <Route path = "/login">
              <Login />
            </Route>
            <Route path = "/">
              <Login />
            </Route>
          </Switch>
      </UserContext.Provider>
    </BrowserRouter>

    </>
  );

}


