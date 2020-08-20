console.log("start !");
//require("dotenv").config();

import { getAccountInfo } from "./compound/index";

(async () => {
  const data: any = await getAccountInfo(
    "0x7ed66698739139c1a9e945c249dcff6431c2dccf"
  );

  console.log(data);
})();
