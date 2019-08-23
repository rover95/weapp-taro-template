import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtActionSheetItem } from "taro-ui";

import { add } from '../../actions/counter';

@connect((state) => ({
  state
}))

class Discern extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false
    };
  }
  config={
    navigationBarTitleText: '工具'
  }
  render() {
    return (
      <View>
        <Button onClick={(e)=>{
          console.log(e,this.props);
          this.setState({
            isOpen: true
          });
        }}
        >hi</Button>
        <AtActionSheet isOpened={this.state.isOpen} cancelText='取消'>
          <AtActionSheetItem onClick={()=>{
            this.props.dispatch(add());
          }}
          >
            counter 加一
        </AtActionSheetItem>
          <AtActionSheetItem>
            按钮二
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}

export default Discern;