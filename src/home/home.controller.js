'use strict';

var SiorpcClient = require('siorpc-client').SioRpcClient;

export default class HomeController {
  static get $inject() {
    return ['$scope'];
  }

  constructor($scope) {
    this.$scope = $scope;

    this.departure = null;
    this.arrival = null;

    var siorpcClient = new SiorpcClient('http://cfr-calatori.tk:18080');

    siorpcClient.call('ro.jshacks.getStations', 0, 10000).then((res) => {
      this.stations = res;
    }, (err) => {
      console.log('err', err);
    });

    this.fuckShitUp = function(start, end) {
      siorpcClient.call('ro.jshacks.shortestPath', start, end).then((res) => {
        console.log('res', res);
      }, (err) => {
        console.log('err', err);
      });
    }
  }

  submit() {
    console.log('departure', this.departure);
    console.log('arrival', this.arrival);
  }
}
