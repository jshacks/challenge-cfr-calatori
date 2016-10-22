'use strict';

class neo4jApi {
  static get $inject() {
    return ['$scope'];
  }

  constructor($scope) {
    this.$scope = $scope;
  }
}

export default angular.module('services.neo4j', [])
  .service(neo4jApi, 'neo4jApi');
