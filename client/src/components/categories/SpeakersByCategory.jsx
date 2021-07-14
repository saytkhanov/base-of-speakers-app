import React, { useEffect } from "react";
import { Box } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getSpeakers } from "../../redux/features/speakers";
import { useParams } from "react-router-dom";

function SpeakersByCategory(props) {
    const dispatch = useDispatch();
    const speakers = useSelector((state) => state.speakers.items);

    const categoryId = useParams();

    console.log(categoryId);

    useEffect(() => dispatch(getSpeakers()), [dispatch]);

    return (
        <Box>
            {speakers.map((item) => {
                if (item.category === categoryId.id) {
                    return <Box>{item.firstName}</Box>;
                }
            })}
        </Box>
    );
}

export default SpeakersByCategory;
