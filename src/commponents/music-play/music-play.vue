<template>
  <view class="content">
    <view class="play-X">
      <navigator class="music-progressX" url="../../pages/song/song">
<!--        <svg class="music-progress-bar">-->
<!--          <circle fill="none"-->
<!--                  stroke="#3da9f5"-->
<!--                  class="music-progress-bar-cir"-->
<!--                  :stroke-dasharray="perimter"-->
<!--                  ref="cir"-->
<!--                  id="music-progress"-->
<!--                  :stroke-dashoffset="perimter*(1-progress)"-->
<!--          />-->
<!--        </svg>-->
          <cir-pro :progress="progress"/>
        <view class="music-progress-bar">
        </view>
        <view class="music-progress-imgX">
          <image class="music-progress-img" :src="imageUrl || 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'"/>
        </view>
      </navigator>
        <span class="percent"></span>
      <view class="music-info">
        <span class="music-name">{{songName}}</span><br/>
        <span class="music-singer">
          <span v-for="item in songerName">
            {{item.name}}
          </span>
        </span>
      </view>
      <view class="music-function">
        <image src="../../static/play-icon.png" class="music-function-play" @click="musicPlay"/>
        <image src="../../static/moveMusic.png" class="music-function-move" @click="poUp" />
      </view>
    </view>
    <music-listPop ref="list" />
  </view>
</template>

<script>
  import cir_pro from '../cir-pro/cir-pro'
  import musicListPop from '../music-listPop/music-listPop'
  import {mapGetters} from 'vuex';
  export default {
    name: "music-play",
    components: {
      'cir-pro': cir_pro,
      'music-listPop': musicListPop
    },
    data() {
      return {
        perimter: 0,
        transform: "",
        audio: {}
      }
    },
    mounted() {
      let that = this;
      uni.createSelectorQuery().in(this).select('#music-progress').boundingClientRect(function(e){
        that.perimter = e.width*Math.PI;
      }).exec()
      this.audio= this.logAudio;
    },
    computed: {
      ...mapGetters([
        'logAudio',
        'progress',
        'imageUrl',
        'songName',
        'songerName'
      ])
    },
    methods: {
      musicPlay() {
        this.$store.commit('playAudio')
      },
      poUp() {
        this.$refs.list.poUp()
      },
      changePlay(index) {
        this.$store.commit('playList',index)
      }
    },
    watch: {
      progress(handler){
        // console.log(handler)
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: SourceHanSansCN-Regular;
    src: url("../../static/font/SourceHanSansCN-Regular.ttf");
  }
  .play-X {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 100rpx;
    border-top: 1px solid rgb(226,226,226);
    text-align: left;
    z-index: 1;
    background: white;
  }
  .music-info {
    margin-left: 155rpx;
    display: inline-block;
    line-height: 30rpx;
    margin-top: 19rpx;
  }
  .music-singer {
    font-size: 20rpx;
    color: rgb(163,163,163);
  }
  .music-function {
    display: flex;
    align-items: center;
    float: right;
    height: 100rpx;
    width: 181rpx;
    justify-content: space-evenly;
  }
  .music-function-play {
    height: 45rpx;
    width: 45rpx;
  }
  .music-function-move {
    width: 35rpx;
    height: 25rpx;
  }
  .music-name {
    width: 400rpx;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    font-size: 30rpx;
  }
  .music-progressX {
    position: absolute;
    height: 109rpx;
    width: 109rpx;
    border-radius: 50%;
    background: rgb(208,208,208);
    bottom: 21rpx;
    left: 29rpx;
    overflow: hidden;
  }
  .music-progress-left {
    position: absolute;
    background: rgb(61,169,245);
    width: 100%;
    height: 100%;
    border-radius: 50% ;
    transform: rotate(0deg);
    clip:rect(0,auto,auto,54.5rpx)
  }
  .music-progress-imgX {
    height: 94%;
    width: 94%;
    position: absolute;
    top: 0;right: 0;left: 0;bottom: 0;
    margin: auto;
    overflow: hidden;
    border-radius: 50%;
  }
  .music-progress-bar {  /*进度条css*/
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .music-progress-bar-cir {
    stroke-linecap: round;
    cx: -50%;
    cy: 50%;
    r: 46%;
    stroke-width: 10%;
    transform: rotate(-90deg)
  }
  .music-progress-img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;right: 0;left: 0;bottom: 0;
    margin: auto;
  }

</style>
