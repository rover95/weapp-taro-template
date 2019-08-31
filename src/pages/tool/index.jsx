import Taro, { Component } from '@tarojs/taro';
import { View, Button, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtActionSheet, AtActionSheetItem } from "taro-ui";

import { imgGeneral } from '../../actions/ai';
import { getAccessToken } from "../../actions/auth";

import './tool.scss';

@connect((state) => ({
  state
}))

class Discern extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false,
      wordsArr:[],
      imgBase64String:null
    };
  }
  config={
    navigationBarTitleText: '识图'
  }
  upLoadImg(type){
    this.choseImg(type).then(tempFilePath => {
      return this.imgBase64(tempFilePath)
    }).then(res => {
      console.log(res);
      this.setState({
        wordsArr: [],
        imgBase64String: res.data,
        isOpen: false
      })
    })
  }
  choseImg(type){
    return new Promise((resolve, reject)=>{
      Taro.chooseImage({
        count: 1,
        sourceType: [type],
        sizeType: ['compressed'],
        success: res => {
          console.log(res);
          const tempFilePath = res.tempFilePaths[0];
          resolve(tempFilePath)
        }
      })
    })
    
  }
  imgBase64(tempFilePath){
    return new Promise((resolve, reject)=>{
      wx.getFileSystemManager().readFile({
        filePath: tempFilePath, //选择图片返回的相对路径
        encoding: 'base64', //编码格式
        success: res => { //成功的回调
          resolve(res)
        }
      })
    })
    
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
        {this.state.imgBase64String ? <Button onClick={(e) => {
          Taro.showLoading();
          this.props.dispatch(imgGeneral({
            image: this.state.imgBase64String
          })).then(res=>{
            console.log(res);
            Taro.hideLoading();
            this.setState({
              wordsArr: res.data.words_result
            })
          })
        }}>上传</Button>:null}
        
        {this.state.wordsArr.map((val,idx)=>{
          return <View className="row" key={idx}>{val.words}</View>
        })}
        <AtActionSheet isOpened={this.state.isOpen} cancelText='取消'>
          <AtActionSheetItem onClick={()=>{
            this.upLoadImg('album')
          }}
          >
            相册
        </AtActionSheetItem>
          <AtActionSheetItem onClick={()=>{
            this.upLoadImg('camera')
          }}>
            拍照
          </AtActionSheetItem>
        </AtActionSheet>
      </View>
    );
  }
}

export default Discern;