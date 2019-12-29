import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  allVacations,
  getVacationsAndFollowers
} from "../../store/actions/vacations.actions";
import {
  userDetails,
  loggedOut,
  loggedIn
} from "../../store/actions/users.actions";

import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

class ReRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: "http://localhost:3001/users",
      loginRedirect: false,
      homeRedirect: false,
      userRedirect: false
    };
  }

  //=============================================//

  componentDidMount() {
    //INITIAL STATE\\
    if (this.props.log_in !== true) {
      this.setState({ loginRedirect: true });
    } else {
      this.setState({ userRedirect: true })
    }
    //INITIAL STATE\\
  }

  render() {


    if (this.state.userRedirect === true) {
      return <Redirect to="/all" />;
    }

    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacations: state.vacations,
    details: state.details,
    log_out: state.login,
    log_in: state.login,
    followedVacs: state.followedVacs
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allVacations: vacations => dispatch(allVacations(vacations)),
    getVacationsAndFollowers: followedVacs =>
      dispatch(getVacationsAndFollowers(followedVacs)),
    userDetails: details => dispatch(userDetails(details)),
    loggedOut: log_out => dispatch(loggedOut(log_out)),
    loggedIn: log_in => dispatch(loggedIn(log_in))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReRender);
