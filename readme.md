# 老陈轮播插件
## 使用方式
1. 引入lc-swiper.js

  

  ```html
  <script src="lc-swiper.js" type="text/javascript" charset="utf-8"></script>
  ```

  

2. 创建轮播，配置参数

  ```javascript
  var lcSwiper = new LcSwiper({
      //配置选择器设置在哪个元素上生成轮播
      el:"#swiper",
      //设置图片列表
      imgs:['imgs/img1.webp','imgs/img2.webp','imgs/img3.jpg'],
      //设置轮播图的宽高
      width:900,
      height:400
  })
  ```

  