import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { speakerById } from "../redux/features/speakers";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MicIcon from "@material-ui/icons/Mic";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Avatar, Container } from "@material-ui/core";
import { Button } from "@material-ui/core";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  dataWidth: {
    width: 400,
    display: "flex",
    justifyContent: "space-between",
  },
}));

function Profile() {
  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);

  useEffect(() => {
    dispatch(speakerById());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List>
            {["Личные данные", "Аудиозаписи"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <AccountCircleIcon /> : <MicIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </div>
      </div>
      <div className={classes.content}>
        <Container>
          <div className={classes.dataWidth}>
            <Avatar />

            <h2>
              {" "}
              {speaker.firstName} {}
              {speaker.lastName}
            </h2>
            {/* <Button>
              <EditIcon />
            </Button> */}
          </div>

          <p>Телефон</p>
          <div style={{ display: "flex" }}>
            <p>Не указан</p>
            <Button color="primary">Добавить</Button>
            <div></div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Profile;
