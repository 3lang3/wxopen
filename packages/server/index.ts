import path from 'path';
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import ejs from 'ejs';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'html')
app.engine('html', ejs.renderFile)
app.use(express.static(path.join(__dirname, '../public')));

app.get('/open', (req: Request, res: Response) => {
  // 获取用户浏览器环境
  const { url } = req.query;
  try {
    if (!url) throw Error('no url found')
    const uae = mobileUtil(req);
    // 微信中
    if (uae.isWeixin && !uae.isWorkWeixin) {
      // ios 兼容
      if (uae.isIOS) return res.render('ios')
      res.set('Content-Disposition', 'attachment; filename="load.doc"');
      /** @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types */
      res.set('Content-type', 'application/msword');
      res.render('ios');
    } else {
      res.redirect(url as string)
    }
  } catch (error) {
    res.send(JSON.stringify(error))
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

function mobileUtil(req: Request) {
  const ua = req.headers['user-agent']!;
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
