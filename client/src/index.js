import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";

import App from "./App";
import BookingPage from "./components/BookingPage";
import Header from "./components/Header";
import AddMovie from './components/AddMovie';
import UpdateMovie from './components/UpdateMovie'
import DeleteMovie from './components/DeleteMovie'

import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";

const history = createBrowserHistory();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Header />
      <main>
        <Switch>
          <Route path="/add-movie">
            <AddMovie />
          </Route>
          <Route path="/booking-page/:movieId">
            <BookingPage />
          </Route>
          <Route path="/update-movie/:movieId">
            <UpdateMovie />
          </Route>
          <Route path="/delete-movie/:movieId">
            <DeleteMovie />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </main>
    </Router>
  </React.StrictMode>,
  rootElement
);
