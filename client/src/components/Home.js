import React, { Component } from "react";

import { connect } from "react-redux";
import ListPost from "./Posts/ListPost";
import Home2 from "./Home2";

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props;
    //console.log(isAuthenticated);
    return <div>{isAuthenticated ? <ListPost /> : <Home2 />}</div>;
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Home);
