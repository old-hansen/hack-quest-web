import React from 'react';
import { v4 } from 'uuid';
import ReactEcharts from 'echarts-for-react';

const GrowthEchartline = () => {
  const option = {
    grid: {
      left: 60,
      right: 60,
      top: 60,
      bottom: 60
    },
    tooltip: {
      trigger: 'item', // 触发类型，可以是 'item' 或 'axis'
      backgroundColor: '#fff', // 背景颜色
      borderColor: '#fff', // 边框颜色
      textStyle: {
        color: '#3E3E3E', // 文字颜色
        fontSize: 10 // 字体大小
      },
      formatter: function (params: any) {
        var html = `<div style="text-align: center;">
                      <p>OpenCampus Page View</p>
                      <p>Friday, Aug 16, 2024</p>
                      <p style="font-size: 16px; font-weight: bold;line-height:26px;">${params.value}</p>
                    </div>`;
        // 自定义内容
        return html;
      }
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      },
      {
        data: [12, 11, 33, 44, 55, 147, 66],
        type: 'line'
      }
    ]
  };

  return <ReactEcharts option={option} />;
};

GrowthEchartline.displayName = 'GrowthEchartline';

const SourceEchartPie = () => {
  const option = {
    grid: {
      top: 0,
      bottom: 0
    },
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [10, point[1]]; // x 固定在 point[0]，y 跟随鼠标移动
      }
    },
    title: {
      text: '固定文字',
      left: 'center',
      top: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        labelLine: {
          show: true
        },
        data: [
          {
            value: 1048,
            name: 'Search Engine',
            itemStyle: {
              color: 'red'
            }
          },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };
  return <ReactEcharts option={option} style={{ height: '100%' }} />;
};

SourceEchartPie.displayName = 'SourceEchartPie';

const SourceEchartBar = () => {
  const option = {
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 20
    },
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [10, point[1]]; // x 固定在 point[0]，y 跟随鼠标移动
      }
    },
    xAxis: {
      type: 'category',
      show: false
    },
    yAxis: {
      type: 'value',
      show: false
    },
    series: [
      {
        data: [
          {
            value: 500,
            name: 'Search Engine',

            itemStyle: {
              color: 'red',
              borderRadius: 4
            }
          },
          {
            value: 1048,
            name: 'Search Engine',
            itemStyle: {
              color: 'blue',
              borderRadius: 4
            }
          }
        ],
        type: 'bar'
      }
    ]
  };
  return <ReactEcharts option={option} style={{ height: '100%' }} />;
};

SourceEchartBar.displayName = 'SourceEchartBar';

export { GrowthEchartline, SourceEchartPie, SourceEchartBar };
