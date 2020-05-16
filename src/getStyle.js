// AJAX 加载 CSS
getCSS.onclick = () => {
  const request = new XMLHttpRequest()
  request.open('GET', '/style.css');
  request.onload = () => {
    console.log('request.response')
    console.log(request.response)
    // console.log('成功了')

    // 将响应的内容，用对应的标签包裹，插入html页面相应位置
    const style = document.createElement('style') // 创建 style 标签
    style.innerHTML = request.response // 填写 style 内容
    document.head.appendChild(style) // 插入head标签里
  }
  request.onerror = () => {
    console.log('失败了')
  }
  request.send()
}