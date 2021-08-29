import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

const styles = {
  textField: {
    width: "100%",
    marginBottom: 5,
  },
  btnBlock: {
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
  },
  loginPage: {
    margin: "0 auto",
    flexDirection: "row",
    justifyContent: "center",
  },
  sidePicture: {
    backgroundImage: `url(${require("./naslovna.png")})`,
    //paddingRight: "1rem",
    height: "8rem",
    width: "27rem",
    margin: "0 auto",
    //paddingRight: "3rem",
  },
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  }
  render() {
    const { classes } = this.props;
    const { errors } = this.state;
    return (
      <div
        style={{
          margin: "0 auto",
          marginTop: "3rem",
          marginLeft: "7rem",
          marginRight: "-8rem",
          width: "100%",
        }}
      >
        <div className="Form">
          <div className="ThinkPic">
            <div className={classes.sidePicture}></div>
          </div>
          <div>
            <Paper style={{ padding: 15 }}>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  type="email"
                  label="Email"
                  className={classes.textField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  name="email"
                  helperText={errors.email ? errors.email : ""}
                  error={errors.email ? true : false}
                />
                <TextField
                  label="Lozinka"
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  className={classes.textField}
                  helperText={errors.password ? errors.password : ""}
                  error={errors.password ? true : false}
                />
                <div className={classes.btnBlock}>
                  <Button variant="outlined" type="submit">
                    Log in
                  </Button>
                </div>
              </form>
              <label style={{ marginRight: "1rem" }}>No account?</label>

              <label style={{ fontWeight: "bold" }}>
                <Link to="/register" style={{ color: "#124061" }}>
                  Register
                </Link>
              </label>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(
  withRouter(withStyles(styles)(Login))
);
