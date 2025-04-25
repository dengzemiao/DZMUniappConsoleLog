<template>
	<view class="content">
		<LogButton />
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
			[Log.keyTitle]: '我的页面显示',
		})
	}
}
</script>

<style>
</style>
