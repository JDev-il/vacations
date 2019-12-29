// var connection = require("../server/mysql");

// class vacationsController {
//   static getAllVacations(req, res, next) {
//     connection.query(
//       "SELECT *, DATE_FORMAT(starts, '%b %d, %Y') as starts, DATE_FORMAT(ends, '%b %d, %Y') as ends FROM vacations",
//       function(err, rows, fields) {
//         if (err) throw err;
//         res.send(rows);
//       }
//     );
//   }

//   static postVacation(req, res, next) {
//     res.send("POST A Vacation");
//   }
//   static updateVacation(req, res, next) {
//     res.send("UPDATE A Single Vacation");
//   }
//   static deleteVacation(req, res, next) {
//     res.send("DELETE A Single Vacation");
//   }
// }

// module.exports = vacationsController;
