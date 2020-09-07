import Web3 from "Web3";
import { legos } from "@studydefi/money-legos";
import { priceOracleAbi } from "./data/abi";
import { rpcAddress } from "../config";
const oracleAddress = "0x9b8eb8b3d6e2e0db36f41455185fef7049a35cae";

export const web3 = new Web3(
  new Web3.providers.HttpProvider(rpcAddress as string)
);

console.log("Web3 version : ", web3.version);

export const blokNumber = async (): Promise<any> => {
  return await web3.eth.getBlockNumber();
};

export const comptroller = new web3.eth.Contract(
  // @ts-ignore: Unreachable code error
  legos.compound.comptroller.abi,
  legos.compound.comptroller.address
);

// @ts-ignore: Unreachable code error
export const priceOracle = new web3.eth.Contract(priceOracleAbi, oracleAddress);
