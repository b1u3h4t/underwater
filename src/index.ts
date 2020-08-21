console.log("start !");
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
  priceOracle,
} from "./compound/index";
import { getTimeModel, getBorrowers } from "./compound/models/models";
import {
  AccountLiquidity,
  AssetInfo,
  AccountAssetsWithBalances,
  AssetInfoWithBalances,
} from "./compound/types";
import { accountInfo } from "./compound/mock";
import BigNumber from "bignumber.js";

(async () => {
  const markets: cTokens = await getAllMarketsWithPrice();

  const accountInfo: any = await getAccountInfo(
    "0xca54c3123c855bceceb0db69B034E45530020F26"
  );

  let data: AccountAssetsWithBalances = processAccountData(
    accountInfo,
    markets
  );

  console.log(data);

  // console.log(accountInfo);
  // let result: DbAccount[] = await (await getBorrowers()).rows;
  // for (let item of result) {
  //   console.log(item.account);
  //   // const liquidity: AccountLiquidity = await getAccountLiquidity(item.account);
  //   // if (liquidity.underWater) {
  //   //   console.log(item.account, liquidity);
  //   //   console.log("-----");
  //   // }
  // }
})();
