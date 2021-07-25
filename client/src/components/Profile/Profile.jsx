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
import Container from '@material-ui/core/Container'
import styled from 'styled-components'
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
const drawerWidth = 240

const muiTheme = createMuiTheme({});

const useStyless = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: 'inherit',
      height: 0,
      marginTop: 10,
      // marginLeft: 1,
      width: 400,
      lineHeight: '3px'
    },
    loopIcon: {
      color: '#f50057',
      '&.selected': {
        color: '#f50057',
      },
      '&:hover': {
        color: 'white',
      },
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    playIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'white',
      },
    },
    replayIcon: {
      color: '#f50057',
    },
    pauseIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'white',
      },
    },
    volumeIcon: {
      color: '#f50057',
      '&:hover': {
        color: 'white',
      },
    },
    volumeSlider: {
      color: '#f50057',
    },
    progressTime: {
      color: '#f50057',
    },
    mainSlider: {
      color: '#f50057',
      '& .MuiSlider-rail': {
        color: 'white',
      },
      '& .MuiSlider-track': {
        color: '#f50057',
      },
      '& .MuiSlider-thumb': {
        color: '#f50057',
      },
    },
  };
});


const useStyles = makeStyles((theme) => ({
  class: {
    color: '#f50057',
    backgroundColor: 'inherit',
    '&:hover': {
      color: 'white',
    }
  },
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
  title: {
    display:'flex',
    fontSize: 20,
    margin: "auto",
    width: "100%",
    justifyContent: "space-around",
    cursor: 'pointer'
  },
  audio: {
    backgroundColor: "black",
    height: 30,
    marginTop: 30,
    "&::-webkit-media-controls-panel": {
      backgroundColor: "#f50057",
    },
    "&::-webkit-media-controls-current-time-display": {
      color: "white",
    },
  },
  cost: {
    textAlign: "center",
    paddingTop: 20
  }
}));


function Profile({ setIsEditing }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const speaker = useSelector((state) => state.speakers.currentItem);
  const voices = useSelector((state) => state.voices.items);
  const [openForm, setOpenForm] = useState(false)
  const deleting = useSelector(state => state.voices.deleting)
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

  console.log(deleting)

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
          <div style={{marginTop: 10,display: 'flex', justifyContent: 'space-between'}}>
          <h2 style={{ color: "white" }}>
            {" "}
            {speaker.firstName} {}
            {speaker.lastName}
          </h2>
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
        <Typography style={{ color: "white", marginLeft: 250, marginTop: 40, fontSize: 20 }}>
          {speaker.description}
        </Typography>
      </div>
      <Grid classes={{ root: classes.cost }}>
        <Button
          onClick={() => setOpenForm(true)}
          color={"secondary"}
          style={{marginLeft: 80}}
          variant={"contained"}
        >
          Добавить запись
        </Button>
      </Grid>
      <Container classes={{ root: classes.cost }}>
        {openForm ? (
          <form>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Введите тему записи"
                aria-label="Тема"
                name="Тема"
                aria-describedby="basic-addon1"
               onChange={handleChangeTitle}
              />
            </div>
            <input type="file" onChange={handleChangeVoice} />
            <div class="form-group">
              <button
                class="btn btn-primary btn-sm"
                type="button"
                onClick={handleAdd}
              >
                {" "}
                Добавить запись{" "}
              </button>
              <button
                onClick={() => setOpenForm(false)}
                class="btn btn-primary btn-sm"
                type="button"
              >
                {" "}
                Закрыть
              </button>
            </div>
          </form>
        ) : null}
      </Container>
      {voices.map((voice) => {
        return (
          <div style={{ marginLeft: 300, marginTop: 30 }} >
            <div className={classes.title}>
              <div>{"<"}</div>
              <div>{voice.title}</div>
              <div>{">"}</div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", width: 600}}>
              <div>
                <audio className={classes.audio} src={voice.audio} controls />
              </div>
              <div style={{lineHeight: 7}}>
                <Fab
                  style={{
                    backgroundColor: "#4c4dc3",

                    color: "white",
                  }}
                  disabled={deleting}
                  aria-label="edit"
                  onClick={() => dispatch(deleteVoice(voice._id))}
                >
                  <DeleteIcon />
                </Fab>
              </div>
            </div>
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
