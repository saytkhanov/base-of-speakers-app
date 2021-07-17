import React, { useEffect } from 'react'
import Box from '@material-ui/core/Box'
import SearchIcon from '@material-ui/icons/Search'
import { alpha, InputBase } from '@material-ui/core'
import {makeStyles} from '@material-ui/core'
import Fuse from 'fuse.js'
import { useDispatch, useSelector } from 'react-redux'
import { getSpeakers } from '../../redux/features/speakers'

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'white',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: 'white',
    [theme.breakpoints.up('sm')]: {
      width: '16ch',
      '&:focus': {
        width: '18ch',
      },
    },
  },
}))

function Search (props) {
  const classes = useStyles();
const dispatch = useDispatch()
  const speakers = useSelector(state => state.speakers.items);

  useEffect(() => dispatch(getSpeakers()), [dispatch])



  const fuse = new Fuse(speakers, {
    keys: [
      "firstName",
      "lastName"
    ],
    includeScore: true
  });

  return (
    <Box style={{marginTop: 55, marginLeft: 320}}>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
    </Box>
  )
}

export default Search