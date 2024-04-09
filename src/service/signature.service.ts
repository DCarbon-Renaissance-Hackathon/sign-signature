import bs58 from "bs58";
import { Keypair } from "@solana/web3.js";
import { publicKeyCreate, ecdsaSign } from "secp256k1";
import db from "../config/database";
import { Wallet } from "../model/wallet.model";
import dotenv from "dotenv";
import { keccak_256 } from "js-sha3";
import secp256k1 from "secp256k1";
import { GetSignatureResponseSchema } from "../schema/signature.schema";
import { BigNumber } from "bignumber.js";

dotenv.config();

const url = `https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd`;
const PRICE_CARBON = 5;

const service = () => {
  const getSignature = async (
    projectId: String,
    buyerPub: String,
    amount: String
    // price: String
  ): Promise<GetSignatureResponseSchema | string> => {
    const backend = Keypair.fromSecretKey(
      bs58.decode(process.env.PRIVATE_KEY_BACKEND || "")
    );
    const secp256k1PrivateKey = backend.secretKey.slice(0, 32);
    const CONST_TOKEN = new BigNumber("1000000000");

    // (amount * 5)/priceSolanaByUsd
    // convert amount to true type
    const amountConvert = new BigNumber(amount.toString());

    const response = await fetch(url);
    const priceSolana = await response.json();
    const priceSolanaByUsd = new BigNumber(priceSolana.solana.usd.toString());

    const priceRs = amountConvert
      .times(PRICE_CARBON.toString())
      .dividedBy(priceSolanaByUsd)
      .toString();

    const amountMess = amountConvert.times(CONST_TOKEN);

    let priceMess = new BigNumber(
      parseFloat(parseFloat(priceRs).toFixed(9)).toString()
    ).times(CONST_TOKEN);

    console.log("projectId", projectId);
    console.log("buyerPub", buyerPub);
    console.log("amountMess", amountMess.toString());
    console.log("priceMess", priceMess.toString());

    let message = Buffer.from(
      `${projectId.toString()}${buyerPub.toString()}${amountMess.toString()}${priceMess.toString()}`
    );
    console.log(
      "message: ",
      `${projectId}${buyerPub}${amountMess}${priceMess}`
    );

    let messageHash = Buffer.from(keccak_256.update(message).digest());
    let { signature, recid: recoveryId } = secp256k1.ecdsaSign(
      messageHash,
      secp256k1PrivateKey
    );

    return {
      signature: Array.from(signature),
      recoveryId: recoveryId,
      price: parseFloat(parseFloat(priceRs).toFixed(9)),
    };
  };

  return { getSignature };
};

export default service();
