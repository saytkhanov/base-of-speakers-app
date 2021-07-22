import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { speakerById } from "../../redux/features/speakers";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MicIcon from "@material-ui/icons/Mic";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Container,
  Paper,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Edit from "./Edit";
import { getVoiceById, getVoiceByIdForAuth, getVoices } from '../../redux/features/voices'
import Footer from "../Footer";
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
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturesPostContent: {
    position: "relative",
    padding: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  hover: {},
}));

function Profile() {
  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector((state) => state.voices.items);

  // useEffect(() => {
  //   dispatch(getVoiceByIdForAuth());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(speakerById());
  }, [dispatch]);

  const classes = useStyles();

  return (
    <Paper
      className={classes.mainFeaturesPost}
      style={{
        backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_oborudovanie_temnyj_fon_121814_1920x1080.jpg)`,
      }}
    >
      <Container fixed>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={12}>
            <div className={classes.mainFeaturesPostContent}>
              <div className={classes.root}>
                <Edit voices={voices} />
                <div
                  className={classes.drawer}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.drawerContainer}>
                    <List className={classes.hover}>
                      <ListItem button>
                        <ListItemText style={{ color: "white" }}>
                          Личные данные
                        </ListItemText>
                        <ListItemIcon style={{ color: "white" }}>
                          <AccountCircleIcon />
                        </ListItemIcon>
                      </ListItem>
                    </List>
                    <List className={classes.hover}>
                      <ListItem button>
                        <ListItemText style={{ color: "white" }}>
                          Аудиозаписи
                        </ListItemText>
                        <ListItemIcon style={{ color: "white" }}>
                          <MicIcon />
                        </ListItemIcon>
                      </ListItem>
                    </List>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Paper>
    // <div style={{width: '100%', height: 750, backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`}}>
    // <Container style={{marginTop: 30}}>
    //   <Paper style={{height: 750,backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`}}>
    // <div className={classes.root}>
    //   <div className={classes.content}>
    //       <div className={classes.dataWidth}>
    //         <Avatar style={{width: 200, height: 200, borderRadius: 0, marginRight: 30}}/>
    //         <Box>
    //         <h2 style={{color: 'white'}}>
    //           {" "}
    //           {speaker.firstName} {}
    //           {speaker.lastName}
    //         </h2>
    //           <Box>
    //             <Typography style={{color: 'white', fontSize: 25, marginTop: 90}}>
    //               Цена: от {speaker.cost} ₽
    //             </Typography>
    //           </Box>
    //         </Box>
    //         {/* <Button>
    //           <EditIcon />
    //         </Button> */}
    //       </div>
    //         <div>
    //           <Typography style={{color: 'white',marginTop: 110, marginLeft: 230, fontSize: 20}}>
    //             {speaker.description}
    //           </Typography>
    //         </div>
    //       {/*<p>Телефон</p>*/}
    //       {/*<div style={{ display: "flex" }}>*/}
    //       {/*  <p>Не указан</p>*/}
    //       {/*  <Button color="primary">Добавить</Button>*/}
    //       {/*  <div></div>*/}
    //       {/*</div>*/}
    //   </div>
    //   <div
    //     className={classes.drawer}
    //     classes={{
    //       paper: classes.drawerPaper,
    //     }}
    //   >
    //     <div className={classes.drawerContainer}>
    //       <List style={{backgroundColor: '#f50057'}}>
    //         {["Личные данные", "Аудиозаписи"].map((text, index) => (
    //           <ListItem button key={text}>
    //             <ListItemText style={{color: 'white'}} primary={text} />
    //             <ListItemIcon style={{color: 'white'}}>
    //               {index % 2 === 0 ? <AccountCircleIcon /> : <MicIcon />}
    //             </ListItemIcon>
    //           </ListItem>
    //         ))}
    //       </List>
    //     </div>
    //   </div>
    // </div>
    //   </Paper>
    // </Container>
    // </div>
  );
}

export default Profile;
