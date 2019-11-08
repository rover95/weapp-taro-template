import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';

import './noData.scss';
import img from '../../static/img/no-data.png';

class NoData extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }
  componentWillMount(){}
  componentDidMount() {}
  componentWillReceiveProps (nextProps) {}
  componentWillUnmount () {}
  componentDidShow () {}
  componentDidHide () {}
  externalClasses= ['out-class']
  render() {
    return (
      <View className='out-class'>
        <View className='box'>
          <Image className='img' src={img}></Image>
          <View className='text'>暂无数据</View>
        </View>
      </View>
    );
  }
}

export default NoData;