/** @jsx h */
import { h, FunctionComponent } from "preact";
import { tw } from "@twind";

const Button: FunctionComponent<{ onClick?: () => void }> = ({
  children,
  onClick,
}) => (
  <div onClick={onClick} class={tw`rounded bg-white px-2 py-1 text-sx`}>
    <button class={tw`text-gradient focus:outline-none`}>{children}</button>
  </div>
);

export default Button;
