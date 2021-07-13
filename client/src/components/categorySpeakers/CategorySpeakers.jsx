import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { getSpeakersByCategory } from '../../redux/features/speakers';
import { useDispatch, useSelector } from 'react-redux';

function CategorySpeakers(props) {

  const dispatch = useDispatch()
  const categoryId = useParams()

  const speakers = useSelector((state) => state.speakers.items)

  console.log(speakers)

  return (
    <div>laslfsla</div>
  );
}

export default CategorySpeakers;