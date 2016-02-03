/**
 * Created by zhangshuji on 2016/1/30.
 */
var express = require('express'),
    router = express.Router();

router.get('/', function(req, res) {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;