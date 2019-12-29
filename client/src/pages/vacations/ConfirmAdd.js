import React, { Component } from "react";
import { connect } from "react-redux";
import { userDetails } from "../../store/actions/users.actions";
import { Redirect } from "react-router-dom";

class AddedVac extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginRedirect: false,
      adminRedirect: false,
      load: true,
      confirmText: "Vacation has been added!"
    };
  }

  componentDidMount() {
    this.props.userDetails();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.logged === "") {
      this.setState({ loginRedirect: true });
    } else {
      if (nextProps.details !== "Error") {
        if (nextProps.details.role === "admin") {
          setTimeout(() => {
            this.setState({ confirmText: "Please wait..", load: false });
          }, 2000);
          setTimeout(() => {
            this.setState({ adminRedirect: true });
          }, 4000);
        } else {
          this.setState({ loginRedirect: true });
        }
      }
    }
  }

  render() {
    if (this.state.loginRedirect === true) {
      return <Redirect to="/login" />;
    }
    if (this.state.adminRedirect === true) {
      return <Redirect to="/admin" />;
    }

    return (
      <div>
        <div className="jumbotron jumbotron-fluid jumboWelcome mb-auto">
          <div className="container text-center">
            <h1 className="display-4 welcomeHeader">
              {this.state.confirmText}
            </h1>
            <br />
            <div
              className="row justify-content-center"
              hidden={this.state.load}
            >
              <div className="spinner-grow text-primary d-flex" />
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
    logged: state.login
  };
};

const mapDispatchToProps = dispatch => {
  return {
    userDetails: details => dispatch(userDetails(details))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedVac);
