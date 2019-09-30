// dist/components/line.js
import lineChart from '../../utils/chart/line';

// eslint-disable-next-line
Component({
  properties: {
    chartData: {
      type: Array,
      observer: function (val) {
        this.setData({
          opts: []
        });
        this.setData({
          opts: [
            {
              key: '1c',
              onInit: lineChart(val)
            },
            {
              key: '2c',
              onInit: lineChart(val.map(i=>{
                let it = Object.assign({},i);
                it.value = it.value+100*Math.random();
                return it;
              }))
            }
          ]
        });
      }
    },
    
  },
  /**
   * 页面的初始数据
   */
  data: {
    opts: [
      
    ]
  },

  attached: function () { 
    
  },
});