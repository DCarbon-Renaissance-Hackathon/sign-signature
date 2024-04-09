import mongoose from "mongoose";
import mongooseLong from "mongoose-long";

mongooseLong(mongoose);
const Long = mongoose.Schema.Types.Long;

const WalletSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true },
    address: { type: String },
    claimed: { type: Long },
    total: { type: Long },
  },
  { versionKey: false, collection: "wallets" }
);

export const Wallet = mongoose.model("wallets", WalletSchema);
