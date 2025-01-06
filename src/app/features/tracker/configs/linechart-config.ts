import { color, Options } from 'highcharts';

export const lineChartConfig = (data?: any): Options => ({
  time: {
    useUTC: false, // Prevent UTC conversion
  } as Highcharts.TimeOptions,

  chart: {
    type: 'line',
    spacing: [20, 20, 20, 20],
    marginTop: 50,
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
    text: 'Fixed PnL',
    style: {
      color: 'white',
    },
  },

  tooltip: {
    xDateFormat: '%e %b %Y %H:%M:%S',
    pointFormat: '<b>{point.y:.2f}$</b>',
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
    enabled: false,
  },

  xAxis: {
    type: 'datetime',
    dateTimeLabelFormats: {
      day: '%e %b %Y %H:%M',
      hour: '%e %b %Y %H:%M',
      minute: '%e %b %Y %H:%M',
    },
    labels: {
      format: '{value:%e %b %H:%M}',
      style: {
        color: 'grey',
      },
    },
  },

  yAxis: {
    title: {
      text: null,
    },
    labels: {
      style: {
        color: 'grey',
      },
    },
    gridLineColor: 'grey',
  },

  series: [
    {
      type: 'line',
      color: '#5b09b0',
      name: 'Fixed PnL',
      data: data,
    },
  ],
});

export const defaultLinechartConfig: Options = {
  chart: {
    type: 'line',
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

  yAxis: {
    title: {
      text: null,
    }
  },

  legend: {
    enabled: false,
  },

  series: [
    {
      type: 'line',
      data: [],
    },
  ],
};
