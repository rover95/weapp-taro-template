//雷达图啦
import complateF2 from "./complateF2";
const F2 = complateF2()

export function radarChart(canvas, width, height, data) {
    // data = [{
    //     item: 'CODMn',
    //     value: 6.5
    // }, {
    //     item: 'DO',
    //     value: 9.5
    // }, {
    //     item: 'NH4',
    //     value: 9
    // }, {
    //     item: 'TOC',
    //     value: 6
    // }, {
    //     item: 'PH',
    //     value: 6
    // }];

    let chart = new F2.Chart({
        el: canvas,
        width,
        height,
        padding: [40, 10, 10, 10]
    });

    chart.source(data, {
        value: {
            min: 0,
            max: 10
        }
    });
    chart.coord('polar');
    chart.tooltip({
        offsetY: -20,
        onChange(obj){
            obj.items[0].name = obj.items[0].title
        }
    });
    chart.axis('value', {
        grid: {
            lineDash: null
        },
        label: null,
        line: null
    });
    chart.legend('type', {
        position: 'bottom',
        align: 'center',
    });

    chart.area().position('item*value').color('#43CAF9').style({
        fillOpacity: 0.2
    }).animate({
        appear: {
            animation: 'groupWaveIn'
        }
    });
    chart.line().position('item*value').color('#43CAF9').size(1).animate({
        appear: {
            animation: 'groupWaveIn'
        }
    });
    chart.point().position('item*value').color('#43CAF9').animate({
        appear: {
            delay: 300
        }
    });
    chart.render();
    return chart;
}