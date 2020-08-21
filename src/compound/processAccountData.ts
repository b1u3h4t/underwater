import {
  cTokens,
  AccountAssets,
  AssetInfo,
  AssetInfoWithBalances,
  AccountAssetsWithBalances,
} from "./types";
import BigNumber from "bignumber.js";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

// Aggregate Account Data
// 1. Account Assets Info
// 2. Market Data

export function processAccountData(
  accountAssets: AccountAssets,
  marketData: cTokens
): AccountAssetsWithBalances {
  console.log("Process Account Calculate Balances ...");
  let accountAssetsWithBalances: AccountAssetsWithBalances = [];
  for (let item of accountAssets) {
    const market = marketData[item.asset.toLowerCase()];

    let mergedData: AssetInfoWithBalances = {
      ...item,
      cTokenBalanceConverted: new BigNumber(item.cTokenBalance)
        .times(market.cTokenPrice)
        .div(10 ** 8)
        .toNumber(),
      borrowBalanceStoredConverted: new BigNumber(item.borrowBalanceStored)
        .div(10 ** market.underlyingDecimals)
        .toNumber(),
    };
    accountAssetsWithBalances.push(mergedData);
  }

  return accountAssetsWithBalances;
}
