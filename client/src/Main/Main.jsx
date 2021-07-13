import React, { useState } from 'react'
import { Container} from '@material-ui/core'
import { Switch,Route, Redirect } from 'react-router-dom'
import AuthPage from '../pages/AuthPage';
import LoginPage from '../pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import PersonalArea from '../pages/PersonalArea'

function Main (props) {

  const token = useSelector(state => state.speakers.token);
  // const tokenn = useSelector(state => state.speakers.token)
  // console.log(tokenn.id)
if(!token) {
  return (
    <Container>
      <Switch>
        <Route path='/auth' exact >
          <AuthPage/>
        </Route>
        <Route path='/login' >
          <LoginPage/>
        </Route>
        <Redirect to='/auth'/>
      </Switch>
    </Container>
  )
}

  return (
    <Container>
      <Switch>
        <Route path='/' exact>
          <PersonalArea/>
        </Route>
        <Route path='/auth' >
          <AuthPage/>
        </Route>
        <Route path='/login' >
          <LoginPage/>
        </Route>
        <Redirect to='/speaker/:id'/>
      </Switch>
    </Container>
  )
}

export default Main