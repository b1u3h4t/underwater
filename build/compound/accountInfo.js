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
const money_legos_1 = require("@studydefi/money-legos");
const bignumber_js_1 = require("bignumber.js");
function getAccountInfo(account) {
    return __awaiter(this, void 0, void 0, function* () {
        const accountAssets = [];
        // 1. get assets for account
        let assets = yield contracts_1.comptroller.methods.getAssetsIn(account).call();
        // 2. iterate through assets and get Balance Of CTokens and BoorowBalance Stored
        for (let i = 0; i < assets.length; i++) {
            // @ts-ignore: Unreachable code error
            const cToken = new contracts_1.web3.eth.Contract(money_legos_1.legos.compound.cToken.abi, assets[i]);
            const asset = assets[i];
            const symbol = yield cToken.methods.symbol().call();
            const name = yield cToken.methods.name().call();
            const cTokenBalance = new bignumber_js_1.BigNumber(yield cToken.methods.balanceOf(asset).call()).toString();
            const borrowBalanceStored = new bignumber_js_1.BigNumber(yield cToken.methods.borrowBalanceStored(asset).call()).toString();
            console.log(symbol);
            let assetInfo = {
                address: assets[i],
                symbol: symbol,
                name: name,
                cTokenBalance: cTokenBalance,
                borrowBalanceStored: borrowBalanceStored,
            };
            accountAssets.push(assetInfo);
        }
        // 3. Get Amounts in eth (using formula ??? )
        // 4. Separate Borrowed and CToken Balances
        // 5. Get max values
        // 6  Form Flashloan Liquidator Call
        return accountAssets;
    });
}
exports.getAccountInfo = getAccountInfo;
