import React, { Component, Fragment } from "react";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
// Redux stuff
import { connect } from "react-redux";
import { updatePost } from "../../actions/postActions";
import TextField from "@material-ui/core/TextField";
import MyButton from "../../utils/MyButton"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";
const styles = {
  updateButton: {
    position: "absolute",
    left: "100%",
    top: "10%",

  },
};

class UpdateButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //title: '',
      post: { id: "", user: "", text: "", createdAt: "" },
      open: false,
    };

    this.handleChangeText = this.handleChangeText.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  /* updatePost = () => {
    
    this.props.updatePost(this.props.postId);
    this.handleChangeText();
    this.setState({ open: false });
  };*/

  handleChangeText(e) {
    /*e.persist();

    let value = e.target.value;
    this.setState((prevState) => ({
      post: { ...prevState.post, [e.target.text]: value },
    }));
*/
    this.setState({
      text: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const postData = {
      text: this.state.text,
    };

    this.props.updatePost(this.props.postId, postData);

    //this.setState({ text: "" });
    this.handleClose();
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Edit Status"
          onClick={this.handleOpen}
          btnclassname={classes.updateButton}
        
        >
          <EditIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Edit your status</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                name="text"
                type="text"
                label="Text"
                placeholder="Edit your status"
                className={classes.textField}
                value={this.state.text}
                onChange={this.handleChangeText}
                fullWidth
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

UpdateButton.propTypes = {
  updatePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { updatePost })(withStyles(styles)(UpdateButton));
