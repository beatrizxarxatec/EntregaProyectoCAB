import express from "express";
import { createStudent, createUser } from "../../model/services/studentServices.js";
import { Student } from "../../model/types/student.js";
import { StudentUser, User } from "../../model/types/User.js";

async function registerUser(req: express.Request, res: express.Response) {
  const newStudentUser: StudentUser = req.body;
  const newUser: User = {
    id: 0,
    email: newStudentUser.personalEmailAddress,
    password: newStudentUser.password,
    role: "User",
  };
  const newStudent: Student = {
    id: 0,
    name: newStudentUser.name,
    firstSurname: newStudentUser.firstSurname,
    secondSurname: newStudentUser.secondSurname,
    personalEmailAddress: newStudentUser.personalEmailAddress,
    activaEmailAddress: newStudentUser.activaEmailAddress,
    description: newStudentUser.description,
    city: newStudentUser.city,
    phoneNumber: newStudentUser.phoneNumber,
    zipCode: newStudentUser.zipCode,
    avatar: newStudentUser.avatar,
    cv: newStudentUser.cv,
  };
  createUser(newUser, (err: Error, userId: number) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }
    createStudent(newStudent, (err: Error, studentId: number) => {
      if (err) {
        return res.status(500).json({ "message": err.message });
      }

      res.status(200).json({ "orderId": studentId });
    });
  })
};

export { registerUser };