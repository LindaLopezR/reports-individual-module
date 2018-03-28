import { TAPi18n } from 'meteor/tap:i18n';

export default {

  getDataFromChartType(type, data) {
    type = Number(type);
    console.log(`Getting data from type ${type}`);
    switch (type) {
      case 1:
        return getComplianceTrenByGembaWalk(data);
      case 2:
        return getComplianceTrenByLocation(data);
      case 3:
        return getComplianceTrenByLeader(data);
      case 4:
        return getOnTimeComplianceTrenByGembaWalk(data);
      case 5:
        return getComplianceByGembaWalk(data);
      case 6:
        return getComplianceByLeader(data);
      default:
        return {};
    }

  }

};

function getComplianceTrenByGembaWalk(data) {
  return {
    chart: {
      type: 'spline'
    },
    title: {
      text: TAPi18n.__('compliance_trend_gemba_walk')
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: TAPi18n.__('date_card')
      }
    },
    yAxis: {
      title: {
        text: TAPi18n.__('compliance_percentage')
      },
      min: 0,
      max:100
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    rangeSelector : {
      allButtonsEnabled : false,
      inputEnabled:false,
      enabled: false
    },
    series: data.series
  };

}

function getComplianceTrenByLocation(data) {
  return {
    chart: {
      type: 'spline'
    },
    title: {
      text: TAPi18n.__('compliance_trend_locations')
    },
    subtitle: {
      text: TAPi18n.__('hover')
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: TAPi18n.__('date_complete')
      }
    },
    yAxis: {
      title: {
        text: TAPi18n.__('compliance_average')
      },
      min: 0,
      max:100
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: '<b>{point.x:%e. %b}</b>: '+TAPi18n.__("average_score")+' <b>{point.y:2f}%</b> '
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: data.series
  };

}

function getComplianceTrenByLeader(data) {
  return {
    chart: {
      type: 'spline'
    },
    title: {
      text: TAPi18n.__('compliance_trend_by_leader')
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: TAPi18n.__('date_card')
      }
    },
    yAxis: {
      title: {
        text: TAPi18n.__('compliance_average')
      },
      min: 0,
      max:100
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: `{point.x:%e. %b}: ${TAPi18n.__('average_score')} {point.y:2f}%`
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: data.series
  };
}

function getOnTimeComplianceTrenByGembaWalk(data) {
  return {
    chart: {
      type: 'spline'
    },
    title: {
      text: TAPi18n.__('on_time_compliance')
    },
    xAxis: {
      type: 'datetime',
      dateTimeLabelFormats: {
        month: '%e. %b',
        year: '%b'
      },
      title: {
        text: TAPi18n.__('date_card')
      }
    },
    yAxis: {
      title: {
        text: TAPi18n.__('time_excecution')
      },
      min: 0,
      max:100
    },
    tooltip: {
      headerFormat: '<b>{series.name}</b><br>',
      pointFormat: `{point.x:%e. %b}:{point.y:.2f}% ${TAPi18n.__('time_excecution')}`
    },
    plotOptions: {
      spline: {
        marker: {
          enabled: true
        }
      }
    },
    series: data.series
  };

}

function getComplianceByGembaWalk(data) {
  return {
     chart: {
       type: 'column',
       zoomType: 'x',
     },
     title: {
       text: TAPi18n.__('compliance_by_gembas')
     },
     subtitle: {
       text: TAPi18n.__('select_to_zoom')
     },
     xAxis: {
       type: 'category',
       labels: {
         rotation: -45,
         style: {
           fontSize: '13px',
           fontFamily: 'Verdana, sans-serif'
         }
       }
     },
     yAxis: {
       min: 0,
       max:100,
       title: {
         text: TAPi18n.__('compliance_average')
       }
     },
     legend: {
       enabled: false
     },
     tooltip: {
       pointFormat: 'Score Average: <b>{point.y:2f}%</b>'
     },
     dataLabels: {
       enabled: true,
       rotation: -90,
       color: '#FFFFFF',
       align: 'right',
       format: '{point.y:2f}%', // one decimal
       y: 10, // 10 pixels down from the top
       style: {
         fontSize: '13px',
         fontFamily: 'Verdana, sans-serif'
       }
     },
     series: data.series
   };
}

function getComplianceByLeader(data) {
  return {
     chart: {
       type: 'column',
       zoomType: 'x',
     },
     title: {
       text: TAPi18n.__('standar_work_leader')
     },
     subtitle: {
       text: TAPi18n.__('select_to_zoom')
     },
     xAxis: {
       type: 'category',
       labels: {
         rotation: -45,
         style: {
           fontSize: '13px',
           fontFamily: 'Verdana, sans-serif'
         }
       }
     },
     yAxis: {
       min: 0,
       max:100,
       title: {
         text: TAPi18n.__('compliance_average')
       }
     },
     legend: {
       enabled: false
     },
     tooltip: {
       pointFormat: `${TAPi18n.__('compliance_average')} <b>{point.y:2f}%</b>`
     },
     dataLabels: {
       enabled: true,
       rotation: -90,
       color: '#FFFFFF',
       align: 'right',
       format: '{point.y:2f}%', // one decimal
       y: 10, // 10 pixels down from the top
       style: {
         fontSize: '13px',
         fontFamily: 'Verdana, sans-serif'
       }
     },
     series: data.series
   };
}
