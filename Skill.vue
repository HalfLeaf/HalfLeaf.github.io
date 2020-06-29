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
        "杭州": [120.2035, 30.2057],
        "南京": [118.8921, 31.32751],
        "上海": [121.48941, 31.40527],
        "扬州": [119.43157, 32.39463],
        "无锡": [120.28429, 31.52853],
        "常州": [119.59794, 31.72322],
        "武汉": [114.02919, 30.58203],
        "郑州": [113.6401, 34.72468],
        "广州": [113.27324, 23.15792],
        "深圳": [113.88308, 22.55329],
        "江门": [113.11103, 22.56028],
        "汕头": [116.4331, 23.25029],
        "三亚": [109.7525, 18.40005],
        "丽江": [100.22549, 26.87721],
        "张家界": [110.5504, 29.3458],
        "广德": [119.42288, 30.8904],
        "合肥": [117.30794, 31.79322],
        "湖州": [120.41847, 30.84979],
        "绍兴": [120.49476, 30.08189],
      }
    }
  },
  methods: { 
    convertData (data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let geoCoord = this.geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    },
    drawECharts() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("skill"))
      let allData = {
        "citys": [
            {"name": "杭州"},
            {"name": "南京"},
            {"name": "上海"},
            {"name": "扬州"},
            {"name": "无锡"},
            {"name": "常州"},
            {"name": "武汉"},
            {"name": "郑州"},
            {"name": "广州"},
            {"name":"深圳"},
            {"name": "江门"},
            {"name":"汕头"},
            {"name":"三亚"},
            {"name":"丽江"},
            {"name":"张家界"},
            {"name":"广德"},
            {"name":"合肥"},
            {"name":"湖州"},
            {"name":"绍兴"},
            
        ],
        "henanLines":[
            {"name":"广德","value":"生于斯,长于斯","coords": [[119.42288, 30.8904],[125.42288, 30.8904]]}, 
            {"name":"杭州","value":"生于斯,长于斯","coords": [[120.2035, 30.2057],[128.2035, 30.2057]]}, 
            {"name":"扬州","value":"生于斯,长于斯","coords": [[119.43157, 32.39463],[129.43157, 32.39463]]}, 
        ],
        "otherLines": []
      }
      let data = [
        {
          name: "杭州",
          value: 160
        },
        {
          name: "南京",
          value: 1
        },
        {
          name: "上海",
          value: 2
        },
        {
          name: "扬州",
          value: 30
        },
        {
          name: "无锡",
          value: 3
        },
        {
          name: "常州",
          value: 25
        },
        {
          name: "武汉",
          value: 4
        },
        {
          name: "郑州",
          value: 5
        },
        {
          name: "广州",
          value: 36
        },
        {
          name: "深圳",
          value: 42
        },
        {
          name: "江门",
          value: 24
        },
        {
          name: "汕头",
          value: 22
        },
        {
          name: "三亚",
          value: 52
        },
        {
          name: "丽江",
          value: 55
        },
        {
          name: "张家界",
          value: 56
        },
        {
          name: "广德",
          value: 120
        },
        {
          name: "合肥",
          value: 7
        },
        {
          name: "湖州",
          value: 16
        },
        {
          name: "绍兴",
          value: 8
        },
      ]
      let convertedData = [
          this.convertData(data),
          this.convertData(data.sort(function(a, b) {
              return b.value - a.value;
          }).slice(0, 32))
      ];

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
          center: [120.2035, 30.2057],
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
            name: '位置',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertedData[1],
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
                color: '#f4e925',
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
            data: allData.otherLines
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
              constantSpeed: 30,
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
                if (paramsNameNumber > provideNumber) {
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
                } else { 
                  newParamsName = params
                }
                return '{a|'+newParamsName+'}'
              },
              rich:{
                a:{
                  color:'#00ffff',
                  fontSize:16,
                  lineHeight:20,
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
            data: allData.henanLines
          },
        ]
      }
      myChart.setOption(option)
    },
  }
}
</script>

<style scoped>
.skill {
  width: 100%;
  height: 500px;
}
</style>



