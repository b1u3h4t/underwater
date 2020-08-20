import Web3 from "Web3";

import { legos } from "@studydefi/money-legos";
export const web3 = new Web3(
  new Web3.providers.HttpProvider("http://95.217.193.89:7545/") // Tp Do : .env
);

console.log("Web3 version : ", web3.version);

export const comptroller = new web3.eth.Contract(
  // @ts-ignore: Unreachable code error
  legos.compound.comptroller.abi,
  legos.compound.comptroller.address
);
