import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userDetails, loginDetails } from "../store/actions/users.actions";
import {
  allVacations,
  getVacationsAndFollowers
} from "../store/actions/vacations.actions";

class WelcomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: "d-none",
      button: "d-block",
      checked: "Checked",
      registerRedirect: false,
      loginRedirect: false,
      adminRedirect: false,
      userRedirect: false,
      loggedIn: "Login"
    };
  }

  componentDidMount() {
    this.props.userDetails();
    this.props.loginDetails();
    this.props.allVacations();
  }

  componentWillReceiveProps() {
    if (this.props.details.role) {
      this.setState({ loggedIn: "Login Back" });
    }
    if (!localStorage.getItem("userKey")) {
      this.setState({ loggedIn: "Login" });
    }
  }

  registerRef = e => {
    e.preventDefault();
    localStorage.removeItem("userKey");
    this.setState({ registerRedirect: true });
  };

  loginRef = e => {
    e.preventDefault();
    if (!localStorage.getItem("userKey") || this.props.details === "") {
      localStorage.removeItem("userKey");
      this.setState({ loginRedirect: true });
    }
    if (this.props.details.role === "admin") {
      this.setState({ adminRedirect: true });
    }
    if (this.props.details.role === "subscriber") {
      this.setState({ userRedirect: true });
    }
  };

  render() {
    if (this.state.registerRedirect === true) {
      return <Redirect to="/register" />;
    }
    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }

    if (this.state.adminRedirect === true) {
      return <Redirect to="/admin" />;
    }
    if (this.state.userRedirect === true) {
      return <Redirect to="/all" />;
    }

    return (
      <div>
        <div className="jumbotron jumbotron-fluid jumboWelcome mb-auto">
          <div className="container text-center">
            <h1 className="display-4 welcomeHeader">Welcome To JDTours!</h1>
            <br />
            <div className="row justify-content-center">
              <div className="col-md-3 mb-3">
                <button
                  type="button"
                  className="btn btn-warning btn-lg form-control shadow text-dark"
                  onClick={this.registerRef}
                >
                  Register
                </button>
              </div>
              <div className="col-md-3">
                <button
                  type="button"
                  className="btn btn-primary btn-lg form-control shadow text-light"
                  onClick={this.loginRef}
                >
                  {this.state.loggedIn}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.details,
    isLoggedIn: state.isLoggedIn,
    userFollow: state.userFollow
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userDetails: details => dispatch(userDetails(details)),
    loginDetails: isLoggedIn => dispatch(loginDetails(isLoggedIn)),
    getVacationsAndFollowers: vacsAndFollowers =>
      dispatch(getVacationsAndFollowers(vacsAndFollowers)),
    allVacations: vacations => dispatch(allVacations(vacations))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WelcomePage);
