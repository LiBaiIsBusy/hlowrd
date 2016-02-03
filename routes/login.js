/**
 * Created by zhangshuji on 2016/1/30.
 */
var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    crypto = require('crypto'),
    TITLE_LOGIN = '登录';

router.get('/', function(req, res) {
    res.render('login',{title:TITLE_LOGIN});
});

router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        isRem = req.body['chbRem'],
        md5 = crypto.createHash('md5');

    User.getUserByUserName(userName, function (err, results) {

        if(results == '')
        {
            res.locals.error = '用户不存在';
            res.render('login',{title:TITLE_LOGIN});
            return;
        }

        userPwd = md5.update(userPwd).digest('hex');
        if(results[0].account != userName || results[0].password != userPwd)
        {
            res.locals.error = '用户名或密码有误';
            res.render('login',{title:TITLE_LOGIN});
            console.log(1);
            return;
        }
        else
        {
            if(isRem)
            {
                res.cookie('islogin', userName, { maxAge: 60000 });
            }

            res.locals.account = userName;
            req.session.account = res.locals.account;
            console.log(req.session.account);
            res.redirect('/');
            return;
        }
    });
});

module.exports = router;