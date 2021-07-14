import React, { useState } from 'react'
import { Container} from '@material-ui/core'
import { Switch,Route, Redirect } from 'react-router-dom'
import AuthPage from '../pages/AuthPage';
import LoginPage from '../pages/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import HomePage from '../pages/HomePage'

function Main (props) {

  const token = useSelector(state => state.speakers.token);
  // const tokenn = useSelector(state => state.speakers.token)
  // console.log(tokenn.id)
if(!token) {
  return (
    <Container>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>
        <Route path='/auth' >
          <AuthPage/>
        </Route>
        <Route path='/login' >
          <LoginPage/>
        </Route>
        <Redirect to='/'/>
      </Switch>
    </Container>
  )
}

  return (
    <main>
      <Switch>
        <Route path='/' exact>
          <HomePage/>
        </Route>
        <Route path='/auth' >
          <AuthPage/>
        </Route>
        <Route path='/login' >
          <LoginPage/>
        </Route>
        <Redirect to='/speaker'/>
      </Switch>
    </main>
  )
}

export default Main