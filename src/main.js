import Vue from 'vue'
import App from './App'
import store from './store'
import cookies from 'weapp-cookie'

import music_play from "@/commponents/music-play/music-play"
Vue.config.productionTip = false;

Vue.prototype.$store = store;
cookies.config({ requestAlias: 'requestx' })

Vue.component('music-play',music_play);
App.mpType = 'app';

const app = new Vue({
  ...App
});
app.$mount()
