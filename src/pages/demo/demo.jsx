import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { getSiteList } from "../../actions/site";

import { add, minus, asyncAdd } from '../../actions/counter';

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
    this.props.dispatch(getSiteList('/projects/132/sites/structs/factors/stations?portal=C')).then(res=>{
      console.log(this.props);
    })

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
        <View><Text>{this.props.counter.num}</Text></View>
        <View><Text>Hello, World</Text></View>
      </View>
    );
  }
}

export default Demo;