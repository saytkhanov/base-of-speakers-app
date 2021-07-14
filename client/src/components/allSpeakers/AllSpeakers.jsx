import React, {useEffect} from 'react';
import {Box, Button} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {getSpeakers} from "../../redux/features/speakers";
import {NavLink} from "react-router-dom";

function AllSpeakers(props) {
    const dispatch = useDispatch();

    const speakers = useSelector((state) => state.speakers.items);

    useEffect(() => dispatch(getSpeakers()), [dispatch]);

    return (
        <Box>
            {speakers.map(item => {
                return (
                    <Box>{item.firstName}</Box>
                )
            })}
        </Box>
    );
}

export default AllSpeakers;