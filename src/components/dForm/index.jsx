import Taro, { Component } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';


@connect((state)=>(state),(dispatch)=>({}))
class D_Form extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      
    };
  }
  componentDidMount() {}
  onFormChange(e) {
    this.props.onFormChange && this.props.onFormChange(e);
  }
  onFormSubmit(e){
    this.props.onFormSubmit && this.props.onFormSubmit(e);
  }
  config = {
    usingComponents: {
      'd-form': '/components/wx-dynamicForm/index',
    } 
  }
  render() {
    const { formData, toSubmit} = this.props;
    return (
      <View>
        <d-form formData={formData} showSubmitBtn={false} toSubmit={toSubmit} onDynamicFormSubmit={this.onFormSubmit.bind(this)} onDynamicFormChange={this.onFormChange.bind(this)}></d-form>
      </View>
    );
  }
}

export default D_Form;