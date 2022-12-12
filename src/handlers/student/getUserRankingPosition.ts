import express from 'express';
import {findUserRankingPosition} from '../../model/services/studentServices.js';
import { RankingPositionResult } from '../../model/types/Reward.js';

async function getUserRankingPosition(req: express.Request, res: express.Response){
    const currentUserId = Number(req.query.currentUserId);
    findUserRankingPosition(currentUserId, (err: Error, result:RankingPositionResult)=>{
        if(err){
            res.status(404).json({"message": err.message});
        }
        res.status(200).json(result);
    })
}

export {getUserRankingPosition};