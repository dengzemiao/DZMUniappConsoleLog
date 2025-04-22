<template>
	<view class="content">
		<!-- 操作按钮 -->
		<button @click="handleClick">查看日志（{{ open ? '开启中' : '关闭中' }}）</button>
		<button @click="handleAddSuccess">添加成功日志</button>
		<button @click="handleAddError">添加失败日志</button>
		<!-- 提示 -->
		<view class="hint-text">
			* 推荐用于记录所有的 `网络请求`、`catch错误`、`调试日志` ....
			<br>
			* 建议使用细节：
			<br>
			1、日志开关使用暗门的方式进行开启，例如连点版本号多少下。
			<br>
			2、启动后，例如可以长按某个文案，进入日志页面查看日志。
			<br>
			3、日志设置开关状态，是本地会缓存的，可以在启动函数中调用读取缓存开关状态函数，确保第一时间使用上上次的开启状态，不读取默认是关闭状态。
		</view>
	</view>
</template>

<script>
import Log from '@/pages-log/index'
export default {
	data () {
		return {
			// 日志开启状态
			open: false
		}
	},
	onShow () {
		// 在页面显示时，获取日志开启状态
		this.open = Log.open
	},
	methods: {
		// 查看日志
		handleClick () {
			Log.go()
		},
		// 添加成功日志
		handleAddSuccess () {
			// 无数据，默认就是成功状态
			// Log.add()
			// 有数据
			Log.add({
				[Log.keyTitle]: '添加成功日志',
				// 使用规定好的参数
				[Log.keyData]: {
					a: 1
				},
				// 使用未规定的参数
				b: 2
			})
			// 正常不需要提示，这是仅为配合案例，上面添加函数内部会自动判断日志开关状态
			if (this.open) {
				Log.toast('添加成功')
			}
		},
		// 添加失败日志
		handleAddError () {
			Log.add({
				[Log.keyTitle]: '添加失败日志',
				[Log.keySuccess]: false
			})
			// 正常不需要提示，这是仅为配合案例，上面添加函数内部会自动判断日志开关状态
			if (this.open) {
				Log.toast('添加成功')
			}
		}
	}
}
</script>

<style>
button {
	margin: 10px;
}
.hint-text {
	padding: 20rpx;
  font-size: 26rpx;
  color: #999;
}
</style>
