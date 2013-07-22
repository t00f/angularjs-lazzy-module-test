'use strict';

/*global ngDefine*/

ngDefine('demoApp', [
    'angular',
    'jquery',
    'module:restangular',
    'module:demoApp.services:js/services',
    'module:base.controllers:js/controllers'
],
    function () {

        var demoApp = angular.module('demoApp');

        // Configuration of $routeProvider
        demoApp.config(['$routeProvider', function ($routeProvider) {
            // Keep an instance for lazzy loading (see controller.js)
            demoApp.routeProvider = $routeProvider;

            $routeProvider.when('/mouses', {templateUrl: 'partials/mouses-list.html', controller: 'MousesListCtrl'});
            $routeProvider.otherwise({redirectTo: '/mouses'});
        }]);

        // Defines Restangular configuration
        demoApp.config(function (RestangularProvider) {
            RestangularProvider.setBaseUrl('http://localhost\\:5000');
        });

        // Configuration $controllerProvider
        demoApp.config(function ($controllerProvider) {
            // Keep an instance so we can lazzy register controllers
            demoApp.controller = $controllerProvider.register;
        });

        demoApp.run(function ($rootScope) {
            $rootScope.$on("$routeChangeStart", function (event, current, next) {
                console.log("$routeChangeStart");
            });

            $rootScope.$on("$routeChangeSuccess", function (event, current, next) {
                console.log("$routeChangeSuccess");

                // Define a new template
                // Ideally we could retrieve it from xhr using $http.get()
                var context = '<div><h1 id="title">{{title}}</h1><ul id="list"><li ng-repeat="mouse in mouses"  ng-click="doSomething(mouse)">{{mouse.id}} - {{mouse.name}}</li></ul></div>';

                /*
                THIS IS NOT FUNCTIONNAL FOR THE MOMENT, Be patient ;)
                var module_tpl = '<div><ul id="list"><li>HEY HEY</li></ul></div>';

                //var html = $.parseHTML(current.locals.$template);
                $('<div/>').append(module_tpl).find("[id]").each(function() {
                    console.log($('<div/>').append(context).find("[id='"+$(this).attr("id")+"']").append($(this).html()));

                    //console.log($(this).html());
                    //var content = $('<div/>').append(context).find("[id='"+$(this).attr("id")+"']").append($(this).html()).html();
                    //$(context).find("[id='"+$(this).attr("id")+"']").html(content);
                    //console.log(content);
                });
                console.log($('<div/>').html());
                */

                // Uncomment this line to change rendered template
                //current.locals.$template = context;
            });
        });
    });