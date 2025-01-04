import { Options } from 'highcharts';
import { TransformedAllocationItem } from '../interfaces/allocation-data.interface';

export const pieChartConfig = (data: TransformedAllocationItem[]): Options => ({
  chart: {
    type: 'pie',
    spacing: [20, 20, 20, 20],
    plotShadow: false,
    backgroundColor: '#1d1d1d',
    borderRadius: 15,
    style: {
      fontFamily: 'Questrial',
    },
  },

  credits: {
    enabled: false,
  },

  plotOptions: {
    pie: {
      size: '70%',
      allowPointSelect: true,
      cursor: 'pointer',
      innerSize: '99%',
      borderWidth: 10,
      borderColor: '',
      slicedOffset: 10,
      dataLabels: {
        enabled: true,
        format: '{point.percentage:.1f}%',
        distance: 10,
      },
    },
  },

  title: {
    verticalAlign: 'top',
    floating: true,
    text: 'Allocation',
    style: {
      color: 'white',
    },
  },

  tooltip: {
    pointFormat: '{series.name} <b>{point.percentage:.1f}%</b>',
    backgroundColor: 'black',
    style: {
      color: 'lightgrey',
    },
  },

  accessibility: {
    point: {
      valueSuffix: '%',
    },
  },

  legend: {
    enabled: true,
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    itemStyle: {
      fontSize: '12px',
      color: 'white',
    },
    itemHoverStyle: {
      color: 'lightgrey',
    },
    symbolHeight: 10,
    symbolWidth: 10,
    symbolRadius: 5,
  },

  colors: ['#5b09b0', '#9040e6', '#393e46', '#00adb5', '#506ef9', '#8bb4d1'],

  series: [
    {
      name: '',
      type: 'pie',
      data: data,
      showInLegend: true,
    },
  ],
});

export const defaultChartConfig: Options = {
  chart: {
    type: 'pie',
    spacing: [20, 20, 20, 20],
    plotShadow: false,
    backgroundColor: '#1d1d1d',
    borderRadius: 15,
    style: {
      fontFamily: 'Questrial',
    },
  },

  credits: {
    enabled: false,
  },

  title: {
    verticalAlign: 'top',
    floating: true,
    text: 'Loading...',
    style: {
      color: 'white',
    },
  },

  plotOptions: {
    pie: {
      size: '70%',
    },
  },

  series: [
    {
      type: 'pie',
      data: [],
    },
  ],
};
