import React, { useEffect } from 'react'
import { TableRow, TableBody, TableCell, Typography, Avatar,Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { getSpeakers } from '../../../redux/features/speakers'
import {makeStyles} from '@material-ui/core'
import {Link} from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  audio: {
    height: 30,
    marginTop:10,
    "&::-webkit-media-controls-panel": {
      backgroundColor: '#f50057',
    },
    "&::-webkit-media-controls-current-time-display": {
      color: 'white'
    }
  }
}))

function SpeakersBody (props) {
  const classes = useStyles()

  const dispatch = useDispatch();
  const speakers = useSelector(state => state.speakers.items)

  useEffect(() => dispatch(getSpeakers()), [dispatch])
  return (
    <TableBody>
      {speakers.map(speaker => {
        return(
          <TableRow>
            <TableCell style={{ width: 120}}>
              <img src={speaker.avatar}
                   alt={"avatar"}
                   width="70px"
                   style={{ borderRadius: 70 }}/>
            </TableCell>
            <TableCell style={{width: 500}}>
              <Typography variant='h4' style={{color: 'white'}}>
                <Link to={`/speaker/${speaker._id}`}>{speaker.firstName} {speaker.lastName}</Link>
              </Typography>
            </TableCell>
            <TableCell>
              <div >
                <audio className={classes.audio} src={speaker.lastVoice?.audio} controls>
                </audio>
              </div>
            </TableCell>
            <TableCell>
              <Typography style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}> от {speaker.cost}</Typography>
            </TableCell>
            <TableCell>
              <Button style={{backgroundColor: '#f50057', fontWeight: 'bold'}}>
                Заказать
              </Button>
            </TableCell>
            {/*<TableCell>*/}
            {/*  <Avatar src={speaker.avatar}/>*/}
            {/*</TableCell>*/}
            {/*<TableCell>*/}
            {/*  <Avatar src={speaker.avatar}/>*/}
            {/*</TableCell>*/}
            {/*<TableCell>*/}
            {/*  <Avatar src={speaker.avatar}/>*/}
            {/*</TableCell>*/}
            {/*<TableCell>*/}
            {/*  <Avatar src={speaker.avatar}/>*/}
            {/*</TableCell>*/}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

export default SpeakersBody