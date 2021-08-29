import React from "react";
//import MadeWithLove from "react-made-with-love";
import "./responsive.css"
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    textAlign: "center",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#021e36",
    color: "lightgray",
    position: "fixed",
    fontSize: "1rem",
    fontWeight: 600,
    paddingTop: "1rem",
    paddingBottom: "1rem",
    filter: "opacity(0.8)",
    padding: "2rem",
    left: 0,
    bottom: 0,
    right: 0,

    "&:hover": {
      filter: "opacity(1)",
    },
  },
};
const Footer = ({ classes }) => (
 
  <div className="Footer">

   <div className={classes.root} >
    <div >
      <label style={{ paddingRight: "1rem" }}>Need help?</label>
      <label>help@mail.com</label>
    </div>
    <div>2020 DORA | ANDREA</div>
  </div>
  </div> 
  
);

export default withStyles(styles)(Footer);
