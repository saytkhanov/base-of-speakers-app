import React from 'react';
import {Carousel} from "react-bootstrap";

function HomePagePreloader(props) {
    return (
        <Carousel>
            <Carousel.Item
                style={{
                    height: 700,
                    backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_apparatura_zvuk_razmytosti_120196_1920x1080.jpg)`,
                }}
            >
                <div
                    style={{
                        width: 1000,
                        height: 440,
                        backgroundColor: "black",
                        marginTop: 135,
                        marginLeft: 350,
                        borderRadius: 5,
                        opacity: 0.8,
                        textAlign: "center",
                        color: "white",
                        paddingTop: "10%"
                    }}
                ></div></Carousel.Item>
        </Carousel>
    );
}

export default HomePagePreloader;