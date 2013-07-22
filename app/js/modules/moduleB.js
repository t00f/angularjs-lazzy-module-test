'use strict';

/*global ngDefine*/

ngDefine('moduleB', [
    'angular'
],
    function () {

        // Create a MouseTestCtrl which will be our module controller
        angular.module('demoApp').controller('MouseTestCtrlB', ['$scope', function ($scope) {
            console.log("MouseTestCtrlB");
            $scope.name = "MouseTestCtrl B";
        }]);
    });
