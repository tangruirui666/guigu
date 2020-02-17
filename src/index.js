import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import storageUtils from "./util/storageUtils";
import memoryUtils from "./util/memoryUtils";
//读取local中的user,保存到内存中
const user=storageUtils.getUser()
memoryUtils.user=user
ReactDOM.render(<App />, document.getElementById("root"));
