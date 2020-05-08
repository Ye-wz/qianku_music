<template>
  <uni-popup ref="popup" type="bottom">
    <view class="play-list">
      <view class="play-list-title">当前播放 <text>{{song_list.length}}</text></view>
      <view class="play-list-main" id="play_list" @touchmove="touchmove($event)" >
        <view class="play-list-main-item" @touchstart.stop="touchstart(index)" @touchend.stop="touchend(index)" :class="{select : song_list_index === index}" v-for="(item,index) in song_list" :index="index">
          <text class="play-list-main-item-text">{{item.name}}</text><text class="play-list-main-item-text-songer">-<text v-for="(item,index) in item.ar"><text v-if="index">/</text>{{item.name}}</text></text>
          <icon type="clear" class="play-list-main-item-clear" @click.stop="removeMusci(index)"/>
        </view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
  import uniPopup from '../uni-popup/uni-popup'
  import {mapGetters} from 'vuex';
  let itemMove = undefined;
  let mouseMove = false;
  export default {
    name: "music-list",
    computed: {
      ...mapGetters([
        'song_list',
        'song_list_index'
      ])
    },
    components: {
      'uni-popup': uniPopup
    },
    methods: {
      touchstart(index) {
        let that = this;
        console.log(index)
        mouseMove = false;
        clearTimeout(itemMove);
        itemMove = undefined;
        itemMove = setTimeout(function () {
          itemMove = undefined;
          //长按执行
          console.log("longClick")
        },1000)
      },
      touchend(index) {
        console.log(index)
        clearTimeout(itemMove);
        if(itemMove&& !mouseMove){
          //点触后执行
          this.$store.commit('playList',index)
        }
      },
      touchmove(ev) {
        clearTimeout(itemMove);
        mouseMove = true
        if(!itemMove) {
          console.log(ev.mp.touches[0])
          ev.preventDefault()
        }
      },
      poUp() {
        this.$refs.popup.open();
      },
      removeMusci(index) {
        this.$store.commit('songListSet',{
          type: 'reMove',
          index: index
        })
      }
    }
  }
</script>

<style scoped>
  .play-list {
    background: #fff;
    border-radius: 20rpx;
    width: 86%;
    margin: auto;
    padding: 0 2%;
    margin-bottom: 30rpx;
    text-align: left;
  }
  .play-list-title {
    padding: 20rpx 0;
    font-weight: 600;
  }
  .play-list-title text {
    padding: 0 10rpx;
    font-size: 30rpx;
    color: #999;
  }
  .play-list-title text:before {
    content: "(";
  }
  .play-list-title text:after {
    content: ")";
  }
  .play-list-main {
    height: 550rpx;
    overflow: auto;
    font-size: 32rpx;
    /*white-space: nowrap;*/
    /*-webkit-overflow-scrolling: touch;*/
    /*overflow: -moz-scrollbars-none;*/
  }
  .play-list-main-item {
    padding: 15rpx 0;
    position: relative;
    background: #fff;
    position: relative;
  }
  .play-list-main-item.select {
    color: red;
  }
  .play-list-main-item-clear {
    position: absolute;
    right: 0;
  }
  .play-list-main-item-text-songer {
    font-size: 26rpx;
  }
</style>
