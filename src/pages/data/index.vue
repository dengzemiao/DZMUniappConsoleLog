<template>
	<view class="content">
	</view>
</template>

<script>
import Log from '@/pages-log/index'
export default {
	onShow () {
		Log.add({
			[Log.keyTitle]: '数据页面显示',
		})
	}
}
</script>

<style>
</style>
