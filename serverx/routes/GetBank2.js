
import express from "express";
import FirmData from "../models/FirmModel.js";

const router = express.Router();

router.post("/getbank2", async (req, res) => {
    console.log('lol',req.body.firmid)
  let firmDatas = await FirmData.findById(req.body.firmid).populate('bankLink');
  if (!firmDatas) {
    res.status(500).json({ message: "user not found" });
  }
  else{
  res.status(200).send({ firmDatas });

  console.log(
    "lollllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll",
    firmDatas
  );}
});

export default router;
