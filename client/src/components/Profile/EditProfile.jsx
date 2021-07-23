import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patchSpeaker, speakerById, uploadAvatar } from '../../redux/features/speakers'
import styled from 'styled-components';
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Fab, IconButton, TextField, Typography } from '@material-ui/core'
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import { getVoiceById, getVoiceByIdForAuth, getVoices } from '../../redux/features/voices'
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
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
  }
}));
const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
      color: white;
    }
  }
.MuiOutlinedInput-root {
  fieldset {
    border-color: white;
  }
  &:hover fieldset {
    border-color: #f50057;
  }
  &.Mui-focused fieldset {
    border-color: #f50057;
  }
`;

const StyledTextFieldForInfo = styled(TextField)`
.MuiInputBase-root {
  height: 25px;
  color: white;
}
  .MuiOutlinedInput-root {
    fieldset {
      border-color: white;
    }
    &:hover fieldset {
      border-color: #f50057;
    }
    &.Mui-focused fieldset {
      border-color: #f50057;
    }
`

function Profile({ setIsEditing }) {
  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector((state) => state.voices.items);

  useEffect(() => {
    dispatch(getVoiceByIdForAuth());
  }, [dispatch]);

  useEffect(() => {
    dispatch(speakerById());
  }, [dispatch]);

  const [firstName, setFirstName] = useState(speaker.firstName);
  const [lastName, setLastName] = useState(speaker.lastName);
  const [description, setDescription] = useState(speaker.description);
  const [cost, setCost] = useState(speaker.cost);

  const handleChangeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleChangeLastName = (e) => {
    setLastName(e.target.value)
  }

  const handleChangeCost = (e) => {
    setCost(e.target.value);
  };

  function handleChangeAvatar(e) {
    const file = e.target.files[0];
    dispatch(uploadAvatar(file));
  }

  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleEdit = () => {
    dispatch(patchSpeaker({ firstName, lastName, cost, description }));

    setIsEditing(false);
  };
  const classes = useStyles();

  return (
    <div className="container-fluid">
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
          <div style={{marginTop: 13, display: 'flex', justifyContent: 'space-between'}}>
          <StyledTextFieldForInfo
            style={{width: 180, marginBottom: 10, marginRight: 10}}
            variant={"outlined"}
            margin="normal"
            multiline
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={firstName}
            onChange={handleChangeFirstName}
          />
          <StyledTextFieldForInfo
            style={{width: 180}}
            variant={"outlined"}
            margin="normal"
            multiline
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={lastName}
            onChange={handleChangeLastName}
          />
            <Fab
              style={{ backgroundColor: "black", color: "white" }}
              aria-label="edit"
              onClick={handleEdit}
              // disabled={editing}
            >
              <SaveIcon />
            </Fab>
          </div>
          <div style={{marginTop: 80, display: 'flex',alignItems: 'center'}}>
            <Typography style={{ color: "white", fontSize: 22}}>
              Цена: от
            </Typography>
              <StyledTextFieldForInfo
                style={{marginLeft: 10, marginRight: 10, width: 70}}
                variant={"outlined"}
                margin="normal"
                multiline
                fullWidth
                value={cost}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={handleChangeCost}
              /> <span style={{marginTop:  4, fontSize: 18}}>₽</span>
          </div>
        </div>
        {/* <Button>
             <EditIcon />
          </Button> */}
      </div>
      <div className="row">
        <div className="col-4" style={{flex: 0}}></div>
        <div className="col-8" style={{marginLeft: 220}}>
          {/*<input*/}
          {/*  style={{width: 180}}*/}
          {/*  type="text"*/}
          {/*  className="form-control"*/}
          {/*  name="description"*/}
          {/*  value={description}*/}
          {/*  aria-describedby="basic-addon1"*/}
          {/*  onChange={handleChangeLastName}*/}
          {/*/>*/}
          <StyledTextField
            value={description}
            variant={"outlined"}
            margin="normal"
            multiline
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChangeDescription}
          />
        </div>
      </div>
      {voices.map((voice) => {
        return (
          <div style={{ marginLeft: 300, marginTop: 30 }}>
            <audio className={classes.audio} src={voice.audio} controls></audio>
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
