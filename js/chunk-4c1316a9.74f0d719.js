(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4c1316a9"],{1281:function(t,e,o){"use strict";o.r(e);var a=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{ref:"footPrint",staticClass:"footPrint",attrs:{id:"footPrint"}})},n=[],i=(o("77ad"),o("053b"),o("7f22")),r=o.n(i),l={name:"footPrint",mounted:function(){this.drawECharts()},data:function(){return{geoCoordMap:{"杭州":[120.219375416,30.2592444615],"南京":[118.778074408,32.0572355018],"上海":[121.487899486,31.24916171],"扬州":[119.427777551,32.4085052546],"无锡":[120.305455901,31.5700374519],"常州":[119.981861013,31.7713967447],"武汉":[114.316200103,30.5810841269],"郑州":[113.64964385,34.7566100641],"广州":[113.307649675,23.1200491021],"深圳":[114.025973657,22.5460535462],"江门":[113.078125341,22.5751167835],"汕头":[116.728650288,23.3839084533],"韶关":[113.594461107,24.8029603119],"三亚":[109.522771281,18.2577759149],"丽江":[100.229628399,26.8753510895],"张家界":[110.481620157,29.1248893532],"广德":[119.425496,30.823887],"合肥":[117.282699092,31.8669422607],"湖州":[120.097967,30.943327],"绍兴":[120.592467386,30.0023645805]},allData:{bornCity:[{name:"广德"}],studyCity:[{name:"扬州"}],workingCity:[{name:"杭州"}],businessCitys:[{name:"上海"},{name:"无锡"},{name:"南京"},{name:"武汉"},{name:"郑州"},{name:"广州"},{name:"深圳"},{name:"江门"},{name:"汕头"},{name:"韶关"},{name:"合肥"}],tourCitys:[{name:"常州"},{name:"三亚"},{name:"丽江"},{name:"张家界"},{name:"湖州"},{name:"绍兴"}],henanLines:[{name:"广德",value:"生于斯,长于斯",coords:[[119.425496,30.823887],[125.42288,30.823887]]},{name:"杭州",value:"梦起航的地方~",coords:[[120.219375416,30.2592444615],[128.2035,30.2592444615]]},{name:"扬州",value:"读书学习~",coords:[[119.427777551,32.4085052546],[129.43157,32.4085052546]]}],otherLines:[]},citys:{"杭州":100,"广德":99,"扬州":98,"南京":1,"上海":2,"无锡":3,"武汉":4,"郑州":5,"韶关":6,"江门":7,"汕头":8,"广州":9,"深圳":10,"合肥":11,"绍兴":50,"常州":51,"三亚":52,"丽江":53,"张家界":54,"湖州":55}}},methods:{convertData:function(t){for(var e=[],o=0;o<t.length;o++){var a=t[o].name,n=this.geoCoordMap[a];n&&e.push({name:a,value:[n[0],n[1],this.citys[a]]})}return e},getCityData:function(t){if(t.length>2)return this.convertData(t.sort((function(t,e){return e.value-t.value})).slice(0,50));var e=t[0].name,o=this.geoCoordMap[e];return[{name:e,value:[o[0],o[1],this.citys[e]]}]},drawECharts:function(){var t=r.a.init(document.getElementById("footPrint")),e={backgroundColor:"#404a59",animation:!0,animationDuration:1e3,animationEasing:"cubicInOut",animationDurationUpdate:1e3,animationEasingUpdate:"cubicInOut",title:[{text:"",top:20,left:"center",fontSize:20,textStyle:{color:"#fff"}},{id:"statistic",right:120,top:40,width:100,textStyle:{color:"#fff",fontSize:16}}],geo:{map:"china",id:11,z:1,left:"10",right:"35%",layoutCenter:["24%","25%"],layoutSize:"88%",zoom:2.5,label:{emphasis:{show:!1}},roam:!0,itemStyle:{normal:{areaColor:"#323c48",borderColor:"#111"},emphasis:{areaColor:"#2a333d"}}},tooltip:{trigger:"item"},grid:{right:40,top:100,bottom:40,width:"30%"},xAxis:{type:"value",scale:!0,position:"top",boundaryGap:!1,splitLine:{show:!1},axisLine:{show:!1},axisTick:{show:!1},axisLabel:{margin:2,textStyle:{color:"#aaa"}}},yAxis:{type:"category",nameGap:16,axisLine:{show:!1,lineStyle:{color:"#ddd"}},axisTick:{show:!1,lineStyle:{color:"#ddd"}},axisLabel:{interval:0,textStyle:{color:"#ddd"}},data:[]},series:[{name:"出生地",type:"effectScatter",coordinateSystem:"geo",data:this.getCityData(this.allData.bornCity),symbolSize:function(t){return Math.max(t[2]/10,12)},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{fontSize:14,formatter:"{b}",position:"bottom",show:!0}},itemStyle:{normal:{color:"#B15BFF",shadowBlur:10,shadowColor:"#333"}},zlevel:1},{name:"象牙塔",type:"effectScatter",coordinateSystem:"geo",data:this.getCityData(this.allData.studyCity),symbolSize:function(t){return Math.max(t[2]/10,12)},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{fontSize:14,formatter:"{b}",position:"bottom",show:!0}},itemStyle:{normal:{color:"#28FF28",shadowBlur:10,shadowColor:"#333"}},zlevel:1},{name:"现居地",type:"effectScatter",coordinateSystem:"geo",data:this.getCityData(this.allData.workingCity),symbolSize:function(t){return Math.max(t[2]/10,12)},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{fontSize:14,formatter:"{b}",position:"bottom",show:!0}},itemStyle:{normal:{color:"#FF0000",shadowBlur:10,shadowColor:"#333"}},zlevel:1},{name:"出差到过",type:"effectScatter",coordinateSystem:"geo",data:this.getCityData(this.allData.businessCitys),symbolSize:function(t){return Math.max(t[2]/10,12)},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{fontSize:14,formatter:"{b}",position:"bottom",show:!0}},itemStyle:{normal:{color:"#FFAD86",shadowBlur:10,shadowColor:"#333"}},zlevel:1},{name:"旅游玩过",type:"effectScatter",coordinateSystem:"geo",data:this.getCityData(this.allData.tourCitys),symbolSize:function(t){return Math.max(t[2]/10,12)},showEffectOn:"render",rippleEffect:{brushType:"stroke"},hoverAnimation:!0,label:{normal:{fontSize:14,formatter:"{b}",position:"bottom",show:!0}},itemStyle:{normal:{color:"#FFFF37",shadowBlur:10,shadowColor:"#333"}},zlevel:1},{name:"otherlines",type:"lines",coordinateSystem:"geo",zlevel:1,large:!1,effect:{show:!0,constantSpeed:30,symbol:"arrow",symbolSize:6,trailLength:0},label:{show:!0,color:"yellow",fontSize:16,formatter:"{c}"},lineStyle:{normal:{color:new r.a.graphic.LinearGradient(0,0,0,1,[{offset:0,color:"#58B3CC"},{offset:1,color:"#f4e925"}],!1),width:2,opacity:1,curveness:0}},data:this.allData.otherLines},{name:"henanLines",type:"lines",coordinateSystem:"geo",zlevel:1,polyline:!1,large:!0,effect:{show:!0,constantSpeed:20,symbol:"arrow",symbolSize:6,trailLength:0},label:{show:!0,borderColor:"#00ffff",borderWidth:0,formatter:function(t){for(var e="",o=t.value.length,a=8,n=Math.ceil(o/a),i=0;i<n;i++){var r="",l=i*a,s=l+a;r=i==n-1?t.value.substring(l,o):t.value.substring(l,s)+"\n",e+=r}return"{a|"+e+"}"},rich:{a:{color:"#00ffff",fontSize:12,lineHeight:15,align:"left"}}},lineStyle:{normal:{color:"#00ffff",width:2,opacity:1,curveness:0}},data:this.allData.henanLines}],legend:{show:!0,data:["出生地","象牙塔","现居地","出差到过","旅游玩过"],icon:"circle",selectedMode:"multiple",left:"center",top:"bottom",textStyle:{color:"#00FA9A"}}};t.setOption(e)}}},s=l,c=(o("e847"),o("9ca4")),m=Object(c["a"])(s,a,n,!1,null,"1b2240ec",null);e["default"]=m.exports},8543:function(t,e,o){},e847:function(t,e,o){"use strict";var a=o("8543"),n=o.n(a);n.a}}]);
//# sourceMappingURL=chunk-4c1316a9.74f0d719.js.map