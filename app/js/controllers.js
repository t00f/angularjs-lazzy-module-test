'use strict';

/* Controllers */
/*global ngDefine*/
/*global $*/
/*global $script*/

ngDefine('base.controllers', [
    'angular',
    'require'
],
    function () {

        var demoApp = angular.module('demoApp');

        // Creation of MouseListCtrl controller
        demoApp.controller('MousesListCtrl', ['$scope', 'ModuleLoader', function ($scope, ModuleLoader) {
            var idx = 0;

            // Call ModuleLoader to add feature to this controller
            ModuleLoader.initialize($scope);

            // Basic behaviour of this controller
            $scope.mouses = [];

            for (idx; idx < 10; idx++) {
                var mouse = {};
                mouse.id = idx;
                mouse.name = "Mouse #" + idx;
                mouse.sex = "F";
                $scope.mouses.push(mouse);
            }

        }]);


        // Creation of MouseActionController controller
        // which has to load modules from the server
        demoApp.controller('MouseActionController', ['$scope', 'ScriptLoader', 'Restangular', function ($scope, ScriptLoader, Restangular) {
            console.log("MouseActionController");
            $scope.modules = [];

            // Get modules from the server
            Restangular.all('modules').getList({"interested_in": "mouse-actions"}).then(function (result) {
                $scope.modules = result;

                // For each module retrieved, load depenancies and add routes
                $.each($scope.modules, function (index, module) {

                    ScriptLoader.load(module.dependencies).then(function () {
                        // Currently retrieve HTML template from the server
                        // Angular uses $http.get() method to retrieve template files; so we could retrieve it from somewhere else.
                        demoApp.routeProvider.when(module.action, {templateUrl: 'partials/mouse-test.html', controller: module.controller});
                    });

                });
            });
        }]);
    });