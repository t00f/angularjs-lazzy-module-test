'use strict';

/*global ngDefine*/
/*global alert*/

/* Services */

ngDefine('demoApp.services', ['angular', 'require'], function () {

    /*
      ScriptLoader loads every module dependencies so we could add
      dynamic routes later. See controller.js
     */
    angular.module('demoApp.services').factory('ScriptLoader', ['$q', '$rootScope', function ($q, $rootScope) {
        return {
            load: function (dependencies) {
                var deferred = $q.defer();
                require(dependencies, function () {
                    $rootScope.$apply(function () {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            }
        };
    }]);

    /*
      ModuleLoader is in charge of adding new capacities to the controller scope.
      It should also be able to know which module is interested by a given controller
      See controller.js
    */
    angular.module('demoApp.services').service('ModuleLoader', [function () {
        return {
            initialize: function ($scope) {
                $scope.title = "Hi Christophe";
                $scope.doSomething = function (mouse) {
                    alert(mouse.name + " has been clicked !");
                };
            }
        };
    }]);

});