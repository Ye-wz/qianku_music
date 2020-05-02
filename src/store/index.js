import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import help from '../common/help'
const store =new Vuex.Store({
  state: {
    audio: {},
    duration: 0,   //播放总时长(ms)
    currentTime: 0,//当前播放时间(ms)
    progress: 0,   //播放百分比
    imageUrl: "",
    songName: "",
    songerName: [],
    id: null,
    playStatus: false,
    song_list: [],
    song_list_index: 0
  },
  getters: {
    logAudio:state => {
      return state.audio;
    },
    progress:state => {
      return state.currentTime/state.duration || 0
    },
    imageUrl: state => {
      return state.imageUrl
    },
    songName: state => {
      return state.songName
    },
    songerName: state => {
      return state.songerName
    },
    id: state => {
      return state.id
    },
    playStatus: state => {
      return state.playStatus
    },
    currentTime: state => {
      //播放当前进度(单位秒)
      return state.currentTime
    },
    currentTime_m: state => {
      return parseInt(state.currentTime/60)
    },
    currentTime_s: state => {
      return parseInt(state.currentTime%60)
    },
    duration: state => {
      return state.duration
    },
    duration_m: state => {
      return parseInt(state.duration/60)
    },
    duration_s: state => {
      return parseInt(state.duration%60)
    },
    song_list: state => {
      return state.song_list
    },
    song_list_index: state => {
      return state.song_list_index
    }
  },
  mutations: {
    initAudio(state) {      //初始化播放器
      state.audio = uni.createInnerAudioContext();
      state.playStatus = false;
      state.audio.onTimeUpdate(() => {
        state.currentTime = state.audio.currentTime;//更新播放长度
      })
      state.audio.onEnded(() => {
        store.commit('playNext',1)
      })
      state.audio.onCanplay(() => {
        //#ifdef H5
        state.duration = state.audio.duration; //更新播放总长度
        //#endif
        //#ifdef MP-WEIXIN
        //微信的onCanplay在src更新后就执行了,duration并没有得到更新
        let last_duration = state.audio.duration
        setTimeout(()=> {
          while (state.audio.duration === last_duration) {}
          state.duration = state.audio.duration; //更新播放总长度
        },100)
        //#endif
      })
    },
    setAudio(state,options) {
      // 设置信息
      state.audio.src = options.src || state.audio.src || '';
      state.imageUrl = options.imageUrl || null;
      state.songName = options.name;
      state.songerName = options.songerName;
      state.id = options.id;
      if(options.play) {
        state.commit('playAudio');
      }
    },
    playAudio(state) {
      //播放/停止
      if(state.audio.src != null) {
        //是否已载入
        //判断播放状态
        if(state.audio.paused) {
          state.audio.play();
          state.playStatus = true
        }else {
          state.audio.pause();
          state.playStatus = false
        }
      }
    },
    reSetPlayTime(state,pro) {
      //重新设置进度条
      //pro 重置的百分比
      if(state.audio.src) {
        state.audio.seek(pro*state.duration)
      }
    },
    songListSet(state,option) {
      switch (option.type) {
        case 'add': {
          //添加歌曲
          state.song_list = state.song_list.concat(option.data);
          break
        }
        case 'reSet': {
          //重新设置列表
          state.song_list = option.data;
          break
        }
        case 'reMove': {
          //删除歌曲
          state.song_list.splice(option.index,1)
          store.commit('playList')
          return
        }
      }
      state.song_list_index = option.index || 0
      if(option.play) {
        store.commit('playList')
      }
    },
    playList(state,index = state.song_list_index) {
      // 列表播放
      state.song_list_index = index
      help.songPlay({
        id: state.song_list[index].id,
        success(res) {
          store.commit('setAudio',{
            src: res.data[0].url,
            name: state.song_list[index].name,
            imageUrl: state.song_list[index].al.picUrl,
            songerName: state.song_list[index].ar,
            id: state.song_list[index].id
          });
          store.commit('playAudio')
        }
      })
    },
    playNext(state,type) {
      // 播放下一个/上一个
      switch (type) {
        case 1:
          store.commit('playList',state.song_list_index++ > state.song_list.length? 0:state.song_list_index++);
          break;
        case -1:
          store.commit('playList',state.song_list_index-- < 0? state.song_list.length:state.song_list_index--);
      }
    }
  }
});
export default store
