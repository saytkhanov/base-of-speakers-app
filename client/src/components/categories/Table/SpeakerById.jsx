import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSpeakerByIdFromParams } from "../../../redux/features/speakers";
import Box from "@material-ui/core/Box";
import {
  Avatar,
  Button,
  makeStyles,
  TableCell,
  Typography,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import { getVoices } from "../../../redux/features/voices";
import Footer from "../../Footer";
import { addReview, loadReviews } from "../../../redux/features/reviews";
import { addRating, loadRatings } from "../../../redux/features/ratings";
import Preloader from "../Preloader";


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
    margin: "auto",
    marginTop: "5%",
    paddingBottom: "3%",
  },
  reviews: {
    width: 500,
    height: 200,
    backgroundColor: "white",
    borderRadius: "5px ",
    margin: "auto",
    marginBottom: 20,
  },
}));

function SpeakerById(props) {
  const classes = useStyles();

  const { id } = useParams();

  const dispatch = useDispatch();
  const speaker = useSelector((state) => state.speakers.items);
  const voices = useSelector((state) => state.voices.items);
  const loading = useSelector(state => state.speakers.loading)
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
  const handleaddRating = (ev) => {
    dispatch(addRating(id, rating));
    console.log(ev.target.value);
  };

  const handleAddReview = () => {
    dispatch(addReview(id, form));
    setOpenForm(false);
  };
  useEffect(() => dispatch(getSpeakerByIdFromParams(id)), [dispatch]);
  useEffect(() => dispatch(getVoices()), [dispatch]);
  useEffect(() => dispatch(loadReviews()), [dispatch]);
  useEffect(() => dispatch(loadRatings()), [dispatch]);

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
                  {Preloader(loading)}
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
                <Grid classes={{ root: classes.cost }}>
                  <Typography variant={"h6"} style={{ color: "white" }}>
                    Рейтинг: {fixRating}
                  </Typography>
                  <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                      name="simple-controlled"
                      value={fixRating}
                      precision={0.5}
                      emptyIcon={<StarBorderIcon fontSize="inherit" />}
                      onChange={handleChange}
                      onClick={handleaddRating}
                    />
                  </Box>
                </Grid>
                <Grid classes={{ root: classes.cost }}>
                  <Typography variant={"h6"} style={{ color: "white" }}>
                    Цена: {speaker.cost}
                  </Typography>
                  <Button color={"secondary"} variant={"contained"}>
                    Заказать
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid container style={{ marginTop: "5%" }}>
              {voices.map((voice) => {
                if (voice?.speaker === id) {
                  return (
                    <TableCell classes={{ root: classes.voicesBlock }}>
                      <audio
                        className={classes.audio}
                        src={voice?.audio}
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
                Оставьте отзыв
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
                  <div class="form-group">
                    <button
                      onClick={handleAddReview}
                      class="btn btn-primary btn-sm"
                      type="button"
                    >
                      {" "}
                      Добавить комментарий{" "}
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
            <div style={{ margin: "auto" }}>
              {reviews.map((review) => {
                return (
                  <div className={classes.reviews}>
                    <div style={{ marginLeft: 30 }}>
                      <FormatQuoteIcon />
                      <p>{review.text}</p>
                      <div style={{ display: "flex" }}>
                        <Avatar /> <p>{review.username}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Grid>
        </Container>
      </div>
      <Footer />
    </>
  );
}

export default SpeakerById;
