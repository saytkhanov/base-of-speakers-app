import React, {useEffect} from 'react';
import { Box, Button, Table, TableContainer, Typography } from '@material-ui/core'
import {useDispatch, useSelector} from "react-redux";
import {getSpeakers} from "../../redux/features/speakers";
import {NavLink} from "react-router-dom";
import Container from '@material-ui/core/Container'
import {makeStyles} from '@material-ui/core'
import TableHeader from './Table/TableHeader'
import SpeakersBody from './Table/SpeakersBody'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 'none',
    paddingLeft: 0,
    paddingRight: 0
  }
}))

function AllSpeakers(props) {
  const classes = useStyles()
    const dispatch = useDispatch();

    // const speakers = useSelector((state) => state.speakers.items);
    //
    // useEffect(() => dispatch(getSpeakers()), [dispatch]);

    return (
        <>
            <div style={{ height: 20, backgroundColor: "black" }}></div>
            <div style={{width: '100%', backgroundColor: '#052040', backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_dym_zatemnennyj_117667_1920x1080.jpg)`}}>
              <Container fixed>
                <Grid container>
                  <Grid item md={12}>
                    <Box style={{marginTop: 20, textAlign: 'left'}}><Typography variant='h6' style={{color: 'white'}}>Найдено дикторов: </Typography></Box>
                  </Grid>
              <TableContainer style={{width: '100%'}}>
                <Table style={{width: '100%'}}>
                  <SpeakersBody/>
                </Table>
              </TableContainer>
                </Grid>
              </Container>
            </div>
            {/*{speakers.map(item => {*/}
            {/*    return (*/}
            {/*        <Box>{item.firstName}</Box>*/}
            {/*    )*/}
            {/*})}*/}
        </>
    );
}

export default AllSpeakers;