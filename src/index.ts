console.log("start !");
import {
  getAccountInfo,
  getAccountLiquidity,
  DbAccount,
  getAllMarkets,
  cTokens,
  Underlying,
  priceOracle,
} from "./compound/index";
import { getTimeModel, getBorrowers } from "./compound/models/models";
import { AccountLiquidity } from "./compound/types";
import { accountInfo } from "./compound/mock";
import BigNumber from "bignumber.js";

(async () => {
  const data: cTokens = getAllMarkets();

  const underLyingToken: Underlying =
    data["0xc11b1268c1a384e55c48c2391d8d480264a3a7f4"];

  // console.log(underLyingToken.underLyingSymbol);

  // const accountInfo: any = await getAccountInfo(
  //   "0x7ed66698739139c1a9e945c249dcff6431c2dccf"
  // );

  // console.log(accountInfo);
  // console.log(data);
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
