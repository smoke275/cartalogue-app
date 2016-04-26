var API_ROOT = 'https://cartalogue-shinjanxp.c9users.io/api/'

var cartalogue= angular.module('cartalogue', ['ngMaterial','ngRoute','ngResource','satellizer','ngFileUpload']);
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
    
})
 .config(function($authProvider) {
   $authProvider.loginUrl = API_ROOT+'auth/login';
  $authProvider.signupUrl = API_ROOT+'auth/register';
})

.config(function ($provide, $httpProvider) {
  
  // Intercept http calls.
  $provide.factory('LoadingInterceptor', function ($q) {
    return {
      // On request success
      request: function (config) {
        // console.log(config); // Contains the data about the request before it is sent.
        $('#loading-overlay').removeClass('hide');
        // Return the config or wrap it in a promise if blank.
        return config || $q.when(config);
      },

      // On request failure
      requestError: function (rejection) {
        // console.log(rejection); // Contains the data about the error on the request.
        // Return the promise rejection.
        return $q.reject(rejection);
      },

      // On response success
      response: function (response) {
        // console.log(response); // Contains the data from the response.
        $('#loading-overlay').addClass('hide');
        // Return the response or promise.
        return response || $q.when(response);
      },

      // On response failture
      responseError: function (rejection) {
        // console.log(rejection); // Contains the data about the error.
        $('#loading-overlay').hide();
        // Return the promise rejection.
        return $q.reject(rejection);
      }
    };
  });

  // Add the interceptor to the $httpProvider.
  $httpProvider.interceptors.push('LoadingInterceptor');

});