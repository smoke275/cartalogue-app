/*global cartalogue */
var API_ROOT = 'https://cartalogue-shinjanxp.c9users.io/api/';
cartalogue.service('FileUpload', ['Upload','$mdToast',
  function (Upload,$mdToast) {
    this.save = function (file, uploading) {
    //   var index = uploading.length; 
    //   uploading[index]={};
    //   uploading[index].title = file.name;
    // $mdToast.show({
	   //   controller: 'ToastCtrl',
	   //   templateUrl: 'templates/modals/progress-toast.html',
	   //   position: 'bottom right',
	   //   hideDelay:86400000,
	   //   locals:{uploading:uploading}
	   // });
      return Upload.upload({
          url: API_ROOT+'file',
          method: "POST",
          file: file,
      })
      // .progress(function (evt) {
      //     var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      //     uploading[index].progress = progressPercentage;
      // });
    };
}]);
cartalogue.factory('Item', ['$resource',
  function($resource){
    return $resource(API_ROOT+'item/:id', {id:'@id'},
      {
        'update': {method:'post'},
        'attach': {method:'patch'},
      });
  }]);
cartalogue.factory('Tag', ['$resource',
  function($resource){
    return $resource(API_ROOT+'tag/:id', {id:'@id'});
  }]);
cartalogue.factory('ItemRequest', ['$resource',
  function($resource){
    return $resource(API_ROOT+'itemrequest/:id', {id:'@id'});
  }]);
cartalogue.factory('Store', ['$resource',
  function($resource){
    return $resource(API_ROOT+'store/:id', {id:'@id'},
      {
        'update': {method:'post'},
      });
  }]);
cartalogue.factory('User', ['$resource',
  function($resource){
    return $resource(API_ROOT+'auth/:do', {do:'@do'});
  }]);