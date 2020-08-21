"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.priceOracle = exports.comptroller = exports.web3 = void 0;
const Web3_1 = __importDefault(require("Web3"));
const money_legos_1 = require("@studydefi/money-legos");
const abi_1 = require("./data/abi");
const config_1 = require("../config");
const oracleAddress = "0x9b8eb8b3d6e2e0db36f41455185fef7049a35cae";
exports.web3 = new Web3_1.default(new Web3_1.default.providers.HttpProvider(config_1.rpcAddress));
console.log("Web3 version : ", exports.web3.version);
exports.comptroller = new exports.web3.eth.Contract(
// @ts-ignore: Unreachable code error
money_legos_1.legos.compound.comptroller.abi, money_legos_1.legos.compound.comptroller.address);
// @ts-ignore: Unreachable code error
exports.priceOracle = new exports.web3.eth.Contract(abi_1.priceOracleAbi, oracleAddress);
