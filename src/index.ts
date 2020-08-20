console.log("start !");
import {
  getAccountInfo,
  getAccountLiquidity,
  DbAccount,
} from "./compound/index";
import { getTimeModel, getBorrowers } from "./compound/models/models";
import { AccountLiquidity } from "./compound/types";

(async () => {
  const data: any = await getAccountInfo(
    "0x7ed66698739139c1a9e945c249dcff6431c2dccf"
  );
  console.log(data);

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
