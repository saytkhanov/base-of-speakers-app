import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  makeStyles,
  Paper,
  alpha,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Fuse from "fuse.js";

import Box from "@material-ui/core/Box";
import { loadCategories } from "../../redux/features/categories";
import Search from "./Search";
import AllSpeakers from "./AllSpeakers";
import { getSpeakers } from "../../redux/features/speakers";
import Footer from '../Footer'
import Preloader from '../Preloader'

const useStyles = makeStyles((theme) => ({
  mainFeaturesPost: {
    position: "relative",
    color: theme.palette.common.white,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  mainFeaturesPostContent: {
    position: "relative",
    width: "100%",
    padding: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.1)",
  },
  root: {
    color: "white",
    textAlign: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "white",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    color: "white",
    [theme.breakpoints.up("sm")]: {
      width: "16ch",
      "&:focus": {
        width: "18ch",
      },
    },
  },
}));

function CategoryAndSearchHeader(props) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [gender, setGender] = useState();
  const speakers = useSelector((state) => state.speakers.items);
  const loading = useSelector(state => state.speakers.loading)

  useEffect(() => {
    dispatch(getSpeakers())
  }, [dispatch]);

  const classes = useStyles();

  const fuse = new Fuse(speakers, {
    keys: ["firstName", "lastName"],
    includeScore: true,
  });

  const handleOnSearch = (ev) => {
    setQuery(ev.target.value);
  };

  const results = fuse.search(query);

  const speakersResults = query
    ? results.map((result) => result.item)
    : speakers;
  //


  return (
    <>
      <Paper
        className={classes.mainFeaturesPost}
        style={{
          backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_dym_zatemnennyj_117667_1920x1080.jpg)`,
        }}
      >
        <Container fixed>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={12}>
              <Box style={{ marginTop: 60, textAlign: "center" }}>
                <Typography className={{ root: classes.root }} variant={"h4"}>
                  Мы подберём для вас наилучший вариант
                </Typography>
              </Box>
            </Grid>
            <Grid item={6}>
              <div className={classes.mainFeaturesPostContent}>
                <Box style={{ display: "flex" }}>
                  <Button
                    style={{ fontWeight: "bold", marginRight: 20 }}
                    variant="contained"
                    color="secondary"
                    onClick={() => setGender()}
                  >
                    Все
                  </Button>
                      <Box mr={3}>
                        <Button
                          style={{ fontWeight: "bold" }}
                          variant="contained"
                          color="secondary"
                          onClick={() => setGender("Мужской")}
                        >
                          Мужской
                        </Button>
                      </Box>
                  <Box mr={3}>
                    <Button
                      style={{ fontWeight: "bold" }}
                      variant="contained"
                      color="secondary"
                      onClick={() => setGender("Женский")}
                    >
                      Женский
                    </Button>
                  </Box>
                  <Button
                    style={{ fontWeight: "bold", marginRight: 20 }}
                    variant="contained"
                    color="secondary"
                  >
                    Цены
                  </Button>
                </Box>
              </div>
            </Grid>
            <Grid item={6}>
              <Search handleOnSearch={handleOnSearch} />
            </Grid>
          </Grid>
        </Container>
      </Paper>

      <AllSpeakers speakersResults={speakersResults} gender={gender}  />
    </>
  );
}

export default CategoryAndSearchHeader;
