/**
 * 目标1：信息渲染
 *  1.1 获取用户的数据
 *  1.2 回显数据到标签上
 * */

// 1.1 获取用户的数据
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

// 1.2 回显数据到标签上
async function handleToken() {
  // 如果有token则显示个人信息
  if (token) {
    // console.log(href)

    // 获取个人信息
    const information = await getInformation() // 在这里调用异步函数
    const user_information = information.data.data.user_info
    const imgUrl = user_information.user_avatar_url   // 个人图片链接
    const user_nickname = user_information.user_nickname  // 个人昵称
    const user_name = user_information.user_name  // 个人真实姓名
    const user_sex = user_information.user_sex  // 个人性别
    const user_term = user_information.user_term // 个人年级
    console.log(information)
    console.log(imgUrl)
    console.log(user_sex)
    console.log(user_term)

    // 如果有用户信息才改变a的跳转方向
    if (imgUrl) {
      // 添加img标签
      const imgTag = document.querySelector('.prew')
      imgTag.src = imgUrl
    }

    if (user_nickname !== null) {
      const nickname = document.querySelector('.nickname')
      nickname.placeholder = user_nickname
    }

    if (user_name !== null) {
      const authentic = document.querySelector('.authentic')
      authentic.placeholder = user_name
    }

    if (user_sex !== null) {
      // 赋予默认性别
      // 获取性别单选框：[男radio元素，女radio元素]
      const gRadioList = document.querySelectorAll('.gender')
      // 获取性别数字：0男，1女
      // 通过性别数字，作为下标，找到对应性别单选框，设置选中状态
      if (user_sex === '男') {
        const gNum = 0
        gRadioList[gNum].checked = true
      } else {
        const gNum = 1
        gRadioList[gNum].checked = true
      }

    }

    if (user_term !== null) {
      const level = document.querySelector('.level')
      level.placeholder = user_term
    }

  }
}
handleToken(); // 调用异步函数开始处理

/**
 * 目标2：修改头像
 *  2.1 获取头像文件
 *  2.2 提交服务器并更新头像
 * */
// 文件选择元素->change事件
document.querySelector('.upload').addEventListener('change', e => {
  // 2.1 获取头像文件
  // console.log(e.target.files[0])
  const fd = new FormData()
  fd.append('token', token)
  fd.append('file', e.target.files[0])
  // 2.2 提交服务器并更新头像
  axios({
    url: 'https://www.ydtloan.com/blog/update_user_avatar',
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    },
    data: fd
  }).then(result => {
    console.log(result)
    // const imgUrl = result.data.data.avatar
    // 把新的头像回显到页面上
    // document.querySelector('.prew').src = imgUrl
    handleToken(); // 调用异步函数开始处理
  })
})



/**
 * 目标3：提交表单
 *  3.1 收集表单信息
 *  3.2 提交到服务器保存
 */
/**
 * 目标4：结果提示
 *  4.1 创建toast对象
 *  4.2 调用show方法->显示提示框
 */
// 保存修改->点击
document.querySelector('.submit').addEventListener('click', () => {
  // 3.1 收集表单信息
  const userForm = document.querySelector('.user-form')
  const userObj = serialize(userForm, { hash: true, empty: true })
  // userObj.creator = creator
  console.log(userObj)
  // 3.2 提交到服务器保存
  axios({
    url: 'https://www.ydtloan.com/blog/update_user_info',
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data: {
      user_infos: userObj,
      token: {
        token: token
      }
    }
  }).then(result => {
    console.log(result)
    if (result.data.code === 200) {
      // 4.1 创建toast对象
      document.querySelector('.alert').classList.remove('alert-danger')
      document.querySelector('.alert').textContent = '操作成功'
      const toastDom = document.querySelector('.my-toast')
      const toast = new bootstrap.Toast(toastDom)
      // 4.2 调用show方法->显示提示框
      console.log(result.data.code)
      toast.show()
    } else {
      document.querySelector('.alert').classList.add('alert-danger')
      document.querySelector('.alert').textContent = '操作失败'
      const toastDom = document.querySelector('.my-toast')
      const toast = new bootstrap.Toast(toastDom)
      // 4.2 调用show方法->显示提示框
      console.log(result.data.code)
      toast.show()
    }
  })
})
