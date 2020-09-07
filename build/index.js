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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
console.log("start !");
const index_1 = require("./compound/index");
const models_1 = require("./compound/models/models");
const bull_1 = __importDefault(require("bull"));
const chainQuee = new bull_1.default("analyzer");
let totalJobsCount = 0;
let finishedJobs = [];
let startDate;
let endDate;
chainQuee.process(1000, (job, done) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield analyzeAccountData(job.data.item, job.data.markets);
    done(null, result);
}));
chainQuee.on("completed", (job, result) => __awaiter(void 0, void 0, void 0, function* () {
    finishedJobs.push(result);
    if (result) {
        console.log("Done !!!", result);
    }
    if (finishedJobs.length === totalJobsCount) {
        console.log("ALL JOBS FINISHED !!! ");
        endDate = new Date();
        console.log("Time Elapsed :  ", Math.round(endDate.getTime() - startDate.getTime()) / 1000);
    }
}));
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("BLOKC NUMBER :  ", yield index_1.blokNumber());
    startDate = new Date();
    console.log("1. GET MARKET DATA");
    console.log("-----------------------------------");
    const markets = yield index_1.getAllMarketsWithPrice();
    console.log(markets);
    console.log("2. GET ACTIVE ACCOUNTS FROM DATABASE");
    console.log("------------------------------------");
    let result = yield (yield models_1.getBorrowers()).rows;
    console.log("ACTIVE ACCOUNTS COUNT : ", result.length);
    totalJobsCount = result.length;
    finishedJobs = []; // Reset finished jobs // not sure if it needed here
    console.log("3. ADD JOBS IN QUEE");
    result.map((item) => {
        chainQuee.add({ item: item, markets: markets });
    });
}))();
function analyzeAccountData(item, markets) {
    return __awaiter(this, void 0, void 0, function* () {
        const liquidity = yield index_1.getAccountLiquidity(item.account);
        if (liquidity.underWater) {
            const accountInfo = yield index_1.getAccountInfo(item.account);
            let data = index_1.processAccountData(accountInfo, markets);
            if (data.totalBorrowUSD > 3000) {
                return data;
            }
            return null;
        }
        return null;
    });
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
