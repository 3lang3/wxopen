/** @jsx h */
import { h, FunctionComponent } from "preact";
import { tw, apply } from "@twind";
import Input from "../islands/Input.tsx";
import Qrcode from "../islands/Qrcode.tsx";
import DownloadBtn from "../islands/DownloadBtn.tsx";
import CallAppBtn from "../islands/CallAppBtn.tsx";
import CopyBtn from "../islands/CopyBtn.tsx";
import Layout from "../components/Layout.tsx";

const github = apply`
fixed top-5 left-5 decoration-none text-white 
`;

const GithubLab = () => (
  <a class={tw(github)} href="https://github.com/3lang3/wxopen">
    <svg
      style={{ width: 36, height: 36 }}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
    </svg>
  </a>
);

const PageHeader = () => (
  <header class={tw`text-center`}>
    <h1 class={tw`text-white text-3xl mb-10`}>
      ⚡️ WXOPEN <span class={tw`text-gradient`}>跳出微信</span>
    </h1>
    <section class={tw`text-sm text-gray-400`}>
       微信扫一扫体验，只支持安卓，IOS显示引导页
    </section>
  </header>
);

const Button: FunctionComponent<{ onClick?: () => void }> = ({
  children,
  onClick,
}) => (
  <div onClick={onClick} class={tw`rounded bg-white px-2 py-1 text-sx`}>
    <button class={tw`text-gradient focus:outline-none`}>{children}</button>
  </div>
);

export default function Home() {
  return (
    <Layout>
      <main
        class={tw`max-w-screen bg-black min-h-screen text-white flex items-center justify-center flex-col p-4`}
      >
        <GithubLab />
        <PageHeader />
        <Input />
        <section class={tw` text-xs flex items-center justify-center gap-1`}>
          <span>支持特性:</span>
          <CallAppBtn />
          <DownloadBtn />
        </section>
        <Qrcode />

        <section class={tw`text-xs mt-5`}>
          使用微信扫一扫或<CopyBtn>复制网址</CopyBtn>在微信打开
        </section>
      </main>
    </Layout>
  );
}
