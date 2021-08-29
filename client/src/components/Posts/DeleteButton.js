import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
//import Paper from "@material-ui/core/Paper";
import MyButton from "../../utils/MyButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { deletePost } from "../../actions/postActions";

const styles = {
  deleteButton: {
    display: "inline-block",
  },
};

class DeleteButton extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deletePost = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <div /*style={{position: 'absolute',alignSelf: 'flex-end', right: 0}}*/>
        <MyButton
          tip="Delete Post"
          onClick={this.handleOpen}
          btnclassname={classes.deleteButton}
          style={{ zIndex: "1000000000" }}
        >
          <DeleteIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Once you delete post, you will not be able to restore it.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deletePost} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DeleteButton.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
};

export default connect(null, { deletePost })(withStyles(styles)(DeleteButton));
