<template>
  <div class="skill" id="skill"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
export default {
  name: "skill",
   data() {
    return {};
  },
  mounted() {
    this.drawECharts();
  },
  data() {
    return {
      geoCoordMap: {
        "杭州": [120.219375416, 30.2592444615],
        "南京": [118.778074408, 32.0572355018],
        "上海": [121.487899486, 31.24916171],
        "扬州": [119.427777551, 32.4085052546],
        "无锡": [120.305455901, 31.5700374519],
        "常州": [119.981861013, 31.7713967447],
        "武汉": [114.316200103, 30.5810841269],
        "郑州": [113.64964385, 34.7566100641],
        "广州": [113.307649675, 23.1200491021],
        "深圳": [114.025973657, 22.5460535462],
        "江门": [113.078125341, 22.5751167835],
        "汕头": [116.728650288, 23.3839084533],
        "韶关": [113.594461107, 24.8029603119],
        "三亚": [109.522771281, 18.2577759149],
        "丽江": [100.229628399, 26.8753510895],
        "张家界": [110.481620157, 29.1248893532],
        "广德": [119.425496, 30.823887],
        "合肥": [117.282699092, 31.8669422607],
        "湖州": [120.097967, 30.943327],
        "绍兴": [120.592467386, 30.0023645805],
      },
      allData: {
        'bornCity':[{"name":"广德"}],
        'studyCity':[{"name": "扬州"}],
        'workingCity':[{"name": "杭州"}],
        'businessCitys':[
          {"name": "上海"},
          {"name": "无锡"},
          {"name": "南京"},
          {"name": "武汉"},
          {"name": "郑州"},
          {"name": "广州"},
          {"name":"深圳"},
          {"name": "江门"},
          {"name":"汕头"},
          {"name":"韶关"},
          {"name":"合肥"},
        ],
        'tourCitys':[
          {"name": "常州"},
          {"name":"三亚"},
          {"name":"丽江"},
          {"name":"张家界"},
          {"name":"湖州"},
          {"name":"绍兴"},
        ],
        "henanLines":[
          {"name":"广德","value":"生于斯,长于斯","coords": [[119.425496, 30.823887],[125.42288, 30.823887]]}, 
          {"name":"杭州","value":"梦起航的地方~","coords": [[120.219375416, 30.2592444615],[128.2035, 30.2592444615]]}, 
          {"name":"扬州","value":"读书学习~","coords": [[119.427777551, 32.4085052546],[129.43157, 32.4085052546]]}, 
        ],
        "otherLines": []
      },
      citys:{
        // 现居地
        "杭州":100,
        // 家乡
        "广德":99,
        // 读书学习
        "扬州":98,
        // 工作出差
        "南京": 1,
        "上海": 2,
        "无锡": 3,
        "武汉": 4,
        "郑州": 5,
        "韶关": 6,
        "江门": 7,
        "汕头": 8,
        "广州": 9,
        "深圳": 10,
        "合肥": 11,
        // 旅游
        "绍兴": 50,
        "常州": 51,
        "三亚": 52,
        "丽江": 53,
        "张家界": 54,
        "湖州": 55,
      }
    }
  },
  methods: { 
    convertData (data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        let geoCoord = this.geoCoordMap[name]
        if (geoCoord) {
          res.push({
            name: name,
            value: [
              geoCoord[0],
              geoCoord[1],
              this.citys[name]
            ]
          })
        }
      }
      return res
    },
    getCityData(data){
      if(data.length > 2){
        return this.convertData(data.sort(function(a, b) {
          return b.value - a.value;
        }).slice(0, 50))
      }else{
        let name = data[0].name;
        let coor = this.geoCoordMap[name];
        return [{
          name: name,
          value: [
            coor[0],
            coor[1],
            this.citys[name]
          ]
        }]
      }
    },
    drawECharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("skill"))
      let option = {
        backgroundColor: '#404a59',
        animation: true,
        animationDuration: 1000,
        animationEasing: 'cubicInOut',
        animationDurationUpdate: 1000,
        animationEasingUpdate: 'cubicInOut',
        title: [
          {
            text: '',
            top: 20,
            left: 'center',
            fontSize: 20,
            textStyle: {
              color: '#fff'
            }
          },
          {
            id: 'statistic',
            right: 120,
            top: 40,
            width: 100,
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
          }
        ],
        geo: {
          map: 'china',
          id: 11,
          z: 1,
          left: '10',
          right: '35%',
          layoutCenter: ["24%", "25%"], //地图位置
          layoutSize: "88%",
          zoom: 2.5,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, //是否开启鼠标缩放和平移漫游
          itemStyle: {
            normal: {
              areaColor: '#323c48',
              borderColor: '#111'
            },
            emphasis: {
              areaColor: '#2a333d'
            }
          }
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          right: 40,
          top: 100,
          bottom: 40,
          width: '30%'
        },
        xAxis: {
          type: 'value',
          scale: true,
          position: 'top',
          boundaryGap: false,
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            margin: 2,
            textStyle: {
              color: '#aaa'
            }
          },
        },
        yAxis: {
          type: 'category',
          nameGap: 16,
          axisLine: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisTick: {
            show: false,
            lineStyle: {
              color: '#ddd'
            }
          },
          axisLabel: {
            interval: 0,
            textStyle: {
              color: '#ddd'
            }
          },
          data: []
        },
        series: [
          {
            name: '出生地',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.getCityData(this.allData.bornCity),
            symbolSize: function(val) {
              return Math.max(val[2] / 10, 12);
            },
            showEffectOn: 'render',     //配置何时显示特效 'render' 绘制完成后显示特效, 'emphasis' 高亮（hover）的时候显示特效。
            rippleEffect: {
              //color: "#00ffff",   //颜色，涟漪的颜色，默认为散点的颜色。
              brushType: 'stroke'   //波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            hoverAnimation: true,
            label: {
              normal: {
                fontSize: 14,
                formatter: '{b}',
                position: 'bottom',
                show: true,
              }
            },
            itemStyle: {
              normal: {
                color: '#B15BFF',
                // function(val) {
                //   let cityName = val.name;
                //   if(cityName){
                //     let value = val.data.value[2];
                //     if (value === 100){
                //       return '#FF0000'
                //     }else if (value === 99){
                //       return '#B15BFF'
                //     }else if(value === 98){
                //       return '#28FF28'
                //     }else if(value >= 50){
                //       return '#FFFF37'
                //     }else{
                //       return '#F3F3FA'
                //     }
                //   }
                // },
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: '象牙塔',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.getCityData(this.allData.studyCity),
            symbolSize: function(val) {
              return Math.max(val[2] / 10, 12);
            },
            showEffectOn: 'render',     //配置何时显示特效 'render' 绘制完成后显示特效, 'emphasis' 高亮（hover）的时候显示特效。
            rippleEffect: {
              //color: "#00ffff",   //颜色，涟漪的颜色，默认为散点的颜色。
              brushType: 'stroke'   //波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            hoverAnimation: true,
            label: {
              normal: {
                fontSize: 14,
                formatter: '{b}',
                position: 'bottom',
                show: true,
              }
            },
            itemStyle: {
              normal: {
                color:'#28FF28',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: '现居地',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.getCityData(this.allData.workingCity),
            symbolSize: function(val) {
              return Math.max(val[2] / 10, 12);
            },
            showEffectOn: 'render',     //配置何时显示特效 'render' 绘制完成后显示特效, 'emphasis' 高亮（hover）的时候显示特效。
            rippleEffect: {
              //color: "#00ffff",   //颜色，涟漪的颜色，默认为散点的颜色。
              brushType: 'stroke'   //波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            hoverAnimation: true,
            label: {
              normal: {
                fontSize: 14,
                formatter: '{b}',
                position: 'bottom',
                show: true,
              }
            },
            itemStyle: {
              normal: {
                color: '#FF0000',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: '出差到过',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.getCityData(this.allData.businessCitys),
            symbolSize: function(val) {
              return Math.max(val[2] / 10, 12);
            },
            showEffectOn: 'render',     //配置何时显示特效 'render' 绘制完成后显示特效, 'emphasis' 高亮（hover）的时候显示特效。
            rippleEffect: {
              //color: "#00ffff",   //颜色，涟漪的颜色，默认为散点的颜色。
              brushType: 'stroke'   //波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            hoverAnimation: true,
            label: {
              normal: {
                fontSize: 14,
                formatter: '{b}',
                position: 'bottom',
                show: true,
              }
            },
            itemStyle: {
              normal: {
                color:'#FFAD86',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: '旅游玩过',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: this.getCityData(this.allData.tourCitys),
            symbolSize: function(val) {
              return Math.max(val[2] / 10, 12);
            },
            showEffectOn: 'render',     //配置何时显示特效 'render' 绘制完成后显示特效, 'emphasis' 高亮（hover）的时候显示特效。
            rippleEffect: {
              //color: "#00ffff",   //颜色，涟漪的颜色，默认为散点的颜色。
              brushType: 'stroke'   //波纹的绘制方式，可选 'stroke' 和 'fill'。
            },
            hoverAnimation: true,
            label: {
              normal: {
                fontSize: 14,
                formatter: '{b}',
                position: 'bottom',
                show: true,
              }
            },
            itemStyle: {
              normal: {
                color:'#FFFF37',
                shadowBlur: 10,
                shadowColor: '#333'
              }
            },
            zlevel: 1
          },
          {
            name: 'otherlines',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            large: false,
            effect: {
              show: true,
              constantSpeed: 30,
              symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0,
            },
            label:{
              show:true,
              color:'yellow',
              fontSize:16,
              formatter:'{c}',
            },
            lineStyle: {
              normal: {
                //color: '#f4e925',
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0, color: '#58B3CC'}, {
                  offset: 1, color: '#f4e925'
                }], false),
                width: 2,
                opacity: 1,
                curveness: 0 //0.2 曲线   0 直线
              }
            },
            data: this.allData.otherLines
          },
          {
            name: 'henanLines',
            type: 'lines',
            coordinateSystem: 'geo',
            zlevel: 1,
            polyline:false,   //是否是多段线
            large: true,
            effect: {
              show: true,
              constantSpeed: 20,
              symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
              symbolSize: 6,
              trailLength: 0,
            },
            label:{
              show:true,
              borderColor:'#00ffff',
              borderWidth:0,
              formatter: function (params) {
                let newParamsName = "";
                let paramsNameNumber = params.value.length;
                let provideNumber = 8;  //一行显示几个字
                let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                for (let p = 0; p < rowNumber; p++) {
                  let tempStr = "";
                  let start = p * provideNumber;
                  let end = start + provideNumber;
                  if (p == rowNumber - 1) {
                    tempStr = params.value.substring(start, paramsNameNumber);
                  } else {
                    tempStr = params.value.substring(start, end) + "\n";
                  }
                  newParamsName += tempStr;
                }
                return '{a|'+newParamsName+'}'
              },
              rich:{
                a:{
                  color:'#00ffff',
                  fontSize:12,
                  lineHeight:15,
                  align:'left',
                },
              }
            },
            lineStyle: {
              normal: {
                color: '#00ffff',
                width: 2,
                opacity: 1,
                curveness: 0 //0.2 曲线   0 直线
              }
            },
            data: this.allData.henanLines
          },
        ],
        legend: {
          show:true, 
          data: ["出生地", "象牙塔", "现居地", "出差到过", "旅游玩过"],
          icon: "circle",   //  这个字段控制形状  类型包括 circle，rect ，roundRect，triangle，diamond，pin，arrow，none
          selectedMode: 'multiple',
          left:"center",    //组件离容器右侧的距离,'20%'
          top:"bottom",   //组件离容器下侧的距离,'20%'
          textStyle:{
            color: '#00FA9A'
          },
        },
      }
      myChart.setOption(option)
    },
  }
}
</script>

<style scoped>
  .skill {
    width: 100%;
    height: 840px;
  }
</style>



