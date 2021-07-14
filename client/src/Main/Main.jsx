
import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import LoginPage from "../pages/LoginPage";
import Profile from "../Profile/Profile";
import { useDispatch, useSelector } from "react-redux";
import HomePage from "../pages/HomePage";
import SpeakersByCategory from "../components/categories/SpeakersByCategory";
import AllSpeakers from "../components/allSpeakers/AllSpeakers";


function Main(props) {
  const token = useSelector((state) => state.speakers.token);
  // const tokenn = useSelector(state => state.speakers.token)
  // console.log(tokenn.id)
  if (!token) {
    return (
      <Container>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/auth" exact>
            <AuthPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>
    );
  }

  return (
    <Container>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
        <Route path="/category/:id/speakers">
          <SpeakersByCategory />
        </Route>
        <Route>
          <AllSpeakers/>
        </Route>
     <Redirect to="/speaker" />
      </Switch>
    </Container>
  );
}

export default Main;
