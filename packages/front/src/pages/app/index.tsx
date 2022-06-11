import React from "react";
import { Loading } from "react-vant";
import CallApp from "callapp-lib";

const protocol = "taobao";
const appstore = "itms-apps://itunes.apple.com/app/id387682726?mt=8";
const fallback = "https://h5.m.taobao.com/bcec/downloadTaobao.html";

const ca = new CallApp({
  scheme: {
    protocol,
  },
  intent: {
    package: "com.taobao.taobao",
    scheme: protocol,
  },
  appstore,
  fallback,
});

export default function AppPage() {
  React.useEffect(() => {
    ca.open({ path: "taobao.com" });
  })
  return <Loading>请稍后...</Loading>
}
