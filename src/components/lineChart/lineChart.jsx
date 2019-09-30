import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import F2 from '../../static/f2-canvas/lib/f2';


const map = {
  '芳华': '40%',
  '妖猫传': '20%',
  '机器之血': '18%',
  '心理罪': '15%',
  '寻梦环游记': '5%',
  '其他': '2%'
};
const data = [{
  name: '芳华',
  percent: 0.4,
  a: '1'
}, {
  name: '妖猫传',
  percent: 0.2,
  a: '1'
}, {
  name: '机器之血',
  percent: 0.18,
  a: '1'
}, {
  name: '心理罪',
  percent: 0.15,
  a: '1'
}, {
  name: '寻梦环游记',
  percent: 0.05,
  a: '1'
}, {
  name: '其他',
  percent: 0.02,
  a: '1'
}
];
let chart = null;
function pieChart(canvas, width, height) {
  chart = new F2.Chart({
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
  chart.legend({
    position: 'right',
    itemFormatter: function itemFormatter(val) {
      return val + '  ' + map[val];
    }
  });
  chart.tooltip(false);
  chart.coord('polar', {
    transposed: true,
    radius: 0.85
  });
  chart.axis(false);
  chart.interval().position('a*percent').color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0']).adjust('stack').style({
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


class LineChart extends Component {
  
  constructor(props) {
    super(props);
    this.state = { 
      opt0: {
        onInit: pieChart
      },
      opt2: {
        onInit: pieChart
      },
      opts: [
        {
          opt: {
            onInit: pieChart
          }
        },
        {
          opt: {
            onInit: pieChart
          }
        }
      ]
    };
    
  }
  
  componentWillMount(){}
  componentDidMount() {}
  componentWillReceiveProps (nextProps) {}
  componentWillUnmount () {}
  componentDidShow () {}
  componentDidHide () {}
  config = {
    usingComponents: {
      'ff-canvas': '../../static/f2-canvas/f2-canvas'
    }
  }
  render() {
    return <View>
      <View  style='width:100vw;height:300px;background-color:#999'>
        <ff-canvas canvas-id='1p' opts={this.state.opts[0].opt}></ff-canvas>
      </View>
      {this.state.opts.map((val,idx)=>{
        return <View key={idx} style='width:100vw;height:300px;background-color:#999'>
          <ff-canvas canvas-id={idx + 'p'} opts={val.opt}></ff-canvas>
        </View>;
      })}
    </View>; 
  }
}

export default LineChart;