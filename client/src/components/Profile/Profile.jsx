import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { speakerById, uploadAvatar } from "../../redux/features/speakers";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Fab, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import {
  deleteVoice,
  getVoices,
  uploadVoice,
} from "../../redux/features/voices";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
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
  audio: {
    height: 50,
    marginTop: 30,
    width: 500,
    "&::-webkit-media-controls-panel": {
      backgroundColor: "#f50057",
    },
    "&::-webkit-media-controls-current-time-display": {
      color: "white",
    },
  },
  add: {
    position: "fixed",
    bottom: 30,
    right: 300,
  },
  edit: {
    position: "fixed",
    bottom: 30,
  },
  hover: {},
}));

function Profile({ setIsEditing }) {
  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector((state) => state.voices.items);

  useEffect(() => {
    dispatch(getVoices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(speakerById());
  }, [dispatch]);

  const classes = useStyles();


  function changeHandler(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  const handleUploadVoice = (e) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    dispatch(uploadVoice(file, fileName));
  };


  return (
    <div className={classes.content}>
      <div className={classes.dataWidth}>
        <form>
          <Avatar
            src={speaker.avatar}
            style={{
              width: 200,
              height: 200,
              borderRadius: 0,
              marginRight: 30,
            }}
          />
          <input
            accept="image/*"
            onChange={(e) => changeHandler(e)}
            type="file"
            placeholder="Загрузить аватар"
          />
          {/*<Button onClick={handleAdd}>UP</Button>*/}
        </form>
        <Box>
          <h2 style={{ color: "white" }}>
            {" "}
            {speaker.firstName} {}
            {speaker.lastName}
          </h2>
          <Box>
            <Typography style={{ color: "white", fontSize: 25, marginTop: 90 }}>
              Цена: от {speaker.cost} ₽
            </Typography>
          </Box>
        </Box>
        {/* <Button>
             <EditIcon />
          </Button> */}
      </div>
      <div>
        <Typography style={{ color: "white", marginLeft: 230, fontSize: 20 }}>
          {speaker.description}
        </Typography>
      </div>
      {voices.map((voice) => {
        return (
          <div style={{ marginLeft: 300, marginTop: 30 }}>
            <audio className={classes.audio} src={voice.audio} controls />
            <Fab
              style={{
                backgroundColor: "#4c4dc3",

                color: "white",
              }}
              aria-label="edit"
              onClick={() => dispatch(deleteVoice(voice._id))}
            >
              <DeleteIcon />
            </Fab>
          </div>
        );
      })}
      <form>
        <input type="file" onChange={(e) => handleUploadVoice(e)} />
      </form>
      <Grid item classes={{ root: classes.add }}>
        <Fab
          style={{ backgroundColor: "black", color: "white" }}
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Grid>
      <Grid item classes={{ root: classes.edit }}>
        <Fab
          style={{
            backgroundColor: "black",

            color: "white",
          }}
          aria-label="edit"
          onClick={() => setIsEditing(true)}
        >
          <EditIcon />
        </Fab>
      </Grid>
      {/*<p>Телефон</p>*/}
      {/*<div style={{ display: "flex" }}>*/}
      {/*  <p>Не указан</p>*/}
      {/*  <Button color="primary">Добавить</Button>*/}
      {/*  <div></div>*/}
      {/*</div>*/}
    </div>
  );
}

export default Profile;
