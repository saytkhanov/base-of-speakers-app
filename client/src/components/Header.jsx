import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton, Paper,
  Toolbar,
  Typography,
} from '@material-ui/core'
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Categories from "./categories/Categories";

import { useDispatch, useSelector } from "react-redux";
import { tokenRemove } from "../redux/features/speakers";

import Grid from '@material-ui/core/Grid'
import React from 'react'
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic';


const useStyles = makeStyles((theme) => ({
  nav: {
    '&:hover': {
      color: "rgba(0,0,0, 0.3)",
      textDecoration: 'none'
    }
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
    width: 50,
    height: 50
  },
  title: {
    flexGrow: 1,
  },
  navLink: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    '&:hover': {
      color: "rgba(255,255,255, 0.8)",
      textDecoration: 'none'
    }
  }
}));

function Header(props) {
  const classes = useStyles();

  const token = useSelector((state) => state.speakers.token);
  const dispatch = useDispatch();
  return (
    <>
    <AppBar position="fixed" style={{backgroundColor: 'black'}}>
      <Container fixed >
        <Toolbar style={{height: 100}}>
          <HeadsetMicIcon
            edge="start"
            className={classes.menuButton}
            color="secondary"
            aria-label="menu"
          >
            <MenuIcon />
          </HeadsetMicIcon>
          <Typography className={classes.title} variant="h6">
            <NavLink className={classes.navLink} to="/">Base of Speakers</NavLink>
          </Typography>
          <Categories />
          <Box mr={4}>
            <Button style={{backgroundColor: 'white'}} variant="contained">
              <NavLink style={{fontWeight: 'bold', color: 'black', textDecoration: 'none'}}  to="/login">
                Log In
              </NavLink>
            </Button>
          </Box>
        {token ? (
              <Box mr={3}>
                <NavLink to="/profile">
                  <Button color="secondary" variant="contained">
                    Личный кабинет
                  </Button>
                </NavLink>
              </Box>
            ) : null}
              {token ? (
              <Box mr={3}>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => dispatch(tokenRemove())}
                >
                  <NavLink to="/">Выйти</NavLink>
                </Button>
              </Box>
            ) : (
          <Button color="secondary" variant="contained">
            <NavLink  style={{fontWeight: 'bold', color: 'white', textDecoration: 'none'}}  to="/auth">
              Sign Up
            </NavLink>
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
      <Toolbar/>
    </>

  );
}

export default Header;
