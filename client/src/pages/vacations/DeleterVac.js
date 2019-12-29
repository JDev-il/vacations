import React, { Component } from "react";
import Delete from "../components/EditDelete";
import { connect } from "react-redux";
import { userDetails } from "../../store/actions/users.actions";

class DeleteVac extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adminRedirect: false
    };
  }


  render() {
    return (
      <div>
        <Delete />
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
)(DeleteVac);
