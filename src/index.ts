console.log("START !");
import * as _ from "lodash";
import {
  getAccountInfo,
  getAccountLiquidity,
  DbAccount,
  getAllMarkets,
  getAllMarketsWithPrice,
  processAccountData,
  cTokens,
  Underlying,
  AccountAssetsAggregated,
  blokNumber,
} from "./compound/index";
import { getBorrowers } from "./compound/models/models";
import { AccountLiquidity } from "./compound/types";
import BigNumber from "bignumber.js";

import Quee from "bull";
const chainQuee = new Quee("analyzer");

let totalJobsCount = 0;
let finishedJobs = [];
let startDate: Date;
let endDate: Date;

chainQuee.process(1000, async (job, done) => {
  const result = await analyzeAccountData(job.data.item, job.data.markets);
  done(null, result);
});

chainQuee.on("completed", async (job, result) => {
  finishedJobs.push(result);
  if (result) {
    console.log("Done !!!", result);
  }
  if (finishedJobs.length === totalJobsCount) {
    console.log("ALL JOBS FINISHED !!! ");
    endDate = new Date();
    console.log(
      "Time Elapsed :  ",
      Math.round(endDate.getTime() - startDate.getTime()) / 1000
    );
  }
});

(async () => {
  console.log("BLOKC NUMBER :  ", await blokNumber());

  startDate = new Date();

  console.log("1. GET MARKET DATA");
  console.log("-----------------------------------");
  const markets: cTokens = await getAllMarketsWithPrice();

  console.log(markets);

  console.log("2. GET ACTIVE ACCOUNTS FROM DATABASE");
  console.log("------------------------------------");
  let result: DbAccount[] = await (await getBorrowers()).rows;

  console.log("ACTIVE ACCOUNTS COUNT : ", result.length);

  totalJobsCount = result.length;
  finishedJobs = []; // Reset finished jobs // not sure if it needed here

  console.log("3. ADD JOBS IN QUEE");
  result.map((item: DbAccount) => {
    chainQuee.add({ item: item, markets: markets });
  });
})();

async function analyzeAccountData(
  item: DbAccount,
  markets: Record<string, Underlying>
): Promise<AccountAssetsAggregated | null> {
  const liquidity: AccountLiquidity = await getAccountLiquidity(item.account);

  if (liquidity.underWater) {
    const accountInfo: any = await getAccountInfo(item.account);
    let data: AccountAssetsAggregated = processAccountData(
      accountInfo,
      markets
    );
    if (data.totalBorrowUSD > 3000) {
      return data;
    }
    return null;
  }
  return null;
}

//console.log(markets);
// const accountInfo: any = await getAccountInfo(
//   "0xca54c3123c855bceceb0db69B034E45530020F26"
// );
// let data: AccountAssetsAggregated = processAccountData(accountInfo, markets);
// console.log("-----------------------------------");
// console.log(data);
// console.log("-----------------------------------");
// for (let item of result) {
//   // console.log(item.account);
//   await analyzeAccountData(item, markets);
// }
//console.log("Finish !!! ");
