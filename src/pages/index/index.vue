<template>
	<view class="content">
		<button @click="handleClick">查看日志（{{ open ? '开启中' : '关闭中' }}）</button>
		<button @click="handleAddSuccess">添加成功日志</button>
		<button @click="handleAddError">添加失败日志</button>
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
</style>
