// 내 컴퓨터에서 실행용: node server.js  →  http://localhost:3000
const http = require('http');
const fs = require('fs');
const path = require('path');
const transcript = require('./api/transcript');

const PORT = process.env.PORT || 3000;

http
  .createServer((req, res) => {
    if (req.url.startsWith('/api/transcript')) return transcript(req, res);
    if (req.url === '/' || req.url.startsWith('/?')) {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return fs.createReadStream(path.join(__dirname, 'public', 'index.html')).pipe(res);
    }
    res.statusCode = 404;
    res.end('Not found');
  })
  .listen(PORT, () => console.log(`http://localhost:${PORT} 에서 실행 중`));
