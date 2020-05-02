<script>
  import help from "./common/help"
	export default {
		onLaunch: function() {
      this.$store.commit('initAudio');
      //登陆
      help.login();
		},
		onShow: function() {

		},
		onHide: function() {

		}
	}
</script>

<style>
	/*每个页面公共css */
  body {
    font-family: SourceHanSansCN-Regular;
  }
</style>
