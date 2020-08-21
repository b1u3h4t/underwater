"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const contracts_1 = require("./contracts");
const bignumber_js_1 = __importDefault(require("bignumber.js"));
const ctokens = {
    ["0x6c8c6b02e7b2be14d4fa6022dfd6d75921d90e4e"]: {
        underLyingAddress: "0x0d8775f648430679a709e98d2b0cb6250d2887ef",
        underLyingSymbol: "BAT",
    },
    ["0x5d3a536e4d6dbd6114cc1ead35777bab948e3643"]: {
        underLyingAddress: "0x6b175474e89094c44da98b954eedeac495271d0f",
        underLyingSymbol: "DAI",
    },
    ["0x4ddc2d193948926d02f9b1fe9e1daa0718270ed5"]: {
        underLyingAddress: "",
        underLyingSymbol: "ETH",
    },
    ["0x158079ee67fce2f58472a96584a73c7ab9ac95c1"]: {
        underLyingAddress: "0x1985365e9f78359a9b6ad760e32412f4a445e862",
        underLyingSymbol: "REP",
    },
    ["0xf5dce57282a584d2746faf1593d3121fcac444dc"]: {
        underLyingAddress: "0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359",
        underLyingSymbol: "SAI",
    },
    ["0x39aa39c021dfbae8fac545936693ac917d5e7563"]: {
        underLyingAddress: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        underLyingSymbol: "USDC",
    },
    ["0xf650c3d88d12db855b8bf7d11be6c55a4e07dcc9"]: {
        underLyingAddress: "0xdac17f958d2ee523a2206206994597c13d831ec7",
        underLyingSymbol: "USDT",
    },
    ["0xc11b1268c1a384e55c48c2391d8d480264a3a7f4"]: {
        underLyingAddress: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
        underLyingSymbol: "BTC",
    },
    ["0xb3319f5d18bc0d84dd1b4825dcde5d5f7266d407"]: {
        underLyingAddress: "0xe41d2489571d322189246dafa5ebde1f4699f498",
        underLyingSymbol: "ZRX",
    },
};
function getAllMarkets() {
    return ctokens;
}
exports.getAllMarkets = getAllMarkets;
function getAllMarketsWithPrice() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let token in ctokens) {
            let price = yield contracts_1.priceOracle.methods
                .price(ctokens[token].underLyingSymbol)
                .call();
            ctokens[token].undelyingPrice = new bignumber_js_1.default(price)
                .div(Math.pow(10, 6))
                .toNumber();
            return ctokens;
        }
    });
}
exports.getAllMarketsWithPrice = getAllMarketsWithPrice;
