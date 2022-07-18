/** @jsx h */
import { h } from "preact";
import useValue from "../utils/value.ts";
import QRCode from "https://esm.sh/qrcode@1.5.1";
import { tw } from "@twind";

export default function Qrcode() {
  const [value] = useValue();
  
  return (
    <canvas
      class={tw`mt-10`}
      ref={(r) => {
        if (!r) return;
        QRCode.toCanvas(
          r,
          value,
          { width: 140, margin: 3 }
        );
      }}
    />
  );
}
