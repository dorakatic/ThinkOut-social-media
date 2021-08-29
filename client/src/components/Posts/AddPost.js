import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { addPost } from "../../actions/postActions";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import "../../App.css";

const styles = {
  paper: {
    padding: 8,
    // width: "100%",
  },
  textField: {
    width: "100%",
  },
  button: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
    marginTop: 8,
    backgroundColor: "#124061",
    color: "#fff",
    "&:hover": {
      color: "#124061",
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
  },
};

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //postImage: "",
      text: "",
      imageUrl: null,
      imageAlt: null,
    };
    //this.uploadImage = this.uploadImage.bind(this);
    //this.handleChangeImage = this.handleChangeImage.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleImageUpload() {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "si1lo8jv");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return (
      fetch("https://api.Cloudinary.com/v1_1/dtexexlkv/image/upload", options)
        .then((res) => res.json())
        //.then(res => console.log(res.secure_url, res.original_filename))

        .then((res) => {
          this.setState({
            imageUrl: res.secure_url,
            imageAlt: `An image of ${res.original_filename}`,
          });
        })
        .catch((err) => console.log(err))
    );
  }

  handleChangeText(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    const postData = {
      text: this.state.text,
      imageUrl: this.state.imageUrl,
    };

    this.props.addPost(postData);
    this.setState({ showing: false });
    this.setState({ text: "" });
    this.setState({ imageUrl: "" });
  }

  render() {
    const { classes } = this.props;
    const { showing } = this.state;

    return (
      <Paper className={classes.paper}>
        <TextField
          multiline
          rowsMax="4"
          label="What is new?"
          className={classes.textField}
          onChange={this.handleChangeText}
          value={this.state.text}
        />
        <div style={{ display: "-ms-inline-flexbox" }}>
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              outline: "none",
            }}
            onClick={() => this.setState({ showing: !showing })}
          >
            <AddAPhotoIcon
              style={{ color: "gray", marginTop: "0.5rem" }}
            ></AddAPhotoIcon>
          </button>
          {showing ? (
            <main className="App" style={{ display: "block" }}>
              <section className="left-side">
                <form>
                  <div className="form-group" style={{ border: "none" }}>
                    <input type="file" />
                  </div>

                  <button
                    type="button"
                    className="btn"
                    onClick={this.handleImageUpload}
                  >
                    Upload image
                  </button>
                </form>
              </section>
              <section className="right-side">
                {this.state.imageUrl && (
                  <div>
                    <p>Your image</p>
                    <img
                      src={this.state.imageUrl}
                      alt={this.state.imageAlt}
                      className="displayed-image"
                    />
                  </div>
                )}
              </section>
            </main>
          ) : null}
        </div>

        <Button
          variant="outlined"
          className={classes.button}
          onClick={this.handleSubmit}
        >
          Send
        </Button>
      </Paper>
    );
  }
}

export default connect(null, { addPost })(withStyles(styles)(AddPost));
