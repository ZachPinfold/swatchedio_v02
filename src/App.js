import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import LogIn from "./components/auth/Login";

// Redux

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";

function App() {
  return (
    <Provider store={store}>
      -
      <div className='App'>
        <LogIn />
        <Register />
      </div>
    </Provider>
  );
}

export default App;
