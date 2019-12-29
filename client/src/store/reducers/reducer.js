const initState = {
  vacations: "",
  followedVacs: "",
  singleVacation: "",
  followers: "",
  userFollow: "",
  reportsFollowers: "",
  idAdmin: "",
  isLoggingIn: "",
  isLoggedIn: "",
  countries: "",
  details: "",
  login: "",
  redirect: "",
  confirm: "",
  pageType: "",
  summeryReports: ""
};

const reducer = (state = initState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "GET_VACATIONS":
      return {
        ...newState,
        vacations: action.vacations
      };

    case "FOLLOW_VACS":
      return {
        ...newState,
        followedVacs: action.followedVacs
      };

    case "REPORTS_FOLLOW_VACS":
      return {
        ...newState,
        reportsFollowers: action.reportsVacs
      };

    case "SINGLE_VAC":
      return {
        ...newState,
        singleVacation: action.singleVacation
      };

    case "FOLLOWING":
      return {
        ...newState,
        userFollow: action.following
      };

    case "USER_AUTH":
      newState.details = action.details;
      if (action.details.role === "admin") {
        newState.isAdmin = true;
      } else {
        newState.isAdmin = false;
      }
      break;

    case "HIDE_FORM":
      return {
        ...newState,
        isLoggedIn: action.hidingForm
      };

    case "COUNTIRES_SELECT":
      return {
        ...newState,
        countries: action.countries
      };

    case "LOGGED":
      return {
        ...newState,
        login: action.logged
      };

    case "VACATION_ADDING":
      return {
        ...newState,
        confirm: action.confirm
      };

    case "PAGE_TYPE":
      return {
        ...newState,
        pageType: action.pageType
      };

    case "SUMMERY_REPORTS":
      return {
        ...newState,
        summeryReports: action.summeryReports
      }
  }
  return newState;
};

export default reducer;
