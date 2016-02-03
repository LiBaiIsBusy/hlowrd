var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
  console.log('///////////////////////////////////cookies:' + req.cookies.islogin);
  if(req.cookies.islogin)
  {
    console.log('cookies:' + req.cookies.islogin);
    req.session.account = req.cookies.islogin;
  }

  if(req.session.account)
  {
    console.log('session:' + req.session.account);
    res.locals.account = req.session.account;
  }
  else
  {
    res.redirect('/login');
    return;
  }

  res.render('index',{title:'主页'});
});

module.exports = router;
