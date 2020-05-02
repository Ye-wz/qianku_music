<template>
  <view>
    <uni-Popup ref="popup" type="bottom">
      <view class="popup">
        <view class="popup-item" url="../singerList/singerList" @click="toSongerList(0)" v-if="singers">歌手:<text v-for="(item,index) in singers"><text v-if="index">/</text>{{item.name}}</text> </view>
        <view class="popup-item" @click.stop="close">取消</view>
      </view>
    </uni-Popup>
    <uni-Popup ref="popup_songer" type="center">
      <view class="popup popup-center">
        <view class="popup-center-title">请选择要查看的歌手</view>
        <view v-for="(item,index) in singers" @click="toSongerList(index,true)">{{item.name}}</view>
      </view>
    </uni-Popup>
  </view>
</template>

<script>
  import help from "@/common/help.js"
  import uniPopup from "@/commponents/uni-popup/uni-popup"
  export default {
    name: "music-pop-tab",
    data() {
      return {
        singers: undefined,

      }
    },
    components: {
      "uni-Popup": uniPopup
    },
    methods: {
      close() {
        //关闭选项窗
        this.$refs.popup.close()
      },
      open(option) {
        //打开选项窗
        this.singers = option.songers || undefined;
        this.$refs.popup.open()
      },
      toSongerList(index,link) {
        this.$refs.popup.close()
        if(this.singers.length<2 || index ||link) {
          uni.navigateTo({
            url: "/pages/singerList/singerList?id="+this.singers[index].id,

          })
        }else {
          this.$refs.popup_songer.open()
          // for (let singer of this.singers) {
          //   help.artistDesc({
          //     id: singer.id,
          //     success(res) {
          //       console.log(res)
          //     }
          //   })
          // }
        }
      }
    }
  }
</script>

<style scoped src="@/common/qianku.scss" lang="scss"></style>
<style scoped>

</style>
