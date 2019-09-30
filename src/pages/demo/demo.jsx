import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getSiteList } from '../../actions/site';
import { getSiteUrl } from '../../services/api';
import lineChart from '../../utils/chart/line';
import pieChart from '../../utils/chart/pie';
import { add, minus, asyncAdd } from '../../actions/counter';
import LineChart from '../../components/lineChart/lineChart';

import './demo.scss';

const data = [{
    date: '2017-06-05',
    value: 116
  }, {
    date: '2017-06-06',
    value: 129
  }, {
    date: '2017-06-07',
    value: 135
  }, {
    date: '2017-06-08',
    value: 86
  }, {
    date: '2017-06-09',
    value: 73
  }, {
    date: '2017-06-10',
    value: 85
  }, {
    date: '2017-06-11',
    value: 73
  }, {
    date: '2017-06-12',
    value: 68
  }, {
    date: '2017-06-13',
    value: 92
  }, {
    date: '2017-06-14',
    value: 130
  }, {
    date: '2017-06-15',
    value: 245
  }, {
    date: '2017-06-16',
    value: 139
  }, {
    date: '2017-06-17',
    value: 115
  }, {
    date: '2017-06-18',
    value: 111
  }, {
    date: '2017-06-19',
    value: 309
  }, {
    date: '2017-06-20',
    value: 206
  }, {
    date: '2017-06-21',
    value: 137
  }, {
    date: '2017-06-22',
    value: 128
  }, {
    date: '2017-06-23',
    value: 85
  }, {
    date: '2017-06-24',
    value: 94
  }, {
    date: '2017-06-25',
    value: 71
  }, {
    date: '2017-06-26',
    value: 106
  }, {
    date: '2017-06-27',
    value: 84
  }, {
    date: '2017-06-28',
    value: 93
  }, {
    date: '2017-06-29',
    value: 85
  }, {
    date: '2017-06-30',
    value: 73
  }, {
    date: '2017-07-01',
    value: 83
  }, {
    date: '2017-07-02',
    value: 125
  }, {
    date: '2017-07-03',
    value: 107
  }, {
    date: '2017-07-04',
    value: 82
  }, {
    date: '2017-07-05',
    value: 44
  }, {
    date: '2017-07-06',
    value: 72
  }, {
    date: '2017-07-07',
    value: 106
  }, {
    date: '2017-07-08',
    value: 107
  }, {
    date: '2017-07-09',
    value: 66
  }, {
    date: '2017-07-10',
    value: 91
  }, {
    date: '2017-07-11',
    value: 92
  }, {
    date: '2017-07-12',
    value: 113
  }, {
    date: '2017-07-13',
    value: 107
  }, {
    date: '2017-07-14',
    value: 131
  }, {
    date: '2017-07-15',
    value: 111
  }, {
    date: '2017-07-16',
    value: 64
  }, {
    date: '2017-07-17',
    value: 69
  }, {
    date: '2017-07-18',
    value: 88
  }, {
    date: '2017-07-19',
    value: 77
  }, {
    date: '2017-07-20',
    value: 83
  }, {
    date: '2017-07-21',
    value: 111
  }, {
    date: '2017-07-22',
    value: 57
  }, {
    date: '2017-07-23',
    value: 55
  }, {
    date: '2017-07-24',
    value: 60
  }
];
@connect((state) => state, (dispatch) => ({
  onDec() {
    dispatch(minus());
  },
  onAsyncAdd() {
    dispatch(asyncAdd());
  },
}))

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      chartData: data.map(val => { val.time = val.date; return val; })
    };
  }
  componentWillMount(){
    this.props.dispatch(getSiteList(getSiteUrl(132,'C')));
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) { }
  componentWillUnmount () {}
  componentDidShow () {}
  componentDidHide () {}
  onAdd(){
    this.props.dispatch(add());
  }
  onChartUpdate(){
    this.setState({
      chartData: data.map(val => { val.time = val.date; val.value = 100 * Math.random(); return val; })
    });
  }
  config = {
    usingComponents: {
      'line-wx': '../../components/wx-lineChart/line'
    }
  }
  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={()=>{this.onAdd();}}>+</Button>
        <Button className='dec_btn' onClick={this.props.onDec}>-</Button>
        <Button className='dec_btn' onClick={this.props.onAsyncAdd}>async</Button>
        <View className='counter'><Text>{this.props.counter.num}</Text></View>
        <Button className='dec_btn' onClick={()=>{this.onChartUpdate();}}>刷新图表</Button>
        {/* {this.state.chartRenderArr.length>0
          ?<View style='width:100vw;height:300px;background-color:#999'>
            <ff-canvas canvas-id='asd' opts={this.state.opts}></ff-canvas>
            </View>
          :''
        } */}
        {/* <LineChart /> */}
        <line-wx chartData={this.state.chartData}></line-wx>
        {/* {this.state.chartRenderArr.length > 0 ? this.state.chartRenderArr.map((item,idx) => {
          
          return <View key={idx + 'c'} style='width:100vw;height:300px;background-color:#999'>
            <LineChart cid={idx + 'c'} opts={this.state.opts} />
          </View>; 
        })
        :''} */}
        
        
      </View>
    );
  }
}

export default Demo;