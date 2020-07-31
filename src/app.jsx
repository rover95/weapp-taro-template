import '@tarojs/async-await';
import Taro, { Component } from '@tarojs/taro';
import { Provider } from '@tarojs/redux';
import 'taro-ui/dist/style/index.scss';

import { setAuth } from './actions/auth';
import print_log from './utils/print_log_co_info';
import appUpdate from './utils/appUpdate';
import Index from './pages/index';

import configStore from './store';


import './app.scss';

print_log();
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

const store = configStore();

class App extends Component {

  config = {
    pages: [
      'pages/auth/login/login',
      'pages/index',
      'pages/demo/demo',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }
  componentWillMount() {
    appUpdate();//检查是否有更新
    const userInfo = Taro.getStorageSync('userInfo');
    if (!!userInfo) {
      this.props.dispatch(setAuth(userInfo));
    };
  }
  componentDidMount () {
    
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
}

Taro.render(<App />, document.getElementById('app'));
