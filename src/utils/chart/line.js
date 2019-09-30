import F2 from '../../static/f2-canvas/lib/f2';

/* 
  @param {Array}  charts  图表数组
  @param {Array}  data  数据数组
    [{
      time:''
      value:''
    }]
*/
export default function lineChart(data){
  return (canvas, width, height) => {
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
    chart.source(data, {
      time: {
        type: 'timeCat',
        range: [0, 1],
        tickCount: 3
      },
      value: {
        tickCount: 5,
      }
    });

    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: false,
      onShow: function onShow(ev) {
        let items = ev.items;
        items[0].name = items[0].title;
        items[0].value = items[0].value;
      }
    });
    chart.axis('time', {
      label: function label(text, index, total) {
        let textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });

    chart.line().position('time*value');
    chart.render();
    return chart;
  };
}
