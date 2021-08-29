import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import Post from "../Posts/Post";
import LoadingPosts from "../Posts/LoadingPosts";
import "../Layout/responsive.css";

import { getLikedPosts } from "../../actions/profileActions";

const styles = {
  paper: {
    padding: 15,
    height: "fit-content",
  },
};

class Liked extends Component {
  componentDidMount() {
    this.props.getLikedPosts(this.props.match.params.userId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.isAuthenticated) {
      if (prevProps.list && prevProps.list.length !== this.props.list.length) {
        this.props.getLikedPosts(this.props.match.params.userId);
      }
    }
  }

  render() {
    const { classes, loadingPosts, list, auth, user } = this.props;

    let items;
    items = list && list.map((el) => <Post key={el._id} post={el} />);
    return (
      <div style={{ marginLeft: "9rem", width: "90%" }}>
        <div
          style={{
            color: "white",
            fontSize: "xx-large",
            fontVariantCaps: "all-small-caps",
            fontWeight: "200",
            textAlign: "center",
            textDecoration: "overline",
            marginTop: "1rem",
          }}
        >
          Posts you liked:
        </div>
        {loadingPosts ? <LoadingPosts /> : items}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loadingPosts: state.post.loading,
  list: state.post.list,
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getLikedPosts })(
  withStyles(styles)(Liked)
);
