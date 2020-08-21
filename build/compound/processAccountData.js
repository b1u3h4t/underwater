"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAccountData = void 0;
const bignumber_js_1 = __importDefault(require("bignumber.js"));
// Aggregate Account Data
// 1. Account Assets Info
// 2. Market Data
function processAccountData(accountAssets, marketData) {
    console.log("Process Account Calculate Balances ...");
    let accountAssetsWithBalances = [];
    for (let item of accountAssets) {
        const market = marketData[item.asset.toLowerCase()];
        let mergedData = Object.assign(Object.assign({}, item), { cTokenBalanceConverted: new bignumber_js_1.default(item.cTokenBalance)
                .times(market.cTokenPrice)
                .div(Math.pow(10, 8))
                .toNumber(), borrowBalanceStoredConverted: new bignumber_js_1.default(item.borrowBalanceStored)
                .div(Math.pow(10, market.underlyingDecimals))
                .toNumber() });
        accountAssetsWithBalances.push(mergedData);
    }
    return accountAssetsWithBalances;
}
exports.processAccountData = processAccountData;
