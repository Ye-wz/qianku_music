<template>
  <view class="content">
    <view class="header-tab">
      <navigator class="header-tab-unit" v-for="item in tabList" :url="item.url || ''">
        <image class="header-tab-unit-img" :src="item.src" />
        <p class="header-tab-unit-text">{{item.title}}</p>
      </navigator>
    </view>
    <view class="main">
      <view class="main-unit" v-for="(item) in mainList">
        <view class="main-unit-videoX">
          <video class="main-unit-video" :src="item.url? item.url:''" :poster="item.picUrl" autoplay=true />
          <view class="main-unit-video-cover" @click="playVideo(item)" v-if="!item.url"/>
        </view>
        <view class="main-unit-titleX">
          <view class="main-unit-title">
            <text class="main-unit-title-h1">{{item.name}}</text>
            <text class="main-unit-title-h2">{{item.artistName}}</text>
          </view>
          <view class="main-unit-title-right">
            <view class="icon-like2" />
            <view class="icon-share" />
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import help from '../../common/help'
  export default {
    name: "swiper-mv",
    data(){
      return {
        tabList: [
          {
            title: 'MTV',
            src: '../../static/1928.png',
            url: ''
          },
          {
            title: '歌剧',
            src: '../../static/1929.png',
            url: ''
          },
          {
            title: '直播',
            src: '../../static/1930.png',
            url: ''
          },
          {
            title: '演唱会',
            src: '../../static/1932.png',
            url: ''
          },
          {
            title: '影视金曲',
            src: '../../static/1931.png',
            url: ''
          },
        ],
        mainList: [
          {
            name: "And The Winner Is .",      //标题
            artistName: "Gerard Darmon",     //作者
            picUrl: "../../static/51483.png" //封面
          }
        ]
      }
    },
    created() {
      help.personalizedMv((res) => {
        console.log(res.data.body.result)
        this.mainList = res.data.body.result
      })
    },
    methods: {
      playVideo(item) {
        let that = this;
        //获取视频url并加载
        help.mvUrl(item.id,(res) => {
          that.$set(item,'url',res.data.body.data.url)
          console.log(item)
        })
      }
    }
  }
</script>

<style src="../../common/qianku.scss" lang="scss"></style>
<style scoped>
  .content {
    padding: 46rpx 27rpx 0 27rpx;
  }
  .header-tab-unit-img {
    height: 65rpx;
    width: 63rpx;
  }
  .header-tab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 26rpx;
    line-height: 60rpx;
    text-align: center;
  }
  .main-unit {
    margin-top: 38rpx;
  }
  .main-unit-videoX {
    margin: auto;
    border-radius: 10rpx;
    height: 347rpx;
    width: 692rpx;
    overflow: hidden;
    position: relative;
  }
  .main-unit-video-cover {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;left: 0;
    z-index: 1;
  }
  .main-unit-video {
    width: 100%;
    height: 100%;
  }
  .main-unit-titleX {
    display: flex;
    align-items: center;
  }
  .main-unit-title {
    width: 520rpx;
    text-align: left;
  }
  .main-unit-title-h1 {
    font-size: 30rpx;
    line-height: 48rpx;
    color: #333;
  }
  .main-unit-title-h2 {
    display: block;
    font-size: 20rpx;
    line-height: 30rpx;
    color: #cbcbcb;
  }
  .main-unit-title-right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 106rpx;
    height: 52rpx;
    padding: 0 17rpx 0 46rpx;
    border-left: 1px solid #e2e2e2;
  }
</style>
