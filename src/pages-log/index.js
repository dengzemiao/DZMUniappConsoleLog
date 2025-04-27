/**
 * @description 日志工具类
 * @author 水哥
 * @date 2025-04-22
 * @version 1.0.0
 * @license MIT
 * @blog https://blog.csdn.net/zz00008888
 * @github https://github.com/dengzemiao
 */

// 日志对象
const Log = {

  // 日志默认开启状态
  open: false,
  // 日志展开状态
  expand: false,
  // 日志列表
  list: [],

  // 参数 Key，并不是只能传这些，额外字段可以随时添加不做限制，列出来固定只是方便统一管理，需要额外字段可以随意添加
  
  // ===>>>【 常用参数 Key 】

  //【非必填】日志标题，会有默认标题
  keyTitle: 'title',
  //【非必填】日志数据，存放日志数据
  keyData: 'data',
  //【非必填】日志状态，true 成功 false 失败/错误，会有不同的展示颜色，默认 true
  keySuccess: 'success',

  // ===>>>【 其他参数 Key 】

  //【非必填】日志触发时间，会自动获取当前时间
  keyDate: 'date',
  //【非必填】日志展开、收起状态， false 收起，true 展开，默认取 expand 字段值
  keyExpand: 'expand',
  //【非必填】日志索引，会自动递增，不能进行操作
  keyIndex: 'index',

  // ===>>>【 需要用户可后续添加的其他常规参数 】

  // 日志触发用户ID，方便排查日志
  // keyUserId: 'userId',

  // 添加日志 
  add (log) {
    // 日志关闭状态，不添加日志
    if (!this.open) return;
    // 日志数据
    const logData = {...(log || {})}
    // 日志标题
    if (logData[this.keyTitle] === undefined) logData[this.keyTitle] = '日志'
    // 日志状态
    if (logData[this.keySuccess] === undefined) logData[this.keySuccess] = true
    // 日志展开、收起状态
    if (logData[this.keyExpand] === undefined) logData[this.keyExpand] = this.expand
    // 日志索引
    logData[this.keyIndex] = this.list.length + 1
    // 日志触发时间
    logData[this.keyDate] = new Date().toLocaleString()
    // 日志触发用户ID
    // logData[this.keyUserId] = '1234567890'
    // 还可以添加其他参数，比如日志触发用户ID，方便排查日志
    // 日志触发设备平台 等等....
    // 日志数据
    this.list.unshift(logData)
  },

  // 同步本地日志开启状态，方便下次打开时保持日志开关状态
  // 如果需要使用本地缓存状态，可以调用此方法，例如：项目生命周期的最开始调用此方法
  getOpen () {
    this.open = uni.getStorageSync('DZM_CONSOLE_LOG') || false
  },

  // 设置日志开启状态，并同步到本地
  // 如果需要强制开启日志，可以调用此方法，例如：项目生命周期的最开始调用此方法
  setOpen (open) {
    this.open = open
    uni.setStorageSync('DZM_CONSOLE_LOG', open)
  },

  // Toast
  toast(text, duration = 1500) {
    uni.showToast({
      title: text,
      icon: 'none',
      duration
    })
  },

  // 跳转日志页面，封装方便在其他页面使用，有需要可以调整页面路径
  go () {
    uni.navigateTo({
      url: '/pages-log/index'
    })
  },
}

export default Log