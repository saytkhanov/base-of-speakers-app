import React from "react";
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core'
import MicNoneIcon from "@material-ui/icons/MicNone";
import SvgIcon from "@material-ui/icons/MicNone";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import HeadsetMicIcon from '@material-ui/icons/HeadsetMic'
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(1),
    width: 80,
    height: 80,
  },
  footer: {
      paddingTop: "2%",
      paddingBottom: "2%",
    backgroundColor: "black",
    width: "100%",
    height: 300,
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
            <Grid item style={{marginTop: 35}}>
              <HeadsetMicIcon
                edge="start"
                className={classes.menuButton}
                color="secondary"
                aria-label="menu"
              >
                <MenuIcon />
              </HeadsetMicIcon>
            </Grid>
            <Grid item style={{ color: "white",marginTop: 55 }}>
              <Typography style={{marginTop: 7}} variant='h4' >Озвучим все</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item style={{ color: "white" }}>
          <Typography variant='h6'>О компании</Typography>
          <hr color='#c51162'/>
          <Typography variant='h6'>Новости</Typography>
          <Typography variant='h6'>Полезное</Typography>
          <Typography variant='h6'>Контакты</Typography>
        </Grid>
        <Grid item style={{textAlign: "center"}}>
          <Typography variant='h6' style={{ color: "white" }}>Поделиться с друзьями</Typography>
          <hr color='#c51162'/>
          <Box style={{ width: "100%" }}>
            <Button>
              <FacebookIcon style={{ color: "white", height: 40, width: 40 }} />
            </Button>
            <Button>
              <TwitterIcon style={{ color: "white",height: 40, width: 40  }} />
            </Button>
            <Button>
              <WhatsAppIcon style={{ color: "white" ,height: 40, width: 40 }} />
            </Button>
            <Button>
              <PhoneAndroidIcon style={{ color: "white",height: 40, width: 40 }} />
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Footer;
