import { BigNumber } from "bignumber.js";

export interface AccountLiquidity {
  // uint256, uint256, uint256
  Error: string;
  liquidity: BigNumber;
  shortfall: BigNumber;
  underWater: boolean;
}

export interface DbAccount {
  account: string;
}
