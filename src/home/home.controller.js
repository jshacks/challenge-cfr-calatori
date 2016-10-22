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
      console.log('res', res);
      this.stations = res;
    }, (err) => {
      console.log('err', err);
    });
  }

  submit() {
    console.log('departure', this.departure);
    console.log('arrival', this.arrival);
  }
}
