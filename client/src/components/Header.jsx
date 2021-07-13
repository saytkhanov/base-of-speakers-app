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
  return (
    <>
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
          <NavLink to="/auth">
            <Button color="secondary" variant="contained">
              Sign Up
            </Button>
          </NavLink>
        </Toolbar>
      </Container>
    </AppBar>
    <Toolbar/>
    </>
  );
}

export default Header;
