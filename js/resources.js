/*global cartalogue */
var API_ROOT = '/cartalogue-app/dummyapi/';
cartalogue.factory('Item', ['$resource',
  function($resource){
    return $resource(API_ROOT+'item', {id:'@id'},
      {
        'update': {method:'post'},
      });
  }]);
cartalogue.factory('Store', ['$resource',
  function($resource){
    return $resource(API_ROOT+'store:id.json', {id:'@id'},
      {
        'update': {method:'post'},
      });
  }]);