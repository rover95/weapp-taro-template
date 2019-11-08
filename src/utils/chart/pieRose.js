import F2 from '../../static/f2-canvas/lib/f2';

/* 
  @param {Array}  charts  图表数组
  @param {Array}  data  数据数组
    [{
      time:''
      value:''
    }]
*/
const DIRECTION = {
  'N': [0, 11.25, 348.75, 360],
  'NNE': [11.25, 33.75],
  'NE': [33.75, 56.25],
  'ENE': [56.25, 78.75],
  'E': [78.75, 101.25],
  'ESE': [101.25, 123.75],
  'SE': [123.75, 146.25],
  'SSE': [146.25, 168.75],
  'S': [168.75, 191.25],
  'SSW': [191.25, 213.75],
  'SW': [213.75, 236.25],
  'WSW': [236.25, 258.75],
  'W': [258.75, 281.25],
  'WNW': [281.25, 303.75],
  'NW': [303.75, 326.25],
  'NNW': [326.25, 348.75]
};

const LEVEL = {
  percent1: '<0.5m/s',
  percent2: '0.5-2m/s',
  percent3: '2-4m/s',
  percent4: '4-6m/s',
  percent5: '6-8m/s',
  percent6: '8-10m/s',
  percent7: '>10m/s',
};

export default function pieRoseChart(source){
  let data = [];
  for (let i in DIRECTION) {
    let direct = source.value.filter(val => val.direct == i)[0];
    for (let j in LEVEL) {
      data.push({
        direction: i,
        level: LEVEL[j],
        value: direct ? Math.round(direct[j] * 100) / 100 : 0
      });
    }
  }
  // let data = [];
  // for (let i in DIRECTION){
  //   let direct = odata.value.filter(val => val.direct == i)[0];
  //   let value = 0;
    
  //   for (let j in LEVEL){
  //     value += direct ? direct[j] : 0;
  //   }
  //   data.push({
  //     direction: i,
  //     value: Math.round(value * 100) / 100
  //   });
  // }
  // console.log(data);
  
  return (canvas, width, height) =>{
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data,);
    chart.coord('polar');
    chart.legend({
      title: 'null',
      position: 'right', // 设置图例的显示位置
      itemWrap: false,
      offsetX: -35
    });
    // chart.legend(false);
    chart.animate(false);
    chart.axis('value', {
      grid: {
        line: {
          lineDash: [0, 0]
        }
      }// 设置坐标系栅格样式
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        let legend = chart.get('legendController').legends.right[0];
        let tooltipItems = obj.items;
        let legendItems = legend.items;
        let map = {};
        legendItems.map(function (item) {
          map[item.name] = item;
        });
        tooltipItems.map(function (item) {
          let name = item.name;
          let value = item.value;
          if (map[name]) {
            map[name].value = value +'%';
          }
        });
        legend.setItems(...map);
      },
      onHide: function onHide() {
        let legend = chart.get('legendController').legends.right[0];
        legend.setItems(chart.getLegendItems().country);
      }
    });
    
    chart.interval().position('direction*value').color('level').size(30).adjust('stack');;
    // chart.interval().position('lable*value').color('lable').style({
    //   lineWidth: 1,
    //   stroke: '#fff'
    // });
    chart.render();
  };
}