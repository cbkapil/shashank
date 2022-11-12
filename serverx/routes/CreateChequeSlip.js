import Chequeslips from "../models/ChequeSlips.js";
import UserData from "../models/UserData.js";
import express from "express";
import auth from "./Auth.js";
const router = express.Router();

router.post("/createchequeslip", auth, async (req, res) => {
  console.log(req.userId);
  const {
    bankid,
        
        branchid,
        accountfin,
        party2name,
        firmnamee,
        chequeno,
        amount,
        docdate,
        depositdate,
  } = req?.body;
  

  try {
    const data = new Chequeslips({

    firmname:firmnamee,
    bankname:bankid ,
    branchname: branchid,
    accountno:accountfin ,
    partyname:party2name,
    chequeno:chequeno,
    amount:amount,
    docdate:new Date(new Date(docdate)),
    depositdate:new Date(new Date(depositdate)),
    userid: req.userId,
     
    });
    const dataRegister = await data.save();
    console.log("lol", dataRegister);
    let slipid = dataRegister._id;
    let usersid = dataRegister.userid;

    const firmlink = UserData.findOneAndUpdate(
      usersid,
      { $push: { chequeslips: slipid } },
      function (err, data) {
        if (err) throw err;
        else if (data) {
          console.log("Slip added");
          console.log("firmlink", data);
        }
      }
    );

    res.status(201).json({ message: "Firm Data added", status: true });
  } catch (err) {
    console.log(err);
  }
});

export default router;
