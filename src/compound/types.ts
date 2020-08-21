import { BigNumber } from "bignumber.js";

export interface AccountLiquidity {
  // uint256, uint256, uint256
  Error: string;
  liquidity: BigNumber;
  shortfall: BigNumber;
  underWater: boolean;
}

export interface AssetInfo {
  address: string;
  symbol: string;
  name: string;
  cTokenBalance: string; // To Do Change To Bignumber Type
  borrowBalanceStored: string; // To Do Change To Bignumber Type
}

export interface AccountAssets extends Array<AssetInfo> {}

export interface DbAccount {
  account: string;
}

export type Underlying = {
  underLyingAddress: string;
  underLyingSymbol: string;
  undelyingPrice?: number;
};

export type cTokens = Record<string, Underlying>; // key is cTonen address
