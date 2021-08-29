import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

const NotFound = () => (
  <div className="NotFound">
  <div style={{ textAlign: "center", marginTop: '10rem', marginLeft: '10rem', borderTop: "2px solid white", borderBottom: "2px solid white", padding: "1rem" }}>
    <h3 style={{color: 'white'}}>Page not found</h3>
    <h5 style ={{color: 'white'}}>There is no such path. Click on button below if you want to go to home page.</h5> 
    <Button style ={{border: '1px solid white'}}><Link to="/login" style={{color: 'white'}}>Go home</Link></Button>
  </div>
  </div>
);

export default NotFound;
