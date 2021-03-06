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
          opts: val.map((item,idx)=>{
            return {
              key: `c${idx}`,
              info: item.info,
              onInit: lineChart(item, this.onChartClick.bind(this))
            };
          })
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
  methods: {
    onChartClick: function(e){
      this.triggerEvent('chartool', e);
    }
  }
});