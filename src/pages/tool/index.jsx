import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtActionSheetItem } from "taro-ui";

import { imgGeneral } from '../../actions/ai';
import { getAccessToken } from "../../actions/auth";

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
  componentDidMount() {
    
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
        >选择图片</Button>
        <Button onClick={(e)=>{
          this.props.dispatch(imgGeneral({ 
            url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567415909&di=2553e731bebd3e7a6ba1726035f3fa5d&imgtype=jpg&er=1&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201407%2F01%2F20140701120602_8JkuA.jpeg'
          }
          ))
        }}>选择图片</Button>
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