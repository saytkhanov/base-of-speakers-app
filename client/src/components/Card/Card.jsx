import React, {useState} from "react";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import Footer from "../Footer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  container: {
    width: "100%"
  },
  card: {
    backgroundColor: "black",
    borderRadius: 10,
    padding: 40,
    width: 320,
    height: 200,
    color: "white"
  },
  miniInput: {
    width: 50
  }
});

function Card(props) {

  const [form, setForm] = useState({
    name: "", code: "", month: "", year: "", cvv: ""
  })

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value})
  }

  const classes = useStyles();

  return (
    <Box>
      <Grid container style={{width: 1000, margin:"auto", marginTop: 150, marginBottom: 150}}>
        <Grid container classes={{ root: classes.container }}>
          <Grid item style={{padding: 20}}>
            <Box classes={{ root: classes.card }}>
              <Box>
                <Box style={{ textAlign: "right" }}>
                  <img width={80} src="Visa_Inc._logo.svg" alt="" />
                </Box>
                <Box>
                  <img width={50} src="chip.4b08b077.png" alt="" />
                </Box>
                <Box></Box>
                <Box>
                  <Box>{form.code}</Box>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Box>{form.name}</Box>
                    <Box display={"flex"}>
                      <Box>{form.month}/</Box>
                      <Box>{form.year}</Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item style={{padding:20}}>
            <Box>
              <Typography variant={"h5"}>Payment Details</Typography>
            </Box>
            <Box>
              <TextField id="standard-basic" label="Имя на карте" name={"name"} onChange={handleChange} inputProps={{ maxLength: 16}} />
            </Box>
            <Box>
              <TextField id="standard-basic" label="Номер карты" name={"code"} onChange={handleChange} inputProps={{ maxLength: 8}} />
            </Box>
            <Grid container justifyContent={"space-between"}>
              <Grid item classes={{root: classes.miniInput}}>
                <Box>
                  <TextField id="standard-basic" label="ММ" name={"month"} onChange={handleChange} inputProps={{ maxLength: 2}} />
                </Box>
              </Grid>
              <Grid item classes={{root: classes.miniInput}}>
                <Box>
                  <TextField id="standard-basic" label="ГГ" name={"year"} onChange={handleChange} inputProps={{ maxLength: 2}} />
                </Box>
              </Grid>
              <Grid item classes={{root: classes.miniInput}}>
                <Box>
                  <TextField id="standard-basic" label="CVV" type={"password"} name={"cvv"} onChange={handleChange} inputProps={{ maxLength: 3}} />
                </Box>
              </Grid>
            </Grid>
            <Box style={{ marginTop: 20 }}>
              <Button color={"primary"} variant={"contained"}>Оплатить</Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Footer />
    </Box>
  );
}

export default Card;
