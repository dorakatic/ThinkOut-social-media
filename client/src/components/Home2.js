import React, { Component } from "react";
import { connect } from "react-redux";
import Login from "./Auth/Login";
import ReactLoading from "react-loading";

class Home2 extends Component {
  render() {
    const { isAuthenticated } = this.props;

    return (
      <div>
        {isAuthenticated ? (
          <Login />
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "10rem",
              marginLeft: "10rem",
            }}
          >
            <ReactLoading
              type={"bubbles"}
              color={"#3d5e75"}
              height={"40%"}
              width={"40%"}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home2);
