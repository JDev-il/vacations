import React, { Component } from "react";
import Edit from "../components/EditDelete";
import { connect } from "react-redux";
import { userDetails } from "../../store/actions/users.actions";

class EditVac extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminRedirect: false
    };
  }


  render() {
    return (
      <div>
        <Edit />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.details,
    logged: state.login,
    pageType: state.pageType
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
)(EditVac);
