import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSpeakers, speakerById } from '../redux/features/speakers';
import {useParams} from 'react-router-dom'

function PersonalArea (props) {
  const {id} = useParams();
  const dispatch = useDispatch()
  // const speaker = useSelector(state => {
  //   return state.speaker.items.find(item => item.id === id)
  // });



  const speakerByIdd = useSelector(state => state.speakers.items);



  useEffect(() => dispatch(getSpeakers()), [dispatch]);
  // useEffect(() => dispatch(speakerById(id)), [dispatch])
  // console.log(speaker)
  return (
    <div>
      {/*{speaker.firstName}*/}
      {speakerByIdd.map(item => {
        return(
          <div>{item.firstName}</div>
        )
    })}
    </div>
  )
}

export default PersonalArea