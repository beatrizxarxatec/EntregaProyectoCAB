import {findRankingTop5} from "../../model/services/studentServices.js";
import express from 'express';
import { RewardTotalEntry } from "../../model/types/Reward.js";

async function getRankingTop5(req: express.Request, res: express.Response){
    findRankingTop5((err:Error, rewards:RewardTotalEntry[])=>{
        if(err){
            return res.status(404).json({"message": err.message});
        }
        res.status(200).json(rewards);
    })
}

export {getRankingTop5};