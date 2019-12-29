import axios from "axios";


//=========================================//


const pathName = "http://localhost:3001/vacations";


// GET All Vacations >> apiController >> getAllVacations //
export const allVacations = () => {
  return dispatch => {
    axios.get(`${pathName}`).then(res => {
      dispatch({ vacations: res.data, type: "GET_VACATIONS" });
    });
  };
};


// GET Vacations and followers (For "AllVacs" Page) >> apiController >> getFollowedVacations //
export const getVacationsAndFollowers = () => {
  return dispatch => {
    const storage = {
      storage: localStorage.getItem("userKey")
    };
    axios
      .get(`${pathName}/vacfollow`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: storage.storage
        }
      })
      .then(res => {
        if (res.data == "" || res.data == []) {
          dispatch({ followedVacs: false, type: "FOLLOW_VACS" });
        }
        dispatch({ followedVacs: res.data, type: "FOLLOW_VACS" });
        // }
      })
      .catch(err => {
        if (err) {
          console.error("Error");
        }
      });
  };
};


// GET Countries from a specific API >> https://restcountries.eu/rest/v2/all //
export const countriesToSelect = () => {
  return dispatch => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      dispatch({ countries: res.data, type: "COUNTIRES_SELECT" });
    });
  };
};


// POST A new vacation  >> apiController >> postVacation //
export const addVacation = vacationDetails => {
  return dispatch => {
    const v = vacationDetails;
    if (v.description && v.destination && v.starts && v.ends && v.price) {
      dispatch({ confirm: true, type: "VACATION_ADDING" });
    }
    if (
      v.description === "" ||
      v.destination === "" ||
      v.starts === "" ||
      v.ends === "" ||
      v.price === ""
    ) {
      dispatch({ confrim: false, type: "VACATION_ADDING" });
    }
    axios
      .post(`${pathName}/add`, vacationDetails)
      .then(res => {
      })
      .catch(error => {
        if (error) {
          return console.error("Error");
        }
      });
  };
};


// POST A new image (integral part of the "addVacation" function above) >> apiController >> postImage //
export const addImage = data => {
  return dispatch => {
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    axios
      .post("http://localhost:3001/vacations/images", data, config)
      .then(res => {})
      .catch(error => {
        if (error) {
          return console.error("Error");
        }
      });
  };
};


// Simple dispatch function that triggers hide/show actions in "EditDelete.js" page //
export const editOrDelete = pageType => {
  return dispatch => {
    dispatch({ pageType: pageType, type: "PAGE_TYPE" });
  };
};


// GET(Using POST method) A single vacation details >> apiController >> getSingleVacation //
export const singleVacationDetails = id => {
  return dispatch => {
    new Promise(resolve => {
      axios
        .post(`${pathName}/single`, { id })
        .then(res => {
          resolve(dispatch({ singleVacation: res.data, type: "SINGLE_VAC" }));
        })
        .catch(err => {
          if (err) {
            return console.error("Vacation Not Found");
          }
        });
    });
  };
};


// PUT(Edit) A single vacation  >> apiController >> updateVacation //
export const editVaction = details => {
  return dispatch => {
    const storage = {
      storage: localStorage.getItem("userKey")
    };
    var startDate, startsUpdate, starts, endDate, endsUpdate, ends;
    let a = details;
    let detailsReady = details.editDetails;

    if (detailsReady.destination == undefined) {
      detailsReady.destination = a.destination;
    }
    if (detailsReady.description == undefined) {
      detailsReady.description = a.description;
    }
    if (detailsReady.image == "" || detailsReady.image == undefined) {
      detailsReady.image = a.image;
    }
    if (detailsReady.starts == undefined) {
      detailsReady.starts = a.starts;
      startDate = new Date(detailsReady.starts);
      startsUpdate = startDate.toISOString();
      starts = startsUpdate.split("T");
      detailsReady.starts = starts[0];
    }
    if (detailsReady.ends == undefined) {
      detailsReady.ends = a.ends;
      endDate = new Date(detailsReady.ends);
      endsUpdate = endDate.toISOString();
      ends = endsUpdate.split("T");
      detailsReady.ends = ends[0];
    }
    if (detailsReady.price == undefined) {
      detailsReady.price = a.price;
    }
    axios
      .put(`${pathName}/${detailsReady.id}/edit`, detailsReady, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: storage.storage
        }
      })
      .catch(err => {
        if (err) {
          console.log("Error Editing Vacation");
        }
      });
  };
};


// DELETE A single vacation >> apiController >> deleteVacation //
export const deleteVacation = id => {
  return dispatch => {
    const storage = {
      storage: localStorage.getItem("userKey")
    };

    axios
      .delete(`${pathName}/${id}/delete`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          authorization: storage.storage
        }
      })
      .then(res => {
      });
  };
};
