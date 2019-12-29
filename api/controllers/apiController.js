var connection = require("../server/mysql");
var jwt = require("jsonwebtoken");
var config = require("../auth/configSignature");
var queries = require("../server/queries");
const path = require("path");
let reqPath = path.join(__dirname, "../public/images");


class apiController {


///VACATIONS///VACATIONS///VACATIONS///VACATIONS///
  static getAllVacations(req, res, next) {
    connection.query(queries.getVacations, function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
  }


  static getFollowedVacations(req, res, next) {
    jwt.verify(req.token, config.secret, function(err, authData) {
      if (err) {
        res.sendStatus(403).end();
      } else {
        if (authData.userForToken.role === "subscriber") {
          if (err) throw err;
          connection.query(
            queries.getSingleUser,
            [authData.userForToken.id],
            function(err, row) {
              if (err) throw err;
              connection.query(
                queries.getFollowedVacations,
                [row[0].id],
                function(err, vacs) {
                  res.send(vacs).end();
                }
              );
            }
          );
        } else {
          res.send("Error");
        }
      }
    });
  }


  static postVacation(req, res, next) {
    const vacDetails = {
      destination: req.body.destination,
      description: req.body.description,
      image: req.body.image,
      starts: req.body.starts,
      ends: req.body.ends,
      price: req.body.price
    };
    const v = vacDetails;
    if (
      v.description == undefined ||
      v.destination == undefined ||
      v.destination == "--" ||
      v.image == undefined ||
      v.starts == undefined ||
      v.ends == undefined ||
      v.price == undefined
    ) {
      res.send("check-status-1").end();
    } else {
         connection.query(
        queries.insertNewVacation,
        [v.destination, v.description, v.image, v.starts, v.ends, v.price],
        function(err, vacation) {
          if (err) {
            throw err;
          }
          res.send("passed").end();
        }
      );
    }
  }


  static postImage(req, res, next) {
    if (req.files === null) {
      return res.status(400).json({ msg: "No file was uploaded" });
    }
    let file = req.files.file;
    let fileName = req.files.file.name;
    file.mv(`${reqPath}/${fileName}`, err => {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({ file: file, filepath: `${fileName}` });
    });
  }


  static getSingleVacation(req, res, next) {
    let id = req.body.id;
    connection.query(queries.getSingleVacation, [id], function(err, row) {
      if (err) throw err;
      res.send(row[0]);
    });
  }


  static updateVacation(req, res, next) {
    jwt.verify(req.token, config.secret, function(err, authData) {
      if (err) {
        res.sendStatus(403).end();
      } else {
        if (authData.userForToken.role === "admin") {
          const {
            id,
            destination,
            description,
            image,
            starts,
            ends,
            price
          } = req.body;
          connection.query(
            queries.editSingleVacation,
            [destination, description, image, starts, ends, price, id],
            function(err, editResult) {
              if (err) {
                res.send(err).end();
              } else {
                res.send("Updated").end()
              }
            }
          );
        } else {
          res.sendStatus(403).end();
        }
      }
    });
  }


  static deleteVacation(req, res, next) {
    jwt.verify(req.token, config.secret, function(err, authData) {
      if (err) {
        res.sendStatus(403).end();
      } else {
        let id = req.params.id
        if (authData.userForToken.role === "admin") {
          connection.query(queries.deleteVacFromFollowers, [id], function(err, followerDel){
            if(err){
              res.send("Error").end()
            }
              connection.query(queries.deleteSingleVacation, [id], function(err, deleted){
                if(err) throw err
                  res.send("Deleted").end()
                })
              })
          }
      }
  })
}
///VACATIONS///VACATIONS///VACATIONS///VACATIONS///


///USERS///USERS///USERS///USERS///USERS///
  static getLoginDetails(req, res, next) {
    if (req.body.storage === null) {
      res.send("Error").end();
    } else {
      let token = req.body.storage;
      jwt.verify(token, config.secret, function(err, authData) {
        if (err) {
          res.sendStatus("Error").end();
        } else {
          connection.query(
            `SELECT * FROM users WHERE username = '${authData.userForToken.username}' AND password = '${authData.userForToken.password}'`,
            function(err, result) {
              if (err) {
                res.send(err).end();
              }
              if (
                authData.userForToken.username === result[0].username &&
                authData.userForToken.password === result[0].password
              ) {
                const userApproved = {
                  firstname: result[0].firstname,
                  lastname: result[0].lastname
                };
                res.send(userApproved).end();
              }
            }
          );
        }
      });
    }
  }

  
  static postLogin(req, res, next) {
    const user = {
      username: req.body.user,
      password: req.body.pass
    };

    if (!user.username && user.password) {
      return res.send("check-status-1").end();
    }
    if (!user.password && user.username) {
      return res.send("check-status-2").end();
    }
    if (!user.username && !user.password) {
      return res.send("check-status-3").end();
    }
    connection.query(
      queries.getLoginDetails,
      [user.username, user.password],
      function(err, rows) {
        if (rows[0] === undefined) {
          return res.send("Error").end();
        } else {
          connection.query(queries.getLoginDetails2, rows[0].id, function(
            err,
            row
          ) {
            if (err) {
              throw err;
            } else {
              const userForToken = {
                id: row[0].id,
                firstname: row[0].firstname,
                lastname: row[0].lastname,
                role: row[0].role,
                username: req.body.user,
                password: req.body.pass
              };
              const userKey = jwt.sign({ userForToken }, config.secret);
              const returnedUser = {
                firstname: row[0].firstname,
                lastname: row[0].lastname,
                role: row[0].role,
                key: {
                  userKey
                }
              };
              if (row[0].role === "admin") {
                return res.send(returnedUser).end();
              } else {
                if (row[0].role === "subscriber") {
                  return res.send(returnedUser).end();
                }
              }
            }
          });
        }
      }
    );
  }


  // POST AUTHORIZING USER'S DETAILS //
  static getAuthorization(req, res, next) {
    let token = req.body.storage;
    jwt.verify(token, config.secret, function(err, authData) {
      if (err) {
        res.send("Error").end();
      } else {
        connection.query(
          `SELECT * FROM users WHERE username = '${authData.userForToken.username}' AND password = '${authData.userForToken.password}'`,
          function(err, result) {
            if (err) {
            }
            connection.query(queries.getLoginDetails2, [result[0].id], function(
              err,
              row
            ) {
              if (
                authData.userForToken.username === result[0].username &&
                authData.userForToken.password === result[0].password
              ) {
                const userApproved = {
                  id: result[0].id,
                  firstname: result[0].firstname,
                  lastname: result[0].lastname,
                  role: row[0].role
                };
                res.send(userApproved).end();
              }
            });
          }
        );
      }
    });
  }


  // POST userdetails to check authentication for registration //
  static postUserRegistration(req, res, next) {
    const userReg = {
      first: req.body.first,
      last: req.body.last,
      user: req.body.user,
      password: req.body.password,
      email: req.body.email
    };
    connection.query(queries.whereUsername, [userReg.user], function(err, row) {
      if (row[0] === undefined) {
        connection.query(
          queries.insertIntoUsers,
          [
            userReg.first,
            userReg.last,
            userReg.user,
            userReg.password,
            userReg.email
          ],
          function() {
            connection.query(queries.whereUsername, [userReg.user], function(
              err,
              user
            ) {
              connection.query(queries.insertIntoRoles, [user[0].id], function(
                err,
                resultInsert
              ) {
                connection.query(
                  queries.registrationAuth,
                  [user[0].id],
                  function(err, authenticate) {
                    const userForToken = {
                      id: authenticate[0].id,
                      firstname: authenticate[0].firstname,
                      lastname: authenticate[0].lastname,
                      username: authenticate[0].username,
                      password: authenticate[0].password,
                      role: authenticate[0].role
                    };
                    const userKey = jwt.sign({ userForToken }, config.secret);
                    const returnedUser = {
                      id: authenticate[0].id,
                      firstname: authenticate[0].firstname,
                      lastname: authenticate[0].lastname,
                      key: {
                        userKey
                      }
                    };
                    res.send(returnedUser).end();
                  }
                );
              });
            });
          }
        );
      } else {
        res.send("ERROR").end();
      }
    });
  }


  ///FOLLOWERS SECTIONS///FOLLOWERS SECTIONS///
  static getFollowers(req, res, next) {
    connection.query("SELECT * FROM followers", function(err, rows, fields) {
      if (err) throw err;
      res.send(rows);
    });
  }


  static getFollowersReports(req, res, next){
    jwt.verify(req.token, config.secret, function(err, authData) {
      if (err) {
        res.sendStatus(403).end();
      } else {
        if(authData.userForToken.role === "admin"){
          var vacsIds = []
          connection.query(queries.getFollowersDesc, function(err,result){
            if(err) throw err
            connection.query(`SELECT vacation_id, SUM(followcount) as counter FROM followers GROUP BY vacation_id`, function(err, count){
              count.map(c=>{
                vacsIds.push({"vacation_id": c.vacation_id, "counter": c.counter})
              })
              res.send(vacsIds).end()
            }) 
          })
        } else {
          res.sendStatus("Process Blocked").end();
        }
      }
    })
  }


  static follow(req, res, next) {    
    const details = {
      id: JSON.parse(req.body.vacId),
      newId: req.body.usrId,
    }    
      var arr = [];
      let vacId = req.body.vacId;
        connection.query(queries.validateFromFollowers, [details.newId], function(err, row, fields) {
          row.map(v=> {
            if(v.vacation_id === details.id){
              arr.push('id', v.vacation_id)
            }
          })
          if(arr[1] === details.id){
            res.send({vacation: arr[1], status: false}).end()
          } else {
            connection.query(queries.followVacation, [vacId, details.newId], function(err, success) {
             if(err) throw err
             res.send({vacation: arr[1], status: true }).end()
          })
        }
    });
  }


  static unFollow(req, res, next) {
    const deleteDetails = {
      vacId: JSON.parse(req.body.vacId),
      usrId: JSON.parse(req.body.usrId)
    }
    var filteredUsr = []
    connection.query(`SELECT * FROM followers WHERE vacation_id = ${deleteDetails.vacId}`, function(err, rows){
      if(err) throw err
      if(rows.length <= 1){
       connection.query(`DELETE FROM followers WHERE vacation_id = ${deleteDetails.vacId}`, function(err, final){
         if (err) throw err
         res.send(true)
        })
      } 
      if(rows.length > 1){
          rows.map(v=>{
           if(v.vacation_id === deleteDetails.vacId && v.user_id === deleteDetails.usrId){
            filteredUsr.push({"id": v.id, "vacation_id": v.vacation_id, "user_id": v.user_id, "followcount": '1'})
            }
          })
          connection.query(`DELETE FROM followers WHERE vacation_id = ${filteredUsr[0].vacation_id} AND user_id = ${filteredUsr[0].user_id}`, function(err, final){
           if (err) throw err
          res.send(true)
        })
      }
    })
  }
}

///USERS///USERS///USERS///USERS///USERS///


module.exports = apiController;
