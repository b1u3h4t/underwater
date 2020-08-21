"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("start !");
const index_1 = require("./compound/index");
(() => __awaiter(this, void 0, void 0, function* () {
    const data = index_1.getAllMarkets();
    const underLyingToken = data["0xc11b1268c1a384e55c48c2391d8d480264a3a7f4"];
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
}))();
