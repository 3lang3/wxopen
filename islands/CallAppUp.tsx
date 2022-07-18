/** @jsx h */
import { h } from "preact";
import { useEffect } from "preact/hooks";
import { tw } from "@twind";
import CallApp from "callapp-lib";

const protocol = "taobao";
const appstore = "itms-apps://itunes.apple.com/app/id387682726?mt=8";
const fallback = "https://h5.m.taobao.com/bcec/downloadTaobao.html";

const CallAppUp = () => {
  useEffect(() => {
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
    ca.open({ path: "taobao.com" });
  });
  return (
    <main
      class={tw`max-w-screen bg-black min-h-screen text-white flex items-center justify-center flex-col`}
    >
      正在唤起APP...
    </main>
  );
};

export default CallAppUp;
