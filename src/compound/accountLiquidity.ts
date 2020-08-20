import { comptroller, web3 } from "./contracts";
import { legos } from "@studydefi/money-legos";
import { BigNumber } from "bignumber.js";
import { AccountLiquidity } from "./types";

export async function getAccountLiquidity(
  borrower: string
): Promise<AccountLiquidity> {
  let accountLiquidity: AccountLiquidity; // ?
  let response = await comptroller.methods.getAccountLiquidity(borrower).call();
  let { "0": Error, "1": liquidity, "2": shortfall } = response;

  const accountUnderwater = new BigNumber(shortfall).isGreaterThan(0);

  return (accountLiquidity = {
    Error: Error,
    liquidity: liquidity,
    shortfall: shortfall,
    underWater: accountUnderwater,
  });
}
