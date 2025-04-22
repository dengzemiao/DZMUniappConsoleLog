<script>
import Log from '@/pages-log/index.js'
export default {
	onLaunch: function() {
		// 初始化日志
		Log.getOpen()
		// ... 其他初始化操作
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
</style>