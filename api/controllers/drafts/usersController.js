// var connection = require("../server/mysql");
// var jwt = require("jsonwebtoken");
// var config = require("../auth/config");


// class usersController {
 
//   static getUsers(req, res, next) {
//     connection.query("SELECT * FROM users", function(err, rows, fields) {
//       if (err) throw err;
//       res.send(rows);
//     });
//   }

//   static getLogin(req, res, next) {
//     res.send("Get Login");
//   }

//   static postLogin(req, res, next) {
//     const user = {
//       username: req.body.username,
//       passname: req.body.password,
//     };
//     // jwt.sign({ user: user }, 'secretKey', (err, token) => {
//     //   res.json({
//     //     token
//     //   });
//     // });
//   }

//   /* GET Users for registration */
//   static authRegistration(req, res, next) {
//     // jwt.verify(req.token, 'secretKey', function(err, authData){
//     //   if(err) {
//     //     res.sendStatus(403);
//     //   } else{
//     //     res.json({
//     //       text: 'Registration was successful',
//     //       authData: authData
//     //     })
//     //   }
//     // });
//     // connection.query("SELECT * FROM users", function(err, rows, fields) {
//     //   if (err) throw err;
//     //   res.send(rows);
//     // });
//   }

//   /* POST userdetails to check authentication for registration */
//   static postRegistration(req, res, next) {

//     const user = {
//       first: req.body.first,
//       last: req.body.last,
//       user: req.body.user,
//       password: req.body.password,
//       email: req.body.email
//     };

//     // var token = jwt.sign(user.user, config.secret, {
//     //   expiresIn: 120 // expires in 24 hours
//     // });

//     // jwt.verify(req.token, config.secret, function(err, data) {
//     //   if (err) {
//     //     res.sendStatus(403);
//     //   }
//     // });

//   }

//   static getFollowers(req, res, next) {
//     connection.query("SELECT * FROM followers", function(err, rows, fields) {
//       if (err) throw err;
//       res.send(rows);
//     });
//   }

//   static followersAdd(req, res, next) {
//     res.send("POST Followers (When user click the follow the vacation button)");
//   }

//   static followersDelete(req, res, next) {
//     res.send("DELETE Followers (Delete When User Unfollows)");
//   }
// }

// // static test(req, res) {
// //   if (req.body.username === "aymen") {
// //     if (req.body.password === 123) {
// //       //if eveything is okey let's create our token
// //       const payload = {
// //         check: true
// //       };

// //       //VERIFY!!!
// //       jwt.verify(req.token, config.secret, function(err, data) {
// //         if (err) {
// //           res.sendStatus(403);
// //         }
// //       });
// //       //VERIFY!!!

// //       var token = jwt.sign(payload, app.get("Secret"), {
// //         expiresIn: 1440 // expires in 24 hours
// //       });
// //       res.json({
// //         message: "authentication done ",
// //         token: token
// //       });
// //     } else {
// //       res.json({ message: "please check your password !" });
// //     }
// //   } else {
// //     res.json({ message: "user not found !" });
// //   }
// // }

// module.exports = usersController;
