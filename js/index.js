/*
* @Author: Administrator
* @Date:   2018-01-19 11:17:39
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 16:52:03
*/
'use strict';
var weather;
var city;
$.ajax({
	// 获取地址
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	type: "get",
	// 获取跨域
	dataType: "jsonp",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
	}
})
$.ajax({
	// 获取地址
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	type: "get",
	// 获取跨域
	dataType: "jsonp",
	success:function(obj){
		city=obj.data;
		// console.log(city);
	}
});

// 查找各城市天气信息
function AJAX(str){
	$.ajax({
	// 获取地址
	url: `https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
	type: "get",
	// 获取跨域
	dataType: "jsonp",
	success:function(obj){
		weather=obj.data.weather;
		// console.log(weather);
		updata();
		$(".city_box").css({"display":"none"});
	}
})
}

// 渲染数据
function updata()
{
	// 渲染城市
	var cityName=document.getElementsByClassName("header")[0];
	cityName.innerHTML=weather.city_name;
    // 渲染当前温度
	var currentTemperature=document.getElementsByClassName("title1")[0];
	currentTemperature.innerHTML=weather.current_temperature+"°";
    // 当前天气状况
    var currentCondition=document.getElementsByClassName("title2")[0];
	currentCondition.innerHTML=weather.current_condition;
    // 今天最高最低温
    var dat_high_temperature=document.getElementById("dat_high_temperature");
	dat_high_temperature.innerHTML=weather.dat_high_temperature;

	var dat_low_temperature=document.getElementById("dat_low_temperature");
	dat_low_temperature.innerHTML=weather.dat_low_temperature;
    // 今天天气情况
    var day_condition=document.getElementById("day_condition");
	day_condition.innerHTML=weather.day_condition;
	// 今天的icon
	var dat_weather_icon_id=document.getElementById("dat_weather_icon_id");
	// ${weather.dat_weather_icon_id}中weather.dat_weather_icon_id为变量
	dat_weather_icon_id.style=`background-image:url(img/${weather.dat_weather_icon_id}.png);`;
	// 明天最高最低温
	var tomorrow_high_temperature=document.getElementById("tomorrow_high_temperature");
	tomorrow_high_temperature.innerHTML=weather.tomorrow_high_temperature;

    var tomorrow_low_temperature=document.getElementById("tomorrow_low_temperature");
	tomorrow_low_temperature.innerHTML=weather.tomorrow_low_temperature;
	// 明天天气情况
    var tomorrow_condition=document.getElementById("tomorrow_condition");
	tomorrow_condition.innerHTML=weather.tomorrow_condition;
	// 今天的icon
	var tomorrow_weather_icon_id=document.getElementById("tomorrow_weather_icon_id");
	// ${weather.dat_weather_icon_id}中weather.dat_weather_icon_id为变量
	tomorrow_weather_icon_id.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png);`;

    for (var i in weather.hourly_forecast) {
		// 创建父元素div
		var now=document.createElement("div");
		// 给父元素div加样式
		now.className="now";
	// 获取now的父元素
	var nowp=document.getElementById("now");
	// 把now插入到父元素中
	nowp.appendChild(now);

    var now_time=document.createElement("h2");
    now_time.className="now_time";
    now_time.innerHTML=weather.hourly_forecast[i].hour+":00";
    now.appendChild(now_time);


    var now_icon=document.createElement("div");
    now_icon.className="now_icon";
    now_icon.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png);`;
    now.appendChild(now_icon);

    var now_temperature=document.createElement("h3");
    now_temperature.className="now_temperature";
    now_temperature.innerHTML=weather.hourly_forecast[i].temperature;
    now.appendChild(now_temperature);


	}
    for (var j in weather.forecast_list) {
		// 创建父元素div
		var recent=document.createElement("div");
		// 给父元素div加样式
		recent.className="recent";
	// 获取now的父元素
	var recentp=document.getElementById("recent");
	// 把now插入到父元素中
	recentp.appendChild(recent);

    var recent_time=document.createElement("div");
    // console.log(weather.forecast_list[j].data.substring(5,7));
    recent_time.className="recent_time";
    // recent_time.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/"+weather.forecast_list[j].date.substring(8);
    recent.appendChild(recent_time);


    var month=document.createElement("span");
    month.className="month";
    month.innerHTML=weather.forecast_list[j].date.substring(5,7)+"/";
    recent_time.appendChild(month);

    var day=document.createElement("span");
    day.className="day";
    day.innerHTML=weather.forecast_list[j].date.substring(8);
    recent_time.appendChild(day);

    var recent_wea=document.createElement("h2");
    recent_wea.className="recent_wea";
    recent_wea.innerHTML=weather.forecast_list[j].condition;
    recent.appendChild(recent_wea);


    var recent_pic=document.createElement("div");
    recent_pic.className="recent_pic";
    recent_pic.style=`background-image:url(img/${weather.forecast_list[j].weather_icon_id}.png);`;
    recent.appendChild(recent_pic);

    var recent_high=document.createElement("h3");
    recent_high.className="recent_high";
    recent_high.innerHTML=weather.forecast_list[j].high_temperature;
    recent.appendChild(recent_high);

    var recent_low=document.createElement("h4");
    recent_low.className="recent_low";
    recent_low.innerHTML=weather.forecast_list[j].low_temperature;
    recent.appendChild(recent_low); 


    var recent_wind=document.createElement("h5");
    recent_wind.className="recent_wind";
    recent_wind.innerHTML=weather.forecast_list[j].wind_direction;
    recent.appendChild(recent_wind); 

    var recent_level=document.createElement("h6");
    recent_level.className="recent_level";
    recent_level.innerHTML=weather.forecast_list[j].wind_level+"级";
    recent.appendChild(recent_level);  
	}

	var header=document.getElementsByClassName("header")[0];
	var city_box=document.getElementsByClassName("city_box")[0];
	header.onclick=function(){
		// 设置搜索框搜索完后回复原来的样子
		$(".text").val("");
		$(".button").html("取消");
		city_box.style="display:block";
	}
	// 渲染城市
	//一级遍历 
	for (var k in city){
		console.log(k);

		var cityp=document.getElementById("city");

		var title=document.createElement("h1");
	    title.className="title";
	    title.innerHTML=k;
	    cityp.appendChild(title);  

       var con=document.createElement("div");
       con.className="con";
	    // 二级城市的访问，两层for循环
	  for (var y in city[k]) {
	  	// y是二级城市
	  	console.log(y);

	  	var erji=document.createElement("div");
	    erji.className="son";
	    erji.innerHTML=y;
	    con.appendChild(erji);  
	  }
	  cityp.appendChild(con);
	}
}

// 当页面加载完成执行的代码
window.onload=function(){
	updata();
	$(".son").on("click",function(){
		var cityh=this.innerHTML;
		AJAX(cityh);

	})
	// 当input获取焦点，button变确认
	// focus获取焦点 html设置或改变元素的内容
	$(".text").on("focus",function(){
		$(".button").html("确认");
	})
	// 操作按钮
	var button=document.getElementsByClassName("button")[0];
	console.log(button);

	button.onclick=function(){
		
		// 获取button中的内容
		var btn=this.innerHTML;
		if(btn=="取消"){
			var city_box1=document.getElementsByClassName("city_box")[0];
			city_box1.style="display:none";
		}
		// 获取文本框中的内容，点击确认跳转
		else{
			var str=document.getElementsByClassName("text")[0].value;
		    // console.log(str);
		    // 对城市进行一级循环
			// for(var i in city){
			// 	if(str==i){ 
			// 		AJAX(str);
			// 		return;
			// 	}
			// 	// 二级循环
			// 	else{
			// 		for(var j in city[i]){
			// 			if(str==j){
			// 				AJAX(str);
			// 		        return;
			// 			}
			// 		}
			// 	}
					
			// }
			for (var i in city){
				for (var j in city[i]) {
					if (str==j) {
						AJAX(str);
						return;
					}
				}
			}
			alert("没有该城市的气象信息");
		}
	}
}

