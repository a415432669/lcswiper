// options
// {
// 	el:"#swiper",
// 	imgs:['imgs/img1.webp','imgs/img2.webp','imgs/img3.jpg']
// }

var style = document.createElement("style")
// 两个反引号
style.innerHTML = `
*{
	margin: 0;
	padding: 0;
}

.swiper{
	width: 700px;
	height: 300px;
	position: relative;
	margin: 0 auto;
}
.swiper .imglist{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
}

.swiper .imglist .imgItem{
	width: 100%;
	height: 100%;
	position: absolute;
	left: 0;
	top: 0;
	background-size: cover;
	background-position: center;
	transition: opacity 0.8s;
	opacity: 0;
}
.swiper .imglist .imgItem.active{
	opacity: 1;
}

.prevBtn{
	width: 50px;
	height: 50px;
	color: #fff;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	left: 0;
	top:calc(50% - 25px) ;
	text-align: center;
	line-height: 50px;
	font-size: 25px;
	cursor: pointer;
}

.nextBtn{
	width: 50px;
	height: 50px;
	color: #fff;
	background-color: rgba(0,0,0,0.6);
	position: absolute;
	right: 0;
	top:calc(50% - 25px) ;
	text-align: center;
	line-height: 50px;
	font-size: 25px;
	cursor: pointer;
}

.circleList{
	width: 700px;
	height: 50px;
	position: absolute;
	bottom: 0px;
	left: 0;
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 0 20px;
	box-sizing: border-box;
}
.circle{
	width:8px;
	height: 8px;
	border: 2px solid #ccc;
	background-color: #999;
	margin: 0 5px;
	box-sizing: border-box;
	border-radius: 4px;
	
}
.circle.active{
	width:8px;
	height: 8px;
	border: 2px solid #ccc;
	background-color: #efefef;
	margin: 0 5px;
	box-sizing: border-box;
	border-radius: 4px;
	
}
`

document.body.appendChild(style)

function LcSwiper(options){
	var swiperElement = document.querySelector(options.el)
	
	// 添加一个swiper类名
	swiperElement.classList.add('swiper')
	// 设定swiperElement的宽高
	swiperElement.style.width = options.width + 'px';
	swiperElement.style.height = options.height + 'px';
	
	// 默认从索引值0开始
	var index = 0
	// 创建图片列表
	var imgList = document.createElement('div')
	imgList.className = "imglist"
	var circleList = document.createElement("div")
	circleList.className = "circleList"
	// 根据配置生成图片和圆点
	options.imgs.forEach(function(item,i){
		var imgItem = document.createElement('div')
		// 三元运算符
		imgItem.className = i==index? 'imgItem active':'imgItem'
		imgItem.style.backgroundImage = "url("+item+")";
		// 创建圆点
		var circle = document.createElement('div');
		circle.className = i==index? "circle active":"circle";
		circle.setAttribute('data-index',i)
		imgList.appendChild(imgItem)
		circleList.appendChild(circle);
	})
	
	swiperElement.appendChild(imgList)
	swiperElement.appendChild(circleList)
	// 创建按钮
	var btn = document.createElement('div')
	btn.className = "btn"
	// 创建上1个和下一个按钮
	var prevBtn = document.createElement("div");
	prevBtn.className = "prevBtn";
	prevBtn.innerText = "<"
	
	var nextBtn = document.createElement("div");
	nextBtn.className = "nextBtn";
	nextBtn.innerText = ">"
	
	// 追加到btn
	btn.appendChild(prevBtn);
	btn.appendChild(nextBtn);
	swiperElement.appendChild(btn)
	
	
	// 获取所有的图片列表
	var imgsArr = document.querySelectorAll(".imgItem")
	var circleArr = document.querySelectorAll('.circle')
	
	
	// 监听按钮
	isClick = true;
	nextBtn.onclick = function(){
		if(isClick){
			isClick = false;
			setTimeout(function(){
				isClick = true;
			},800)
			// 每次改变状态之前，先把之前元素active去掉
			imgsArr[index].classList.remove('active')
			circleArr[index].classList.remove('active')
			index ++;
			if(index>=imgsArr.length){
				index=0;
			}
			// 每次改变状态之后，将元素active加上
			imgsArr[index].classList.add('active')
			circleArr[index].classList.add('active')
		}
		
	}
	prevBtn.onclick = function(){
		imgsArr[index].classList.remove('active')
		circleArr[index].classList.remove('active')
		index --;
		if(index<0){
			index=imgsArr.length-1;
		}
		imgsArr[index].classList.add('active')
		circleArr[index].classList.add('active')
	}
	
	
	circleList.onclick = function(event){
		if(event.target.className == 'circle'){
			console.log(event.target)
			console.log(event.target.getAttribute('data-index'))
			console.log(event.target.dataset.index)
			
			imgsArr[index].classList.remove('active')
			circleArr[index].classList.remove('active')
			index = parseInt(event.target.dataset.index);
			imgsArr[index].classList.add('active')
			circleArr[index].classList.add('active')
		}
		
	}
	
	var intervalId = setInterval(function(){
		nextBtn.click()
	},3000)
	
	swiperElement.onmouseenter = function(){
		clearInterval(intervalId)
	}
	swiperElement.onmouseleave = function(){
		intervalId = setInterval(function(){
			nextBtn.click()
		},3000)
	}
	
	
	
	
	
	
}