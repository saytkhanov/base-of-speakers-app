import React from 'react';

function Preloader(loading) {
    if (loading) {
        return (
            <div style={{textAlign: "center",
                width: "100%",
                backgroundColor: "#052040",
                backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_dym_zatemnennyj_117667_1920x1080.jpg)`}}><h1>Идет загрузка...</h1></div>
        );
    }
}

export default Preloader;