var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('./../views/homepage',{result:""});
});

router.get('/logout', function(req, res){
	req.logout();
	req.session.reset();
	res.render('./../views/homepage',{result:"User has been successfully logged out"});
});

module.exports = router;
