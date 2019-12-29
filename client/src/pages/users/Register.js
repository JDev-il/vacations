import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";

import {
  allVacations,
  getVacationsAndFollowers
} from "../../store/actions/vacations.actions";
import {
  userDetails,
  loggedOut,
  loggedIn
  // followVacation
} from "../../store/actions/users.actions";



class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg: "",
      styleUsername: "",
      homeRedirect: false,
      hiddenDiv: true,
      mainMsg: "",
      showHide: true,
      btn1: false,
      btn2: true,
      fieldValidation: {
        firstValidation: "",
        lastValidation: "",
        usernameValidation: "",
        passwordValidation: "",
        emailValidation: ""
      }
    };
  }

  //=============================================//

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ msg: "", styleUsername: "", mainMsg: "", hiddenDiv: true });
    this.setState({ showHide: false });
    const target = e.target.name + "Validation";
    if (e.target.name == e.target.name && e.target.value.length == 0) {
      this.setState({ [target]: "" });
    } else {
      if (e.target.name == e.target.name) {
        this.setState({ [target]: "is-valid" });
      }
    }
  };

  checkRegistration = e => {
    e.preventDefault();
    // const emailValid = this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    // const userValid = this.state.user.match(/^[a-zA-Z0-9_]+$/)
    const userReg = {
      first: this.state.first,
      last: this.state.last,
      user: this.state.username,
      password: this.state.password,
      email: this.state.email
    };
    if (
      !userReg.first ||
      !userReg.last ||
      !userReg.user ||
      !userReg.password ||
      !userReg.email
    ) {
      this.setState({
        mainMsg: "Please fill all fields below!",
        hiddenDiv: false
      });

      // this.userValidation(this.state.username, this.state.password)
    } else {
      axios
        .post("http://localhost:3001/users/registration", userReg)
        .then(res => {
          //AUTH VIA SERVER!!!//
          if (res.data === "ERROR") {
            this.setState({
              mainMsg:
                "This username is already taken! Please choose a different one",
              styleUsername: "red",
              hiddenDiv: false
            });
          } else {
            if (res.data !== "ERROR") {
              this.setState({ btn1: true, btn2: false });
              localStorage.setItem("userKey", res.data.key.userKey);
              this.props.loggedIn()
              setTimeout(() => {
                this.setState({
                  userRedirect: true,
                  btn1: false,
                  btn2: true
                });
              }, 1500);
            }
          }
        });
    }
  };

  redirectHome = e => {
    e.preventDefault();
    this.setState({ homeRedirect: true });
  };

  render() {
    //REDIRECTS//
    if (this.state.homeRedirect === true) {
      return <Redirect to="/" />;
    }
    if (this.state.loginRedirect === false) {
      return <Redirect to="/login" />;
    }
    if (this.state.userRedirect === true) {
      return <Redirect to="/all" />;
    }
    //REDIRECTS//

    return (
      <div>
        <div className="jumbotron jumbotron-fluid jumboWelcome mb-auto">
          <div className="container text-center">
            <h1 className="display-4 welcomeHeader">New Registration</h1>
            <br />
            <div className="mb-3 text-center">
              <button
                type="button"
                className="btn btn-warning btn-sm shadow"
                disabled={this.state.btn1}
                onClick={this.redirectHome}
              >
                <i className="fa fa-chevron-left"></i>
                <i className="fa fa-chevron-left"></i> Back To Homepage
              </button>
            </div>
            <div className="row justify-content-center">
              <div className="container col-md-10">
                <form className="form-group">
                  <br />
                  <div hidden={this.state.btn1}>
                    <p
                      className="alert alert-info text-left"
                      role="alert"
                      disabled={this.state.btn1}
                      hidden={this.state.showHide}
                    >
                      Already have an account?
                      <Link to="/login" className="alert-link ml-1">
                        Sign in
                      </Link>
                      <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </p>
                  </div>
                  <p
                    className="alert alert-warning text-left"
                    role="alert"
                    hidden={this.state.btn2}
                    // hidden={this.state.showHide}
                  >
                    Please wait! You are being redirected to login page..
                  </p>
                  <div
                    className="alert alert-danger text-left"
                    hidden={this.state.hiddenDiv}
                  >
                    {this.state.mainMsg}
                  </div>
                  <input
                    type="text"
                    className={`form-control ${this.state.firstValidation}`}
                    placeholder="Your First Name"
                    name="first"
                    disabled={this.state.btn1}
                    onChange={this.handleInputs}
                  />
                  <br />
                  <input
                    type="text"
                    className={`form-control ${this.state.lastValidation}`}
                    placeholder="Your Last Name"
                    name="last"
                    disabled={this.state.btn1}
                    onChange={this.handleInputs}
                  />
                  <br />
                  <div id="smallTextReg">{this.state.msg}</div>
                  <input
                    type="text"
                    className={`form-control ${this.state.usernameValidation}`}
                    style={{ color: this.state.styleUsername }}
                    placeholder="Pick a Username"
                    name="username"
                    disabled={this.state.btn1}
                    onChange={this.handleInputs}
                  />
                  <br />
                  <input
                    type="text"
                    className={`form-control ${this.state.passwordValidation}`}
                    placeholder="Choose Password"
                    name="password"
                    disabled={this.state.btn1}
                    onChange={this.handleInputs}
                  />
                  <br />
                  <input
                    type="email"
                    className={`form-control ${this.state.emailValidation}`}
                    placeholder="Your Email Address"
                    name="email"
                    disabled={this.state.btn1}
                    onChange={this.handleInputs}
                  />
                  <br />
                  <button
                    type="button"
                    className="btn btn-warning form-control"
                    hidden={this.state.btn1}
                    onClick={this.checkRegistration}
                  >
                    Register
                  </button>
                  <div className="justify-content-center d-flex">
                    <button
                      type="button"
                      className="spinner-grow text-warning"
                      hidden={this.state.btn2}
                    />
                  </div>
                </form>
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
    log_out: state.login,
    log_in: state.login,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allVacations: vacations => dispatch(allVacations(vacations)),
    getVacationsAndFollowers: followedVacs => dispatch(getVacationsAndFollowers(followedVacs)),
    loggedOut: log_out => dispatch(loggedOut(log_out)),
    loggedIn: log_in => dispatch(loggedIn(log_in)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
