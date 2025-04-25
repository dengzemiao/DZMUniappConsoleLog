<template>
  <!-- 日志悬浮按钮组件 -->
  <view
    v-if="log.open"
    class="log-float-button"
    :style="{ 
      position: fixed ? 'fixed' : 'absolute',
      width: size + 'px',
      height: size + 'px',
      left: position.x + 'px',
      top: position.y + 'px',
      backgroundColor: color,
      borderRadius: borderRadius + 'px',
      fontSize: fontSize + 'px',
      color: fontColor,
      zIndex: zIndex,
    }"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @click="touchLog"
  >
    <text>日志</text>
  </view>
</template>

<script>
// 为了防止获取宽高api兼容问题，悬浮按钮内部不获取设备宽高，确保兼容无问题
import Log from './index.js'
export default {
  props: {
    // 初始化按钮定位坐标
    initPosition: {
      type: Object,
      default: () => ({ x: 10, y: 100 })
    },
    // 是否进行固定，true: 固定(fixed)，false: 不固定(absolute)
    fixed: {
      type: Boolean,
      default: true
    },
    // 屏幕尺寸限制，fixed=true: 生效限制，fixed=false: 不生效限制，因为不好确定父元素尺寸
    screenLimit: {
      type: Boolean,
      default: true
    },
    // 按钮大小，默认50px
    size: {
      type: Number,
      default: 50
    },
    // 按钮背景颜色，默认蓝色
    color: {
      type: String,
      default: '#1E8BF1'
    },
    // 按钮圆角大小，默认25px（圆形）
    borderRadius: {
      type: Number,
      default: 25
    },
    // 按钮层级，默认9999（确保在最上层）
    zIndex: {
      type: Number,
      default: 9999
    },
    // 按钮文字大小，默认14px
    fontSize: {
      type: Number,
      default: 14
    },
    // 按钮文字颜色，默认白色
    fontColor: {
      type: String,
      default: '#FFFFFF'
    },
  },
  data() {
    return {
      // 日志对象
			log: Log,
      // 按钮当前位置坐标
      position: {
        x: this.initPosition.x,
        y: this.initPosition.y
      },
      // 触摸开始时的坐标偏移量
      startX: 0,
      startY: 0,
      // 是否正在拖拽状态
      isDragging: false,
    }
  },
  methods: {
    // 跳转日志页面
    touchLog() {
      this.log.go()
    },
    // 触摸开始事件处理
    onTouchStart(e) {
      // 计算触摸点相对于按钮左上角的偏移量
      this.startX = e.touches[0].clientX - this.position.x
      this.startY = e.touches[0].clientY - this.position.y
      this.isDragging = true
    },
    // 触摸移动事件处理
    onTouchMove(e) {
      // 如果按钮未处于拖拽状态，则不进行处理
      if (!this.isDragging) return
      
      // 计算新的位置
      const newX = e.touches[0].clientX - this.startX
      const newY = e.touches[0].clientY - this.startY

      // 不限制移动范围
      this.position.x = newX
      this.position.y = newY
    },
    // 触摸结束事件处理
    onTouchEnd() {
      this.isDragging = false
    }
  }
}
</script>

<style scoped>
.log-float-button {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.2);
}
</style>
