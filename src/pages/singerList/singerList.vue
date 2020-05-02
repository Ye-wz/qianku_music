<template>
  <view class="content">
    <view class="list-background">
      <image src="../../static/12412773.png" class="list-background-image" />
      <view class="list-nav-flexX">
        <view class="list-nav-flex">
          <view class="list-nav-flex-unit select">作品</view>
          <view class="list-nav-flex-unit ">专辑</view>
          <view class="list-nav-flex-unit">视频</view>
        </view>
      </view>
      <view class="list-info">
        <image src="../../static/xin.png" class="songer-xin"/>
        <view class="songer-name">{{name}}</view>
        <view class="songer-info">{{introduction}}</view>
      </view>
    </view>
    <view class="list-main">
      <view class="list-main-li" v-for="(item,index) in list" @click="play(index)">
        <view class="list-main-li-info">
          <view class="list-main-li-info-name">
            {{item.name}}
          </view>
          <view class="list-main-li-info-vice">
            <span v-for="(songers,index) in item.ar"><span v-if="index">/</span>{{songers.name}}</span>
          </view>
        </view>
        <view class="list-main-li-info icon">
          <view class="list-nav-flex-unit-fun icon-add" />
          <view class="list-nav-flex-unit-fun iconfont icon-gengduo" @click.stop="poUp()"/>
        </view>
      </view>
    </view>
    <music-play />
    <music-pop-tab ref="popup"></music-pop-tab>
  </view>
</template>

<script>
  import help from '@/common/help.js'
  import music_play from '../../commponents/music-play/music-play'
  export default {
    name: "list",
    data() {
      return{
        name: "",
        introduction: "",
        list: []
      }
    },
    components:{'music-play':music_play},
    created() {
      uni.setNavigationBarTitle({
        title: "歌手详情"
      })
    },
    onLoad(res) {
      let that = this
      help.artists({
        id: res.id,
        success(res) {
          let data = res.data.body.artist;
          that.name = data.name;
          that.introduction = data.briefDesc;
          that.list = res.data.body.hotSongs;
          console.log(that.list)
        }
      })
    },
    methods: {
      play(index) {
        var newObject =JSON.parse(JSON.stringify(this.list))
        this.$store.commit('songListSet',{
          type: 'reSet',
          data: newObject,
          index: index,
          play: true
        })
      },
      poUp() {
        this.$refs.popup.open({
          songers: item.ar
        })
      }
    }
  }
</script>
<style scoped src="../../static/font/iconfont.css"></style>
<style scoped lang="scss" src="../../common/music-list.scss"></style>
<style scoped lang="scss" src="../../common/qianku.scss"></style>
<style scoped>
  .list-background {
    display: flex;
    flex-wrap: wrap-reverse;
    align-content: flex-start;
    justify-content: flex-end;
    position: relative;
    margin-top: -88rpx;
    height: 557rpx;
    width: 100%;
    background-image: linear-gradient(-28deg, #121212, #292929,#121212);
    z-index: -1;
  }
  .list-background-image {
    position: absolute;
    height: 536rpx;
    width: 572rpx;
    bottom: -110rpx;
    left: 0;
  }
  .list-nav-flexX {
    background: white;
    font-size: 30rpx;
    width: 100%;
    height: 84rpx;
    border-radius: 60rpx 60rpx 0 0;
    color: #282828;
    position: relative;
    z-index: 1;
  }
  .list-nav-flex {
    width: unset;
    padding: 25rpx 131rpx 19rpx 131rpx;
  }
  .list-nav-flex-unit {
    text-align: center;
    position: relative;
    display: block;
  }
  .list-nav-flex .select {
    color: #37bbff;
  }
  .list-nav-flex-unit:after {
    content: "";
    display: block;
    width: 85rpx;
    border-bottom: 4rpx solid transparent;
    margin: auto;
    position: relative;
    bottom: -10rpx;
    z-index: 1;
  }
  .list-nav-flex-unit.select:after {
    border-bottom-color: #37bbff;
  }
  .list-main {
    display: block;
    height: 300rpx;
    background: white;
    margin-top: -1px;
  }
  .list-info {
    text-align: right;
    margin-right: 55rpx;
    margin-bottom: 26rpx;
    color: white;
    position: relative;
    z-index: 1;
  }
  .songer-xin {
    width: 49rpx;
    height: 46rpx;
    line-height: 60rpx;
  }
  .songer-name {
    font-size: 38rpx;
  }
  .songer-info {
    overflow:hidden;
    text-overflow:ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:5;



    font-size: 22rpx;
    width: 400rpx;
  }
  .list-main-li-info.icon {
    display: flex;
    align-items:  center;
    color: #a3a3a3;
  }
  .list-nav-flex-unit-fun {
    display: inline-block;
    margin: 0 12rpx;
  }
  .icon-gengduo {
    font-size: 30rpx;
  }
</style>
