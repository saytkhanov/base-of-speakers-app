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
import { Avatar, Container, Paper, Typography } from '@material-ui/core'
import { Button } from "@material-ui/core";
import Box from '@material-ui/core/Box'
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
    <div style={{width: '100%', height: 750, backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`}}>
    <Container style={{marginTop: 30}}>
      <Paper style={{height: 750,backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`}}>
    <div className={classes.root}>
      <div className={classes.content}>
          <div className={classes.dataWidth}>
            <Avatar style={{width: 200, height: 200, borderRadius: 0, marginRight: 30}}/>
            <Box>
            <h2 style={{color: 'white'}}>
              {" "}
              {speaker.firstName} {}
              {speaker.lastName}
            </h2>
            </Box>
            {/* <Button>
              <EditIcon />
            </Button> */}
          </div>
        <Box>
          <Typography style={{color: 'white', fontSize: 25}}>
            Цена: от {speaker.cost}
          </Typography>
          {speaker.description}
        </Box>
            <div>
            </div>
          {/*<p>Телефон</p>*/}
          {/*<div style={{ display: "flex" }}>*/}
          {/*  <p>Не указан</p>*/}
          {/*  <Button color="primary">Добавить</Button>*/}
          {/*  <div></div>*/}
          {/*</div>*/}
      </div>
      <div
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <List style={{backgroundColor: '#f50057'}}>
            {["Личные данные", "Аудиозаписи"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemText style={{color: 'white'}} primary={text} />
                <ListItemIcon style={{color: 'white'}}>
                  {index % 2 === 0 ? <AccountCircleIcon /> : <MicIcon />}
                </ListItemIcon>
              </ListItem>
            ))}
          </List>
        </div>
      </div>
    </div>
      </Paper>
    </Container>
    </div>
  );
}

export default Profile;
