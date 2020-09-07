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
    //console.log("Process Account Calculate Balances ...");
    let accountAssetsWithBalances = [];
    let accountAssetsAggregated = {
        totalBorrowUSD: 0,
        totalCollateralUSD: 0,
        assetDetails: accountAssetsWithBalances,
    };
    for (let item of accountAssets) {
        const market = marketData[item.asset.toLowerCase()];
        const borrowBalanceStoredConverted = new bignumber_js_1.default(item.borrowBalanceStored)
            .div(Math.pow(10, market.underlyingDecimals))
            .toNumber();
        const cTokenBalanceConverted = new bignumber_js_1.default(item.cTokenBalance)
            .times(market.cTokenPrice)
            .div(Math.pow(10, 8))
            .toNumber();
        let assetData = Object.assign(Object.assign({}, item), { cTokenBalanceConverted: cTokenBalanceConverted, borrowBalanceStoredConverted: borrowBalanceStoredConverted, cTokenBalanceUsd: cTokenBalanceConverted * market.undelyingPrice, borrowBalanceUsd: borrowBalanceStoredConverted * market.undelyingPrice });
        accountAssetsWithBalances.push(assetData);
    }
    accountAssetsAggregated.assetDetails = accountAssetsWithBalances;
    const totalBorrowUSD = accountAssetsWithBalances.reduce((acc, asset) => {
        return acc + asset.borrowBalanceUsd;
    }, 0);
    const totalCollateralUSD = accountAssetsWithBalances.reduce((acc, asset) => {
        return acc + asset.cTokenBalanceUsd;
    }, 0);
    accountAssetsAggregated.totalBorrowUSD = totalBorrowUSD;
    accountAssetsAggregated.totalCollateralUSD = totalCollateralUSD;
    return accountAssetsAggregated;
}
exports.processAccountData = processAccountData;
