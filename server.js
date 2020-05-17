var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？');
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method
  var accept = request.headers["accept"]; //大小写敏感

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  console.log('method:')
  console.log(method) //GET或者POST
  console.log('request.headers:')
  console.log(request.headers) //得到所有符合格式的请求头
  console.log('--------')

  // AJAX请求分页
  if (path === '/index.html') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    const testText = fs.readFileSync('src/index.html')
    console.log(typeof testText) // object
    console.log(testText)

    let string = fs.readFileSync('src/index.html').toString() // 调用toString()前 是<buffer>
    const page1 = fs.readFileSync('db/page1.json')
    // [{ "id": 1 }, { "id": 2 }, { "id": 3 }, { "id": 4 }, { "id": 5 }, { "id": 6 }, { "id": 7 }, { "id": 8 }, { "id": 9 }, { "id": 10 }]
    const array = JSON.parse(page1)
    // li
    const result = array.map(item => {
      return `<li>${item.id}</li>`
    }).join('')
    // ul
    string = string.replace('{{page1}}', `<ul id="xxx">${result}</ul>`)
    response.write(string)
    response.end()
  } else if (path === '/page2') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.write(fs.readFileSync('db/page2.json'))
    response.end()
  } else if (path === '/page3') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.write(fs.readFileSync('db/page3.json'))
    response.end()
  } else if (path === '/main.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('src/main.js'))
    response.end()
  } else if (path === '/style.css') {
    /* 用AJAX 获取 CSS */
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(fs.readFileSync('src/style.css'))
    response.end()
  } else if (path === '/getStyle.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('src/getStyle.js'))
    response.end()
  } else if (path === '/getJS.js') {
    /* 用AJAX 获取 JS */
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write(fs.readFileSync('src/getJS.js'))
    response.end()
  } else if (path === '/indexOld.html') {
    /* 用AJAX 获取 HTML */
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(fs.readFileSync('src/indexOld.html'))
    response.end()
  } else if (path === '/getXML.xml') {
    /* 用AJAX 获取 XML */
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/xml;charset=utf-8')
    response.write(fs.readFileSync('src/getXML.xml'))
    response.end()
  } else if (path === '/getJSON.json') {
    /* 用AJAX 获取 JSON */
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8') // 'application/json;charset=utf-8'也可
    response.write(fs.readFileSync('src/getJSON.json'))
    response.end()
  }
  /* previous node.js */
  else if (path === '/x') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`body{color: red;}`)
    response.end()
  } else if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    console.log("accept:")
    console.log(accept)
    response.write(`
        <!DOCTYPE html>
        <head>
            <link rel="stylesheet" href="/x">
        </head>
        <h1>在8888端口返回一个h1标签</h1>
        `)
    response.end()
  } else if (path === '/oldWay') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    const string = fs.readFileSync('src/indexOLd.html')
    response.write(string)
    response.end()
  } else if (path === '/src/main.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    const string = fs.readFileSync('src/main.js')
    response.write(string)
    response.end()
  } else if (path === '/src/style.css') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    const string = fs.readFileSync('src/style.css')
    response.write(string)
    response.end()
  } else if (path === '/ChangeStatusCode') {
    response.statusCode = 299
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.setHeader('HI', 'niHao')
    console.log("accept:")
    console.log(accept)
    response.write(`ChangeStatusCode:299`)
    response.write(`\nthen,ChangeResponseHeader`)
    response.end()
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`你输入的路径不存在对应的内容`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)