<template>
<!--  首页/发现-->
  <view class="content">
    <view class="header">
      <view class="header-swiperX">
        <swiper
          circular="true"
          duration=500
          autoplay="true"
          class="header-swiper"
          @change="swiper_change"
          disable-programmatic-animation="true"
        >
          <swiper-item>
            <image src="../../static/swiperPt.png" class="header-swiper-pt"/>
          </swiper-item>
          <swiper-item>
            <image src="../../static/swiperPt.png" class="header-swiper-pt"/>
          </swiper-item>
        </swiper>
      </view>
      <view class="header-tab">
        <navigator class="header-tab-unit" v-for="item in tabList" :url="item.url || ''" :key="item.id">
          <image class="header-tab-unit-img" :src="item.src"/>
          <p class="header-tab-unit-text">{{item.text}}</p>
        </navigator>
      </view>
    </view>
    <view class="cs-unit">
      <view class="cs-unit-titleX">
        <text class="cs-unit-title">音乐风格</text>
        <text class="cs-unit-title-right cs-move" @click="demo">更多</text>
      </view>
      <view class="cs-unit-flexX">
        <view class="cs-unit-flex" :class="'cs-gradient-'+item.background"  v-for="(item,index) in music_style" :key="index">
          <image class="cs-unit-flex-img" :src="item.src"/>
          <view class="cs-circle"></view>
          <view class="cs-unit-flex-title">{{item.name}}</view>
          <view class="cs-unit-flex-main">
            <p>我的喜好</p>
            <p class="cs-unit-flex-main-people"><span>{{item.people}}</span>人喜欢</p>
          </view>
        </view>
      </view>
    </view>
    <view class="cs-unit" v-for="item in mainList">
      <view class="cs-unit-titleX">
        <span class="cs-unit-title">{{item.title}}</span>
        <span class="cs-unit-title-right cs-move">更多</span>
      </view>
      <view class="cs-unit-list" v-for="item in item.list" @click="toList(item.id)">
        <view class="cs-unit-list-img">
          <image :src="item.imageUrl" />
          <view :class="'cs-gradient-'+item.background" v-if="item.background"></view>
        </view>
        <view class="cs-unit-list-main">
<!--          歌单内容-->
          <view class="cs-unit-list-main-title">{{item.title}}</view>
          <view class="cs-unit-list-main-subtitle">{{item.subtitle}}</view>
          <text class="cs-unit-list-main-content"><text class="cs-unit-list-main-content-li" v-for="item in item.musics">{{item}}</text></text>
        </view>
      </view>
    </view>
    <view style="height: 200rpx"></view>
  </view>
</template>

<script>
  import help from "../../common/help"
  export default {
    name: "swiper-index",
    data() {
      return{
        tabList: [
          {
            src: "../../static/like.png",
            text: "每日推荐",
            url: "/pages/musicList/musicList"
          },
          {
            src: "../../static/tab-list.png",
            text: "音乐列表"
          },
          {
            src: "../../static/paihan.png",
            text: "排行榜"
          },
          {
            src: "../../static/diantai.png",
            text: "音乐电台"
          },
          {
            src: "../../static/shiping.png",
            text: "音乐视频"
          },
        ],
        music_style: [//background选项3种 [orange,blue,purple]
          {
            name: "流光岁月",
            src: "../../static/7621.png",
            background: "orange",
            people: "1980000"
          },
          {
            name: "时光静好",
            src: "../../static/37588.png",
            background: "blue",
            people: "1980000"
          },
          {
            name: "重金属音乐",
            src: "../../static/33261.png",
            background: "purple",
            people: "1980000"
          }
        ],
        mainList: [{
          title: "新唱片",
          list: []
        }]
      }
    },
    created() {
      let that = this;
      //获取推荐歌单
      help.personalized(function (res) {
        let result;
        if (res.data.body.code === 200) {
          result = res.data.body.result
          for (let resultKey of result) {
            //获取歌单详情
            help.playlist_detail({
              id: resultKey.id,
              success(res) {
                //设置歌单
                let playlist={
                  title: resultKey.name,
                  imageUrl: resultKey.picUrl,
                  id: resultKey.id,
                  subtitle: res.playlist.creator.nickname,
                  musics: [res.playlist.tracks[0].name,res.playlist.tracks[1].name]
                };
                that.mainList[0].list=that.mainList[0].list.concat(playlist);
              }
            });
          }
        }
      },4);
    },
    methods: {
      swiper_change(a,b) {
        // console.log(a,b)
      },
      demo() {
        // console.log(this.$cookies.dir())
      },
      toList(id) {
        uni.navigateTo({
          url: "/pages/musicList/musicList?id="+id
        })
      }
    },
    errorCaptured(err, vm, info) {
      console.log(err)
    }
  }
</script>

<style scoped src="../../common/qianku.scss" lang="scss"></style>
<style scoped>
.header-swiper {
  margin-top: 25rpx;
}
.header-swiper-pt {
  width: 693rpx;
  height: 298rpx;
}
.header-swiper {
  height: 298rpx;
}
.header-tab {
  display: flex;
  width: 691rpx;
  margin: 44rpx auto;
  font-size: 24rpx;
  line-height: 30rpx;
  text-align: center;
  justify-content: space-between;
}
.header-tab-unit-img {
  height: 99rpx;
  width: 99rpx;
}
</style>
