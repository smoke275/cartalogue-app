
var cartalogue= angular.module('cartalogue', ['ngMaterial','ngRoute','ngResource']);
cartalogue.config(function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');

})
.config(function($mdThemingProvider) {

    $mdThemingProvider.theme('cartalogue-light', 'default');
  $mdThemingProvider.theme('default')
   .primaryPalette('cyan')
    .accentPalette('blue')
    .warnPalette('orange');
    
});