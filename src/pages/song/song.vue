<template>
  <view class="content">
    <view class="song-background" />
    <view class="song-main">
      <view class="song-cd">
        <image class="song-cd-image" :src="imageUrl || 'http://s4.music.126.net/style/web2/img/default/default_album.jpg'" />
      </view>
      <view class="song-lyrics">
        <swiper vertical="true" display-multiple-items="3" class="song-lyrics-swiper" :current="song_lyrics_index" v-if="song_lyrics" @change="changePage">
          <swiper-item class="song-lyrics-item" :class="{select: song_lyrics_index === index}" v-for="(item,index) in song_lyrics" :key="index">
            <p>{{item.content}}</p>
          </swiper-item>
        </swiper>
        <view v-else>
          纯音乐,请欣赏
        </view>
      </view>
      <view class="song-progress" @click="setProgress" id="progress">
        <view class="song-progress-now" :style="{width: progress*100+'%'}">
          <view class="song-progress-bg" />
        </view>
      </view>
      <view class="song-time">
        <view class="song-time-left">{{currentTime_m>9?currentTime_m:'0'+currentTime_m}}:{{currentTime_s>9?currentTime_s:'0'+currentTime_s}}</view>
        <view class="song-time-right">{{duration_m>9?duration_m:'0'+duration_m}}:{{duration_s>9?duration_s:'0'+duration_s}}</view>
      </view>
      <view class="song-btns">
        <view class="song-btns-left icon-cycle" />
        <view class="song-btns-center">
          <view class="icon-play-last" @click="playNext(-1)" />
          <view :class="playStatus?'icon-paly-stop':'icon-play-big'" @click="playBtn"/>
          <view class="icon-play-next" @click="playNext(1)" />
        </view>
        <view class="song-btns-right icon-listM" @click="poUp"/>
      </view>
      <view class="song-oper">
        <view class="icon-like"/>
        <view class="icon-download"/>
        <view class="icon-comment"/>
        <view class="icon-moveMeatures"/>
      </view>
    </view>
    <music-listPop ref="list" />
  </view>
</template>

<script>
  import help from "../../common/help"
  import musicListPop from "../../commponents/music-listPop/music-listPop";
  import {mapGetters} from 'vuex';
  export default {
    name: "song",
    data() {
      return {
        song_lyrics: [],
        song_lyrics_index: -1,
        play: false,
        progress_size: 0
      }
    },
    created() {
    let that = this
      uni.setNavigationBarTitle({
        title: this.songName
      })
      if(this.id) {
        help.lyric({
          id: this.id,
          success(res) {
            // console.log(res)
            // console.log(res.lrc.lyric)
            //歌词
            let lrcArr
            if(res.lrc) {
              let lrc = res.lrc.lyric;
              lrcArr = help.lyricToArr(lrc)
              that.song_lyrics = lrcArr
            }else {
              console.log("没有歌词")
            }
            //歌词提供者
            // let lrcUser = res.lyricUser.nickname
            //翻译歌词
            // let lyric = null
            //翻译歌词提供者
            // let lyricUser
            // if(res.tlyric.lyric) {
            //   //翻译歌词
            //   lyric = res.tlyric.lyric;
            //   //翻译歌词提供者
            //   lyricUser = res.transUser.nickname
            // }
          }
        })
      }
    },
    mounted() {
      let that = this
      uni.createSelectorQuery().in(this).select('#progress').boundingClientRect((data)=> {
        that.progress_size = data.width
      }).exec()
    },
    methods: {
      lyrics_next() {
        this.song_lyrics_index++
      },
      playBtn() {
        this.$store.commit('playAudio')
      },
      changePage(current) {
        this.song_lyrics_index = current.detail.current
      },
      setProgress(e) {
        //重置进度条
        let target = e.mp.target
        let progress_per = (target.x-target.offsetLeft)/this.progress_size
        this.$store.commit('reSetPlayTime',progress_per)
      },
      playNext(type) {
        this.$store.commit('playNext',type)
      },
      poUp() {
        this.$refs.list.poUp();
      }
    },
    computed: {
      ...mapGetters([
        'logAudio',
        'progress',
        'imageUrl',
        'songName',
        'songerName',
        'id',
        'playStatus',
        'currentTime',
        'currentTime_m',
        'currentTime_s',
        'duration_m',
        'duration_s'
      ])
    },
    watch: {
      currentTime: {
        handler(handler) {
          try{
            do {
              //快速跳
              if(this.song_lyrics_index+1 < this.song_lyrics.length && (handler >= this.song_lyrics[this.song_lyrics_index+1].time || 0)) {
                this.song_lyrics_index+=1
              }else if(this.song_lyrics_index<0 && (handler < this.song_lyrics[this.song_lyrics_index].time || 0)) {
                this.song_lyrics_index-=1
              }else {
                return
              }
            }while (true)
          }catch (e) {
            console.log(this.song_lyrics,e)
          }
        },
        deep: false,
        immediate: false
      }
    },
    components: {
      'music-listPop': musicListPop
    }
  }
</script>
<style scoped lang="scss" src="../../common/qianku.scss"></style>
<style scoped>
  .song-background {
  margin-top: -10vh;
  margin-bottom: -417rpx;
  height: 557rpx;
  width: 100%;
  background-image: linear-gradient(-28deg, #121212, #292929,#121212);
  z-index: -1;
}
  .song-main {
    background: white;
    border-radius: 60rpx 60rpx 0 0;
    text-align: center;
    padding-top: 9vh;
  }
  .song-cd {
    margin: auto;
    background: #1d1d1d;
    border-radius: 50%;
    width: 436rpx;
    height: 436rpx;
    box-shadow: 0 0 53rpx #1d1d1d;
    position: relative;
  }
  .song-cd-image {
    width: 340rpx;
    height: 340rpx;
    position: absolute;
    top: 0;left: 0;
    right: 0;bottom: 0;
    margin: auto;
    border-radius: 50%;
  }
  .song-lyrics-swiper{
    height: 12vh;
    position: relative;
  }
  .song-lyrics-swiper:before {
    content: "";
    display: block;
    background-image: linear-gradient(transparent, #fff);
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
    pointer-events: none;
  }
  .song-lyrics {
    margin-top: 8vh;
    font-size: 26rpx;
    color: #292929;
    font-weight: 600;
  }
  .song-progress {
    margin: auto;
    width: 639rpx;
    height: 11rpx;
    background: #e2e2e2;
    margin-top: 8vh;
    border-radius: 6rpx;
    position: relative;
    overflow: hidden;
  }
  .song-progress-now {
    height: 100%;
    overflow: hidden;
    border-radius: 6rpx;
    pointer-events: none;
  }
  .song-progress-bg {
    width: 639rpx;
    height: 11rpx;
    background-image: linear-gradient(to right,#3290f9,#2eebed);
  }
  .song-time {
    margin: 18rpx auto 0 auto;
    width: 93%;
    font-weight: 600;
    font-size: 26rpx;
    color: #292929;
    display: flex;
    justify-content: space-between;
  }
  .song-btns-center {
    width: 280rpx;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .song-btns {
    margin: auto;
    margin-top: 3vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 606rpx;
  }
  .song-oper {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 40rpx;
  }
  .song-btns-play {
    height: 82rpx;
    width: 82rpx;
  }
</style>
