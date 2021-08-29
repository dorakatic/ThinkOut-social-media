import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ReactLoading from "react-loading";

const styles = {
  load: {
    textAlgin: "center",
    marginTop: 25,
    width: "100%",
  },
  loadIcon: {
    color: "#8A2BE2",
  },
};
const LoadingPosts = ({ classes }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "10rem",
    }}
  >
    <ReactLoading
      type={"bubbles"}
      color={"#3d5e75"}
      height={"40%"}
      width={"40%"}
    />
  </div>
);

export default withStyles(styles)(LoadingPosts);
