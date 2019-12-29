import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { singleVacationDetails } from "../../store/actions/vacations.actions";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: "http://localhost:3001/public/images"
    };
  }

  /* INITIAL PAGE LOAD */

  /* INITIAL PAGE LOAD */

  render() {
    // const modal = this.props.modal;

    const image = () => {
      if (this.props.vacationDelete.image === undefined) {
        return false;
      } else {
        return (
          <img
            src={this.state.url + "/" + this.props.vacationDelete.image}
            className="img-fluid"
          />
        );
      }
    };

    return (
      <div>
        <div //"ADD VACATION" MODAL//
          className={`${this.props.modal} fade`}
          id="myModal"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg mx-auto">
            <div className="modal-content">
              <div className="modal-header bg-info">
                <h3 className="modal-title mx-auto text-light">
                  Vacation Details:
                </h3>
              </div>
              <div className="modal-body">
                <form className="form-group">
                  <div className="form-group">
                    <label htmlFor="description">Destination:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.props.vacationDelete.destination}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea
                      className="form-control"
                      name="description"
                      rows="5"
                      placeholder={this.props.vacationDelete.description}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Starts: </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.props.vacationDelete.starts}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Ends:</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.props.vacationDelete.ends}
                      disabled={true}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price:</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder={"$" + `${this.props.vacationDelete.price}`}
                      disabled={true}
                    />
                  </div>
                  <label>Image:</label>
                  <div className="form-group text-center mb-3">
                    {image()}
                  </div>
                  <div className="row mt-4 mb-3 justify-content-center">
                    <div className="form-group ml-2">
                      <button
                        type="button"
                        className="btn btn-info form-control shadow-sm"
                        data-dismiss="modal"
                      >
                        Done
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
    vacationDelete: state.singleVacation
  };
};

const mapDispatchToProps = dispatch => {
  return {
    singleVacationDetails: singleVacation =>
      dispatch(singleVacationDetails(singleVacation))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
