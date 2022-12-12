"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserLogin = exports.changeUserPassword = exports.getUser = void 0;
const config_js_1 = require("../../config.js");
// CONSULTAS A LA BD
function checkUserLogin(user, callback) {
    const queryString = "SELECT s.id, s.email_personal FROM user u inner join student s on s.email_personal = u.email where email = ? AND password = ?"; // ? parametro
    config_js_1.db.query(queryString, [user.email, user.password], (err, result) => {
        let isOk = true;
        let studentId = 0;
        let email = "";
        if (err || result.length == 0) {
            isOk = false;
        }
        else {
            const student = result[0];
            email = user.email;
            studentId = student.id;
        }
        const loginResult = {
            isOk: isOk,
            email: email,
            studentId: studentId,
        };
        callback(null, loginResult);
    });
}
exports.checkUserLogin = checkUserLogin;
;
function getUser(user, callback) {
    const queryString = "SELECT * FROM user where email = ? AND password = ?"; // ? parametro
    config_js_1.db.query(queryString, [user.email, user.password], (err, result) => {
        if (err) {
            callback(err, null);
        }
        else if (result.length == 0) {
            callback({ message: "Not found" }, null);
        }
        else {
            const user = result[0];
            callback(null, user);
        }
    });
}
exports.getUser = getUser;
;
function changeUserPassword(user, callback) {
    const queryString = "UPDATE user SET password= ? WHERE id = ?"; // ? parametro
    config_js_1.db.query(queryString, [user.password, user.id], (err, result) => {
        if (err) {
            callback(err, false);
        }
        else {
            callback(null, true);
        }
    });
}
exports.changeUserPassword = changeUserPassword;
