// 读取token
const token = localStorage.getItem('token')
// 调用获取个人信息函数让页面一加载就获取个人信息
// getInformation()

// 封装获取个人信息函数
async function getInformation() {
  try {
    const res = await axios({
      url: 'https://www.ydtloan.com/blog/get_user_info',
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      data: {
        token,
      }
    })
    return res; // 返回响应
  } catch (error) {
    console.error(error)
  }
}

async function handleToken() {
  // 如果有token则改变a跳转方向
  if (token) {
    // console.log(href)

    // 获取个人信息
    const information = await getInformation() // 在这里调用异步函数
    const user_information = information.data.data.user_info
    const imgUrl = user_information.user_avatar_url
    console.log(information)
    console.log(imgUrl)
    // 如果有用户信息才改变a的跳转方向
    if (imgUrl) {
      // 获取a元素
      const href = document.querySelector('.toolbar-btns-padding.toolbar-btns-img a')
      // 改变a跳转路径为个人消息页面
      href.setAttribute('href', '../profile/profile.html')
      href.textContent = '' // 移除文字"登录"
      // 添加img标签
      const imgTag = document.createElement('img')
      imgTag.src = imgUrl
      href.appendChild(imgTag)
    }
  }
}
handleToken(); // 调用异步函数开始处理
