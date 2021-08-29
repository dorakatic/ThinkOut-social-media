import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import MoreVert from "@material-ui/icons/MoreVert";
import "./responsive.css";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import MyButton from "../../utils/MyButton";

import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import SearchForm from "../Search/SearchForm";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import "./responsive.css";
const styles = {
  root: {
    flexGrow: 1,
    position: "fixed",
    width: "100%",
    filter: "opacity(0.8)",
    zIndex: 1,
    "&:hover": {
      filter: "opacity(1)",
    },
  },
  logo: {
    color: "#fff",
    fontSize: 30,
  },
  space: {
    justifyContent: "space-between",
  },
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  close = () => {
    this.setState({ open: false });
  };
  handleLogout() {
    this.setState({ anchorEl: null });
    this.props.logoutUser();
  }
  render() {
    const { classes, isAuthenticated, user } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const guestLinks = (
      <div>
        <IconButton
          aria-owns={open ? "menu-appbar" : undefined}
          aria-haspopup="true"
          color="inherit"
          onClick={this.handleMenu}
        >
          <MoreVert />
        </IconButton>
        <Menu
          id="menu-appbar"
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          anchorEl={anchorEl}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <Link to="/login">Login</Link>
          </MenuItem>

          <MenuItem onClick={this.handleClose}>
            <Link to="/register">Register</Link>
          </MenuItem>
        </Menu>
      </div>
    );

    const authLinks = isAuthenticated && (
      <div className="headerIcons">
        <Link to={`/profile/${user._id}`}>
          <MyButton tip="Liked posts" style={{ paddingTop: "2px" }}>
            <Link to={`/liked/${user._id}`}>
              <FavoriteBorderIcon
                style={{
                  color: "white",
                  fontSize: "2.2rem",
                  paddingTop: "0.5rem",
                }}
              ></FavoriteBorderIcon>
            </Link>
          </MyButton>
          <MyButton tip="Profile" onClick="window.location.reload()">
            <AccountCircle fontSize="large" style={{ color: "white" }} />
          </MyButton>
        </Link>
        <Button
          onClick={this.handleOpen}
          style={{ color: "white", order: "1px solid white" }}
        >
          Logout
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to logout?</DialogTitle>

          <DialogActions>
            <Button onClick={this.close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="secondary">
              <Link
                to="/login"
                onClick={this.handleLogout}
                style={{ color: "red" }}
              >
                Logout
              </Link>
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            backgroundColor: "#124061",
          }}
        >
          <Toolbar className={classes.space}>
            <Link to="/" className={classes.logo}>
              ThinkOut
            </Link>
            <SearchForm />
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated, //isAuth iz bool authRed
  user: state.auth.user,
});

export default connect(mapStateToProps, { logoutUser })(
  withStyles(styles)(Header)
);
