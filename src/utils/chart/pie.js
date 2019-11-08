import F2 from '../../static/f2-canvas/lib/f2';

/* 
  @param {Array}  charts  图表数组
  @param {Array}  data  数据数组
    [{
      time:''
      value:''
    }]
*/
export default function pieChart(data){
  return (canvas, width, height) =>{
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    
    chart.source(data, {
      percent: {
        formatter: function formatter(val) {
          return val * 100 + '%';
        }
      }
    });
    chart.animate(false);
    chart.legend({
      position: 'bottom',
      align:'center',
      itemFormatter: function itemFormatter(val) {
        return val ;
      }
    });
    chart.tooltip(false);
    chart.coord('polar', {
      transposed: true,
      radius: 0.85
    });
    chart.pieLabel({
      anchorOffset: 5, // 锚点的偏移量
      sidePadding: 0, // 文本距离画布左右两边的距离
      skipOverlapLabels: false,// 是否不展示重叠的文本
      label1(item, color) {
        return {
          text: item.name + item.percent*100+'%', // 文本内容
          fill: color // 文本颜色
        };
      }
    });
    chart.axis(false);
    chart.interval().position('a*percent').color('name', ['#5C89FF', '#FF6383']).adjust('stack').style({
      lineWidth: 1,
      stroke: '#fff',
      lineJoin: 'round',
      lineCap: 'round'
    }).animate({
      appear: {
        duration: 1200,
        easing: 'bounceOut'
      }
    });
    
    chart.render();
  };
}