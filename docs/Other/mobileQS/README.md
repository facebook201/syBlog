 
# 移动端的问题描述

## 微信下 IOS 音频无法自动播放

微信H5下面，IOS不会立即自动播放音频，需要主动触发。
```javascript
<audio style="display:none; height: 0" id="bg-music" preload="auto" src="../static/videos/bg-music.mp3" loop="loop"></audio>

document.addEventListener('DOMContentLoaded', function () {
  function audioAutoPlay() {
    var audio = document.getElementById('bg-music');
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
      audio.play();
    }, false);
  }
  audioAutoPlay();
});
```

## html2canvas 画图模糊



## input唤起键盘容易布局错位





## 微信H5获取用户头像


