import axios from "axios";


//=========================================//


const pathName = "http://localhost:3001/users";


// GET All users >> apiController >> getUsers //
export const allUsers = () => {
  return dispatch => {
    axios.get(`${pathName}`).then(res => {
      dispatch({ type: "GET_USERS", users: res.data });
    });
  };
};


// USER Details middleware before entering a page >> apiController >> postAuthUser //
export function userDetails() {
  return dispatch => {
    const storage = {
      storage: localStorage.getItem("userKey")
    };
    return axios
      .post(`${pathName}/auth`, storage)
      .then(res => {     
        dispatch({ details: res.data, type: "USER_AUTH" });
      })
      .catch(error => {
        console.log("Not Authorized", error)
      });
  };
};


// USER Login details in "Login" page >> apiController >> postLogin //
export function loginDetails(){
  return dispatch => {
    const storage = {
      storage: localStorage.getItem("userKey")
    };
    if (storage.storage === null) {
      dispatch({
        hidingForm: { formHide: false, secondForm: true, loginText: "Login" },
        type: "HIDE_FORM"
      });
    } else {
      axios.post(`${pathName}/logindetails`, storage).then(res => {
        dispatch({
          hidingForm: {
            formHide: true,
            secondForm: false,
            loginText: `Welcome back ${res.data.firstname}!`
          },
          type: "HIDE_FORM"
        });
      }).catch(err=>{
        if(err){
          console.log("Not Authorized", err) 
        }
      })
    }
  };
};


// USER LOGGEDIN / LOGGEDOUT (Returns Boolean) //
export const loggedIn = () =>{
  return dispatch=>{
    dispatch({ logged: true, type: "LOGGED"})
  }
}

export const loggedOut = () =>{
  return dispatch=>{
    dispatch({ logged: false, type: "LOGGED" })
  }
}


// GET Only followed vacations (for Admin/Reports section) >> apiController >> getFollowersReports //
export const followedVacsForReports = () => {
  return dispatch => {
    const storage = {
      storage: localStorage.getItem("userKey")
    };
    axios.get(`${pathName}/followers/reports`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        authorization: storage.storage
      }
    }).then(res => {
      dispatch({ summeryReports: res.data, type: "SUMMERY_REPORTS" });
    });
  };
};
