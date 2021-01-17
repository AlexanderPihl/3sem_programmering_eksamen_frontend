import React, { useState } from "react";
import "./style2.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import AllJokes from "./AllJokes";
import AllScrape from "./AllScrape";
import AdminCrudSport from "./AdminCRUDSport";
import AdminCrudTeam from "./AdminCRUDTeam";
import Login from "./Login";
import { Switch, Route, NavLink, useHistory } from "react-router-dom";

import AllSportAndTeam from "./AllSportAndTeam";

const Header = ({ isLoggedIn, loginMsg, isAdmin, loginName }) => {
  return (
    <>
      <Navbar bg="dark" variant="dark" id="header">
        <Navbar.Brand href="#home">Alexander Pihl</Navbar.Brand>
        <Nav className="mr-auto">
          <NavLink className="nav-link" exact activeClassName="selected" href="/" to="/">
            Home
        </NavLink>
          <NavLink className="nav-link" activeClassName="selected" to="/team">
            Sport, Teams and Coaches
        </NavLink>
          {isAdmin && (
            <>
              <li>
                <NavLink className="nav-link" activeClassName="selected" to="/admin">
                  Admin
            </NavLink>
              </li>
            </>
          )}
          <NavLink className="nav-link" activeClassName="selected" to="/login-out">
            {loginMsg}
          </NavLink>
          {isLoggedIn && (
            <>
              <li className="floatRight">
                <span>Logged in as {loginName}</span>
              </li>
            </>
          )}
        </Nav>

      </Navbar>
    </>
  );
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginName, setLoginName] = useState('');

  let history = useHistory();

  const setLoginStatus = (status, name) => {
    setIsLoggedIn(status);
    setLoginName(name);
    history.push("/");
  };

  const setAdminStatus = (status) => {
    setIsAdmin(status);
    history.push("/");
  };

  return (
    <div>
      <Header
        loginMsg={isLoggedIn ? "Logout" : "Login"}
        isLoggedIn={isLoggedIn}
        isAdmin={isAdmin}
        loginName={isLoggedIn ? loginName : ''}
      />

      <div className="content">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/team">
            <SportAndTeam />
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/login-out">
            <Login
              loginMsg={isLoggedIn ? "Logout" : "Login"}
              isLoggedIn={isLoggedIn}
              setLoginStatus={setLoginStatus}
              setAdminStatus={setAdminStatus}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div className="pageContent">
      <h1 class="text-center">Sport Club</h1>
      <h2 class="text-muted text-center">Welcome to the exclusive sport club</h2>
      <h5 class="text-center">Head over to the Sport, Teams and Coaches tab or login for more functionality</h5>

    </div>
  );
}

function SportAndTeam() {
  return (
    <div className="pageContent">
      <AllSportAndTeam />
    </div>
  );
}

function Admin() {
  return (
    <div className="pageContent">
      <AdminCrudSport />
      <br />
      <AdminCrudTeam />
    </div>
  );
}