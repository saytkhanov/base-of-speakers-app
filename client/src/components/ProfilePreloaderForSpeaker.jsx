import React from "react";
import { Box, Grid } from "@material-ui/core";

function ProfilePreloader(props) {
  return (
      <Box
        style={{
          width: "100%",
          backgroundColor: "#052040",
          backgroundImage: `url(https://images.wallpaperscraft.ru/image/mikrofon_oborudovanie_temnyj_fon_121814_1920x1080.jpg)`,
          paddingTop: "5%",
          paddingBottom: "40%",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <Box style={{
          display: "flex",
          width: "90%",
          margin: "auto",
          justifyContent: "space-between",
        }}>
          <Box
            style={{
              width: 200,
              height: 200,
              backgroundColor: "black",
              borderRadius: 5,
              opacity: 0.8,
              color: "white",
            }}
          />
          <Box
            style={{
              width: "50%",
              height: 200,
              backgroundColor: "black",
              borderRadius: 5,
              opacity: 0.8,
            }}
          />
          <Box
            style={{
              width: 200,
              height: 200,
              backgroundColor: "black",
              borderRadius: 5,
              opacity: 0.8,
            }}
          />
        </Box>
      </Box>
  );
}

export default ProfilePreloader;
