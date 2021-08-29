import React from "react";
import Grid from "@material-ui/core/Grid";
import Header from "./Header";
import Footer from "./Footer";
import './responsive.css'
const Main = ({ children }) => (
  <div>
    <Header />
    <Grid
      container
      justify="center"
      style={{
        paddingTop: "3rem",
        backgroundImage: `url(${require("./image.jpg")})`,
        paddingBottom: "2.5rem",
        minHeight: "100vh",
        //align: "flex-start",
      }}
    >
      <Grid item xs={12} sm={6} style={{ marginTop: 30, marginRight: "15rem" }}>
        {children}
      </Grid>
    </Grid>
    <Footer />
  </div>
);

export default Main;
