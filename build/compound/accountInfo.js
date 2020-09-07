"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccountInfo = void 0;
const contracts_1 = require("./contracts");
const money_legos_1 = require("@studydefi/money-legos");
const bignumber_js_1 = require("bignumber.js");
const _ = __importStar(require("lodash"));
function getAccountInfo(account) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountAssets = [];
        // 1. get all assets for account
        let assets = yield contracts_1.comptroller.methods.getAssetsIn(account).call();
        // 2. iterate through assets and get Balance Of CTokens and BoorowBalance Stored
        for (let i = 0; i < assets.length; i++) {
            // @ts-ignore: Unreachable code error
            const cToken = new contracts_1.web3.eth.Contract(money_legos_1.legos.compound.cToken.abi, assets[i]);
            const asset = assets[i].toLowerCase();
            const symbol = yield cToken.methods.symbol().call();
            const name = yield cToken.methods.name().call();
            const cTokenBalance = new bignumber_js_1.BigNumber(yield cToken.methods.balanceOf(account).call()).toNumber();
            const borrowBalanceStored = new bignumber_js_1.BigNumber(yield cToken.methods.borrowBalanceStored(account).call()).toNumber();
            let assetInfo = {
                account: "0x" + account.toLowerCase(),
                asset: asset,
                symbol: symbol,
                name: name,
                cTokenBalance: cTokenBalance,
                borrowBalanceStored: borrowBalanceStored,
            };
            accountAssets.push(assetInfo);
        }
        // Filter Assets remove zero assets
        let filtered = _.filter(accountAssets, function (o) {
            return o.cTokenBalance !== 0 || o.borrowBalanceStored !== 0;
        });
        return filtered;
    });
}
exports.getAccountInfo = getAccountInfo;
