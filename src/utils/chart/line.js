import F2 from '../../static/f2-canvas/lib/f2';

/* 
  @param {Array}  charts  图表数组
  @param {Array}  data  数据数组
    [{
      x:''
      y:''
    }]
*/
export default function lineChart(item,cb){
  const data = item.data;
  return (canvas, width, height) => {
    const chart = new F2.Chart({
      el: canvas,
      width,
      height
    });
   
    chart.source(data, {
      x: {
        // type: 'cat',
        range: [0, 1],
        tickCount: item.type == 'strain'? 5: 3,
        formatter: (val)=>{
          if (item.type == 'strain'){
            return val +'m';
          }else{
            return val.slice(5, 16);
          }
        }
      },
      y: {
        tickCount: 5,
      }
    });
    chart.animate(false);
    chart.tooltip({
      showCrosshairs: true,
      showItemMarker: true,
      showTooltipMarker: false,
      onShow: function onShow(ev) {
        if(cb){
          cb(ev);
        }
        let items = ev.items;
        items[0].name = items[0].origin.x;
        items[0].y = items[0].y + item.info.unit;
      }
    });
    chart.axis('x', {
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

    chart.line().position('x*y');
    chart.render();
    return chart;
  };
}
