import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import Profile from "../Profile/Profile";
import CategoryAndSearchHeader from "../categories/CategoryAndSearchHeader";
import SpeakerById from "../categories/Table/SpeakerById";
import Index from "../Profile/InfoIcons";
import Card from "../Card/Card";

function Main(props) {
  const token = useSelector((state) => state.speakers.token);
  // const tokenn = useSelector(state => state.speakers.token)
  // console.log(tokenn.id)
  if (!token) {
    return (
      <main>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/showAll">
            <CategoryAndSearchHeader />
          </Route>
          <Route path="/speaker/:id">
            <SpeakerById />
          </Route>
          <Route path="/payment">
            <Card/>
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    );
  }

  return (
    <main>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile">
          <Index />
        </Route>
        <Route path="/showAll">
          <CategoryAndSearchHeader />
        </Route>
        <Route path="/speaker/:id">
          <SpeakerById />
        </Route>
        <Route path="/payment">
          <Card/>
        </Route>
        <Redirect to="/profile" />
      </Switch>
    </main>
  );
}

export default Main;
