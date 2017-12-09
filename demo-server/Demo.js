let user = require('./User');
let url = require('url');
let util = require('util');

console.log(`I'm :${user.userName}`);

console.log(`${user.sayHello()}, world!`)


let http = require('http');

let server = http.createServer((req, res)=>{
  res.statusCode = 200;

  res.setHeader("Content-Tpye","text/plain; charset=utf-8");

  // res.end(`${user.sayHello()}, world!`);

  console.log('URL:' + req.url);

  console.log('Object_URL: '+ url.parse(req.url));


  // res.end("Hello, Node.js");
  res.end(util.inspect(url.parse(req.url)));
});

server.listen(3000, '127.0.0.1',()=>{
  console.log("服务器已经运行在 http://127.0.0.1/:3000");
});
