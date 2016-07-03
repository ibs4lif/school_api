var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../controllers/user.js');
var project = require('../controllers/project.js');
var course = require('../controllers/course.js');
var comment = require('../controllers/comment.js');
var discussion = require('../controllers/discussion.js');
var publication = require('../controllers/publication.js');
// var mongojs = require("mongojs");
// var db = mongojs('ibrahima:sarr@ds011158.mlab.com:11158/organigramme', ['employee','department','procedures','questions']);
// var db = mongojs('organigramme', ['employee','department','procedures','questions']);
var bodyParser = require('body-parser');

var db ='mongodb://ibrahima:school123@ds011725.mlab.com:11725/school';
mongoose.connect(db);

// var user = require('../models/user.js');

router.use(bodyParser.json());


//  Users
router.get('/v1/users', user.list);
router.post('/v1/user/', user.create);
router.get('/v1/user/:userId', user.userById);
router.put('/v1/user/addRequest/:userId', user.addRequest);
router.put('/v1/user/removeRequest/:userId', user.removeRequest);
router.put('/v1/user/approveRequest/:userId', user.approveRequest);
router.get('/v1/user/activities/:userId/:date', user.activities);
router.get('/v1/user/searchUsers/:search', user.searchUsers);
router.get('/v1/user/activitiesComments/:userId', user.activitiesComments);
router.get('/v1/user/activitiesPublications/:userId', user.activitiesPublications);
router.get('/v1/user/activitiesDiscussions/:userId', user.activitiesDiscussions);


//  Projects
router.get('/v1/projects', project.list);
router.get('/v1/project/:projectId', project.projectById);
router.get('/v1/projects/:userId', project.listUser);
router.post('/v1/projects', project.create);
router.delete('/v1/projects', project.delete);
router.put('/v1/project/followProject/:projectId', project.followProject);
router.put('/v1/project/unFollowProject/:projectId', project.unFollowProject);
router.put('/v1/project/addView', project.addView);
router.put('/v1/project/removeView', project.removeView);
router.put('/v1/project/addRequest/:projectId', project.addRequest);
router.put('/v1/project/removeRequest/:projectId', project.removeRequest);
router.put('/v1/project/approveRequest/:projectId', project.approveRequest);
router.put('/v1/project/addSupport', project.addSupport);
router.put('/v1/project/removeSupport', project.removeSupport);
router.get('/v1/project/activitiesComments/:projectId', project.activitiesComments);
router.get('/v1/project/activitiesPublications/:projectId', project.activitiesPublications);
router.get('/v1/project/activitiesDiscussions/:projectId', project.activitiesDiscussions);


//  courses
router.get('/courses', course.list);
router.get('/course/:courseId', course.courseById);
router.get('/courses/:userId', course.listUser);
router.post('/courses', course.create);
router.delete('/courses', course.delete);
// router.put('/v1/course/followcourse/:courseId', course.followcourse);
// router.put('/v1/course/unFollowcourse/:courseId', course.unFollowcourse);
// router.put('/v1/course/addView', course.addView);
// router.put('/v1/course/removeView', course.removeView);
// router.put('/v1/course/addRequest/:courseId', course.addRequest);
// router.put('/v1/course/removeRequest/:courseId', course.removeRequest);
// router.put('/v1/course/approveRequest/:courseId', course.approveRequest);
// router.put('/v1/course/addSupport', course.addSupport);
// router.put('/v1/course/removeSupport', course.removeSupport);
// router.get('/v1/course/activitiesComments/:courseId', course.activitiesComments);
// router.get('/v1/course/activitiesPublications/:courseId', course.activitiesPublications);
// router.get('/v1/course/activitiesDiscussions/:courseId', course.activitiesDiscussions);



//  Comments
router.get('/v1/comments', comment.list);
router.get('/v1/comments/favoritesProject/:projectId', comment.favorites);
router.post('/v1/comment', comment.create);
router.delete('/v1/comment', comment.delete);

//  Publications
router.get('/v1/publications', publication.list);
router.post('/v1/publication', publication.create);
router.delete('/v1/publication', publication.delete);

//  Discussions
router.get('/v1/discussions', discussion.list);
router.post('/v1/discussion', discussion.create);
router.delete('/v1/discussion', discussion.delete);

/*router.get('/contactlist', function (req, res) {
    user.find({}).exec(function(err,docs){
        if (err) {
            res.send('Une erreur s\'est produite')
        }else{
            res.json(docs);
            console.log(docs);
            console.log('tout est ok');
        }
    });*/
    // db.employee.find( function (err, docs) {
    //     console.log(docs);
    //     res.json(docs);
    // });
//});

// router.get('/questions', function (req, res) {
//     db.questions.find(function (err, docs) {
//         console.log(docs);
//         res.json(docs);
//     });
// });


module.exports = router;
