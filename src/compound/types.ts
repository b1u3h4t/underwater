import { BigNumber } from "bignumber.js";

export interface AccountLiquidity {
  // uint256, uint256, uint256
  Error: string;
  liquidity: BigNumber;
  shortfall: BigNumber;
  underWater: boolean;
}

export interface AssetInfo {
  account: string;
  asset: string;
  symbol: string;
  name: string;
  cTokenBalance: number; // To Do Change To Bignumber Type
  borrowBalanceStored: number; // To Do Change To Bignumber Type
}

export interface AccountAssets extends Array<AssetInfo> {}

export interface DbAccount {
  account: string;
}

export type Underlying = {
  underLyingAddress: string;
  underLyingSymbol: string;
  underlyingDecimals: number;
  exchangeRateStored: number;
  cTokenPrice: number;
  collateralFactor: number;
  undelyingPrice: number;
};

export type cTokens = Record<string, Underlying>; // key is cTonen address

export interface AssetInfoWithBalances extends AssetInfo {
  cTokenBalanceConverted: number;
  borrowBalanceStoredConverted: number;
}

export interface AccountAssetsWithBalances
  extends Array<AssetInfoWithBalances> {}
