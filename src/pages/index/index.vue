<template>
	<view class="content">
    <view class="title-X" id="title">
      <view class="title-bg">
        <uni_nav_bar backgroundColor="transparent">
          <image src="../../static/logo.png" class="logo"/>
          <image src="../../static/userImg.png" slot="left" class="userImg"/>
          <image src="../../static/search.png" slot="right" class="search" />
        </uni_nav_bar>
        <view class="tabbar">
          <view class="tabbar-unit" :class="{'select': index == page_index}" v-for="(item,index) in page" @click="nav(index)">{{item.name}}</view>
        </view>
      </view>
    </view>
    <swiper :style="{'height': height+'px'}" @change="pageChange" :current="page_index">
      <swiper-item class="swiper-item">
        <!--        滑动页-我的-->
        <swiper-my></swiper-my>
      </swiper-item>
      <swiper-item class="swiper-item">
        <!--        滑动也-主页-->
        <swiper-index></swiper-index>
      </swiper-item>>
      <swiper-item class="swiper-item">
        <!--        滑动也-主页-->
        <swiper-mv></swiper-mv>
      </swiper-item>
    </swiper>
    <music-play/>
	</view>
</template>

<script>
  import uni_nav_bar from "@/commponents/uni-nav-bar/uni-nav-bar"
  import swiper_index from "@/commponents/swiper-page/swiper-index"
  import swiper_my from "@/commponents/swiper-page/swiper-my"
  import swiper_mv from "@/commponents/swiper-page/swiper-mv"
	export default {
		data() {
			return {
				title: 'Hello',
        height: 150,
        page_index: 1,
        page: [{
				  name: '我的'
        },
        {
          name: '发现'
        },
        {
          name: '视频'
        }]
			}
		},
    computed: {

    },
    components: {
      uni_nav_bar,
      'swiper-index': swiper_index,
      'swiper-my': swiper_my,
      'swiper-mv': swiper_mv
    },
		onLoad() {

		},
    mounted() {
		  let that = this;
      uni.createSelectorQuery().select('#title').boundingClientRect(function(e){
        that.height = uni.getSystemInfoSync().windowHeight-e.height
      }).exec()
    },
		methods: {
      pageChange(e) {
        this.page_index = e.detail.current
      },
      nav(index) {
        this.page_index = index
      }
		}
	}
</script>

<style>
	.content {
		text-align: center;
	}
  .swiper-item {
    overflow-y: scroll;
  }
	.logo {
    width: 112rpx;
    height: 35rpx;
    margin: auto;
    padding-right: 36rpx;
	}
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
  .title-X {
    height: 258rpx;
  }
  .title-bg {
    padding-top: 56.5rpx;
    height: 201.5rpx;
    background-image: linear-gradient(to bottom right, rgb(18,18,18),rgb(41,41,41),rgb(18,18,18));
    position: fixed;
    z-index: 100;
  }
  .userImg {
    height: 47rpx;
    width: 47rpx;
    margin-left: 35rpx;
  }
  .search {
    height: 37rpx;
    width: 37rpx;
  }
  .tabbar {
    display: flex;
    width: 585rpx;
    font-size: 36rpx;
    justify-content: space-between;
    color: white;
    margin: 0 auto;
    position: absolute;
    bottom: 43rpx;
    left: 0;
    right: 0;
  }
  .tabbar-unit.select:after{
    content: "";
    border:transparent solid 20rpx;
    font-size: 0;
    border-bottom-color: white;
    position: absolute;
    bottom: -43rpx;
    margin-left: -52rpx;
  }
</style>
