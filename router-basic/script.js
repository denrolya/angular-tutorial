(function() {
  'use strict';
  
  angular
    .module('app', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/page-one');
        $stateProvider
          .state('page-one', {
            url: '/page-one',
            templateUrl: 'page1.html',
            controller: PageOneController,
            controllerAs: 'vm'
          })
          .state('page-two', {
            url: '/page-two',
            templateUrl: 'page2.html',
            controller: ['$scope', function($scope) {
              $scope.pageNumber = 2;
            }]
          });

    });
    
    function PageOneController() {
      this.pageNumberString = 'one';
    }
})();