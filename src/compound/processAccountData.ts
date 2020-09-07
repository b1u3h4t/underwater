import {
  cTokens,
  AccountAssets,
  AssetInfo,
  AssetInfoWithBalances,
  AccountAssetsWithBalances,
  AccountAssetsAggregated,
} from "./types";
import BigNumber from "bignumber.js";
import { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";

// Aggregate Account Data
// 1. Account Assets Info
// 2. Market Data

export function processAccountData(
  accountAssets: AccountAssets,
  marketData: cTokens
): AccountAssetsAggregated {
  //console.log("Process Account Calculate Balances ...");

  let accountAssetsWithBalances: AccountAssetsWithBalances = [];
  let accountAssetsAggregated: AccountAssetsAggregated = {
    totalBorrowUSD: 0,
    totalCollateralUSD: 0,
    assetDetails: accountAssetsWithBalances,
  };

  for (let item of accountAssets) {
    const market = marketData[item.asset.toLowerCase()];
    const borrowBalanceStoredConverted: number = new BigNumber(
      item.borrowBalanceStored
    )
      .div(10 ** market.underlyingDecimals)
      .toNumber();
    const cTokenBalanceConverted: number = new BigNumber(item.cTokenBalance)
      .times(market.cTokenPrice)
      .div(10 ** 8)
      .toNumber();

    let assetData: AssetInfoWithBalances = {
      ...item,
      cTokenBalanceConverted: cTokenBalanceConverted,
      borrowBalanceStoredConverted: borrowBalanceStoredConverted,
      cTokenBalanceUsd: cTokenBalanceConverted * market.undelyingPrice,
      borrowBalanceUsd: borrowBalanceStoredConverted * market.undelyingPrice,
    };
    accountAssetsWithBalances.push(assetData);
  }

  accountAssetsAggregated.assetDetails = accountAssetsWithBalances;

  const totalBorrowUSD = accountAssetsWithBalances.reduce(
    (acc: number, asset: AssetInfoWithBalances) => {
      return acc + asset.borrowBalanceUsd;
    },
    0
  );

  const totalCollateralUSD = accountAssetsWithBalances.reduce(
    (acc: number, asset: AssetInfoWithBalances) => {
      return acc + asset.cTokenBalanceUsd;
    },
    0
  );

  accountAssetsAggregated.totalBorrowUSD = totalBorrowUSD;
  accountAssetsAggregated.totalCollateralUSD = totalCollateralUSD;

  return accountAssetsAggregated;
}
