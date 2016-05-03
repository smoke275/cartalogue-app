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

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         this.bindEvents();
//     },
//     // Bind Event Listeners
//     //
//     // Bind any events that are required on startup. Common events are:
//     // 'load', 'deviceready', 'offline', and 'online'.
//     bindEvents: function() {
//         document.addEventListener('deviceready', this.onDeviceReady, false);
//     },
//     // deviceready Event Handler
//     //
//     // The scope of 'this' is the event. In order to call the 'receivedEvent'
//     // function, we must explicitly call 'app.receivedEvent(...);'
//     onDeviceReady: function() {
//         app.receivedEvent('deviceready');
//     window.plugins.toast.showShortTop('Device is ready');
//     var push = PushNotification.init({
//                 android: {
//                     senderID: "728564257874"
//                 },
//                 ios: {
//                 },
//                 windows: {}
//             });

//             push.on('registration', function(data) {
//                 // data.registrationId                            
//                 //window.plugins.toast.showLongTop(JSON.stringify(data));               
//             });

//             push.on('notification', function(data) {
//                 // data.message,
//                 // data.title,
//                 // data.count,
//                 // data.sound,
//                 // data.image,
//                 // data.additionalData                
//                 window.plugins.toast.showShortTop(data.message);
//                 function alertDismissed() {
//                         // do something
//                     }

// /*                    navigator.notification.alert(
//                         data.message,  // message
//                         alertDismissed,         // callback
//                         'Notification',            // title
//                         'Done'                  // buttonName
//                     );*/

//                     cordova.plugins.notification.local.schedule({
//                         title: Cartalogue,
//                         message: data.message,
//                         sound: "file://sounds/message.mp3",
//                         icon: "http://my.domain.de/avatar/user#id=123"
//                     });
//                 console.log(data);
//             });

//             push.on('error', function(e) {
//                 // e.message
//                 console.log(e);
//             });
//     },
//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//     }
// };

// app.initialize();
function notiHandler() {
        // app.receivedEvent('deviceready');
    // window.plugins.toast.showShortTop('Device is ready');
    var push = PushNotification.init({
                android: {
                    senderID: "728564257874"
                },
                ios: {
                },
                windows: {}
            });

            push.on('registration', function(data) {
                // data.registrationId                            
                //window.plugins.toast.showLongTop(JSON.stringify(data));   
                var device_token=data.registrationId; 
                console.log(device_token);
                localStorage.setItem('device_token',device_token);           
            });

            push.on('notification', function(data) {
                // data.message,
                // data.title,
                // data.count,
                // data.sound,
                // data.image,
                // data.additionalData                
                window.plugins.toast.showShortTop(data.message);
                function alertDismissed() {
                        // do something
                    }

/*                    navigator.notification.alert(
                        data.message,  // message
                        alertDismissed,         // callback
                        'Notification',            // title
                        'Done'                  // buttonName
                    );*/

                    cordova.plugins.notification.local.schedule({
                        title: Cartalogue,
                        message: data.message,
                        sound: "file://sounds/message.mp3",
                        icon: "http://my.domain.de/avatar/user#id=123"
                    });
                console.log(data);
            });

            push.on('error', function(e) {
                // e.message
                console.log(e);
            });
    }
document.addEventListener('deviceready', notiHandler, false);