import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getSiteList } from "../../actions/site";
import { getSiteUrl } from "../../services/api";

import { add, minus, asyncAdd } from '../../actions/counter';

import './demo.scss';

@connect((state) => (state), (dispatch) => ({
  add() {
    dispatch(add());
  },
  dec() {
    dispatch(minus());
  },
  asyncAdd() {
    dispatch(asyncAdd());
  },
}))

class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }
  componentWillReceiveProps (nextProps) {}
  componentWillMount(){
    
    this.props.dispatch(getSiteList(getSiteUrl(132,'C')));

  }
  componentDidMount() {}
  componentWillUnmount () {}
  componentDidShow () {}
  componentDidHide () {}
  render() {
    return (
      <View className='index'>
        <Button className='add_btn' onClick={this.props.add}>+</Button>
        <Button className='dec_btn' onClick={this.props.dec}>-</Button>
        <Button className='dec_btn' onClick={this.props.asyncAdd}>async</Button>
        <View className='counter'><Text>{this.props.counter.num}</Text></View>
      </View>
    );
  }
}

export default Demo;