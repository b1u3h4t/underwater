"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbUtil = __importStar(require("../../utils/dbUtil"));
const transactionSuccess = "transaction success";
/**
 * Get Accounts Borrowed
 */
exports.getBorrowers = () => __awaiter(this, void 0, void 0, function* () {
    let sql = "select distinct encode(borrower , 'hex') as account  from sgd3.borrow_event limit 100;";
    let data = [];
    let result;
    try {
        result = yield dbUtil.sqlToDB(sql, data);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
/*
 * sample query
 * @return server time
 */
exports.getTimeModel = () => __awaiter(this, void 0, void 0, function* () {
    let sql = "SELECT NOW();";
    let data = [];
    let result;
    try {
        result = yield dbUtil.sqlToDB(sql, data);
        return result;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
/*
 * sample query using transactions
 * @return transaction success
 */
// export const sampleTransactionModel = async () => {
//   let singleSql = "DELETE FROM TEST";
//   let multiSql = "INSERT INTO TEST (testcolumn) VALUES ($1)";
//   let singleData: string[][] = [];
//   let multiData: string[][] = [["typescript"], ["is"], ["fun"]];
//   let client: Client = await dbUtil.getTransaction();
//   try {
//     await dbUtil.sqlExecSingleRow(client, singleSql, singleData);
//     await dbUtil.sqlExecMultipleRows(client, multiSql, multiData);
//     await dbUtil.commit(client);
//     return transactionSuccess;
//   } catch (error) {
//     await dbUtil.rollback(client);
//     logger.error(`sampleTransactionModel error: ${error.message}`);
//     throw new Error(error.message);
//   }
// };
