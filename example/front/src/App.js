import React, { useState } from 'react';
import QRcode from 'qrcode.react'
import styles from './styles.module.css'
import './App.css';

const DemoApkSourceUrl = `${window.location.protocol}//${window.location.host}/resource/demo.apk`
const DemoFileSourceUrl = `${window.location.protocol}//${window.location.host}/resource/demo.txt`
const DemoUrl = 'https://github.com'

const GithubLab = () => (
  <a className={styles.github} href="https://github.com/EthanOrange/wechat-redirect"><strong className={styles.bgLiner}>Github</strong></a>
)

const PageHeader = () => (
  <header className="App-header">
    <h1 style={{ fontSize: '3rem' }}>Wechat Redirect Demo</h1>
    <p style={{ color: '#aaa', marginBottom: '2rem' }}>输入测试url后将生成二维码，使用wechat扫一扫测试</p>
  </header>
)

const ExampleItems = ({ onClick }) => {
  return (
    <section className={styles.itemContainer}>
      特性预览：
      <div onClick={() => onClick(DemoApkSourceUrl)} className={styles.item}>
        <strong className={styles.bgLiner}>APK下载</strong>
      </div>
      <div onClick={() => onClick(DemoUrl)} className={styles.item}>
        <strong className={styles.bgLiner}>URL跳出</strong>
      </div>
      <div onClick={() => onClick(DemoFileSourceUrl)} className={styles.item}>
        <strong className={styles.bgLiner}>普通文件下载</strong>
      </div>
    </section>
  )
}

const QRcodeRender = ({ value }) => {
  const shortUlr = `${window.location.protocol}//${window.location.host}/jump/${value}`
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <div style={{ background: '#fff', padding: '.35rem .35rem .2rem', display: 'inline-block' }}>
        <QRcode bgColor="#fff" fgColor="#000" value={shortUlr} />
      </div>
      <p><strong className={styles.bgLiner}>使用微信扫一扫或直接用微信浏览器打开下面网址</strong></p>
      <span style={{ background: '#fff', padding: '10px 20px', borderRadius: 20 }}><strong className={styles.bgLiner}><a href={shortUlr}>{shortUlr}</a></strong></span>
    </div>
  )
}

function App() {
  const [url, setUrl] = useState()
  const [loading, setLoading] = useState(false)
  const [serverUrl, setServerUrl] = useState(null)
  const getUrlService = async urlStr => {
    try {
      setLoading(true)
      const serverData = await fetch(`/api/geturl?url=${urlStr}`)
      const { data, type, msg } = await serverData.json()
      setLoading(false)
      if (!type) return alert(msg)
      setServerUrl(data)
    } catch (error) {
      alert('服务器在发呆😐~')
      setLoading(false)
    }
  }
  const handleSubmit = async e => {
    e && e.preventDefault()
    getUrlService(url)
  }
  const handleExample = async urlStr => {
    getUrlService(urlStr)
  }
  return (
    <div className="App">
      <GithubLab />
      <PageHeader />
      <section className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.wrapper}>
          <input onChange={e => setUrl(e.target.value)} className={styles.input} placeholder="eg:https://github.com" />
          <button type="submit" className={styles.btn}>{loading ? 'loading...' : 'Submit'}</button>
          <ExampleItems onClick={handleExample} />
        </form>
      </section>
      <footer style={{ width: '100%' }}>
        {serverUrl && <QRcodeRender value={serverUrl} />}
      </footer>
    </div>
  );
}

export default App;
