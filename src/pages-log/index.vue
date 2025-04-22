<template>
	<view class="log-container">
    <!-- 操作列表 -->
    <view class="log-tool">
      <!-- 日志操作 -->
      <view class="log-tool-row">
        <view class="log-tool-row-item" @click="touchOpen">{{ log.open ? '关闭' : '开启' }}日志</view>
        <view class="log-tool-row-item" @click="touchClear">清空日志</view>
      </view>
      <!-- 日志操作 -->
      <view class="log-tool-row">
        <view class="log-tool-row-item" @click="touchDevice">系统信息</view>
        <view class="log-tool-row-item" @click="touchUser">用户信息</view>
      </view>
      <!-- 日志操作 -->
      <view class="log-tool-row">
        <view class="log-tool-row-item" @click="touchExpandAll">{{ log.expand ?  '收起' : '展开' }}全部日志</view>
      </view>
    </view>
    <!-- 日志列表 -->
    <view class="log-list">
      <view class="log-list-item" v-for="(item, index) in log.list" :key="index">
        <!-- 日志头部 -->
        <view class="log-list-item-header" :style="item.success ? 'background-color: #43A646' : 'background-color: #F23B2F'">
          <!-- 日志头部 -->
          <view class="log-list-item-tool">
            <!-- 日志时间 -->
            <view class="log-list-item-date log-text-ell">【{{ item.index }}】{{ item.date }}</view>
            <!-- 弹簧 -->
            <view class="log-spacer"></view>
            <!-- 日志复制 -->
            <view class="log-list-item-btn" @click="touchCopy(item)">复制</view>
            <!-- 日志展开状态 -->
            <view class="log-list-item-btn" @click="touchExpand(item)">{{ item.expand ? '收起' : '展开' }}</view>
          </view>
          <!-- 日志标题 -->
          <view class="log-list-item-title log-text-ell-2" v-if="!item.expand">{{ item.title }}</view>
        </view>
        <!-- 日志内容 -->
        <view class="log-list-item-content" v-if="item.expand">
          <text class="log-list-item-content-text" selectable>{{ JSON.stringify(item, null, '　') }}</text>
        </view>
        <!-- 分割线 -->
        <view class="log-list-item-divider"></view>
      </view>
    </view>
    <!-- footer -->
    <view class="log-footer">
      <view class="log-footer-item">
        <view class="log-footer-item-text">作者wx：dengzemiao（大前端技术群）</view>
      </view>
    </view>
	</view>
</template>

<script>
import Log from './index.js'
export default {
	data () {
		return {
      // 日志对象
			log: Log
		}
	},
	methods: {
    // 开启日志
    touchOpen () {
      this.log.setOpen(!this.log.open)
    },
    // 展开全部日志
    touchExpandAll () {
      this.log.expand = !this.log.expand
      this.log.list.forEach(item => {
        item.expand = this.log.expand
      })
    },
    // 展开单个日志
    touchExpand (item) {
      item.expand = !item.expand
    },
    // 复制日志
    touchCopy (item) {
      uni.setClipboardData({
        data: JSON.stringify(item, null, '　'),
				success: () => {
					this.log.toast('拷贝成功')
				},
				fail: () => {
					this.log.toast('拷贝失败')
				}
      })
    },
    // 清空日志
    touchClear () {
      this.log.list = []
    },
    // 系统信息
    touchDevice () {
      const deviceInfo = uni.getSystemInfoSync()
      this.log.add({
        [Log.keyTitle]: '系统信息',
        [Log.keyData]: deviceInfo
      })
    },
    // 用户信息
    touchUser () {
      this.log.add({
        [Log.keyTitle]: '用户信息',
        [Log.keyData]: '用户信息'
      })
    },
  }
}
</script>

<style scoped>
.log-text-ell {
	/* 在恰当的断字点进行换行 */
	word-break: nowrap;
	/* 超出范围隐藏 */
	overflow: hidden;
	/* 文字超出用省略号 */
	text-overflow: ellipsis;
	/* 盒子模型 */
	display: -webkit-box;
	/* 显示的文本行数 */
	-webkit-line-clamp: 1;
	line-clamp: 1;
	/* 子元素的垂直排列方式 */
	-webkit-box-orient: vertical;
}
.log-text-ell-2 {
	/* 在恰当的断字点进行换行 */
	word-break: nowrap;
	/* 超出范围隐藏 */
	overflow: hidden;
	/* 文字超出用省略号 */
	text-overflow: ellipsis;
	/* 盒子模型 */
	display: -webkit-box;
	/* 显示的文本行数 */
	-webkit-line-clamp: 2;
	line-clamp: 2;
	/* 子元素的垂直排列方式 */
	-webkit-box-orient: vertical;
}
.log-spacer {
  flex: 1;
}
.log-container {
	width: 100%;
	height: 100%;
  background-color: #fff;
  box-sizing: border-box;
}
.log-container .log-tool {
  width: 100%;
  height: 100%;
  background-color: #1E8BF1;
  border-bottom: 1rpx solid #fff;
}
.log-container .log-tool .log-tool-row {
  display: flex;
  padding: 10rpx 20rpx;
}
.log-container .log-tool .log-tool-row:first-child {
  padding-top: 20rpx;
}
.log-container .log-tool .log-tool-row:last-child {
  padding-bottom: 20rpx;
}
.log-container .log-tool .log-tool-row .log-tool-row-item {
  flex: 1;
  color: #fff;
  text-align: center;
  border: 1rpx solid #fff;
  border-radius: 6rpx;
  padding: 10rpx;
  font-size: 30rpx;
}
.log-container .log-tool .log-tool-row .log-tool-row-item:nth-child(2) {
  margin-left: 20rpx;
}
.log-container .log-list {
  width: 100%;
  height: 100%;
  background-color: #fff;
}
.log-container .log-list .log-list-item {
  width: 100%;
  height: 100%;
}
.log-container .log-list .log-list-item .log-list-item-header {
  padding: 20rpx;
  padding-left: 0rpx;
  box-sizing: border-box;
}
.log-container .log-list .log-list-item .log-list-item-header .log-list-item-tool {
  display: flex;
  align-items: center;
}
.log-container .log-list .log-list-item .log-list-item-header .log-list-item-tool .log-list-item-date {
  color: #fff;
  font-size: 30rpx;
}
.log-container .log-list .log-list-item .log-list-item-header .log-list-item-tool .log-list-item-btn {
  margin-left: 16rpx;
  padding: 4rpx 8rpx;
  border-radius: 6rpx;
  background-color: #fff;
  color: #000;
  font-size: 22rpx;
}
.log-container .log-list .log-list-item .log-list-item-header .log-list-item-title {
  color: #fff;
  font-size: 30rpx;
  padding-top: 10rpx;
  padding-left: 16rpx;
}
.log-container .log-list .log-list-item .log-list-item-content {
  width: 100%;
  padding: 20rpx;
}
.log-container .log-list .log-list-item .log-list-item-content .log-list-item-content-text {
  font-size: 30rpx;
  width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  line-break: anywhere;
}
.log-container .log-list .log-list-item .log-list-item-divider {
  width: 100%;
  height: 1rpx;
}
.log-container .log-footer {
  width: 100%;
  height: 60rpx;
}
.log-container .log-footer .log-footer-item {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.log-container .log-footer .log-footer-item .log-footer-item-text {
  font-size: 24rpx;
  color: #999;
}
</style>
