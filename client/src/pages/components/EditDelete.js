import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import Modal from "./ModalDelete.js";
import axios from "axios";

import {
  allVacations,
  countriesToSelect,
  addVacation,
  addImage,
  editOrDelete,
  editVaction,
  deleteVacation
} from "../../store/actions/vacations.actions";
import { userDetails, loggedOut } from "../../store/actions/users.actions";

class EditDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "",
      id: "",
      url: "http://localhost:3001/public/images",
      loginRedirect: false,
      adminRedirect: false,
      jumbotext: "",
      jumboColor: "",
      warning: true,
      editPage: "",
      deletePage: "",
      hideModal: true,
      hideMessage1: true,
      hideMessage2: true,
      spinner: true,
      delMsg: true,
      spinnerDel: true,
      imageSuccess: true,
      reminder: true,
      oldImage: false,
      newImage: true,
      selectedFile: "",
      fileLable: "",
      modal: ""
    };
  }

  componentWillMount() {
    this.props.userDetails();
    if (this.props.role !== true) {
      this.props.loggedOut();
      this.setState({ loginRedirect: true });
    } else {
      if (this.props.pageType.page === "edit") {
        this.setState({
          editPage: false,
          deletePage: true,
          jumbotext: "Edit Vacation",
          jumboColor: "success"
        });
      }
      if (this.props.pageType.page === "delete") {
        this.setState({
          deletePage: false,
          editPage: true,
          jumbotext: "Delete Vacation",
          jumboColor: "danger"
        });
      }
    }
  }

  toggleModal = () => {
    this.setState({
      modal: "modal",
      hideModal: false
    });
  };

  handleClose = () => {
    this.setState({
      modal: "",
      hideModal: true
    });
  };

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleStartDate = async e => {
    e.preventDefault();
    return new Promise(resolve => {
      resolve(this.setState({ starts: e.target.value }));
    }).then(() => {
      let ends = this.props.vacationDetails.ends;
      if (Date.parse(this.state.starts) > Date.parse(ends)) {
        this.setState({ warning: false });
      }
    });
  };

  handleEndDate = async e => {
    e.preventDefault();
    this.setState({ ends: e.target.value });
    await new Promise(resolve => {
      resolve(this.setState({ ends: e.target.value }));
    });
    let ends = this.props.vacationDetails.ends;
    if (Date.parse(this.state.ends) < Date.parse(ends)) {
      this.setState({ warning: false });
    }
    if (Date.parse(this.state.ends) >= Date.parse(this.state.starts)) {
      this.setState({ warning: true });
    }
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
      this.setState({ reminder: false, oldImage: true, newImage: false });
    }
  };

  handleUpload = e => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", this.state.selectedFile);
    if (data.get("file")) {
      this.setState({ uploaded: true, reminder: true, imageSuccess: false });
      this.props.addImage(data);
    }
  };

  handleEditForm = e => {
    e.preventDefault();
    let editDetails = {
      id: this.props.vacationDetails.id,
      destination: this.state.country,
      description: this.state.description,
      image: this.state.fileLable,
      starts: this.state.starts,
      ends: this.state.ends,
      price: this.state.price
    };
    if (this.state.warning === true) {
      const objDetails = {
        editDetails,
        ...this.props.vacationDetails
      };
      this.props.editVaction(objDetails);
      this.setState({ editPage: true, hideMessage1: false });
      setTimeout(() => 
      {this.setState({ hideMessage1: true, hideMessage2: false, spinner: false});
      }, 2000);
      setTimeout(() => {this.setState({ adminRedirect: true });
      }, 4000);
    } else {
      return false;
    }
  };

  handleDeleteVacation = e => {
    e.preventDefault();
    let id = this.props.vacationDetails.id;
    this.props.deleteVacation(id);
    this.setState({ deletePage: true, delMsg: false });
    setTimeout(() => 
    {this.setState({ spinnerDel: false});
    }, 1000);
    setTimeout(() => {this.setState({ adminRedirect: true });
    }, 2000);
  };


  handleGoBack = e => {
    e.preventDefault();
    this.setState({ adminRedirect: true });
  };

 
  render() {
    
    /* REDIRECTS */
    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }
    if (this.state.adminRedirect === true) {
      return <Redirect to="/admin" />;
    }
    /* REDIRECTS */


    var destinationPick =
      this.props.countries &&
      this.props.countries.map(country => {
        return <option key={country.alpha2Code}>{country.name}</option>;
      });


    const date = new Date().toJSON();
    const updateDate = date.split("T");
    const minDate = updateDate[0];
  

    const pic = () => {
      if (this.props.vacationDetails.image === undefined) {
        return false;
      } else {
        if (!this.state.fileLable) {
          return (<img src={this.state.url + "/" + this.props.vacationDetails.image}
          className="img-fluid"/>
          );
        } else {
          return (<img src={this.state.url + "/" + this.state.fileLable}
              className="img-fluid"/>
          );
        }}
      };

    var modal = (
      <Modal
        modal={this.state.modal}
        target={this.state.target}
        handleClose={this.handleClose}
      />
    );

    return (
      <div>
        <div
          className={`jumbotron jumbotron-fluid bg-${this.state.jumboColor}`}
        >
          <div className="container text-center">
            <h1 className="display-4 jumboText">
              {this.state.jumbotext} - {this.props.vacationDetails.id}
            </h1>
          </div>
        </div>
        
        <div className="container" id="messagesEditDelete">
          <div hidden={this.state.hideMessage1}>
            <h3 className="messageText text-center" >
                Changes have been saved!
            </h3>
          </div>
          <div hidden={this.state.hideMessage2}>
            <h3 className="messageText text-center">
                Please hold...
            </h3>
            <div className="text-center" hidden={this.state.spinner}>
              <span className="spinner-grow text-success" />
            </div>
          </div>
        </div>

        <div className="container col-md-6" hidden={this.state.editPage}>
          <div className="justify-content-center">
            <form className="form-group">
              <div className="form-group mb-3">
                <label htmlFor="countries">Pick a destination:</label>
                <select
                  className="form-control"
                  name="country"
                  onChange={this.handleInputs}>
                  <option>{this.props.vacationDetails.destination}</option>
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
                  placeholder={this.props.vacationDetails.description}
                  onChange={this.handleInputs}
                />
              </div>
              <div className="form-group">
                <label>
                  Starts on -{" "}
                  <strong>{this.props.vacationDetails.starts}</strong>, you can
                  edit below:
                </label>
                <input
                  type="date"
                  name="starts"
                  min={minDate}
                  max="3000-12-31"
                  className="form-control"
                  onChange={this.handleStartDate}
                />
              </div>
              <div className="form-group">
                <label>
                  Ends on - <strong>{this.props.vacationDetails.ends}</strong>,
                  you can edit below:
                </label>
                <div hidden={this.state.warning}>
                  <p style={{ color: "red" }}>
                    Please choose a valid end date!
                  </p>
                </div>
                <input
                  type="date"
                  name="ends"
                  min={this.state.starts}
                  max="3000-12-31"
                  className="form-control"
                  onChange={this.handleEndDate}
                />
              </div>
              <div className="form-group">
                <label>Price:</label>
                <input
                  type="number"
                  name="price"
                  placeholder={"$" + `${this.props.vacationDetails.price}`}
                  className="form-control"
                  onChange={this.handleInputs}
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
                <br />
                <div className="mt-3">{pic()}</div>
                <button
                  type="button"
                  className="btn btn-info btn-sm form-group shadow-sm mt-3 mb-4"
                  onClick={this.handleUpload}
                >
                  Upload Image
                </button>
              </div>
              <hr />
              <div className="row mt-4 mb-3 justify-content-center">
                <div className="form-group">
                  <button
                    type="button"
                    className="btn btn-success form-control shadow-sm"
                    onClick={this.handleEditForm}
                  >
                    Submit Changes
                  </button>
                </div>
                <div className="form-group ml-2">
                  <button
                    type="button"
                    className="btn btn-danger form-control shadow-sm"
                    onClick={this.handleGoBack}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="container" id="messagesEditDelete">
            <div hidden={this.state.delMsg}>
            <h3 className="messageText text-center">
                Vacation was successfully deleted!
            </h3>
            </div>
            <div className="text-center" hidden={this.state.spinnerDel}>
              <span className="spinner-grow text-danger" />
            </div>
        </div>
        <div className="container" hidden={this.state.deletePage}>
          <div className="alert alert-danger" role="alert">
            Warning! You are about to delete a vacation!
            <br />
            <strong>Are you sure you want to continue?</strong>
            <div
              className="mt-3"
              data-toggle="modal"
              data-target="#myModal"
              onClick={this.toggleModal}
            >
              <Link to="#">You can check vacation's details here >></Link>
            </div>
          </div>
          <br />
          <div className="row justify-content-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.handleDeleteVacation}
            >
              Yes, Delete Vacation
            </button>
            <button
              type="button"
              className="btn btn-warning ml-2"
              onClick={this.handleGoBack}
            >
              No, Go Back!
            </button>
          </div>
        </div>
        <div hidden={this.state.hideModal}>{modal}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    vacations: state.vacations,
    details: state.details,
    role: state.isAdmin,
    countries: state.countries,
    log_out: state.login,
    redirect: state.redirect,
    confirm: state.confirm,
    pageType: state.pageType,
    vacationDetails: state.singleVacation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    allVacations: vacations => dispatch(allVacations(vacations)),
    addVacation: vacDetails => dispatch(addVacation(vacDetails)),
    addImage: data => dispatch(addImage(data)),
    userDetails: details => dispatch(userDetails(details)),
    countriesToSelect: countries => dispatch(countriesToSelect(countries)),
    loggedOut: log_out => dispatch(loggedOut(log_out)),
    editOrDelete: pageType => dispatch(editOrDelete(pageType)),
    editVaction: editingVac => dispatch(editVaction(editingVac)),
    deleteVacation: deleteVac => dispatch(deleteVacation(deleteVac))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditDelete);
