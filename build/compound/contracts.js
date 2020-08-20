"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comptroller = exports.web3 = void 0;
const Web3_1 = __importDefault(require("Web3"));
const money_legos_1 = require("@studydefi/money-legos");
exports.web3 = new Web3_1.default(new Web3_1.default.providers.HttpProvider("http://95.217.193.89:7545/") // Tp Do : .env
);
console.log("Web3 version : ", exports.web3.version);
exports.comptroller = new exports.web3.eth.Contract(
// @ts-ignore: Unreachable code error
money_legos_1.legos.compound.comptroller.abi, money_legos_1.legos.compound.comptroller.address);
