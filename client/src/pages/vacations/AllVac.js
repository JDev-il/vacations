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

class AllVac extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pathName: "http://localhost:3001/users",
      loginRedirect: false,
      homeRedirect: false,
      userRedirect: false,
      wrnMsg: true,
      successMsg: true,
      delMsgErr: true,
      delMsgOk: true,
      data: ""
    };
  }

  //=============================================//

  componentDidMount() {
    //INITIAL STATE\\
    if (this.props.log_out !== true) {
      this.setState({ loginRedirect: true });
    } else {
      this.props.userDetails();
      this.props.getVacationsAndFollowers();
    }
    //INITIAL STATE\\
  }

  handleLogout = e => {
    e.preventDefault();
    localStorage.removeItem("userKey");
    this.props.loggedOut();
    this.setState({ loginRedirect: true });
  };

  handleHome = e => {
    e.preventDefault();
    this.setState({ homeRedirect: true });
  };

  handleFollow = e => {
    e.preventDefault();
    var id = e.target.name;
    const followDetails = {
      vacId: id,
      usrId: this.props.details.id
    }
    axios.post(`${this.state.pathName}/followers/follow`, followDetails)
      .then(res => {
        if (res.data.status === false) {
          this.setState({ wrnMsg: false });
          setTimeout(() => {
            this.setState({ wrnMsg: true });
          }, 2000);
        }
        if (res.data.status === true) {
          this.props.loggedIn()
          this.setState({ successMsg: false });
          setTimeout(() => {
            this.setState({ successMsg: true, userRedirect: true });
          }, 2000);
        }
      });
  };

  handleUnfollow = e => {
    var id = e.target.name;
    const deleteDetails = {
      vacId: id,
      usrId: this.props.details.id
    }
    axios
      .delete(
        `${this.state.pathName}/followers/unfollow`, { data: deleteDetails })
      .then(res => {
        if (res.data === true) {
          this.setState({ userRedirect: true })
        }
      })
  };

  render() {
    //REDIRECTS//
    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }

    if (this.state.homeRedirect === true) {
      return <Redirect to="/" />;
    }

    if (this.state.userRedirect === true) {
      return <Redirect to="/rerender" />;
    }


    //REDIRECTS//
    var display =
      this.props.followedVacs &&
      this.props.followedVacs.map(vac => {
        let url = "http://localhost:3001/public/images";
        return (
          <div
            className="card col-md-3 mt-1 mb-1 cardColor mainCard shadow-sm"
            key={vac.vacation_id}
          >
            <img
              className="card-img-top image-fluid vacation-image shadow-sm"
              src={url + "/" + vac.image}
            />
            <div className="card-body">
              <div
                className="text-right"
                alt="UnFollow Vacation"
                title="UnFollow Vacation"
              >
                <button
                  type="button"
                  className="btn fas fa-calendar-minus fa-2x"
                  onClick={this.handleUnfollow}
                  name={vac.vacation_id}
                />
              </div>
              <h4 className="card-title vacation-card">
                {"Fly to " + vac.destination + "!"}{" "}
                <i className="fa fa-plane fa-1x" />
              </h4>
              <p className="overflowText">{vac.description}</p>
              <p className="card-text text-success textCard">
                {"ONLY " + "$" + vac.price + "!"}
              </p>
              <p className="card-text text-info mt-3 text-center textCardSecondary">
                {vac.starts + " - " + vac.ends}
              </p>
            </div>
          </div>
        );
      });

    var displayAllVacations =
      this.props.vacations &&
      this.props.vacations.map(vac => {
        let url = "http://localhost:3001/public/images";
        return (
          <div
            className="card col-md-3 mt-1 mb-1 cardColor mainCard shadow-sm"
            key={vac.id}
          >
            <img
              className="card-img-top image-fluid vacation-image shadow-sm"
              src={url + "/" + vac.image}
            />
            <div className="card-body">
              <div
                className="text-right"
                alt="Follow Vacation"
                title="Follow Vacation"
              >
                <button
                  type="button"
                  className="btn far fa-calendar-plus fa-2x"
                  onClick={this.handleFollow}
                  name={vac.id}
                />
              </div>
              <h4 className="card-title vacation-card">
                {"Fly to " + vac.destination + "!"}{" "}
                <i className="fa fa-plane fa-1x" />
              </h4>
              <p className="overflowText">{vac.description}</p>
              <p className="card-text text-success textCard">
                {"ONLY " + "$" + vac.price + "!"}
              </p>
              <p className="card-text text-info mt-3 text-center textCardSecondary">
                {vac.starts + " - " + vac.ends}
              </p>
            </div>
          </div>
        );
      });

    return (
      <div>
        <Router>
          <div>
            <div>
              <nav className="navbar navbar-expand-sm navbar-light bg-warning fixed-top">
                <Link to="#" className="navbar-brand" onClick={this.handleHome}>
                  JDTours
                </Link>
                <button
                  className="navbar-toggler d-lg-none"
                  type="button"
                  data-toggle="collapse"
                  data-target="#collapsibleNavId"
                  aria-controls="collapsibleNavId"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fas fa-bars fa-1x" />
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                  <ul className="navbar-nav ml-auto mt-2 mt-sm-0">
                    <li className="nav-item">
                      <Link
                        to=""
                        className="nav-link"
                        onClick={this.handleLogout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
              <div className="jumbotron jumbotron-fluid jumboHeader">
                <div className="container text-center">
                  <h1 className="jumbotronHeader display-4">
                    Hello {this.props.details.firstname}!
                  </h1>
                  <h3 className="jumbotronHeaderSmall">
                    Enjoy your next vacation!
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Router>

        <div className="container col-md">
          <br />
          <h3 className="text-center text-warning">
            Vacations You Are Following:
          </h3>
          <br />
          <div className="container col-lg-10">
            {display == false ? <div className="row"><div className="mx-auto"><h4>No vacations were found!</h4></div></div> : <div className="row">{display}</div>}
          </div>
        </div>
        <br />
        <hr style={{ border: "1px solid" }} className="text-warning" />
        <br />
        <h3 className="text-center text-dark">All Vacations:</h3>
        <br />
        <div className="container col-md-12">
          <div
            className="alert alert-danger"
            role="alert"
            hidden={this.state.wrnMsg}
          >
            <strong>Error!</strong> <br />
            You are already following this vacation!
          </div>
          <div
            className="alert alert-success"
            role="alert"
            hidden={this.state.successMsg}
          >
            You are now following this vacation!
          </div>
          <div className="container col-lg-10 mb-5">
            {displayAllVacations == false ? <div className="row mt-2 mb-4">
              <div className="mx-auto"><h4>Sorry, we are currently out of vacations!</h4></div>
            </div> : <div className="row">{displayAllVacations}</div>}
          </div>
        </div>
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
    followedVacs: state.followedVacs,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allVacations: vacations => dispatch(allVacations(vacations)),
    getVacationsAndFollowers: followedVacs =>
      dispatch(getVacationsAndFollowers(followedVacs)),
    userDetails: details => dispatch(userDetails(details)),
    loggedOut: log_out => dispatch(loggedOut(log_out)),
    loggedIn: log_in => dispatch(loggedIn(log_in)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllVac);