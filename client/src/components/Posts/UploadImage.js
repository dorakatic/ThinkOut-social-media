import React, { Component } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import "../../App.css";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    "& > *": {
      margin: "1px",
    },
  },
  input: {
    display: "none",
  },
  image: {
    display: "block",
    margin: "0 auto",
    width: "250px",
    height: "250px",
  },
};

class FilesUploadComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postImage: "",
    };
    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage(e) {
    const formData = new FormData();
    formData.append("postImage", e.target.files[0]);

    this.setState({
      postImage: URL.createObjectURL(e.target.files[0]),
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="main-container">
        <input
          accept={this.state.postImage}
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          onChange={this.uploadImage}
        />
        <label htmlFor="contained-button-file">
          <Button variant="contained" color="primary" component="span">
            Upload
          </Button>
        </label>

        <div className="image-container">
          <div className="process">
            <img src={this.state.postImage} className={classes.image} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FilesUploadComponent);
