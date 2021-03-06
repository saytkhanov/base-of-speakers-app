import React, { useEffect } from "react";
import { Box, Table, TableContainer, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers, loadSpeakerByCost } from "../../redux/features/speakers";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core";
import SpeakersBody from "./Table/SpeakersBody";
import Grid from "@material-ui/core/Grid";
import Preloader from "../Preloader";
import Footer from "../Footer";
import { loadRatingsBySort } from '../../redux/features/ratings'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "none",
    paddingLeft: 0,
    paddingRight: 0,
  },
}));

function AllSpeakers({ speakersResults, gender, SpeakerSortByRating }) {
  const classes = useStyles();

  const dispatch = useDispatch();

  const loading = useSelector((state) => state.speakers.loading);
  const costsBySpeakers = useSelector((state) => state.speakers.cost);
  const ratings = useSelector(state => state.ratings.items)
  useEffect(() => {
    dispatch(getSpeakers());
    dispatch(loadSpeakerByCost());
    dispatch(loadRatingsBySort())
  }, [dispatch]);
  console.log(speakersResults);
  const speakers = speakersResults.filter((item) => {
    if (!gender) return true;
    if (gender) return item.gender === gender;
  });

  return (
    <>
      <div style={{ height: 20, backgroundColor: "black" }}></div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#052040",
          backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_audio_elektroakustika_126145_1920x1080.jpg)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Container fixed>
          <Grid container>
            <Grid item md={12}>
              <Box style={{ marginTop: 20, textAlign: "left" }}>
                <Typography variant="h6" style={{ color: "white" }}>
                  Найдено дикторов:{" "}
                  {speakers.length}
                </Typography>
              </Box>
            </Grid>
            <TableContainer style={{ width: "100%" }}>
              <Table style={{ width: "100%" }}>
                {speakers.map((speaker) => {
                  return <SpeakersBody speaker={speaker} />;
                })}
              </Table>
            </TableContainer>
          </Grid>
        </Container>
      </div>
      <Footer />
      {/*{speakers.map(item => {*/}
      {/*    return (*/}
      {/*        <Box>{item.firstName}</Box>*/}
      {/*    )*/}
      {/*})}*/}
    </>
  );
}

export default AllSpeakers;
