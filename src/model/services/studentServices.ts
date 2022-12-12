import { Student } from "../types/student.js";
import { db } from "../../config.js";
import { OkPacket, RowDataPacket } from "mysql2";
import { RankingPositionResult, Reward } from "../types/Reward.js";
import { User } from "../types/User.js";

function findSocialHistory(callback: Function) {
  const queryString = "select SN1.xp_points, SN1.description, SN1.date, SN1.rewarded_name, SN1.rewarded_first_surname, S2.first_surname as sender_first_surname, S2.name as sender_name from (select r.id_user_sender, r.id_user_rewarded, r.xp_points, r.description, r.date, s.name as rewarded_name, s.first_surname as rewarded_first_surname from reward as r inner join student as s on r.id_user_rewarded = s.id) as SN1 inner join student S2 on SN1.id_user_sender = S2.id ORDER by SN1.date desc limit 10";
  db.query(queryString, (err, result) => {
    if (err) callback(err, null);

    const students = result;
    callback(null, students);
  });
}

function addNewReward(reward: Reward, callback: Function) {
  const queryString = "INSERT INTO reward (id_user_sender, id_user_rewarded, xp_points, date, description) VALUES (?, ?, ?, ?, ?)"

  db.query(
    queryString,
    [reward.idUserSender, reward.idUserRewarded, reward.xpPoints, reward.date, reward.description],
    (err, result) => {
      if (err) {
        callback(err, null)
      }
      else {
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
      }
    }
  );
};

function findUserRankingPosition(currentUserId: number, callback: Function) {
  const queryString = "select * from (select *, ROW_NUMBER() OVER (ORDER BY (SELECT 1)) as position from (select r.id_user_rewarded, sum(r.xp_points) as all_xp_points, s.name, s.first_surname from reward as r inner join student as s on r.id_user_rewarded = s.id group by r.id_user_rewarded order by all_xp_points DESC) as SN1) as SN2 where SN2.id_user_rewarded = ?";

  db.query(queryString, [currentUserId], (err, result) => {
    if (err) {
      callback(err, null)
    }
    else {
      const rankingDetails: RankingPositionResult = (<RowDataPacket>result)[0];
      callback(null, rankingDetails);
    }
  });
}

function findRewards(currentUserId: number, callback: Function) {
  const queryString = "select r.id_user_sender, r.id_user_rewarded, r.xp_points, r.description, r.date, s.name, s.first_surname from reward as r inner join student as s on r.id_user_rewarded = s.id where r.id_user_sender = ? order by date DESC";
  db.query(queryString, [currentUserId], (err, result) => {
    if (err) callback(err, null);
    const rewards = result;
    callback(null, rewards);
  })
}

function findReceivedRewards(currentUserId: number, callback: Function) {
  const queryString = "select r.id_user_sender, r.id_user_rewarded, r.xp_points, r.description, r.date, s.name, s.first_surname from reward as r inner join student as s on r.id_user_sender = s.id where r.id_user_rewarded = ? order by date DESC";
  db.query(queryString, [currentUserId], (err, result) => {
    if (err) callback(err, null);
    const rewards = result;
    callback(null, rewards);
  })
}

function findRankingTop5(callback: Function) {
  const queryString = "select r.id_user_rewarded, sum(r.xp_points) as all_xp_points, s.name, s.first_surname from reward as r inner join student as s on r.id_user_rewarded = s.id group by r.id_user_rewarded order by all_xp_points DESC limit 5";
  db.query(queryString, (err, result) => {
    if (err) callback(err, null);
    const ranking = result;
    callback(null, ranking);
  })
}

function createUser(user: User, callback: Function) {
  const queryString = "INSERT INTO user (email, password, role) VALUES (?, ?, ?)"

  db.query(
    queryString,
    [user.email, user.password, user.role],
    (err, result) => {
      if (err) { callback(err, null) };

      const insertId = (<OkPacket>result).insertId;
      callback(null, insertId);
    }
  );
};

function createStudent(student: Student, callback: Function) {
  const queryString = "INSERT INTO student (name, first_surname, second_surname, email_personal, email_activa, description, city, phone_number, zip_code, avatar, cv) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, BINARY(?), BINARY(?))"

  db.query(
    queryString,
    [student.name, student.firstSurname, student.secondSurname, student.personalEmailAddress, student.activaEmailAddress, student.description, student.city, student.phoneNumber, student.zipCode, student.avatar, student.cv],
    (err, result) => {
      if (err) { 
        callback(err, null);
      }else{
        const insertId = (<OkPacket>result).insertId;
        callback(null, insertId);
      }
    }
  );
};

function findAllStudents(callback: Function) { // Para el desplegable de a quien se les da los puntos
  const queryString = "SELECT id, name, first_surname, second_surname, email_personal, email_activa, phone_number, zip_code FROM student";
  db.query(queryString, (err, result) => {
    if (err) callback(err, null);

    const students = result;
    callback(null, students);
  })
}

function findOneStudent(id: string, callback: Function) { // Para los datos del perfil

  const queryString = "SELECT * FROM student WHERE id = ?";
  db.query(queryString, [id], (err, result) => {
    if (err) { callback(err, null) };

    const studentFound: Student = (<RowDataPacket>result)[0];

    callback(null, studentFound);
  });
}


export { createUser, findSocialHistory, addNewReward, findReceivedRewards, findRewards, createStudent, findAllStudents, findOneStudent, findRankingTop5, findUserRankingPosition };