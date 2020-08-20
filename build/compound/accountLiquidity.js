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
const contracts_1 = require("./contracts");
const bignumber_js_1 = require("bignumber.js");
function getAccountLiquidity(borrower) {
    return __awaiter(this, void 0, void 0, function* () {
        let accountLiquidity; // ?
        let response = yield contracts_1.comptroller.methods.getAccountLiquidity(borrower).call();
        let { "0": Error, "1": liquidity, "2": shortfall } = response;
        const accountUnderwater = new bignumber_js_1.BigNumber(shortfall).isGreaterThan(0);
        return (accountLiquidity = {
            Error: Error,
            liquidity: liquidity,
            shortfall: shortfall,
            underWater: accountUnderwater,
        });
    });
}
exports.getAccountLiquidity = getAccountLiquidity;