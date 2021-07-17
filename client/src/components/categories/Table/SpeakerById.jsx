import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSpeakerByIdFromParams } from "../../../redux/features/speakers";
import Box from "@material-ui/core/Box";
import {
  Avatar, Button,
  makeStyles,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getVoices } from "../../../redux/features/voices";
import Footer from "./Footer";

const useStyles = makeStyles((theme) => ({
  audio: {
    height: 30,
    width: "60%",
    marginTop: 10,
    "&::-webkit-media-controls-panel": {
      backgroundColor: "#f50057",
    },
    "&::-webkit-media-controls-current-time-display": {
      color: "white",
    },
  },
  avatar: {
    width: 200,
    height: 200,
    border: "1px #f50057 solid",
  },
  speakerInfo: {
    width: "100%",
  },
  description: {
    width: "50%",
    marginLeft: "5%",
  },
  voicesBlock: {
    textAlign: "center",
    width: "80%",
    margin: "auto"
  },
  cost: {
    margin: "auto",
    marginTop: "5%",
    paddingBottom: "3%"
  }
}));

function SpeakerById(props) {
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector((state) => state.voices.items);

  useEffect(() => dispatch(getSpeakerByIdFromParams(id)), [dispatch]);
  useEffect(() => dispatch(getVoices()), [dispatch]);

  console.log(speaker)

  return (
    <>
      <Box style={{ height: 20, backgroundColor: "black" }} />
      <div
        style={{
          width: "100%",
          backgroundColor: "#052040",
          backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_dym_zatemnennyj_117667_1920x1080.jpg)`,
        }}
      >
        <Container fixed>
          <Grid container>
            <Grid item md={12}>
              <Grid
                classes={{ root: classes.speakerInfo }}
                container
                style={{ marginTop: 50 }}
              >
                <Grid item>
                  <Avatar
                    classes={{ root: classes.avatar }}
                    src={speaker.avatar}
                    variant="square"
                    className={classes.square}
                  />
                </Grid>
                <Grid
                  classes={{ root: classes.description }}
                  item
                  style={{ textAlign: "left" }}
                >
                  <Typography
                    classes={{ root: classes.firstName }}
                    variant="h5"
                    style={{ color: "white" }}
                  >
                    {speaker.firstName} {speaker.lastName}
                  </Typography>
                  <Typography
                      classes={{ root: classes.firstName }}
                      variant="h6"
                      style={{ color: "white" }}
                  >
                    Возраст: 24
                  </Typography>
                  <Typography variant={"h6"} style={{ color: "white" }}>
                    {speaker.description}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "5%"}}>
              {voices.map(voice => {
                if (voice?.speaker === id) {
                  return(
                      <TableCell classes={{root: classes.voicesBlock}}>
                        <audio
                            className={classes.audio}
                            src={voice?.audio}
                            controls
                        />
                      </TableCell>
                  )
                }
              })}
            </Grid>
            <Grid classes={{root: classes.cost}}>
              <Typography variant={"h6"} style={{ color: "white" }}>Цена: {speaker.cost}</Typography>
              <Button color={"secondary"} variant={"contained"}>Заказать</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
      <Footer/>
    </>
  );
}

export default SpeakerById;
