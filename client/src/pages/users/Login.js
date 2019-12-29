import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { userDetails, loginDetails, loggedIn, loggedOut, followedVacsForReports } from "../../store/actions/users.actions";
import { allVacations } from '../../store/actions/vacations.actions'
import {
  Link,
  Redirect,
} from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hidden: "fa fa-eye-slash",
      hideText: false,
      btn1: false,
      btn2: true,
      inputType: "password",
      msg: "",
      adminRedirect: false,
      redirectHome: false,
      userRedirect: false,
      loginRedirect: false,
      userLogin: {
        admin: "",
        user: ""
      }
    };
  }

  //=============================================//

  componentDidMount() {
    //INITIAL STATE\\
    this.props.userDetails();
    this.props.loginDetails();
    this.props.allVacations();
    //INITIAL STATE\\
  }

  //SHOW/HIDE PASSWORD OPTION - FORM\\
  showHidePassword = e => {
    e.preventDefault();
    if (this.state.hideText === false) {
      this.setState({ hideText: true, hidden: "fa fa-eye", inputType: "text" });
    } else {
      this.setState({
        hideText: false,
        hidden: "fa fa-eye-slash",
        inputType: "password"
      });
    }
  };
  //SHOW/HIDE PASSWORD OPTION - FORM\\


  //INPUTS STATE\\
  loginInputs = e => {
    return new Promise(resolve => {
      resolve(this.setState({ [e.target.name]: e.target.value }));
      this.setState({ msg: "", usrpwd: "", usr: "", pwd: "" });      
    });
  };
  //INPUTS STATE\\

  //LOGIN BUTTON\\
  handleLogin = async e => {
    e.preventDefault();
    const userLogin = {
      user: this.state.username,
      pass: this.state.password
    };
    axios
      .post("http://localhost:3001/users/login", userLogin, { headers: {} })
      .then((res, req) => {
        if (res.data === "check-status-1") {
          this.setState({ usr: "Please enter a username!" });
        }
        if (res.data === "check-status-2") {
          this.setState({ pwd: "Please enter a password!" });
        }
        if (res.data === "check-status-3") {
          this.setState({ usrpwd: "Please fill all required fields!" });
        }
        if (res.data === "Error") {
          this.setState({
            msg: "You entered a wrong username or password! Please try again!"
          });
          //USER VALIDATION//
        }
        if (res.data.role === "admin") {
          this.setState({ btn1: true, btn2: false });
          this.props.loggedIn()
          localStorage.setItem("userKey", res.data.key.userKey)
            this.props.followedVacsForReports()
            setTimeout(() => {
              this.setState({ admin: res.data, adminRedirect: true, btn1: false, btn2: true});
            }, 3000);
        }
        if (res.data.role === "subscriber") {
            this.setState({ btn1: true, btn2: false });
            this.props.loggedIn()
            localStorage.setItem("userKey", res.data.key.userKey);
              setTimeout(() => {
                this.setState({ subscriber: res.data, userRedirect: true, btn1: false, btn2: true }); 
              }, 3000);
        }
        //USER VALIDATION//
      });
  };
  //LOGIN BUTTON\\

  //RE-LOGIN BUTTON\\
  handleReLogin = e => {
    e.preventDefault()
    if (this.props.details.role === "admin") {
      this.props.loggedIn()
      this.setState({ btn1: true, btn2: false });
      this.props.followedVacsForReports()
      setTimeout(() => {
        this.setState({adminRedirect: true,  btn1: false, btn2: true});
      }, 1200);
    }
    if (this.props.details.role === "subscriber") {
      this.props.loggedIn()
      this.setState({ btn1: true, btn2: false });
      setTimeout(() => {
        this.setState({userRedirect: true,  btn1: false, btn2: true});
      }, 1200);
    }
  };
  //RE-LOGIN BUTTON\\

  //LOGOUT BUTTON\\
  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("userKey");
    this.props.loggedOut()
    this.props.loginDetails();
  };
  //LOGOUT BUTTON\\

  //HOME BUTTON\\
  redirectHome = e => {
    e.preventDefault();
    this.setState({ redirectHome: true });
  };
  //HOME BUTTON\\

  render() {
    //REDIRECTS//
    if (this.state.redirectHome === true) {
      return <Redirect to="/" />;
    }
    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }
    if (this.state.userRedirect === true) {
      return <Redirect to="/all" />;
    }
    if (this.state.adminRedirect === true) {
      return <Redirect to="/admin" />;
    }
    //REDIRECTS//
        

    return (
      <div className="jumboWelcome">
        <div className="container vertical-center">
          <div className="container col-lg-8">
            <div className="mb-3 text-center">
              <button
                type="button"
                className="btn btn-primary btn-sm shadow"
                disabled={this.state.btn1}
                onClick={this.redirectHome}
              >
                <i className="fa fa-chevron-left"></i>
                <i className="fa fa-chevron-left"></i> Back To Homepage
              </button>
            </div>
            <br />
            <div className="jumbotron shadow">
              <h3 className="text-center header">
                {this.props.isLoggedIn.loginText}
              </h3>
              <br />
              <form
                className="form-group"
                hidden={this.props.isLoggedIn.formHide}
              >
                <small style={{ color: "red" }}>
                  {this.state.msg} {this.state.usrpwd} {this.state.usr}
                </small>
                <input
                  type="usr"
                  name="username"
                  id="userlLogin"
                  className="form-control"
                  placeholder="Username"
                  disabled={this.state.btn1}
                  onChange={this.loginInputs}
                />
                <br />
                <small style={{ color: "red" }}>{this.state.pwd}</small>
                <div className="input-group">
                  <input
                    type={this.state.inputType}
                    name="password"
                    id="passwordLogin"
                    className="form-control"
                    placeholder="Password"
                    disabled={this.state.btn1}
                    onChange={this.loginInputs}
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      onClick={this.showHidePassword}
                      className="input-group-text"
                      title="Show/Hide Password"
                      disabled={this.state.btn1}
                    >
                      <i className={this.state.hidden}></i>
                    </button>
                  </div>
                </div>
                <br />
                <button
                  type="button"
                  className="btn btn-outline-primary form-control"
                  hidden={this.state.btn1}
                  onClick={this.handleLogin}
                >
                  Login
                </button>
                <div className="justify-content-center d-flex">
                  <button
                    type="button"
                    className="spinner-grow text-primary"
                    hidden={this.state.btn2}
                  />
                </div>
                <div className="text-left mt-3" hidden={this.state.btn1}>
                  Don't have an account yet?
                  <Link to="/register" className="ml-1 alert-link">
                    Sign Up
                  </Link>
                </div>
              </form>
              <form
                className="form-group"
                hidden={this.props.isLoggedIn.secondForm}
              >
                <button
                  type="button"
                  className="btn btn-primary form-control" hidden={this.state.btn1}
                  onClick={this.handleReLogin}
                >
                  Continue Here!
                </button>
                <div className="justify-content-center d-flex">
                  <button
                    type="button"
                    className="spinner-grow text-primary"
                    hidden={this.state.btn2}
                  />
                </div>
                <div className="text-left mt-3" hidden={this.state.btn1}>
                  Or
                  <Link
                    to="#"
                    className="ml-1 alert-link"
                    onClick={this.handleLogout}
                  >
                    Logout Now
                  </Link>
                </div>
              </form>
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
    log_in: state.login,
    log_out: state.login,
    userFollow: state.userFollow
  };
};
const mapDispatchToProps = dispatch => {
  return {
    userDetails: details => dispatch(userDetails(details)),
    loginDetails: login => dispatch(loginDetails(login)),
    loggedIn: log_in => dispatch(loggedIn(log_in)),
    loggedOut: log_out => dispatch(loggedOut(log_out)),
    allVacations: vacations => dispatch(allVacations(vacations)),
    followedVacsForReports: followedReports => dispatch(followedVacsForReports(followedReports)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);