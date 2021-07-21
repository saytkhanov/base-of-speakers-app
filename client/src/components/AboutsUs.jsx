import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MicIcon from "@material-ui/icons/Mic";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import {
  Avatar,
  Container,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Button } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import styles from "./styles.module.css";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import EqualizerIcon from "@material-ui/icons/Equalizer";

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
  hover: {},
  col: {
    width: 300,
    height: 400,
    borderRadius: 3,
    border: "3px solid black",
    "&:hover": {
      boxShadow: "0 0 20px #c51162",
    },
  },
  icons: {
    color: "#c51162",
    height: 150,
    width: 300,
    marginTop: 30,
  },
}));

function AboutsUs(props) {
  const classes = useStyles();

  return (
    <Paper
      className={classes.mainFeaturesPost}
      style={{
        backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_oborudovanie_temnyj_fon_121814_1920x1080.jpg)`,
        height: 600,
      }}
    >
      <Container fixed>
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={12}>
            <div className={classes.mainFeaturesPostContent}>
              <div
                className="row"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 38,
                }}
              >
                <div className="col-3">
                  <div className={classes.col}>
                    <div>
                      <ThumbUpAltIcon className={classes.icons} />
                      <div style={{ padding: 18 }}>
                        <Typography align="center">
                          От мастерства диктора зависит качество и эффективность
                          радиорекламы и аудиороликов. Важную роль играет не
                          только поставленный голос, но и его тембр, темп и
                          понимание задач, которые стоят перед диктором.
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className={classes.col}>
                    <div>
                      <AccessAlarmsIcon className={classes.icons} />
                    </div>
                    <div style={{ padding: 18 }}>
                      <Typography align="center">
                        Удаленное озвучивание текстов главная услуга нашей
                        студии.
                        <br />
                        Наш новый сайт стал одним и самых удобных сервисом по
                        поиску дикторов для озвучивания различных проектов.
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <div className={classes.col}>
                    <div>
                      <EqualizerIcon className={classes.icons} />
                      <div style={{ padding: 18 }}>
                        <Typography align="center">
                          Сегодня мы не просто лидеры среди студий. Мы задаем
                          планку уровня обслуживания, быстрой обратной связи и
                          сроков исполнения заказов.
                          <br /> Нам доверяют уже более 1000 клиентов.
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default AboutsUs;
