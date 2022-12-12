import express from "express";
import { changeUserPassword, getUser } from "../../model/services/generalServices.js";
import { ChangePassData, ChangePassResult } from "../../model/types/Auth.js";
import { User } from "../../model/types/User.js";

async function changePassword(req: express.Request, res: express.Response) { 
  const changePassData: ChangePassData = req.body;

  const oldUserData: User = {
    email: changePassData.email,
    password: changePassData.oldPassword,
    id: 0,
    role: "",
  };
  getUser(oldUserData, (err: Error, user: User) => {
    if (err) {
      return res.status(500).json({ "message": err.message });
    }
    else {
      const newUserData: User = {
        email: changePassData.email,
        password: changePassData.newPassword,
        id: user.id,
        role: user.role,
      };
      changeUserPassword(newUserData, (err: Error, isOk: boolean) => {
        const result: ChangePassResult = {
          isOk: isOk,
        };
        if (err) {
          return res.status(500).json({ "message": err.message });
        }
        res.status(200).json(result);
      })
    }
  });
};

export { changePassword };