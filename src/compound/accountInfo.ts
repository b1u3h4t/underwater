import { comptroller, web3 } from "./contracts";
import { legos } from "@studydefi/money-legos";
import { BigNumber } from "bignumber.js";
import * from "./types";

interface AssetInfo {
  address: string;
  symbol: string;
  name: string;
  cTokenBalance: string; // To Do Change To Bignumber Type
  borrowBalanceStored: string; // To Do Change To Bignumber Type
}

interface AccountAssets extends Array<AssetInfo> {}

export async function getAccountInfo(account: string): Promise<AccountAssets> {
  const accountAssets: AccountAssets = [];

  // 1. get assets for account
  let assets: string[] = await comptroller.methods.getAssetsIn(account).call();

  // 2. iterate through assets and get Balance Of CTokens and BoorowBalance Stored
  for (let i = 0; i < assets.length; i++) {
    // @ts-ignore: Unreachable code error
    const cToken = new web3.eth.Contract(legos.compound.cToken.abi, assets[i]);
    const asset: string = assets[i];
    const symbol: string = await cToken.methods.symbol().call();
    const name: string = await cToken.methods.name().call();
    const cTokenBalance: string = new BigNumber(
      await cToken.methods.balanceOf(asset).call()
    ).toString();
    const borrowBalanceStored: string = new BigNumber(
      await cToken.methods.borrowBalanceStored(asset).call()
    ).toString();

    console.log(symbol);

    let assetInfo: AssetInfo = {
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
}
