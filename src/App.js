import React, { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import LogIn from "./components/auth/Login";
import Landing from "./components/home/Landing";

// Redux

import { Provider } from "react-redux";
import store from "./store";
import PrivateRoute from "./components/routing/PrivateRoute";
import { loadUser } from "./actions/auth";
import Navbar from "./components/Navbar";
import axios from "axios";

function App() {
  useEffect(() => {
    // axios.get(`/users`).then(res => {
    //   const users = res.data;
    //   setUsers(users);
    // });

    axios
      .all([axios.get(`/palette`), axios.get(`/api/breeds/image/random`)])
      .then(
        axios.spread((user, dog) => {
          const users = user.data;

          const dogs = dog.data;

          console.log(users, dogs);
        })
      );
  }, []);

  const [login, openLogin] = useState(false);
  const [register, openRegister] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          {/* <Navbar openLogin={openLogin} openRegister={openRegister} /> */}
          <Route exact path='/' component={Landing} />
          {/* {login && <LogIn openLogin={openLogin} />} */}
          {register && <Register openRegister={openRegister} />}
          <Switch>
            {/* <Route exact path='/login' component={LogIn} />
            <Route exact path='/login' component={Register} /> */}
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
