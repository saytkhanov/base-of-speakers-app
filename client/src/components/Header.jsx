import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import Categories from "./categories/Categories";
import { useDispatch, useSelector } from "react-redux";
import { tokenRemove } from "../redux/features/speakers";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header(props) {
  const classes = useStyles();

  const token = useSelector((state) => state.speakers.token);
  const dispatch = useDispatch();
  return (
    
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6">
              <NavLink to="/">Base of Speakers</NavLink>
            </Typography>
            <Categories />
            <Box mr={3}>
              <Button color="inherit" variant="outlined">
                <NavLink to="/login">Log In</NavLink>
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
              <Box mr={3}>
                <NavLink to="/auth">
                  <Button color="secondary" variant="contained">
                    Sign Up
                  </Button>
                </NavLink>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
     
  );
}

export default Header;
