import express from 'express';
import { User } from '../../model/types/User.js';
import {checkUserLogin} from '../../model/services/generalServices.js';
import { LoginResult } from '../../model/types/Auth.js';

async function checkLogin(req: express.Request, res: express.Response){
    const user: User = req.body;
    checkUserLogin(user, (err:Error, loginResult: LoginResult)=>{
        if(err){
            return res.status(404).json({"message": err.message});
        }
        res.status(200).json(loginResult);
    })
}

export {checkLogin};
