import React from "react";
import { TableBody, TableCell, TableRow } from "@material-ui/core";

function Preloader() {
  return (
            <div
                style={{
                    width: "100%",
                    height: 100,
                    marginBottom: 10,
                    backgroundColor: "black",
                    borderRadius: 5,
                    opacity: 0.8,
                    textAlign: "center",
                    color: "white",
                }}
            ></div>
  );
}

export default Preloader;
