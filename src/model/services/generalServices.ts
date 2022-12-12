import { User } from "../types/User.js";
import { db } from "../../config.js";
import { RowDataPacket } from "mysql2";
import { LoginResult } from "../types/Auth.js";
import { Student } from "../types/student.js";


function checkUserLogin(user: User, callback: Function) {
  const queryString = "SELECT s.id, s.email_personal FROM user u inner join student s on s.email_personal = u.email where email = ? AND password = ?"; // ? parametro
  db.query(queryString, [user.email, user.password], (err, result) => {
    let isOk = true;
    let studentId = 0;
    let email = "";
    if (err || (result as RowDataPacket[]).length == 0) {
      isOk = false;
    }
    else {
      const student: Student = (<RowDataPacket>result)[0];
      email = user.email;
      studentId = student.id;
    }
    const loginResult: LoginResult = {
      isOk: isOk,
      email: email,
      studentId: studentId,
    };
    callback(null, loginResult);
  })
};

function getUser(user: User, callback: Function) {
  const queryString = "SELECT * FROM user where email = ? AND password = ?"; 
  db.query(queryString, [user.email, user.password], (err, result) => {
    if (err) {
      callback(err, null);
    }
    else if ((result as RowDataPacket[]).length == 0) {
      callback({ message: "Not found" }, null);
    }
    else {
      const user: User = (<RowDataPacket>result)[0];
      callback(null, user);
    }
  });
};

function changeUserPassword(user: User, callback: Function) {
  const queryString = "UPDATE user SET password= ? WHERE id = ?";
  db.query(queryString, [user.password, user.id], (err, result) => {
    if (err) {
      callback(err, false);
    }
    else {
      callback(null, true);
    }
  });

}


export { getUser, changeUserPassword, checkUserLogin };