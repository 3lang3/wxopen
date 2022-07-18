/** @jsx h */
import { h, FunctionComponent } from "preact";
import { tw } from "@twind";
import useValue from "../utils/value.ts";
import copy from "../utils/copy.ts";

const CopyBtn: FunctionComponent = ({ children }) => {
  const [value] = useValue();
  return (
    <span
      onClick={() => {
        alert('复制成功')
        copy(value);
      }}
      class={tw`bg-gradient-to-r from-[#ff8a00] to-[#da1b60] py-0.5 px-2 rounded`}
    >
      {children}
    </span>
  );
};

export default CopyBtn;
