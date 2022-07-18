/** @jsx h */
import { h } from "preact";
import { useMemo } from "preact/hooks";
import { tw } from "@twind";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { webviewEnv } from "../utils/ua.ts";

const DownloadBtn = () => {
  const href = useMemo(() => {
    const env = webviewEnv(IS_BROWSER ? window.navigator.userAgent : "");
    const { protocol = "", host = "" } = window.location || {};
    const DEMO_APK = `${protocol}//${host}/resource/demo.apk`;
    return env.isWeixin
      ? `${protocol}//${host}/open?redirect=${encodeURIComponent(DEMO_APK)}`
      : DEMO_APK;
  }, []);
  return (
    <a href={href} class={tw`rounded bg-white px-2 py-1 text-sx`}>
      <span class={tw`text-gradient focus:outline-none`}>下载APK文件</span>
    </a>
  );
};

export default DownloadBtn;
