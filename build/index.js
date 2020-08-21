"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("start !");
const index_1 = require("./compound/index");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const markets = yield index_1.getAllMarketsWithPrice();
    const accountInfo = yield index_1.getAccountInfo("0xca54c3123c855bceceb0db69B034E45530020F26");
    let data = index_1.processAccountData(accountInfo, markets);
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
}))();
