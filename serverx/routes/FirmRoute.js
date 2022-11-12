import FirmData from "../models/FirmModel.js";
import UserData from "../models/UserData.js";
import express from "express";
import auth from "./Auth.js";
import UserBranch from "../models/UserBranch.js";
const router = express.Router();

router.post("/createFirm", auth, async (req, res) => {
  console.log(req.userId);
  const {
    firmname,
    email,
    gstin,
    pancard,
    address,
    city,
    state,
    pincode,
    phonenumber,
    phonenumber2,
    bankname,
    branchname,
    ifsc,
    account,
  } = req.body;
  console.log(firmname);

  try {
    const data = new FirmData({
      firmname: firmname,
      email: email,
      gstin: gstin,
      pancard: pancard,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      phonenumber: phonenumber,
      phonenumber2: phonenumber2,

      userid: req.userId,
    });
    const dataRegister = await data.save();
    console.log("lol", dataRegister);

    const firmid = dataRegister._id;

    let usersid = dataRegister.userid;
    console.log(firmid);

    const firmlink = UserData.findOneAndUpdate(
      usersid,
      { $push: { firmid: firmid } },
      function (err, data) {
        if (err) throw err;
        else if (data) {
          console.log("firm linked to user");
          console.log("firmlink", data);
        }
      }
    );

    try {
      const dataa = new UserBranch({
        userid: usersid,
        firmname: firmname,
        firmid: firmid,
        bank: bankname,
        branch: branchname,
        ifsc: ifsc,
        account: account,
      });
      const dataRegisterr = await dataa.save();
      console.log("lol", dataRegisterr);
      const branchid = dataRegisterr._id;

      const banklink = FirmData.findOneAndUpdate(
        firmid,
        { $push: { bankLink: branchid } },
        function (err, data) {
          if (err) throw err;
          else if (data) {
            console.log("Bank Linked To firm=====>");
            console.log("Banklink", data);
          }
        }
      );
    } catch (error) {}

    res
      .status(200)
      .json({ message: "Firm Data added", status: true, firmid: firmid });
  } catch (err) {
    console.log(err);
  }
});

export default router;
