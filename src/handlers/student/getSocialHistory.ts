import {findSocialHistory} from "../../model/services/studentServices.js";
import express from 'express';
import { SocialHistoryReward } from "../../model/types/Reward.js";

async function getSocialHistory(req: express.Request, res: express.Response){
    findSocialHistory((err:Error, rewards:SocialHistoryReward[])=>{
        if(err){
            return res.status(404).json({"message": err.message});
        }
        res.status(200).json(rewards);
    })
}

export {getSocialHistory};