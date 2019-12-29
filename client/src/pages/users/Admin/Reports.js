import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Chart from "../../components/Chart";

import {
  allVacations,
  countriesToSelect,
  addVacation,
  addImage,
  editOrDelete,
  singleVacationDetails
} from "../../../store/actions/vacations.actions";
import { userDetails, loggedOut, followedVacsForReports } from "../../../store/actions/users.actions";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* REDIRECTING STATES */
      loginRedirect: false,
      reportsredirect: false,
      homeRedirect: false,
      editRedirect: false,
      deleteRedirect: false,
      adminRedirect: false,
      confirmRedirect: false
      /* REDIRECTING STATES */
    };
  }

  //=============================================//

  /* INITIAL PAGE LOAD */
  componentWillMount() {
    if (this.props.details.role !== "admin") {
      this.setState({ loginRedirect: true });
    }
    this.props.allVacations()
    this.props.userDetails();
    this.getChartData();
  }
  /* INITIAL PAGE LOAD */

  getChartData() {
    this.setState({
      chartData: {
        datasets: [
          { 
            label: "Following this vacation",
            fill: true,
            lineTension: 0.1,
            backgroundColor: "rgba(255, 193, 7, 0.2)",
            borderColor: "rgba(255, 193, 7, 1)",
            borderWidth: 1,
            borderDashOffset: 10,
            borderJoinStyle: "miter",
            hoverBackgroundColor: "rgba(255, 193, 7, 0.4)",
            data: this.props.summeryReports && this.props.summeryReports.map(v=>{
              return v.counter            
            }),
            spanGaps: true
          },
        ],
        labels: this.props.summeryReports && this.props.summeryReports.map(v=>{
          return "Vacation Id - " + v.vacation_id
        })
      }
    });
  }

  /* INPUTS, FORMS & OTHER FUNCTIONS */

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

  handleAdmin = e => {
    e.preventDefault();
    this.setState({ adminRedirect: true });
  };

  /* INPUTS, FORMS & OTHER FUNCTIONS */

  render() {
    /* REDIRECTS */
    if (this.state.homeRedirect === true) {
      return <Redirect to="/" />;
    }

    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }

    if (this.state.adminRedirect === true) {
      return <Redirect to="/admin" />;
    }
    /* REDIRECTS */

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
                  <ul className="navbar-nav mt-2 mt-sm-0">
                  <li className="nav-item">
                      <Link
                        to=""
                        className="nav-link"
                        onClick={this.handleAdmin}
                      >
                        Admin Page
                      </Link>
                    </li>
                  </ul>
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
                    {this.props.details.firstname}'s Reports Page
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </Router>

        <div className="container col-md">
          <div className="mx-auto col-md-10 mb-4">
            <Chart chartData={this.state.chartData} />
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
    countries: state.countries,
    log_out: state.login,
    redirect: state.redirect,
    confirm: state.confirm,
    singleDetails: state.singleVacation,
    summeryReports: state.summeryReports
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allVacations: vacations => dispatch(allVacations(vacations)),
    addVacation: vacDetails => dispatch(addVacation(vacDetails)),
    singleVacationDetails: singleDetails =>
      dispatch(singleVacationDetails(singleDetails)),
    followedVacsForReports: summeryReports => dispatch(followedVacsForReports(summeryReports)),
    addImage: data => dispatch(addImage(data)),
    editOrDelete: pageType => dispatch(editOrDelete(pageType)),
    userDetails: details => dispatch(userDetails(details)),
    countriesToSelect: countries => dispatch(countriesToSelect(countries)),
    loggedOut: log_out => dispatch(loggedOut(log_out))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reports);
