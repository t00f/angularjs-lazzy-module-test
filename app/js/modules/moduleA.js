'use strict';
/*global ngDefine*/

ngDefine('moduleA', [
    'angular'
],
    function () {

        // Create a MouseTestCtrl which will be our module controller
        angular.module('demoApp').controller('MouseTestCtrlA', ['$scope', function ($scope) {
            console.log("MouseTestCtrlA");
            $scope.name = "MouseTestCtrlA";
        }]);
    });