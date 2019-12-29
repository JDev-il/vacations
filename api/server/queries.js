module.exports = {
  

  //GET ALL VACATIONS WITH FORMATED DATE//
  getVacations:
    "SELECT *, DATE_FORMAT(starts, '%b %d, %Y') as starts, DATE_FORMAT(ends, '%b %d, %Y') as ends FROM vacations",
  //GET ALL VACATIONS WITH FORMATED DATE//


  //POST/GET SINGLE VACATION//
  getSingleVacation: `SELECT *, DATE_FORMAT(starts, '%b %d, %Y') as starts, DATE_FORMAT(ends, '%b %d, %Y') as ends FROM vacations WHERE id = ?`,
  //POST/GET SINGLE VACATION//


  //GET ALL VACATIONS WITH FOLLOWING TABLE//
  getFollowedVacations: `SELECT *, DATE_FORMAT(starts, '%b %d, %Y') as starts, DATE_FORMAT(ends, '%b %d, %Y') as ends FROM vacations RIGHT JOIN followers ON vacations.id = followers.vacation_id WHERE followers.user_id = ?`,
  //GET ALL VACATIONS WITH FOLLOWING TABLE//


  //POST NEW VACATION + IMAGE//
  insertNewVacation: `INSERT INTO vacations (destination, description, image, starts, ends, price) VALUES ( ?, ?, ?, ?, ?, ?)`,
  //POST NEW VACATION + IMAGE//
  

  //PUT(EDIT) VACATION//
  editSingleVacation: `UPDATE Vacations SET destination=?, description=?, image=?, starts=?, ends=?, price=? WHERE id = '?'`,
  //PUT(EDIT) VACATION//


  //DELETE VACATION//
  deleteSingleVacation: `DELETE FROM vacations WHERE id = ?`,
  //DELETE VACATION//


  //DELETE A VACATION FROM FOLLOWERS TABLE//
  deleteVacFromFollowers: `DELETE FROM followers WHERE vacation_id = ?`,
  //DELETE A VACATION FROM FOLLOWERS TABLE//





  //GET LOGIN DETAILS 1//
  getLoginDetails: `SELECT * FROM users WHERE username = ? AND password = ?`,
  //GET LOGIN DETAILS 1//


  //GET LOGIN DETAILS 2//
  getLoginDetails2: `SELECT users.id, users.firstname, users.lastname, roles.role, 
    roles.userId FROM users RIGHT JOIN roles ON users.id = roles.userId 
    WHERE roles.userId = ?`,
  //GET LOGIN DETAILS 2//


  //GET ALL USERS//
  getSingleUser: `SELECT * FROM users WHERE id = ?`,
  //GET ALL USERS//


  //GET USER WHERE USERNAME//
  whereUsername: `SELECT * FROM users WHERE username = ?`,
  //GET USER WHERE USERNAME//


  //GET AUTH BEFOR REGISTRATION//
  registrationAuth: `SELECT users.id, users.firstname, users.lastname, users.username, users.password, roles.role, 
    roles.userId FROM users RIGHT JOIN roles ON users.id = roles.userId 
    WHERE roles.userId = ?`,
  //GET AUTH BEFOR REGISTRATION//


  //POST USER INTO MSQL WITH VALUES//
  insertIntoUsers: `INSERT INTO users (firstname, lastname, username, password, email) VALUES (?, ?, ?, ?, ?)`,
  //POST USER INTO MSQL WITH VALUES//


  //POST USER INTO MSQL WITH VALUES//
  insertIntoRoles: `INSERT INTO roles (role, userId) VALUES ('subscriber', '?')`,
  //POST USER INTO MSQL WITH VALUES//




  
  //GET FOLLOWERS TABLE//
  getFollowersDesc: `SELECT * FROM followers ORDER BY vacation_id DESC`,
  //GET FOLLOWERS TABLE//  


  //GET VACATION.ID//
  validateFromFollowers: `SELECT * FROM followers WHERE user_id = '?'`,
  //GET VACATION.ID//


  //POST A NEW VACATION FOLLOWER//
  followVacation: `INSERT INTO followers (vacation_id, user_id) VALUES (?, ?)`,
  //POST A NEW VACATION FOLLOWER//
  

};
