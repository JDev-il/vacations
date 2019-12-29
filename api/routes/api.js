var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController')
var authorize = require('../auth/checkToken')
// var verifyToken = require('../auth/verifyToken')

/* VACATIONS: */

/* GET All Vacations - DONE */
router.get('/vacations', apiController.getAllVacations);
/* POST Image - DONE */
router.post('/vacations/images', apiController.postImage);
/* POST New Vacation - DONE */
router.post('/vacations/add', apiController.postVacation);
/* GET Single Vacations */
router.post('/vacations/single', apiController.getSingleVacation);
/* GET Vacations + Followers */
router.get('/vacations/vacfollow', [authorize], apiController.getFollowedVacations);
/* PUT Vacation */
router.put('/vacations/:id/edit', [authorize], apiController.updateVacation);
/* Delete Vacation */
router.delete('/vacations/:id/delete', [authorize], apiController.deleteVacation);

/* VACATIONS: */



/* FOLLOWERS: */

/* GET Followers from MySQL List */
router.get('/users/followers', apiController.getFollowers);
/* GET Followers from MySQL List - FOR ADMIN REPORTS ONLY! */
router.get('/users/followers/reports', [authorize], apiController.getFollowersReports);
/* POST New Follower To Followers in MySQL List */
router.post('/users/followers/follow', apiController.follow);
/* DELETE Existing Follower From MySQL Followers List */
router.delete('/users/followers/unfollow', apiController.unFollow);
/* FOLLOWERS: */



/* USERS: */

// /* POST Single User For Auth - DONE */
router.post('/users/auth', apiController.getAuthorization);
/* POST New User Registration - DONE */
router.post('/users/registration', apiController.postUserRegistration);
/* POST & GET Back Login Details - DONE */
router.post('/users/logindetails', apiController.getLoginDetails);
/* POST Login - DONE */
router.post('/users/login', apiController.postLogin);

/* USERS: */


module.exports = router;
