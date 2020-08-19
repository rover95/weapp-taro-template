// dist/components/line.js
import lineChart from '../../utils/chart/lineChart';
import { pieChart, homePanelChart } from '../../utils/chart/pieChart';
import { barChart } from '../../utils/chart/barChart';
import chartMap from "../../utils/chart";

// eslint-disable-next-line
Component({
  properties: {
    simpleChart: Boolean,
    chartData: {
      type: Array,
      observer: function (val) {
        this.setData({
          opts: [],
        });
        const opts = val.map((item, idx) => {
          const onInit = chartMap[item.config.chartType] && chartMap[item.config.chartType](item)
          return {
            key: `c${item.key || idx}`,
            config: item.config,
            onInit,
          };
        });

        this.setData({
          opts
        });
      },
    },
  },
  /**
   * 页面的初始数据
   */
  data: {
    opts: [],
  },
  attached: function () {},
  methods: {},
});