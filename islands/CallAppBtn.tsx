/** @jsx h */
import { h } from "preact";
import { useMemo } from "preact/hooks";
import { tw } from "@twind";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { webviewEnv } from "../utils/ua.ts";

const CallAppBtn = () => {
  const href = useMemo(() => {
    const env = webviewEnv(IS_BROWSER ? window.navigator.userAgent : "");
    const { protocol = "", host = "" } = IS_BROWSER ? window.location : {};
    const callRoutePath = `${protocol}//${host}/call`;
    return env.isWeixin
      ? `${protocol}//${host}/open?redirect=${encodeURIComponent(
          callRoutePath
        )}`
      : callRoutePath;
  }, []);
  return (
    <a href={href} class={tw`rounded bg-white px-2 py-1 text-sx`}>
      <span class={tw`text-gradient focus:outline-none`}>
        唤起APP(淘宝)
      </span>
    </a>
  );
};

export default CallAppBtn;
