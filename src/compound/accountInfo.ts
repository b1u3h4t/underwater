import { comptroller, web3 } from "./contracts";
import { legos } from "@studydefi/money-legos";
import { BigNumber } from "bignumber.js";
import * as _ from "lodash";
import { AccountAssets, AssetInfo } from "./types";

export async function getAccountInfo(account: string): Promise<AccountAssets> {
  const accountAssets: AccountAssets = [];
  // 1. get all assets for account
  let assets: string[] = await comptroller.methods.getAssetsIn(account).call();
  // 2. iterate through assets and get Balance Of CTokens and BoorowBalance Stored
  for (let i = 0; i < assets.length; i++) {
    // @ts-ignore: Unreachable code error
    const cToken = new web3.eth.Contract(legos.compound.cToken.abi, assets[i]);
    const asset: string = assets[i];
    const symbol: string = await cToken.methods.symbol().call();
    const name: string = await cToken.methods.name().call();
    const cTokenBalance: number = new BigNumber(
      await cToken.methods.balanceOf(account).call()
    ).toNumber();
    const borrowBalanceStored: number = new BigNumber(
      await cToken.methods.borrowBalanceStored(account).call()
    ).toNumber();

    let assetInfo: AssetInfo = {
      account: account,
      asset: asset,
      symbol: symbol,
      name: name,
      cTokenBalance: cTokenBalance,
      borrowBalanceStored: borrowBalanceStored,
    };
    accountAssets.push(assetInfo);
  }

  // Filter Assets remove zero assets
  let filtered = _.filter(accountAssets, function (o: AssetInfo) {
    return o.cTokenBalance !== 0 || o.borrowBalanceStored !== 0;
  });

  return filtered;
}
