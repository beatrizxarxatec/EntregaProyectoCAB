import express from "express";
import { addNewReward } from "../../model/services/studentServices.js";
import { Reward } from "../../model/types/Reward.js";

async function addReward(req: express.Request, res: express.Response){
    const newReward: Reward = req.body;
    addNewReward(newReward, (err: Error, rewardId: number) => {
      if (err) {
        return res.status(500).json({"message": err.message});
      }
  
      res.status(200).json({"orderId": rewardId});
    });
};

export {addReward};