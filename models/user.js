/**
 * Created by zhangshuji on 2016/1/30.
 */
var mysql = require('mysql');
var DB_NAME = 'scott';

var pool  = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'tiger'
});

pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1');
});

function User(user){
    this.account = user.account;
    this.password = user.password;
};
module.exports = User;

pool.getConnection(function(err, connection) {

    var useDbSql = "USE " + DB_NAME;
    connection.query(useDbSql, function (err) {
        if (err) {
            console.log("USE Error: " + err.message);
            return;
        }
        console.log('USE succeed');
    });

    //保存数据
    User.prototype.save = function save(callback) {
        var user = {
            account: this.account,
            password: this.password
        };

        var insertUser_Sql = "INSERT INTO h_user(account,password,register_time) VALUES(?,?,now())";

        connection.query(insertUser_Sql, [user.account, user.password], function (err,result) {
            if (err) {
                console.log("insertUser_Sql Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[save]");
            callback(err,result);
        });
    };

    //根据用户名得到用户数量
    User.getUserNumByName = function getUserNumByName(account, callback) {

        var getUserNumByName_Sql = "SELECT COUNT(1) AS num FROM h_user WHERE account = ?";

        connection.query(getUserNumByName_Sql, [account], function (err, result) {
            if (err) {
                console.log("getUserNumByName Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getUserNumByName]");
            callback(err,result);
        });
    };

    //根据用户名得到用户信息
    User.getUserByUserName = function getUserNumByName(account, callback) {

        var getUserByUserName_Sql = "SELECT * FROM h_user WHERE account = ?";

        connection.query(getUserByUserName_Sql, [account], function (err, result) {
            if (err) {
                console.log("getUserByUserName Error: " + err.message);
                return;
            }

            //connection.release();

            console.log("invoked[getUserByUserName]");
            callback(err,result);
        });
    };

    connection.release();
});