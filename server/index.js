var http = require('http')

var server = http.createServer((req, res) => {
  const { headers, url, method } = req

  console.log(url, '============', method)

  res.setHeader("Content-Type","application/json;charset=utf-8")
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers","X-Requested-With,Content-Type,Authorization")

  // if (method === 'OPTIONS') {
  //   res.writeHead(200)
  //   res.end('ok')
  // } else {
  res.writeHead(200) // text/plain
  res.end('hello world, test get, ' + url.split('?'[1]))
  // }
  // res.write()
})
server.listen(8888)

console.log('Server running at http://127.0.0.1:8888/')