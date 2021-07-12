import React from 'react'
import { Container} from '@material-ui/core'
import { Switch,Route } from 'react-router-dom'
import AuthPage from '../pages/AuthPage';
import LoginPage from '../pages/LoginPage'

function Main (props) {
  return (
    <Container>
      <Switch>
        <Route path='/auth' exact>
          <AuthPage/>
        </Route>
        <Route path='/login' exact>
          <LoginPage/>
        </Route>
      </Switch>
    </Container>
  )
}

export default Main