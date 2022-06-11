import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Field, Flex, Space, Tag, Toast, Typography } from "react-vant";
import Qrcode from "qrcode.react";
import styles from "./index.module.less";
import { webviewEnv } from "../../utils/ua";
import { copyToClipboard } from "../../utils/copy";

const demoApkDownloadUrl =
  "https://imgs.ygygmall.com/app/android/2022-05-27/app-release.apk";

const GithubLab = () => (
  <a className={styles.github} href="https://github.com/3lang3/wxopen">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1.27a11 11 0 00-3.48 21.46c.55.09.73-.28.73-.55v-1.84c-3.03.64-3.67-1.46-3.67-1.46-.55-1.29-1.28-1.65-1.28-1.65-.92-.65.1-.65.1-.65 1.1 0 1.73 1.1 1.73 1.1.92 1.65 2.57 1.2 3.21.92a2 2 0 01.64-1.47c-2.47-.27-5.04-1.19-5.04-5.5 0-1.1.46-2.1 1.2-2.84a3.76 3.76 0 010-2.93s.91-.28 3.11 1.1c1.8-.49 3.7-.49 5.5 0 2.1-1.38 3.02-1.1 3.02-1.1a3.76 3.76 0 010 2.93c.83.74 1.2 1.74 1.2 2.94 0 4.21-2.57 5.13-5.04 5.4.45.37.82.92.82 2.02v3.03c0 .27.1.64.73.55A11 11 0 0012 1.27"></path>
    </svg>
  </a>
);

const PageHeader = () => (
  <header>
    <Typography.Title center level={1} type="light">
      ⚡️ WXOPEN
    </Typography.Title>
    <Typography.Text center type="secondary">
      点击按钮生成二维码, 使用微信扫一扫体验
    </Typography.Text>
  </header>
);

const demoUrl = "https://baidu.com";
const server = import.meta.env.VITE_APP_SERVER_URL;

export default function Index() {
  const [value, setValue] = React.useState(demoUrl);
  const [jumpUrl, setJumpUrl] = React.useState("");
  const env = webviewEnv();
  const navigate = useNavigate();

  const onGenertorClick = () => {
    const jumlLink = `${server}${encodeURIComponent(value)}`;
    if (env.isWeixin) {
      window.location.replace(jumlLink);
      return;
    }
    setJumpUrl(jumlLink);
  };

  // 打开app
  const openApp = () => {
    if (env.isWeixin) {
      const jumlLink = `${server}${encodeURIComponent(
        `${window.location.protocol}//${window.location.host}/app`
      )}`;
      window.location.replace(jumlLink);
      return;
    }
    navigate("/app");
  };

  // 下载apk
  const onDownloadApk = () => {
    const url = env.isWeixin
      ? `${server}${encodeURIComponent(demoApkDownloadUrl)}`
      : demoApkDownloadUrl;

    window.location.replace(url);
  };

  // 复制连接
  const onCopyLink = () => {
    copyToClipboard(jumpUrl)
    Toast.info('复制成功，请在微信中打开')
  }

  return (
    <Flex
      className={styles.page}
      direction="column"
      align="center"
      justify="center"
    >
      <GithubLab />
      <PageHeader />
      <Divider />
      <section className={styles.input}>
        <Field
          value={value}
          onChange={setValue}
          suffix={
            <Button
              onClick={onGenertorClick}
              className={styles.input__btn}
              type="primary"
              round
            >
              {env.isWeixin ? "跳转" : "生成"}
            </Button>
          }
        />
      </section>
      <Divider />
      <Space className={styles.action} align="center">
        支持特性:
        <Button
          onClick={openApp}
          size="mini"
          round
          className={styles.action__item}
        >
          唤起APP(淘宝)
        </Button>
        <Button
          onClick={onDownloadApk}
          size="mini"
          round
          className={styles.action__item}
        >
          下载APP
        </Button>
      </Space>

      {!!jumpUrl && (
        <>
          <Divider />
          <Qrcode includeMargin bgColor="#fff" fgColor="#000" value={jumpUrl} />
          <Typography.Text
            strong
            size="sm"
            type="light"
            style={{ marginTop: "1rem" }}
            onClick={onCopyLink}
          >
            使用微信扫一扫或<Tag className={styles.copy}>复制网址</Tag>在微信中打开
          </Typography.Text>
        </>
      )}
    </Flex>
  );
}
