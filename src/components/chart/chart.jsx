import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';

// import './index.scss';

@connect((state)=>(state),(dispatch)=>({}))
class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }
  componentDidMount() {
    
  }
  config = {
    usingComponents: {
      'chart-wx': '/components/wx-chart/chart',
    }
  }
  render() {
    return (
      <View>
        <chart-wx chartData={this.props.chartData} simpleChart={this.props.simpleChart}></chart-wx>
      </View>
    );
  }
}

export default Chart;