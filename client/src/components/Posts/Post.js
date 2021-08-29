import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";
//import PropTypes from "prop-types";
import { connect } from "react-redux";
//import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import { likePost, unlikePost, refreshPost } from "../../actions/postActions";

const styles = {
  paper: {
    paddingTop: 5,
    padding: 10,
    display: "flex",
    marginTop: 15,
    boxShadow: "1px 2px 1px #9E9E9E",
    // width: "100%",
  },

  login: {
    marginBottom: 2,
  },

  time: {
    display: "flex",
    //marginLeft: 15,
    color: "#bbb",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "400",
    //marginTop: 10,
  },
  postText: {
    //marginLeft: 48,
    fontSize: 20,
    borderBottom: "0.1px solid lightgray",
    paddingBottom: "0.5rem",
    paddingTop: "0.5rem",
  },
  postCard: {
    width: "100%",
  },
  imagePost: {
    width: "100%",
    height: "auto",

    margin: "0 auto",
    paddingTop: "10px",
    borderRadius: "1rem",
  },
  /*btnPost: {
    position: 'absolute',
    top: 0,
    right: 0
  }*/
};

class Post extends Component {
  constructor(props) {
    super(props);
    this.handleLike = this.handleLike.bind(this);
    this.handleUnlike = this.handleUnlike.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      //console.log(prevProps.user);
      // console.log(this.props.user.liked);
      //console.log(this.props.post._id);
      if (prevProps.user && prevProps.user.liked !== this.props.user.liked) {
        this.props.refreshPost(this.props.post._id);
      }
    }
  }
  handleLike() {
    this.props.likePost(this.props.post._id, this.props.user._id);
  }

  handleUnlike() {
    this.props.unlikePost(this.props.post._id, this.props.user._id);
  }

  render() {
    const { classes, post, auth, user } = this.props;

    const deletePost =
      auth.isAuthenticated && post.user.login === user.login ? (
        <DeleteButton postId={post._id} />
      ) : null;

    const updatePost =
      auth.isAuthenticated && post.user.login === user.login ? (
        <UpdateButton postId={post._id} />
      ) : null;
    const showImage = post.imageUrl ? (
      <img src={post.imageUrl} className={classes.imagePost}></img>
    ) : null;

    const showProfileImage = post.user.userImage ? (
      <img
        src={post.user.userImage}
        style={{ borderRadius: "50%", height: "3rem", width: "3rem" }}
      ></img>
    ) : (
      <Avatar
        src="/broken-image.jpg"
        style={{ borderRadius: "50%", height: "3rem", width: "3rem" }}
      />
    );

    //like

    let likeBtns;

    if (auth.isAuthenticated) {
      if (
        user &&
        user.liked &&
        user.liked.indexOf(this.props.post._id) === -1
      ) {
        likeBtns = (
          <div className={classes.btnBlock}>
            <FavoriteBorderIcon
              onClick={this.handleLike}
              style={{ cursor: "pointer", color: "#d61a3f" }}
            ></FavoriteBorderIcon>
          </div>
        );
      } else {
        likeBtns = (
          <div className={classes.btnBlock}>
            <FavoriteIcon
              onClick={this.handleUnlike}
              style={{ cursor: "pointer", color: "#d61a3f" }}
            ></FavoriteIcon>
          </div>
        );
      }
    }

    return (
      <Paper className={classes.paper}>
        <div className={classes.postCard} style={{ width: "100%" }}>
          <h3
            className={classes.login}
            style={{
              width: "inherit",
              display: "flex",
              alignItems: "center",
              marginTop: "0.5rem",
              fontWeight: "600",
            }}
          >
            <div>
              <Link to={`/profile/${post.user.id}`} style={{ display: "flex" }}>
                {showProfileImage}
                <Link
                  to={`/profile/${post.user.id}`}
                  style={{
                    marginTop: "5",
                    marginLeft: "8px",
                    color: "#021e36",
                  }}
                >
                  {post.user.login}
                  <div>
                    <span className={classes.time}>
                      {new Date(post.createdAt).toLocaleString()}
                    </span>
                  </div>
                </Link>
              </Link>
            </div>
            <div style={{ marginInlineStart: "auto" }}>
              {deletePost}
              {updatePost}
            </div>
          </h3>
          <div>
            <div className={classes.postText}>{post.text}</div>
            {showImage}
          </div>
          <label style={{ display: "flex", paddingTop: "0.5rem" }}>
            {likeBtns}
            {post.likes.length}
          </label>
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  likePost,
  unlikePost,
  refreshPost,
})(withStyles(styles)(Post));
