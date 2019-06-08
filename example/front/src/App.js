import React, { useState } from 'react';
import QRcode from 'qrcode.react'
import styles from './styles.module.css'
import './App.css';

const EmptyServerUrl = () => (
  <section style={{ marginTop: '2rem' }}>输入测试url后将生成二维码，使用wechat扫一扫测试</section>
)

const QRcodeRender = ({ value }) => (
  <div style={{ textAlign: 'center', marginTop: '2rem'}}>
    <QRcode value={value} />
    <p>使用微信扫一扫~</p>
  </div>
)

function App() {
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverUrl, setServerUrl] = useState(null)
  const handleSubmit = async e => {
    e && e.preventDefault()
    try {
      setLoading(true)
      const serverData = await fetch(`/api/geturl?url=${url}`)
      const { data, type, msg } = await serverData.json()
      setLoading(false)
      if (!type) alert(msg)
      setServerUrl(data)
    } catch (error) {
      alert('服务器在发呆😐~')
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>微信跳出浏览器Demo</h1>
      </header>
      <section className={styles.container}>
        <form onSubmit={handleSubmit} className={styles.wrapper}>
          <input onChange={e => setUrl(e.target.value)} className={styles.input} />
          <button type="submit" className={styles.btn}>{ loading ? 'loading...' : 'GO!'}</button>
        </form>
      </section>
      <footer>
        {
          serverUrl ? <QRcodeRender value={serverUrl} /> : <EmptyServerUrl />
        }
      </footer>
    </div>
  );
}

export default App;
