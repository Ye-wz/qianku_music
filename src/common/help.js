import cookie from 'weapp-cookie';

const phone=""//手机号
const pw=""//密码
const domain="localhost:3000"
const httpHead="http://localhost:3000"


function login() { //登陆
  uni.requestx({
    url: httpHead+"/login/cellphone",
    data: {
      phone: phone,
      password: pw
    },
    success(data){
      data.data.cookie.map(item => {
        let option = item.split(";")
        let cookieData = option[0].split("=")
        cookie.set(cookieData[0],cookieData[1],{
          domain: httpHead,
          expires: option[1],
        })
      });
      //#ifdef H5
        let reqCookie = cookie.getCookies(domain)
        for (let cookiesName in reqCookie) {
          document.cookie = `${cookiesName}=${reqCookie[cookiesName]}`
        }
      //#endif
      examine()
    }
  })
}
function subcount() {
  uni.requestx({
      url: httpHead+"/login/subcount",
      withCredentials: true,
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res)
      }
    }
  )
}
function examine() {    //登陆状态
  uni.request({
      url: httpHead+"/login/status",
      withCredentials: true,
      success(res) {
        console.log(res);
      }
    }
  )
}
function personalized(success,limit) {
  uni.request({
    url: httpHead+"/personalized",
    data: {
      limit: limit || 30
    },
    success(res) {
      success(res)
    },
  })
}
function playlist_detail(option) {
  if(!option.id) return
  uni.request({
    url: httpHead+"/playlist/detail",
    data: {
      id: option.id
    },
    success(res) {
      option.success(res.data.body)
    },
  })
}
function songPlay(option){
  uni.request({
    url: httpHead+"/song/url",
    data: {
      id: option.id
    },
    success(res) {
      option.success(res.data.body)
    },
  })
}
//获取歌词
function lyric(option) {
  if(!option.id) return
  uni.request({
    url: httpHead+"/lyric",
    data: {
      id: option.id
    },
    success(res) {
      option.success(res.data.body)
    },
  })
}
//歌词转json格式
function lyricToArr(lry) {
  let lryArr=[];
  lry.split("\n").map(item => {
    let times=[];
    let lrys = item.replace(/\[([^\]]*)\]/g,(match,matchs) => {
      let timeArr = matchs.split(":")
      let time = parseFloat(timeArr[0]*60+parseFloat(timeArr[1]))//时间转毫秒
      if(isNaN(time)) {
        times.push(0);
        return matchs
      }
      times.push(time)
      return ""
    });
    if(times.length) {
      times.map(item => {
        //将新序列歌词加入
        lryArr.push({
          content: lrys,
          time: item
        })
      })
    }
  });
  lryArr.sort((a,b) => {
    return a.time > b.time
  })
  return lryArr
}
function personalizedMv(success) {
  uni.request({
    url: httpHead+"/personalized/mv",
    success: success
  })
}
function mvUrl(id,success) {
  //推荐mv
  uni.request({
    url: httpHead+"/mv/url",
    data: {id: id},
    success:success
  })
}
function artistDesc(option) {
  uni.request({
    url: httpHead+"/artist/desc",
    data: {id: option.id},
    success: option.success
  })
}
function userDetail(option) {
  uni.request({
    url: httpHead+"/user/Detail",
    data: {uid: option.id},
    success: option.success
  })
}
function artists(option) {
  uni.request({
    url: httpHead+"/artists",
    data: {id: option.id},
    success: option.success
  })
}
module.exports= {
  login,
  examine,
  personalized,
  subcount,
  playlist_detail,
  songPlay,
  lyric,
  lyricToArr,
  personalizedMv,
  mvUrl,
  artistDesc,
  userDetail,
  artists
};
