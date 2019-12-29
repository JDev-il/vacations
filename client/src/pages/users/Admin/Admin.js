import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import {
  allVacations,
  countriesToSelect,
  addVacation,
  addImage,
  editOrDelete,
  singleVacationDetails,
} from "../../../store/actions/vacations.actions";
import { userDetails, loggedOut, followedVacsForReports } from "../../../store/actions/users.actions";
import { BrowserRouter as Router, Redirect, Link } from "react-router-dom";
import FormData from "form-data";

class Admin extends Component {
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
      confirmRedirect: false,
      /* REDIRECTING STATES */

      selectedFile: null,
      showHide: true,
      alert: true,
      uploaded: false,
      alertPhoto: true,
      editId: "",
      deleteId: "",
      fileLable: "Choose an image to upload..",
      reminder: true,
      reminder2: true,
      reminderDate: true,
      imageSuccess: true
    };
  }

  //=============================================//

  /* INITIAL PAGE LOAD */
  componentDidMount() {
    if (this.props.log_out !== true) {
      this.setState({ loginRedirect: true });
    }
      this.props.allVacations();
      this.props.userDetails();
      this.props.countriesToSelect();
      this.props.followedVacsForReports()
  }
  /* INITIAL PAGE LOAD */

  /* INPUTS, FORMS & OTHER FUNCTIONS // INPUTS, FORMS & OTHER FUNCTIONS */

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

  handleReports = e => {
    e.preventDefault();
    this.setState({ reportsRedirect: true });
  };

  /* E.TARGET.VALUES */
  handleModalInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleStartDate = e => {
    this.setState({ starts: e.target.value });
  };
  handleEndDate = e => {
    this.setState({ ends: e.target.value });
  };
  handleModalFile = e => {
    e.preventDefault();
    if (e.target.files[0] === undefined) {
      return false;
    } else {
      this.setState({
        selectedFile: e.target.files[0],
        fileLable: e.target.files[0].name
      });
      this.setState({ reminder: false });
    }
  };
  /* E.TARGET.VALUES */

  /* FORM SUBMIT */
  handleUpload = e => {
    e.preventDefault();
    if(!this.state.selectedFile){
      this.setState({ reminder2: false });
      setTimeout(() => {
        this.setState({ reminder2: true });
      }, 2000);
      return false
    }
    const data = new FormData();
    data.append("file", this.state.selectedFile);
      if (data.get("file")) {
        this.setState({ uploaded: true, reminder: true, reminder2: true, imageSuccess: false });
        this.props.addImage(data);
      }
  };

  onSubmit = e => {
    e.preventDefault();
    if (!this.state.selectedFile || this.state.uploaded === false) {
      this.setState({ alert: false });
      setTimeout(() => {
        this.setState({ alert: true });
      }, 4000);
    } else {
      const vacationDetails = {
        destination: this.state.country,
        description: this.state.description,
        image: this.state.selectedFile.name,
        starts: this.state.starts,
        ends: this.state.ends,
        price: this.state.price
      };

      axios
        .post("http://localhost:3001/vacations/add", vacationDetails)
        .then(res => {
          if (res.data === "check-status-1") {
            this.setState({ alert: false });
            setTimeout(() => {
              this.setState({ alert: true });
            }, 4000);
          }
          if (res.data === "passed") {
            this.setState({ clicked: true, confirmRedirect: true });
          }
        });
    }
  };
  /* FORM SUBMIT */

  /* EDIT & DELETE VACATION BUTTONS */
  handleEdit = e => {
    new Promise((resolve, reject) => {
      let id = e.target.name;
      const pageType = {
        id,
        page: "edit"
      };
      this.setState({ id: e.target.name });
      this.props.editOrDelete(pageType);
      resolve(this.props.singleVacationDetails(id));
    }).then(() => {
      return new Promise((resolve, reject) => {
        let id = this.state.id;
        resolve(this.setState({ editRedirect: true, editId: id }));
      });
    });
  };


  handleDelete = e => {
    new Promise((resolve, reject) => {
      let id = e.target.name;
      const pageType = {
        id,
        page: "delete"
      };
      this.setState({ id: e.target.name });
      this.props.editOrDelete(pageType);
      resolve(this.props.singleVacationDetails(id));
    }).then(() => {
      return new Promise((resolve, reject) => {
        let id = this.state.id;
        resolve(this.setState({ deleteRedirect: true, deleteId: id }));
      });
    });
  };
  /* EDIT & DELETE VACATION BUTTONS */

  /* INPUTS, FORMS & OTHER FUNCTIONS // INPUTS, FORMS & OTHER FUNCTIONS */


  render() {    

    /* REDIRECTS */
    if (this.state.homeRedirect === true) {
      return <Redirect to="/" />;
    }

    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }

    if (this.state.confirmRedirect === true) {
      return <Redirect to="/admin/vaconfirm" />;
    }

    if (this.state.reportsRedirect === true) {
      return <Redirect to="/admin/reports" />;
    }

    if (this.state.editRedirect === true) {
      return <Redirect to={`/vacation/${this.state.editId}/edit`} />;
    }

    if (this.state.deleteRedirect === true) {
      return <Redirect to={`/vacation/${this.state.deleteId}/delete`} />;
    }
    /* REDIRECTS */

    /* DISPLAY THE VACATION CARDS */
    var displayVacations =
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
              <div className="row">
                <div className="ml-auto mb-3">
                  <div
                    className="float-left"
                    alt="Edit Vacation"
                    title="Edit Vacation"
                  >
                    <button
                      className="btn fa fa-pencil-square fa-2x"
                      onClick={this.icon}
                      name={vac.id}
                      onClick={this.handleEdit}
                    />
                  </div>
                  <div
                    className="float-left"
                    alt="Delete Vacation"
                    title="Delete Vacation"
                  >
                    <button
                      className="btn fa fa-trash fa-2x"
                      onClick={this.icon}
                      name={vac.id}
                      onClick={this.handleDelete}
                    />
                  </div>
                </div>
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
    /* DISPLAY THE VACATION CARDS */

    /* MODAL FORM - DESTINATION & DATES */
    var destinationPick =
      this.props.countries &&
      this.props.countries.map(country => {
        return <option key={country.alpha2Code}>{country.name}</option>; //! ADD CITY NEXT TO COUNTRY!!!
      });

    const date = new Date().toJSON();
    const updateDate = date.split("T");
    const minDate = updateDate[0];
    /* MODAL FORM - DESTINATION & DATES */

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
                      <div data-toggle="modal" data-target=".vacationModal">
                        <Link to="#" className="nav-link">
                          Add Vacations
                        </Link>
                      </div>
                    </li>
                  </ul>
                  <ul className="navbar-nav ml-auto mt-2 mt-sm-0">
                    <li className="nav-item">
                      <Link
                        to=""
                        className="nav-link"
                        onClick={this.handleReports}
                      >
                        Reports
                      </Link>
                    </li>
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
                    Welcome {this.props.details.firstname}{" "}
                    {this.props.details.lastname}!
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </Router>

        <div className="container col-md">
          <div
            className="container alert alert-danger"
            role="alert"
            hidden={this.state.alert}
          >
            Your vacation details weren't added since some fields were missing!
            <br />
            <strong>Please try again!</strong>
            <br />
            <button
              type="button"
              className="btn btn-success btn-sm mt-3 mb-2"
              data-toggle="modal"
              data-target=".vacationModal"
            >
              Continue Here
            </button>
          </div>
          <div className="container col-lg-10 mb-5">
          {displayVacations == false ?<div className="row"><div className="mx-auto text-center">
            <h4>{this.props.details.firstname}, no vacations were found!</h4><br />
            <button type="button" className="btn btn-info btn-lg shadow-sm" data-toggle="modal" data-target=".vacationModal">Add Vacation Now</button>
            </div></div> : <div className="row">{displayVacations}</div>}
          </div>
        </div>

        <div //"ADD VACATION" MODAL//
          className="modal fade vacationModal"
          aria-labelledby="vacationModalCenter"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg mx-auto">
            <div className="modal-content">
              <div className="modal-header bg-warning">
                <h3 className="modal-title mx-auto text-dark">
                  Add A New Vacation
                </h3>
              </div>
              <div className="modal-body">
                <h5 className="text-info mt-3">
                  Please fill out all vacation's details below:
                </h5>
                <br />
                <form className="form-group">
                  <div className="form-group">
                    <label htmlFor="countries">Pick a destination:</label>
                    <select
                      className="form-control"
                      name="country"
                      onChange={this.handleModalInputs}
                    >
                      <option>--</option>
                      {destinationPick}
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="5"
                      placeholder="Insert vacation's description:"
                      onChange={this.handleModalInputs}
                    />
                  </div>
                   <div className="form-group">
                    <label>Starts: </label>
                    <input
                      type="date"
                      name="starts"
                      min={minDate}
                      max="3000-12-31"
                      className="form-control"
                      onChange={this.handleStartDate}
                    />
                  </div>
                  <div
                    hidden={this.state.reminderDate}
                    className="text-left"
                    style={{ color: "red" }}
                  >
                    Please choose a start date first!
                  </div>
                  <div className="form-group" onClick={this.checkStart}>
                    <label>Ends:</label>
                    <input
                      type="date"
                      name="ends"
                      min={this.state.starts}
                      max="3000-12-31"
                      className="form-control"
                      disabled={!this.state.starts ? true : false}
                      onChange={this.handleEndDate}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      placeholder="Price in $"
                      onChange={this.handleModalInputs}
                    />
                  </div>
                  <div
                    hidden={this.state.reminder}
                    className="text-left"
                    style={{ color: "red" }}
                  >
                    Don't forget to click on "Upload Image"!
                  </div>
                  <div
                    hidden={this.state.imageSuccess}
                    className="text-left"
                    style={{ color: "green" }}
                  >
                    Image has been successfully uploaded!
                  </div>
                  <div
                    hidden={this.state.reminder2}
                    className="text-left"
                    style={{ color: "red" }}
                  >
                    No image was uploaded! Please try again..
                  </div>
                  <div className="form-group text-left custom-file mb-3 mt-3">
                    <input
                      type="file"
                      className="custom-file-input form-group"
                      name="filename"
                      accept="image/*"
                      onChange={this.handleModalFile}
                    />
                    <label className="custom-file-label">
                      {this.state.fileLable}
                    </label>
                    <button
                      type="button"
                      className="btn btn-info btn-sm form-group shadow-sm mt-3 mb-2"
                      onClick={this.handleUpload}
                    >
                      Upload Image
                    </button>
                  </div>
                  <div className="row mt-4 mb-3 justify-content-center">
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-outline-success form-control shadow-sm"
                        onClick={this.onSubmit}
                        data-dismiss="modal"
                      >
                        Submit Vacation
                      </button>
                    </div>
                    <div className="form-group ml-2">
                      <button
                        type="button"
                        className="btn btn-outline-danger form-control shadow-sm"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                    </div>
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
    singleVacationDetails: singleDetails => dispatch(singleVacationDetails(singleDetails)),
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
)(Admin);
