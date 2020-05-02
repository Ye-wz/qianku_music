<template>
  <view class="content">
    <view class="header">
      <image src="../../static/c22fd731896b2bcefbdd49a996781225.jpg" class="header-img"/>
      <view class="header-user">
        <view class="header-user-name">Vance</view>
        <view class="header-user-play">播放量:<text class="header-user-play-num">1780</text></view>
      </view>
      <view class="header-sign">
        签到
      </view>
    </view>
    <view class="nav cs-flex-navX">
      <view class="nav-unit cs-flex-nav">
        <image class="cs-flex-nav-icon" src="../../static/1828.png" mode="aspectFit"/>
        <text class="cs-flex-nav-text">
          热门电台
        </text>
      </view>
      <view class="nav-unit cs-flex-nav">
        <image class="cs-flex-nav-icon" src="../../static/1829.png" mode="aspectFit"/>
        <text class="cs-flex-nav-text">
          私人FM
        </text>
      </view>
      <view class="nav-unit cs-flex-nav">
        <image class="cs-flex-nav-icon" src="../../static/1830.png" mode="aspectFit"/>
        <text class="cs-flex-nav-text">
          私人推荐
        </text>
      </view>
      <view class="nav-unit cs-flex-nav">
        <image class="cs-flex-nav-icon" src="../../static/1831.png" mode="aspectFit"/>
        <text class="cs-flex-nav-text">
          睡眠模式
        </text>
      </view>
      <view class="nav-unit cs-flex-nav">
        <image class="cs-flex-nav-icon" src="../../static/1832.png" mode="aspectFit"/>
        <text class="cs-flex-nav-text">
          驾驶模式
        </text>
      </view>
    </view>
    <view class="cs-subNavX" v-for="item in nav">
      <view class="cs-subNav">
        <image class="cs-subNav-icon" :src="item.imageUrl" mode="aspectFit"/>
        <text class="cs-subNav-text">{{item.name}}</text>
        <view class="icon-play" v-if="item.autoPlay"/>
      </view>
    </view>
    <view class="cs-unit">
      <view class="cs-unit-titleX">
        <text class="cs-unit-title-b">我的歌单</text>
        <text class="cs-unit-title-right icon-add" />
      </view>
      <view class="my-playlistX">
        <view class="my-playlist" v-for="(item,index) in my_playlist" :style="{'z-index' : my_playlist.length-index}">
          <image :src="item.imageUrl" class="my-playlist-img" mode="aspectFill" />
        </view>
      </view>
    </view>
    <view class="cs-unit rec-playlist">
      <view class="cs-unit-titleX rec-playlist-title">
        <text class="cs-unit-title-b">推荐歌单</text>
        <text class="cs-unit-title-right cs-move">更多</text>
      </view>
      <view class="cs-unit-flex-itemX">
        <view class="cs-unit-flex-item" v-for="item in rec_playlist">
          <image class="cs-unit-flex-item-img" :src="item.imageUrl" mode="aspectFill"/>
          <view class="cs-unit-flex-item-text">{{item.name}}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "swiper-my",
    data: function () {
      return {
        nav: [
          {
            name: '本地音乐',                   //nav名称
            imageUrl: '../../static/icon20.png',//nav图标
            autoPlay: true                      //是否显示全部播放功能
          },
          {
            name: '最近播放',
            imageUrl: '../../static/icon21.png',
            autoPlay: true
          },
          {
            name: '我的收藏',
            imageUrl: '../../static/icon22.png',
            autoPlay: true
          },
          {
            name: '我的电台',
            imageUrl: '../../static/icon23.png',
            autoPlay: false
          },
          {
            name: '我的视频',
            imageUrl: '../../static/icon24.png',
            autoPlay: false
          }
        ],
        my_playlist: [
          {
            imageUrl: '../../static/demo01.jpg'
          },
          {
            imageUrl: '../../static/demo02.jpg'
          },
          {
            imageUrl: '../../static/demo03.jpg'
          }
        ],
        rec_playlist: [
          {
            imageUrl: '../../static/demo01.jpg',
            name: "热歌排行榜"
          },
          {
            imageUrl: '../../static/demo01.jpg',
            name: "华语音乐单曲循环"
          },
          {
            imageUrl: '../../static/demo01.jpg',
            name: "单曲循环过的那些音乐"
          },
        ]
      }
    }
  }
</script>
<style scoped src="../../common/qianku.scss" lang="scss"></style>
<style scoped>
  .content {
    margin: 38rpx 26rpx 100px 26rpx;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e2e2e2;
    padding-bottom: 33rpx;
  }
  .header-img {
    height: 116rpx;
    width: 116rpx;
    border-radius: 50%;
    margin-left: -1rpx;
  }
  .header-user {
    margin-left: -250rpx;
    text-align: left;
    line-height: 1.5;
  }
  .header-user-name {
    font-size: 40rpx;
  }
  .header-user-play {
    font-size: 24rpx;
    color: #a3a3a3;
  }
  .header-user-play-num {
    text-indent: 1em;
  }
  .header-sign {
    border-radius: 50px;
    border: #cfcfcf solid 1px;
    color: #cfcfcf;
    font-size: 26rpx;
    padding: 10rpx 40rpx;
  }
  .nav {
    padding: 36rpx 0;
    border-bottom: 1px solid #e2e2e2;
  }
  .cs-flex-nav-icon {
    display: block;
    max-height: 70rpx;
    max-width: 70rpx;
    margin: auto;
  }
  .cs-unit {
    margin: 0;
  }
  .my-playlistX {
    display: flex;
  }
  .my-playlist {
    position: relative;
    width: 237rpx;
    height: 237rpx;
    margin-right: -97rpx;
    overflow: visible;
  }
  .my-playlist-img {
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 10rpx;
    box-shadow: 10rpx 0px 31rpx -10px #202020;
  }
  .rec-playlist {
    border: 0;
    margin-top: 49rpx;
  }
  .rec-playlist-title {
    width: 705rpx;
  }
</style>
