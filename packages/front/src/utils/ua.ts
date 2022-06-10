
export function webviewEnv() {
  const ua = window.navigator.userAgent;
  const isAndroid = /android|adr/gi.test(ua)
  const isIOS = /iphone|ipod|ipad/gi.test(ua) && !isAndroid
  const isBlackBerry = /BlackBerry/i.test(ua)
  const isWindowPhone = /IEMobile/i.test(ua)
  const isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone;
  return {
    isAndroid,
    isIOS,
    isMobile,
    isWeixin: /MicroMessenger/gi.test(ua),
    isWorkWeixin: /wxwork/gi.test(ua),
    isMac: /Mac OS/gi.test(ua),
    isQQ: /QQ/gi.test(ua)
  }
}
