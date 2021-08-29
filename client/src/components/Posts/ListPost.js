import React, { Component } from "react";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import AddPost from "./AddPost";
import Post from "./Post";
import { connect } from "react-redux";
import { getPosts, getPostsByFollowingUsers } from "../../actions/postActions";
import LoadingPosts from "./LoadingPosts";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import BackToTop from "react-back-to-top-button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import "../Layout/responsive.css";

const styles = {
  paper: {
    height: "fit-content",
    paddingBottom: "1.2rem",
    marginTop: "-1.3rem",
  },

  login: { paddingTop: "1rem" },
  email: {
    color: "#888",
    marginBottom: 10,
    marginTop: "-1rem",
    marginLeft: "0.5rem",
  },
  detailsBlock: {
    display: "block",
  },
  detail: {
    marginRight: 5,
    fontWeight: "bold",
    marginLeft: "0.5rem",
  },
  detailTitle: {
    marginLeft: 3,
    textTransform: "uppercase",
    fontSize: 10,
    fontWeight: "normal",
  },
};

class ListPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allPosts: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.sortLikes = this.sortLikes.bind(this);
    //this.sortDates = this.sortDates.bind(this);
  }
  handleChange(event) {
    this.setState({ allPosts: event.target.checked });
  }

  sortLikes(type, list) {
    if (type === "likes") {
      list
        .sort((a, b) => (b.likes.length > a.likes.length ? 1 : -1))
        .map((el) => <Post key={el._id} post={el} />);
    }
    if (type === "createdAt") {
      list
        .sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1))
        .map((el) => <Post key={el._id} post={el} />);
    }

    this.setState({ state: !this.state });
  }

  componentDidMount() {
    this.props.getPosts();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.allPosts !== this.state.allPosts) {
      this.state.allPosts
        ? this.props.getPosts()
        : this.props.getPostsByFollowingUsers();
    }
  }

  render() {
    const { classes, list, loading, user } = this.props;
    const { allPosts } = this.state;

    const items = list && list.map((el) => <Post key={el._id} post={el} />);

    const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const showProfileImage = user.userImage ? (
      <img
        src={user.userImage}
        style={{
          borderRadius: "50%",
          height: "3rem",
          width: "3rem",
          marginLeft: "0.5rem",
        }}
      ></img>
    ) : (
      <Avatar
        src="/broken-image.jpg"
        style={{
          borderRadius: "50%",
          height: "3rem",
          width: "3rem",
          marginLeft: "0.5rem",
        }}
      />
    );

    return (
      <div
        className="postList"
        style={{
          display: "grid",
          gridTemplateColumns: "40% 75%",
          gridColumnGap: 20,
          //padding: 10,
          zIndex: 0,
        }}
      >
        <div className="Profile">
          <Paper className={classes.paper}>
            <h1 className={classes.login}>
              {" "}
              <Link to={`/profile/${user._id}`} style={{ display: "flex" }}>
                {showProfileImage}
                <Link
                  to={`/profile/${user._id}`}
                  style={{
                    color: "#124061",
                    marginTop: "5",
                    marginLeft: "8px",
                  }}
                >
                  {" "}
                  {user.login}
                </Link>
              </Link>
            </h1>
            <div className={classes.email}>{user.email}</div>
            <div className={classes.detailsBlock}>
              <div className={classes.detail}>
                {user.followers.length}
                <span className={classes.detailTitle}>followers</span>
              </div>
              <div className={classes.detail}>
                {user.following.length}
                <span className={classes.detailTitle}>following</span>
              </div>
              <div className={classes.detail}>
                {user.liked.length}
                <span className={classes.detailTitle}>liked</span>
              </div>
            </div>
          </Paper>
        </div>
        <div>
          <AddPost />
          <label style={{ color: "white", fontWeight: "bold" }}>Sort by:</label>
          <select
            onChange={(e) => this.sortLikes(e.target.value, this.props.list)}
            style={{
              fontSize: "0.8rem",
              padding: "0.3rem",
              margin: "0.5rem",
              marginRight: "2rem",
              borderRadius: "5px",
              outline: "none",
              cursor: "pointer",
            }}
          >
            <option value="createdAt" style={{ margin: "2rem" }}>
              DATE
            </option>
            <option value="likes">LIKES</option>
          </select>

          <FormControlLabel
            control={<Switch checked={allPosts} onChange={this.handleChange} />}
            label={allPosts ? "All posts" : "From following users"}
            style={{ color: "white" }}
          />
          {loading ? <LoadingPosts /> : items}
          <BackToTop showAt={100} speed={1500} easing="easeInOutQuint">
            <ArrowUpwardIcon style={{ fontSize: "5rem", color: "lightgray" }} />
          </BackToTop>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.post.list,
  loading: state.post.loading,
  likes: state.post.likes,
  auth: state.auth,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getPosts, getPostsByFollowingUsers })(
  withStyles(styles)(ListPost)
);
