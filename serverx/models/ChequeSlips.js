import mongoose, { Schema, ObjectId } from "mongoose";

const checkDataSchema = new mongoose.Schema(
  {
    firmname:{type:String},
   
    bank: { type: String },
    branch: { type: String },
    accountno: { type: Number },
    partyname:{type:String},
    chequeno:{type:mongoose.Schema.Types.Mixed},
    amount:{type:Number},

    docdate:{type:Date},
    depositdate:{type:Date},
    userid: { type: mongoose.Schema.Types.ObjectId, ref: "userData" },
  },
  {
    timestamp: true,
  }
);

const Chequeslips = mongoose.model("chequeslips", checkDataSchema);
export default Chequeslips;
