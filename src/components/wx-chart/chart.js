// dist/components/line.js
import lineChart from '../../utils/chart/line';
import pieRoseChart from '../../utils/chart/pieRose';
import pieChart from "../../utils/chart/pie";

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
            let onInit;
            switch (item.info.chartType) {
              case 'pieRoseChart':
                onInit = pieRoseChart(item.data);
                break;
              case 'pieStatisticChart':
                onInit = pieChart(item.data);
                break;
            
              default:
                onInit = pieRoseChart(item.data);
                break;
            }
            return {
              key: `c${idx}`,
              info: item.info,
              onInit
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
    
  }
});