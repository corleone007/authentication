var express = require('express');
var assert = require('assert');
var router = express.Router();
var passport=require('./../auth/passport');
var app = express();
const User= require('./../db/dbSetup');
var bodyParser = require('body-parser')
var bcrypt=require('bcrypt');
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/local-login',function(req, res, next) {
  res.render('./../views/login' );
});

router.get('/local-signup',function(req, res, next) {
  res.render('./../views/signup' );
});

router.get('/dashboard', function(req, res) {
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	if(req.isAuthenticated())
	res.render('./../views/dashboard.ejs',{users: req.user} );
	else res.redirect('/users/local-login');
});

// POST method route
/*router.post('/',function (req, res) {
	console.log("Username: "+req.body.username + "\tPassword: "+req.body.password);
	res.send('POST request from the homepage');
});*/
router.post('/', function(req, res, next) {
  res.send('Not sure why is is coming here');
});

router.post('/local-signup',function (req, res, next) {
	req.body.password = bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(8));
    User.create(req.body, function (err, user) {
        if (err) throw err;
        console.log('user created!');
        var id = user._id;
		res.redirect('/users/local-login');
    });
})
	
router.post('/local-login',
	//passport.authenticate('local-login',{successRedirect:'/dashboard',failureRedirect:'/users/local-login',failureFlash:true}));
	passport.authenticate('local-login'), 
	function(req, res, next){
		//console.log("user is: " + req.user);
		if(req.user){
			req.session.user = req.user;
			res.redirect('/users/dashboard');
		} else {
			res.redirect('/users/local-login');
		}		
	});

module.exports = router;
