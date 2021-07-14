import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers, speakerById } from "../redux/features/speakers";

function HomePage(props) {
  const dispatch = useDispatch();

  const speakers = useSelector((state) => state.speakers.items);

  useEffect(() => dispatch(getSpeakers()), [dispatch]);

  console.log(speakers)

  return (
    <div>
      {/*{speaker.firstName}*/}
      {speakers.map((item) => {
        return <div>{item.firstName}</div>;
      })}
    </div>
  );
}

export default HomePage;
