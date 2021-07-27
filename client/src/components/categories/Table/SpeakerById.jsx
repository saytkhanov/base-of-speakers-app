import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpeakerByIdFromParams } from "../../../redux/features/speakers";
import Box from "@material-ui/core/Box";
import {
  Avatar,
  Button,
  makeStyles, Paper,
  TableCell,
  Typography,
} from '@material-ui/core'
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import dayjs from "dayjs";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getVoiceById, getVoices } from '../../../redux/features/voices'
import Footer from "../../Footer";
import { addReview, loadReviews } from "../../../redux/features/reviews";
import { addRating, loadRatings } from "../../../redux/features/ratings";
import Preloader from "../../Preloader";
import {  NavLink } from 'react-router-dom'

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
    margin: "auto",
  },
  cost: {
    margin: "0px",
    marginTop: "40px",
    paddingBottom: "0px",
  },
  reviews: {
    width: 500,
    height: 200,
    backgroundColor: "white",
    borderRadius: "5px ",
    margin: "auto",
    marginBottom: 20,
  },
  navlink: {
    color: "white",
    '&:hover': {
      textDecoration: 'none',
      color: "rgba(255,255,255, 0.7)",
    }
  },
}));

function SpeakerById(props) {
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.currentItem);
  const voices = useSelector((state) => state.voices.items);
  const loading = useSelector((state) => state.speakers.loading);
  const reviews = useSelector((state) =>
    state.reviews.items.filter((review) => review.speaker === id)
  );
  const ratings = useSelector((state) => {
    const getRatingBySpeakerId = state.ratings.items.filter(
      (item) => item.speaker === id
    );

    if (getRatingBySpeakerId.length === 0) {
      return 0;
    }
    return (
      getRatingBySpeakerId.reduce((value, item) => {
        if (!item.rating) {
          return 0;
        }
        return item.rating + value;
      }, 0) / getRatingBySpeakerId.length
    );
  });

  const fixRating = ratings.toFixed(1);

  const [openForm, setOpenForm] = useState(false);
  const [form, setForm] = useState({
    username: "",
    text: "",
  });
  const [rating, setRating] = useState({
    rating: 1,
  });

  const handleChange = (ev) => {
    setForm({ ...form, [ev.target.name]: ev.target.value });
    setRating({ ...rating, rating: ev.target.value });
  };
  const handleAddRating = (ev) => {
    dispatch(addRating(id, rating));
  };

  const handleAddReview = () => {
    dispatch(addReview(id, form));
    setOpenForm(false);
  };
  useEffect(() => dispatch(getSpeakerByIdFromParams(id)), [dispatch]);
  useEffect(() => dispatch(getVoiceById(id)), [dispatch]);
  useEffect(() => dispatch(loadReviews()), [dispatch]);
  useEffect(() => dispatch(loadRatings()), [dispatch]);

  if(loading) {
    return <Preloader/>
  }

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
                    style={{ color: "white", marginTop: 10 }}
                  >
                    Возраст: 24
                  </Typography>
                  <Typography variant={"h6"} style={{ color: "white", marginTop: 44 }}>
                    {speaker.description}
                  </Typography>
                </Grid>
                <div style={{marginLeft: 200}}>
                <Grid classes={{ root: classes.cost }}>
                  <div>
                  <Typography variant={"h6"} style={{ color: "white" }}>
                    Рейтинг: {fixRating}
                  </Typography>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="simple-controlled"
                      style={{color: "#f50057"}}
                      value={fixRating}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      onChange={handleChange}
                      onClick={handleAddRating}
                    />
                  </Box>
                  </div>
                </Grid>
                <Grid classes={{ root: classes.cost }}>
                  <Typography variant={"h6"} style={{ color: "white" }}>
                    Цена: {speaker.cost}
                  </Typography>
                  <NavLink className={classes.navlink} to='/payment'>
                  <Button color={"secondary"} variant={"contained"}>
                    Заказать
                  </Button>
                  </NavLink>
                </Grid>
                </div>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "5%" }}>
              {voices.map((voice) => {
                if (voice.speaker === id) {
                  return (
                    <TableCell classes={{ root: classes.voicesBlock }}>
                      <audio
                        className={classes.audio}
                        src={voice.audio}
                        controls
                      />
                    </TableCell>
                  );
                }
              })}
            </Grid>
            <Grid classes={{ root: classes.cost }}>
              <Button
                onClick={() => setOpenForm(true)}
                color={"secondary"}
                variant={"contained"}
              >
                Оставить отзыв
              </Button>
            </Grid>
            <Container classes={{ root: classes.cost }}>
              {openForm ? (
                <form>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">
                        @
                      </span>
                    </div>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      aria-label="Username"
                      name="username"
                      aria-describedby="basic-addon1"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="form-group">
                    <textarea
                      onChange={handleChange}
                      name="text"
                      placeholder="Коментарий"
                      class="form-control"
                    ></textarea>
                  </div>
                  <div class="form-group" style={{display: 'flex', justifyContent: 'space-between'}}>
                    <button
                      style={{backgroundColor: '#f50057',border: 0}}
                      onClick={handleAddReview}
                      class="btn btn-primary btn-sm"
                      type="button"
                    >
                      {" "}
                      Добавить комментарий{" "}
                    </button>
                    <button
                      style={{backgroundColor: '#f50057', border: 0}}
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
            <div style={{ margin: "auto", width: '100%' }}>
              <div style={{ padding: 14 }} className="App">
                <Typography variant="h3" style={{color: 'white'}}>Comments</Typography>
                <Paper style={{ padding: "40px 20px" }}>
              {reviews.map((review) => {
                return (
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h4 style={{ margin: 0, textAlign: "left" , color: "#f50057"}} c>{review.username}</h4>
                      <p style={{ textAlign: "left" }}>
                        {review.text}
                      </p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        {dayjs(review.createdAt).format("DD.MM.YY   HH:mm")}
                      </p>
                    </Grid>
                  </Grid>
                  // <div className={classes.reviews}>
                  //   <div style={{ marginLeft: 30 }}>
                  //     <FormatQuoteIcon />
                  //     <p>{review.text}</p>
                  //     <div style={{ display: "flex" }}>
                  //       <Avatar /> <p>{review.username}</p>
                  //     </div>
                  //   </div>
                  // </div>
                );
              })}
                </Paper>
              </div>
            </div>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default SpeakerById;
