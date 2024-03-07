// 限制号码框和验证码框和按钮颜色
function checkInput() {
  // 获取元素
  const phone = document.getElementById("phone")
  const code = document.getElementById("code")
  const submitBtn = document.getElementById("submitBtn")

  // 锁住为数字
  phone.value = phone.value.replace(/[^\d]/g, '')
  code.value = code.value.replace(/[^\d]/g, '')

  // 限制位数
  if (code.value.length > 6) {
    code.value = code.value.substring(0, 6)
  }
  if (phone.value.length > 11) {
    phone.value = phone.value.substring(0, 11)
  }

  // 设置按钮发送功能
  if (phone.value.length === 11 && code.value.length === 6) {
    submitBtn.disabled = false
    submitBtn.style.backgroundColor = "#fc5531"
  } else {
    submitBtn.disabled = true
    submitBtn.style.backgroundColor = "#ee9b86"
  }
}

// 给按钮添加事件（密码验证）
document.querySelector('.base-button').addEventListener('click', () => {
  // 获取电话和密码
  const number = document.querySelector('.login-form-number').value
  const password = document.querySelector('.login-form-account').value
  // console.log(typeof number, typeof password)

  // 将手机号和密码发送给后端
  axios({
    url: 'https://www.ydtloan.com/blog/user_register',
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      user_id: 'string',
      user_pwd: 'string',
      user_phone: number,
      user_avatar_url: 'string',
      user_sex: 'string',
      user_term: 'string',
      user_name: 'string',
      user_nickname: 'string',
      captcha: password,
    }
  }).then(res => {
    console.log(res)
    // 登录成功后，保存 token 令牌字符串到本地，并跳转到内容列表页面
    // localStorage.setItem('token', res.data.token)
    if (res.data.code === 200) {
      document.querySelector('.login-form-item-tips').innerHTML = '登录成功'
      localStorage.setItem('token', res.data.data.token)
      setTimeout(() => {
        // 延迟跳转，让 alert 警告框停留一会儿
        location.href = '../home/home.html'
      }, 1500)
    } else {
      document.querySelector('.login-form-item-tips').innerHTML = '内测码错误'
    }
  })
    .catch(error => {
      console.log(error)
      document.querySelector('.login-form-item-tips').innerHTML = '网络错误'
    })

})