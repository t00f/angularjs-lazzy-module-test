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
                var context = '<div id="content"><h1 id="title">{{title}}</h1><ul id="list"><li ng-repeat="mouse in mouses"  ng-click="doSomething(mouse)">{{mouse.id}} - {{mouse.name}}</li></ul><p id="comment">Base comment</p></div>',
                    module_tpl = '<div><ul id="list"><li>HEY HEY</li>##CONTENT##</ul><p id="comment"><b>Module additionnel</b><br />##CONTENT##<br />Voici le texte du module</p><h5>NON VISIBLE</h5></div>',
                    domContext = $('<div/>').append(context);

                //var html = $.parseHTML(current.locals.$template);
                $('<div/>').append(module_tpl).find("[id]").each(function() {
                    // Cas simple, pas de ##CONTENT##
                    var baseElements = domContext.find("[id='"+$(this).attr("id")+"']"),
                        moduleHtml = $(this).html(),
                        index = -1;

                    /*console.log("===========");
                    console.log("BASE HTML : " + baseElements.html());
                    console.log("MODULE HTML : " + moduleHtml);
                    */

                    if (baseElements.length > 0) {
                        index = moduleHtml.indexOf("##CONTENT##");

                        if (index > 0) {
                            moduleHtml = moduleHtml.replace("##CONTENT##", baseElements.html());
                            baseElements.html(moduleHtml);
                        }
                        else {
                            baseElements.append($(this).html());
                        }
                    }
                });

                context = domContext.html()

                // Uncomment this line to change rendered template
                //current.locals.$template = context;
            });
        });
    });