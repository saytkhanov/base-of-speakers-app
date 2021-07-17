import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers } from "../redux/features/speakers";
import { Button, Container, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Carousel } from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import { getVoices } from '../redux/features/voices'

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
    padding: theme.spacing(6),
    marginTop: theme.spacing(1),
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,.4)",
  },
  blockInfo: {
    height: 500,
    width: 500,
    marginLeft: 50,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "white",
    color: "black",
    fontWeight: "bold",
    width: 220,
    "&:hover": {
      backgroundColor: "rgba(255,255,255, 0.8)",
    },
  },
  audio: {
    backgroundColor: 'black',
    height: 30,
    marginTop: 30,
    "&::-webkit-media-controls-panel": {
  backgroundColor: '#f50057',
},
   "&::-webkit-media-controls-current-time-display": {
     color: 'white'
}
  }
}));

function HomePage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const voices = useSelector(state => state.voices.items)
  const speakers = useSelector((state) => state.speakers.items);
  useEffect(() => dispatch(getVoices()), [dispatch])
  useEffect(() => dispatch(getSpeakers()), [dispatch]);

  return (
    <>
      <Paper
        className={classes.mainFeaturesPost}
        style={{
          backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_zvuk_muzyka_108048_1920x1080.jpg)`,
        }}
      >
        <Container fixed>
          <div className={classes.overlay} />
          <Grid container>
            <Grid item md={6}>
              <div className={classes.mainFeaturesPostContent}>
                <Typography variant="h3" color={"inherit"} gutterBottom>
                  База <span style={{ color: "#f50057" }}>#1</span> по подбору
                  записи и <span style={{ color: "#f50057" }}>дикторов</span>
                </Typography>
                <Typography
                  style={{ fontSize: 18 }}
                  color={"inherit"}
                  paragraph
                >
                  Озвучим текст, ролик, видеопрезентацию, автоответчик. Сделаем
                  аудиоролик любой сложности. <br />
                  Напишем сценарий под любые ваши задачи. Джинглы для радио!
                  Авторская музыка! И… мы знаем, как сделать красивый звук!
                </Typography>
                <Button
                  style={{ fontWeight: "bold" }}
                  variant="contained"
                  color="secondary"
                >
                  Узнать больше
                </Button>
              </div>
            </Grid>
          </Grid>
        </Container>
        {/*{speaker.map((item) => {*/}
        {/*  return <div>{item.firstName}</div>;*/}
        {/*})}*/}
      </Paper>
      <div style={{ height: 20, backgroundColor: "black" }}></div>
      <Carousel>
        {speakers.map(speaker => {
          console.log(speaker.lastVoice?.audio)
          const elem = voices.find(voice => {
            if(voice._id === speaker.lastVoice?.speaker) {
              return voice
            }
            return voice
          })
          console.log(elem)
          console.log(elem?.name)
          return(
            <Carousel.Item
              style={{
                height: 700,
                backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_apparatura_zvuk_razmytosti_120196_1920x1080.jpg)`,
              }}
            >
              <div
                style={{
                  width: 1000,
                  height: 440,
                  backgroundColor: "black",
                  marginTop: 135,
                  marginLeft: 350,
                  borderRadius: 5,
                  opacity: 0.8
                }}
              >
                <div style={{display: 'flex'}}>
                  <div>
                    <img
                      style={{ height: "440px", width: 450, borderRadius: 5 }}
                      src={speaker.avatar}
                      alt="First Slide"
                    />
                  </div>
                  <div className={classes.blockInfo}>
                    <div style={{marginTop: 50}}><Typography variant={'h4'} style={{color: 'white'}}>{speaker.firstName} {speaker.lastName}</Typography></div>
                    <div >
                      <audio className={classes.audio} src={elem?.audio} controls>
                    </audio>
                    </div>
                    <div style={{marginTop: 20}}><Typography style={{color: 'white', marginRight: 25}}>{speaker.description}</Typography></div>
                    <div style={{marginTop: 25}}><Typography variant={'h6'} style={{color: 'white'}}>Количество работ: {speaker.voices?.length}</Typography></div>
                    <div style={{textAlign: 'end', marginRight: 30, marginTop: 20}}><Typography variant={'h6'} style={{color: 'white'}}> Цена: от {speaker.cost}</Typography></div>
                  </div>
                </div>
              </div>
              {/*<img className='d-block w-100' style={{height: '100%'}} src={"https://images.wallpaperscraft.ru/image/mikrofon_ustrojstvo_pribor_elektroakustika_118327_1920x1080.jpg"} alt="First Slide"/>*/}
              {/*<Carousel.Caption>*/}
              {/*  <h3>Speakers</h3>*/}
              {/*  <p>How are you?</p>*/}
              {/*</Carousel.Caption>*/}
            </Carousel.Item>
          )
        })}
        {/*<Carousel.Item style={{height: 650}}>*/}
        {/*  <img className='d-block w-100' style={{height: '100%'}} src={"https://images.wallpaperscraft.ru/image/mikrofon_ustrojstvo_muzyka_143960_1920x1080.jpg"} alt="First Slide"/>*/}
        {/*  <Carousel.Caption>*/}
        {/*    <h3>Speakers</h3>*/}
        {/*    <p>How are you?</p>*/}
        {/*  </Carousel.Caption>*/}
        {/*</Carousel.Item>*/}
        {/*<Carousel.Item style={{height: 600}}>*/}
        {/*  <img className='d-block w-100' style={{height: '100%'}} src={"https://images.wallpaperscraft.ru/image/mikrofon_metallicheskij_ustrojstvo_149328_1920x1080.jpg"} alt="First Slide"/>*/}
        {/*  <Carousel.Caption>*/}
        {/*    <h3>Speakers</h3>*/}
        {/*    <p>How are you?</p>*/}
        {/*  </Carousel.Caption>*/}
        {/*</Carousel.Item>*/}
        {/*<Carousel.Item*/}
        {/*  style={{*/}
        {/*    height: 700,*/}
        {/*    backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_ustrojstvo_pribor_elektroakustika_118327_1920x1080.jpg)`,*/}
        {/*  }}*/}
        {/*>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      width: 1200,*/}
        {/*      height: 500,*/}
        {/*      backgroundColor: "black",*/}
        {/*      marginTop: 100,*/}
        {/*      marginLeft: 250,*/}
        {/*      borderRadius: 30,*/}
        {/*      opacity: 0.3,*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <div>*/}
        {/*      <div>*/}
        {/*        <img*/}
        {/*          style={{ height: "500px", width: 500, borderRadius: 30 }}*/}
        {/*          src={*/}
        {/*            "https://images.wallpaperscraft.ru/image/mikrofon_ustrojstvo_pribor_elektroakustika_118327_1920x1080.jpg"*/}
        {/*          }*/}
        {/*          alt="First Slide"*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*      <div className={classes.blockInfo}></div>*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*  /!*<img className='d-block w-100' style={{height: '100%'}} src={"https://images.wallpaperscraft.ru/image/mikrofon_ustrojstvo_pribor_elektroakustika_118327_1920x1080.jpg"} alt="First Slide"/>*!/*/}
        {/*  /!*<Carousel.Caption>*!/*/}
        {/*  /!*  <h3>Speakers</h3>*!/*/}
        {/*  /!*  <p>How are you?</p>*!/*/}
        {/*  /!*</Carousel.Caption>*!/*/}
        {/*</Carousel.Item>*/}
      </Carousel>
      <div
        style={{ height: 80, backgroundColor: "black", textAlign: "center" }}
      >
        <NavLink style={{textDecoration: 'none'}} to='/showAll'>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Show all speakers
        </Button>
        </NavLink>
      </div>
    </>
  );
}

export default HomePage;
