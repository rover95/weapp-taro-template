import complateF2 from './complateF2';

const F2 = complateF2();

export function barChart({ data, config={} }) {
  return (canvas, width, height) => {
    const type =  config.type ? config.type : null;
    const typeColor =  config.typeColor ? config.typeColor : 'type';
    const xAxis =  config.xAxis ? config.xAxis : 'kind';
    const yAxis =  config.yAxis ? config.yAxis : 'value';
    const flag =  config.flag ? config.flag : null;
    const padding =  config.padding ? config.padding : [25, 0, 20, 0];

    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
      // padding,
    });
    const dataCfg = {};
    if(config.tickCountX){
      dataCfg[xAxis] = {
        tickCount:config.tickCountX
      }
    }
    if(config.tickCountY){
      dataCfg[yAxis] = {
        tickCount:config.tickCountY
      }
    }
    chart.source(data,dataCfg);

    //柱状图90颠倒-> 甘特图
    if(config.transposed){
      chart.coord({
        transposed: true
      });
    }
    //甘特图
    if(type === 'gantt'){
      chart.tooltip({
        showItemMarker: false,
        onShow: function onShow(ev) {
          const items = ev.items;
          items[0].name = '时间';
          const value = items[0].origin[yAxis];
          items[0].value = value[0] + ' 至 ' + value[1];
        }
      });
    }
    
    
    if(config.colors){
      chart.interval().position(`${xAxis}*${yAxis}`).color(xAxis,config.colors)
    }else{
      chart.interval().position(`${xAxis}*${yAxis}`);
    }
    chart.render();
    return chart;
  };
}
export function groupBarChart({ data, config={} }) {
  // data = [{
  //     kind: '第一部',
  //     value: 38,
  //     typeColor: '2018年10月'
  // }, {
  //     kind: '第二部',
  //     value: 92,
  //     typeColor: '2018年10月'
  // }, {
  //     kind: '第一部',
  //     value: 18,
  //     typeColor: '2018年11月'
  // }, {
  //     kind: '第二部',
  //     value: 22,
  //     typeColor: '2018年11月'
  // }];
  return (canvas, width, height) => {
    const type =  config.type ? config.type : null;
    const typeColor =  config.typeColor ? config.typeColor : 'type';
    const xAxis =  config.xAxis ? config.xAxis : 'kind';
    const yAxis =  config.yAxis ? config.yAxis : 'value';
    const flag =  config.flag ? config.flag : null;
    const padding =  config.padding ? config.padding : [25, 0, 20, 0];

    const chart = new F2.Chart({
      el: canvas,
      width,
      height,
      padding: padding,
    });

    chart.source(data);

    let label = {};
    if (flag && flag == 'caseArea') {
      label = {
        rotate: Math.PI / 2,
        textAlign: 'start',
        textBaseline: 'middle',
      };
    }
    chart.axis(xAxis, {
      label,
    });
    chart.legend({
      offsetY: -15,
    });
    chart.tooltip({
      custom: true, // 自定义 tooltip 内容框
      onChange: function onChange(obj) {
        const legend = chart.get('legendController').legends.top[0];
        const tooltipItems = obj.items;
        const legendItems = legend.items;
        const map = [];
        for (const legendItem of legendItems) {
          legendItem.value = '0';
        }
        for (const legendItem of legendItems) {
          for (const tooltipItem of tooltipItems) {
            if (legendItem.name == tooltipItem.name) {
              legendItem.value = tooltipItem.value;
            }
          }
        }
        legend.setItems(legendItems);
      },
      onHide: function onHide() {
        const legend = chart.get('legendController').legends.top[0];
        legend.setItems(chart.getLegendItems().country);
      },
    });
    chart.interval().position(`${xAxis}*${yAxis}`).color(typeColor).adjust({
      type: 'dodge',
      marginRatio: 0.05, // 设置分组间柱子的间距
    });

    chart.render();
    return chart;
  };
}