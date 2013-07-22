'use strict';

/*global document*/

require.config({
    baseUrl: '.',
    paths: {
        'ngDefine' : 'lib/ngDefine',
        'jquery' : 'https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min',
        'angular' : 'lib/angular/angular',
        'angular-resource' : 'lib/angular/angular-resource',
        'underscore' : 'lib/underscore-min',
        'restangular' : 'lib/restangular'
    },
    shim: {
        'angular' : { deps: [ 'jquery' ], exports: 'angular' },
        'angular-resource': { deps: [ 'angular' ] },
        'underscore': { exports: '_' },
        'restangular': { deps: [ 'underscore' ], exports: 'restangular' }
    },
    packages: [
        { name: 'app', location: 'js', main: 'app.js' }
    ]
});

require(['ngDefine', 'jquery', 'angular', 'angular-resource' ], function (ngDefine) {

    // enable debug for test cases
    ngDefine.debug = true;

    require(['app'], function () {
        // bootstrap testapp
        angular.bootstrap(document.body, ['demoApp']);
    });
});