import { Template } from 'meteor/templating';
import { TAPi18n } from 'meteor/tap:i18n';
import { Session } from 'meteor/session';
import { Gembas } from 'meteor/igoandsee:gembas-collection';
import { Locations } from 'meteor/igoandsee:locations-collection';

import generator from './chartsGenerator.js'
import moment from 'moment';
import Highcharts from 'highcharts/highstock';

require('highcharts/modules/exporting')(Highcharts);

import './report.html';

Template.report.created = function() {

  $.fn.form.settings.rules.validDate = function(value) {
    let startDate = $('#filtro-reports').form('get value','startDate');
    let finishDate = $('#filtro-reports').form('get value','finishDate');
    return (moment(startDate) < moment(finishDate));
  };

  this.showNoData = new ReactiveVar();
  this.showNoData.set(false);

  this.showChart = new ReactiveVar();
  this.showChart.set(false);
}

Template.report.rendered = function() {

  $('#loadingReport').hide();
  $('.dropdown').dropdown();
  $('.ui.checkbox').checkbox();
  $('.timepickers').datetimepicker();

  const type = Router.current().params.type;
  let keysToValidate = getKeysByType(type);

  const fields = pickFieldsToValidate(keysToValidate);
  console.log('Fields => ', fields);

  $('#filtro-reports').form({
    inline : true,
    on     : 'blur',
    fields : fields
   });

};

Template.report.helpers({

  getTitle() {
    const type = Router.current().params.type;
    switch (type) {
      case '1':
        return TAPi18n.__('report_title_3');
      case '2':
        return TAPi18n.__('report_title_4');
      case '3':
        return TAPi18n.__('report_title_6');
      case '4':
        return TAPi18n.__('on_time_completion');
      case '5':
        return TAPi18n.__('compliance_by_gembas');
      case '6':
        return TAPi18n.__('report_on-time_completion');
    };
  },

  getIconClass() {
    const type = Router.current().params.type;
    if(type <= 4 ) {
      return 'fa-line-chart'
    }
    return 'fa-bar-chart';
  },

  showComponent(name) {
    const type = Router.current().params.type;
    let componentsAllowed = getKeysByType(type);
    return componentsAllowed.includes(name);
  },

  showTextNoData(){
    return Template.instance().showNoData.get();
  },

  showChartContainer(){
    return Template.instance().showChart.get();
  },

  showCheck() {
    return false;
  },

  getGembaWalks() {
    return Gembas.find();
  },

  getLocations() {
    return Locations.find();
  },

  getCategories() {
    return [];
  }

});


Template.report.events({

  'click #btnGenerate'(e, template) {
    e.preventDefault();
    if ( !$('#filtro-reports').form('is valid') ) {
      return;
    }

    const type = Router.current().params.type;
    let keys = getKeysByType(type);
    const data = {};

    keys.forEach(key => {
      let rule = `[name="${key}"]`;
      console.log('Rule ', rule);
      let value = $(rule).val();
      if (key == 'startDate' || key == 'finishDate') {
        value = (new Date(value)).getTime();
      }
      data[key] = value;
    });

    console.log('Data => ', data);
    $('#loadingReport').show();

    Meteor.call('getDataChartByType', type, data, function(error, result) {
      $('#loadingReport').hide();

      if (error) {
        console.log('Error => ', error);
        Session.set('ERROR_MESSAGE', TAPi18n.__('error_generating_report'));
        $('#modalError').modal('show');
      }

      let options = generator.getDataFromChartType(type, result);
      template.showChart.set(true);

      //Wait to render chart
      setTimeout(() => {
        Highcharts.chart('chartContainer', options);
      }, 200);

    });

  }

});

function getKeysByType(type) {
  type = Number(type);
  switch (type) {
    case 1: //Compliance trend by Gemba Walk
      return ['startDate', 'finishDate', 'gembaWalks'];
    case 2: //Compliance trend by Location
      return ['startDate', 'finishDate', 'locations'];
    case 3: //On time completion trend by leader
      return ['startDate', 'finishDate'];
    case 4: //On-time completion trend by Gemba Walk
      return ['startDate', 'finishDate', 'gembaWalks'];
    case 5: //Compliance by Gemba Walks (Bar)
      return ['startDate', 'finishDate', 'gembaWalks'];
    case 6: //On-time completion by leader
      return ['startDate', 'finishDate'];
    default:
      return [];
  }
}

function pickFieldsToValidate(keys) {

  const allFields = {

    categories: {
      identifier  : 'categories',
      rules: [
          {
            type   : 'empty',
            prompt : TAPi18n.__('categories')
          }
      ]
    },

    startDate: {
      identifier : 'startDate',
      rules: [
          {
            type : 'empty',
            prompt: TAPi18n.__('from_date')
          }
      ]
    },

    finishDate: {
      identifier : "finishDate",
      rules: [
          {
            type : 'empty',
            prompt: TAPi18n.__('until_date')
          },
          {
            type: "validDate",
            prompt : TAPi18n.__('valid_date')
        }
      ]
    },

    gembaWalks : {
      identifier  : 'gembaWalks',
      rules: [
          {
            type   : 'empty',
            prompt : TAPi18n.__('gemba_walk')
          }
      ]
    },

    status : {
      identifier  : 'status',
      rules: [
          {
            type   : 'empty',
            prompt : TAPi18n.__('status')
          }
      ]
    },

    locations : {
      identifier  : 'check',
      rules: [
          {
            type   : 'empty',
            prompt : TAPi18n.__('locations')
          }
      ]
    }
  };

  return Object.keys(allFields)
         .filter((key) => keys.includes(key))
         .reduce((newObj, key) => Object.assign(newObj, { [key]: allFields[key] }), {});
}
