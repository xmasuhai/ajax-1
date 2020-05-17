// console.log('我是main.js')

// AJAX 加载 CSS
getCSS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css');
  request.onreadystatechange = () => {
    // 监听对象的 readyState属性
    // console.log(request.readyState) // 2 3 4
    if (request.readyState === 4) {
      // console.log('下载完成')
      // 下载完成，但不知道下载成功还是失败

      // console.log('request.response')
      // console.log(request.response)
      // console.log(request.status)
      if (request.status >= 200 && request.status < 300) {
        // 将响应的内容，用对应的标签包裹，插入html页面相应位置
        const style = document.createElement('style') // 创建 style 标签
        style.innerHTML = request.response // 填写 style 内容
        document.head.appendChild(style) // 插入head标签里
      } else {
        console.log('加载CSS失败')
      }
    }
  }
  request.send()
}

// AJAX 加载 JS
getJS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/getJS.js')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      // 创建script标签
      const script = document.createElement('script')
      // 填写 script内容
      script.innerHTML = request.response
      // 插到body里
      document.body.appendChild(script)
    }

  }
  request.send()
}

// AJAX 加载 HTML
getHTML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/indexOld.html')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      // 创建 div 标签
      const div = document.createElement('div')
      // 填写 div 内容
      div.innerHTML = request.response
      // 插到body里
      document.body.appendChild(div)

    }
  }
  request.send()
}

// AJAX 加载 XML
getXML.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/getXML.xml')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status >= 200 && request.status < 300) {
      // console.log(request.responseXML)

      const dom = request.responseXML
      const text = dom.getElementsByTagName('warning')[0].textContent.trim();
      console.log(text)
      console.log(request.responseXML)
    }
  }
  request.send()
}

// AJAX 加载 JSON
getJSON.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/getJSON.json')
  request.onreadystatechange = () => {
    if (request.readyState === 4 && request.status === 200) {
      console.log(request.response)
      const object = JSON.parse(request.response)
      console.log(object)
      myName.textContent = object.name
    }
  }
  request.send()
}

let page = [1, 2, 3]
let currentPage = page[0]
// AJAX 加载 分页
getPage.onclick = () => {
  if (currentPage < 3) {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${currentPage + 1}`)
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const array = JSON.parse(request.response)
        array.forEach(item => {
          const li = document.createElement('li')
          li.textContent = item.id
          xxx.appendChild(li)
        });
        // console.log(request.response)
        const object = JSON.parse(request.response)
        // console.log(object)
        myName.textContent = object.name
        currentPage += 1
      }
    }
    request.send()
  } else {
    // console.log("Ban")
    getPage.disabled = true
  }
}