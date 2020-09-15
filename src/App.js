import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import LogIn from "./components/auth/Login";
import Forgot from "./components/auth/Forgot";
import ForgotLogin from "./components/auth/ForgotLogin";
import Landing from "./components/home/Landing";
import Navbar from "./components/layout/Navbar";

// Redux

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./actions/auth";
import ProjectPage from "./components/Swatch page/ProjectPage";

function App() {
  const [login, openLogin] = useState(false);
  const [register, openRegister] = useState(false);
  const [forgot, openForgot] = useState(false);
  const [forgotLogin, openForgotLogin] = useState(false);

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar openLogin={openLogin} openRegister={openRegister} />
          {login && <LogIn openLogin={openLogin} forgot={openForgot} />}
          {register && (
            <Register openLogin={openLogin} openRegister={openRegister} />
          )}
          {forgot && (
            <Forgot
              openLogin={openLogin}
              openForgot={openForgot}
              openForgotLogin={openForgotLogin}
            />
          )}
          {forgotLogin && <ForgotLogin openForgotLogin={openForgotLogin} />}
          <Switch>
            <Route
              exact
              path='/'
              render={props => <Landing {...props} openLogin={openLogin} />}
            />
            <PrivateRoute exact path='/profile' component={ProjectPage} />
          </Switch>
          {/* <Navbar openLogin={openLogin} openRegister={openRegister} /> */}
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
