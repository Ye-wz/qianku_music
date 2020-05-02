<template>
  <view class="content">
    <view class="nav">
      <view class="nav-li select">歌曲<text class="nav-li-text">{{list.length}}</text></view>
      <view class="nav-li">评论<text class="nav-li-text">200</text></view>
      <view class="nav-li">视频<text class="nav-li-text">128</text></view>
    </view>
    <view class="list-main">
      <view class="list-main">
        <view class="list-main-li" v-for="(item,index) in list" :class="{'select': item.play}" @click="play(item,index)" :key="item.id">
          <view class="list-main-li-infoX">
            <view class="music-progressX" >
              <view class="icon-play-smail" v-if="!item.play"/>
              <view v-else>
                <view class="music-progress-circle-bg"/>
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="music-progress-stopX" viewBox="0 0 14 19">
                  <path fill-rule="evenodd"  fill="rgb(102, 102, 102)" d="M11.894,-0.000 C10.774,-0.000 9.789,0.915 9.789,1.967 L9.789,17.033 C9.789,18.085 10.774,19.000 11.894,19.000 C13.014,19.000 14.000,18.085 14.000,17.033 L14.000,1.967 C14.000,0.915 13.014,-0.000 11.894,-0.000 L11.894,-0.000 ZM2.106,-0.000 C0.986,-0.000 -0.000,0.915 -0.000,1.967 L-0.000,17.033 C-0.000,18.085 0.986,19.000 2.106,19.000 C3.226,19.000 4.200,18.085 4.200,17.033 L4.200,1.967 C4.200,0.915 3.226,-0.000 2.106,-0.000 L2.106,-0.000 Z"/>
                </svg>
                <svg class="music-progress-circleX"  viewBox="0 0 200 200">
                  <circle fill="none"
                          stroke="#3da9f5"
                          class="music-progress-circle"
                          ref="cir"
                          id="music-progress"
                          :stroke-dashoffset="(1-progress)*502"
                  />
                </svg>
              </view>
            </view>
            <view class="list-main-li-info">
              <view class="list-main-li-info-name">
                {{item.name}}
              </view>
              <view class="list-main-li-info-vice">
                <span v-for="(item_second,index_second) in item.ar">
                  <text v-if="index_second">/</text>{{item_second.name}}
                </span>
              </view>
            </view>
          </view>
          <view class="list-nav-flex-unit icon">
            <view class="list-nav-flex-unit-fun">{{parseInt(item.dt/60000)}}:{{keepSecond(item.dt)}}</view>
            <view class="list-nav-flex-unit-fun iconfont icon-gengduo" @click.stop="poUp(item)"/>
          </view>
        </view>
      </view>
    </view>
    <music-pop-tab ref="popup"></music-pop-tab>
    <music-play />
  </view>
</template>

<script>
  import help from "../../common/help"
  import music_play from "../../commponents/music-play/music-play";
  import uniPopup from  "../../commponents/uni-popup/uni-popup"
  export default {
    name: "musicList",
    data() {
      return {
        title: "最近播放",
        progress: 0.3,
        list: [],
        popSelect: {ar: []}
      }
    },
    components: {
      "music-play": music_play,
      "uni-Popup": uniPopup
    },
    created() {

    },
    onLoad(option) {
      let that = this
      help.playlist_detail({
        id: option.id,
        success(res) {
          that.list = res.playlist.tracks
          uni.setNavigationBarTitle({
            title: res.playlist.name
          })
        }
      });
    },
    methods: {
      keepSecond(num) {
        let ans = parseInt(num/1000%60);
        return ans > 9?ans : "0"+ans
      },
      play(item,index) {
        var newObject =JSON.parse(JSON.stringify(this.list))
        this.$store.commit('songListSet',{
          type: 'reSet',
          data: newObject,
          index: index,
          play: true
        })
      },
      poUp(item) {
        this.$refs.popup.open({
          songers: item.ar
        })
      },
      poDown() {
        this.$refs.popup.close()
      }
    }
  }
</script>

<style scoped src="../../static/font/iconfont.css"></style>
<style scoped src="../../common/qianku.scss" lang="scss"></style>
<style scoped src="../../common/music-list.scss" lang="scss"></style>
<style scoped>
  .nav {
    display: flex;
    background: #000;
    color: white;
    justify-content: space-around;
    font-size: 28rpx;
    padding: 31rpx 0 9rpx ;
  }
  .nav-li {
    text-align: center;
  }
  .nav-li-text:after {
    content: ")";
  }
  .nav-li-text:before {
    content: "(";
    margin-left: 0.5em;
  }
  .nav-li.select:after {
    content: "";
    width: 143rpx;
    display: block;
    border-bottom: 3rpx solid #ffffff;
    margin-top: 14rpx;
  }
  .list-nav-flex-unit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 28rpx;
    width: 128rpx;
  }
  .list-main-li-infoX {
    display: flex;
    align-items: center;
  }
  .music-progressX {
    height: 40rpx;
    width: 40rpx;
    position: relative;
    margin-right: 20rpx;
  }
  .music-progress-stopX {
    height: 19rpx;
    width: 14rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .music-progress-circleX {
    height: 40rpx;
    width: 40rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .music-progress-circle {
    stroke-linecap: round;
    cx: -100;
    cy: 100;
    r: 80;
    stroke-width: 20;
    stroke-dasharray: 502;
    transform: rotate(-90deg);
  }
  .music-progress-circle-bg {
    height: 32rpx;
    width: 32rpx;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    border-radius: 50%;
    border: 4rpx solid #cbcbcb;
  }
  .icon-play-smail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  .list-main {
    padding-top: 0;
  }
</style>
