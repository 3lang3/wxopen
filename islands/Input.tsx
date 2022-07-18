/** @jsx h */
import { h } from "preact";
import useValue from "../utils/value.ts";
import { useState, useEffect } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";
import { webviewEnv } from "../utils/ua.ts";

export default function Input() {
  const [qrcodeValue, setQrcodeValue] = useValue();
  const [value, setValue] = useState(() => qrcodeValue);
  const { protocol = "", host = "" } = IS_BROWSER ? window.location : {};
  const env = webviewEnv(IS_BROWSER ? window.navigator.userAgent : "");

  useEffect(() => {
    setQrcodeValue(
      `${protocol}//${host}/open?redirect=${encodeURIComponent(value)}`
    );
  }, []);

  return (
    <section
      class={tw`bg-white max-w-lg rounded-full p-3 flex justify-between items-center w-full mt-10 mb-3`}
    >
      <input
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        class={tw`flex-1 p-2 text-black focus-visible:(border-none)`}
        placeholder="https://baidu.com"
      />
      <button
        onClick={() => {
          const url = `${protocol}//${host}/open?redirect=${encodeURIComponent(
            value
          )}`;
          if (env.isWeixin) {
            window.location.replace(url);
            return;
          }
          setQrcodeValue(url);
        }}
        class={tw`bg-gradient-to-r from-[#ff8a00] to-[#da1b60] py-2 px-5 rounded-full ml-1`}
      >
        {env.isWeixin ? "打开" : "生成"}
      </button>
    </section>
  );
}
