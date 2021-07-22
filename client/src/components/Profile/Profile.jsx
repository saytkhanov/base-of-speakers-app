import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { speakerById, uploadAvatar } from "../../redux/features/speakers";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Fab, IconButton, TextField, Typography } from '@material-ui/core'
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import EditIcon from "@material-ui/icons/Edit";
import {
  addVoice,
  deleteVoice,
  getVoiceById, getVoiceByIdForAuth,
  getVoices,
  uploadVoice,
} from '../../redux/features/voices'
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import { PhotoCamera } from '@material-ui/icons'
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
  account: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  avatar: {
    width: '120px',
    height: '120px',
  },
  avatarWrapper: {

    display: 'inline-block',
    padding: '10px',
    borderRadius: '50%',
    position: 'relative',
  },
  avatarButton: {
    opacity: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '200px',
    position: 'absolute',
    top: '10px',
    transition: '300ms',
    backgroundColor: 'rgba(0,0,0,0.45)',
    '&:hover': {
      opacity: 1,
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: '120px',
    height: '120px',
    color: 'whitesmoke',
  },
  subtitle: {
    fontSize: '12px',
    textAlign: 'center',
    padding: '10px 50px',
    color: '#6a6a6a',
    marginBottom: '100px',
  },
  input: {
    display: 'none',
  },
}));

function Profile({ setIsEditing }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector((state) => state.voices.items);
  useEffect(() => {
    dispatch(getVoiceByIdForAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(speakerById());
  }, [dispatch]);

  const classes = useStyles();

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleChangeVoice = async (e) => {
    await dispatch(uploadVoice(e));
  };

  const handleAdd = async () => {
    await dispatch(addVoice({ title, description }));
  };

  // const handleUploadVoice = (e) => {
  //   const file = e.target.files[0];
  //   const fileName = e.target.files[0].name;
  //   dispatch(uploadVoice(file, fileName));
  // };

  return (
    <div className="container">
      <div className="row">
        <div className="col-4" style={{flex: 0}}>
          <div className={classes.account}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              type="file"
              onChange={handleChangeAvatar}
            />

            <div className={classes.avatarWrapper}>
              <Grid className={classes.picture}>
                <img style={{width: 200, height: 200}} src={speaker.avatar} alt="" />
              </Grid>
              <div className={classes.avatarButton}>
                <label htmlFor="icon-button-file">
                  <IconButton
                    color="default"
                    aria-label="upload picture"
                    component="span"
                    className={classes.button}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="col-8">
          <div style={{marginTop: 10}}>
          <h2 style={{ color: "white" }}>
            {" "}
            {speaker.firstName} {}
            {speaker.lastName}
          </h2>
          </div>
          <div>
            <Typography style={{ color: "white", fontSize: 25, marginTop: 120 }}>
              Цена: от {speaker.cost} ₽
            </Typography>
          </div>
        </div>
        {/* <Button>
             <EditIcon />
          </Button> */}
      </div>
      <div>
        <Typography style={{ color: "white", marginLeft: 230, fontSize: 20 }}>
          {speaker.description}
        </Typography>
      </div>
      <div>
        <TextField onChange={handleChangeDescription} />
        <TextField onChange={handleChangeTitle} />
        <input type="file" onChange={handleChangeVoice} />
        <Button onClick={handleAdd}>Добавить</Button>
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
