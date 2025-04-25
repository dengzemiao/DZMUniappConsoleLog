<template>
	<view class="content">
		<view class="log-button-container">
			<!-- 日志悬浮按钮：position: absolute -->
			<LogButton :fixed="false" />
		</view>
	</view>
</template>

<script>
import Log from '@/pages-log/index'
import LogButton from '@/pages-log/button'
export default {
	components: {
		LogButton
	},
	onShow () {
		Log.add({
			[Log.keyTitle]: '数据页面显示',
		})
	}
}
</script>

<style scoped>
.content {
	width: 100vw;
	height: 100vh;
	background-color: #f00;
	display: flex;
	justify-content: center;
	align-items: center;
}
.log-button-container {
	position: relative;
	width: 200rpx;
	height: 200rpx;
	background-color: orange;
}
</style>
