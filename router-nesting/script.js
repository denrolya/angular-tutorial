(function() {
  'use strict';
  
  angular
    .module('app', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/home');

        $stateProvider
          .state('app', {
            templateUrl: 'layout.html'
          })
          .state('app.home', {
            url: '/home',
            templateUrl: 'home.html',
            controller: HomeController,
            controllerAs: 'vm'
          })
          .state('app.form', {
            url: '/form',
            templateUrl: 'form.html',
            controller: FormController,
            controllerAs: 'vm'
          })
          .state('app.drinks', {
            url: '/drinks',
            views: {
                '': {
                  templateUrl: 'drinks.html'
                },
                'wine@app.drinks': {
                  template: '<h3>Wines:</h3><ul><li>Chardonnay</li><li>Sauvignon</li></ul>'
                },
                'beer@app.drinks': { 
                    templateUrl: 'beer.html',
                    controller: BeerController,
                    controllerAs: 'vm'
                }
            }
          });

    });
    
    function HomeController() {
      var vm = this;
    }

    function FormController() {
      var vm = this;

      vm.master = {};

      vm.update = function(user) {
        vm.master = angular.copy(vm.user);
      };

      vm.reset = function() {
        vm.user = angular.copy(vm.master);
      };

      vm.reset();
    }

    function BeerController() {
      var vm = this;

      vm.beers = [{
        name: 'Heineken'
      }, {
        name: 'Beks'
      }, {
        name: 'Leffe'
      }];
    }
})();