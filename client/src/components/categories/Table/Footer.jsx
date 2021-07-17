import React from "react";
import { Box, Button, Grid, makeStyles } from "@material-ui/core";
import MicNoneIcon from "@material-ui/icons/MicNone";
import SvgIcon from "@material-ui/icons/MicNone";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";

const useStyles = makeStyles((theme) => ({
  footer: {
      paddingTop: "2%",
      paddingBottom: "2%",
    backgroundColor: "black",
    width: "100%",
    height: "100%",
  },
  footerMooter: {
    justifyContent: "space-between",
    width: "60%",
    margin: "auto",
  },
}));

function Footer(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.footer}>
      <Grid container className={classes.footerMooter}>
        <Grid item>
          <Grid container>
            <Grid item>
              <SvgIcon
                style={{ fontSize: 40, color: "#f50057", paddingTop: 5 }}
                {...props}
              >
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </SvgIcon>
            </Grid>
            <Grid item style={{ color: "white" }}>
              <Box>BootCamp 1</Box>
              <Box>Озвучим все</Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ color: "white" }}>
          <Box>О компании</Box>
          <Box>Новости</Box>
          <Box>Полезное</Box>
          <Box>Контакты</Box>
        </Grid>
        <Grid item style={{textAlign: "center"}}>
          <Box style={{ color: "white" }}>Поделиться с друзьями</Box>
          <Box style={{ width: "100%" }}>
            <Button>
              <FacebookIcon style={{ color: "white" }} />
            </Button>
            <Button>
              <TwitterIcon style={{ color: "white" }} />
            </Button>
            <Button>
              <WhatsAppIcon style={{ color: "white" }} />
            </Button>
            <Button>
              <PhoneAndroidIcon style={{ color: "white" }} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
