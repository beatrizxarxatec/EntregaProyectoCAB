import {findRewards} from "../../model/services/studentServices.js";
import express from 'express';
import { ExtendedReward } from "../../model/types/Reward.js";

async function getRewards(req: express.Request, res: express.Response){
    const currentUserId = Number(req.query.currentUserId);
    findRewards(currentUserId, (err:Error, rewards:ExtendedReward[])=>{
        if(err){
            return res.status(404).json({"message": err.message});
        }
        res.status(200).json(rewards);
    })
}

export {getRewards};