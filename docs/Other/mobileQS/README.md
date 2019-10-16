# 移动端的问题描述

## 微信下 IOS 音频无法自动播放
微信 H5 下面，IOS 不会立即自动播放音频，需要主动触发。

```javascript
<audio
  style="display:none; height: 0"
  id="bg-music"
  preload="auto"
  src="../static/videos/bg-music.mp3"
  loop="loop"
></audio>;

document.addEventListener("DOMContentLoaded", function() {
  function audioAutoPlay() {
    var audio = document.getElementById("bg-music");
    audio.play();
    document.addEventListener(
      "WeixinJSBridgeReady",
      function() {
        audio.play();
      },
      false
    );
  }
  audioAutoPlay();
});
```

## html2canvas 画图模糊
对于 canvas 画图不清晰的原因主要是因为，分辨率的问题。苹 iphone 手机的高清屏有 2 倍和三倍。所以要先获取其 dpr。

```javascript
// 获得设备的dpr。
var scaleBy = window.devicePixelRatio || 2;
var height = document.body.clientHeight;
var width = document.body.clientWidth;
var myCanvas = document.createElement("canvas");
myCanvas.height = height * scaleBy;
myCanvas.width = width * scaleBy;

myCanvas.style.height = height;
myCanvas.style.width = height;

// 开始画图缩放倍数
var ctx = myCanvas.getContext("2d");
ctx.scale(scaleBy, scaleBy);

html2canvas(document.body, {
  canvas: myCanvas,
  onrendered: function(canvas) {
    // 画图
    let dataURL = canvas.toDataURL("image/jpeg");
    $("#htmlImg").attr("src", dataURL);
  },
  useCORS: true
});
```

## input 唤起键盘容易布局错位
通过 resize 事件监听。
```javascript
$(window).resize(function() {
  var thisHeight = $(this).height();
  if (windowHeight - thisHeight > 140) {
    //键盘弹出
  } else {
    //键盘收起
  }
});
```

<!-- ## 微信 H5 获取用户头像 -->



## 实现CSS音乐播放动效

```html
// HTML部分
<div class="bgn-btn">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>

```
```css
// CSS 部分
.bgn-btn {
  position: fixed;
  z-index: 2;
  right: 0;
  top: 0;
  width: 80px;
  height: 70px;
}
.bgn-btn span {
  position: absolute;
  display: inline-block;
  width: 4px;
  bottom: 30px;
  background: #fff;
  border-radius: 5px;
  animation: playing alternate linear infinite;
}
.bgn-btn span:first-child {
  left: 30px;
  animation-duration: 0.4s;
}
.bgn-btn span:nth-child(2) {
  left: 36px;
  animation-duration: 0.6s;
}
.bgn-btn span:nth-child(3) {
  left: 42px;
  animation-duration: 0.4s;
  animation-delay: 0.6s;
}
.bgn-btn span:nth-child(4) {
  left: 48px;
  animation-duration: 0.3s;
}
.bgn-btn span:nth-child(5) {
  left: 54px;
  animation-duration: 0.5s;
}
.bgn-btn span:nth-child(6) {
  left: 60px;
  animation-duration: 0.6s;
  animation-delay: 0.6s;
}
.bgn-btn span:last-child {
  left: 66px;
  animation-duration: 0.6s;
  animation-delay: 0.6s;
}
@keyframes playing {
  0% { height: 1px; }
  100% { height: 30px; }
}
```



