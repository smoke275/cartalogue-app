cartalogue.controller("MasterController",function($scope, $timeout, $mdSidenav, $log,$location,Item){
        $scope.master={};
    $scope.toggleMenu = buildDelayedToggler('left');
    $scope.closeMenu = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("closed menu");
        });
    };
    $scope.menu=[
        {name:"Home",active:false,icon:"home"},
        {name:"Account",active:false,icon:"account_box"},
        ];
    $scope.navigate=function(item){
        for(i in $scope.menu){
            $scope.menu[i].active=false;
        }
        item.active=true;
    }
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      };
    }
    $scope.master.navigateTo = function(route){
        $location.path(route);
    };
    $scope.master.itemQuerySearch = function(searchText){
        if($location.path!=='/search/item')
            $scope.master.navigateTo('/search/item');
        return Item.query({searchText:searchText}); 
    };
    $scope.master.selectedItemChange=function(item){
        
    };
});
cartalogue.controller('HomeController', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.master.searchItemClass="fab-input-bottom";
    $scope.master.onSearchItemFocus = function(){
        $scope.master.navigateTo('/search/item');
    };
    var map;
    var blue_dot = 'https://www.google.com/support/enterprise/static/geo/cdate/art/dots/blue_dot.png';
    var currentLocation = new google.maps.Marker({
    map: map,
    icon: blue_dot
    });
    var infoWindow;
    $scope.goToCurrentLocation = function(){
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            currentLocation.setPosition(pos);
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('found.');
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    }
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 16
        });
        currentLocation.setMap(map);
        infoWindow = new google.maps.InfoWindow({map: map});
        $scope.goToCurrentLocation();
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }
    initMap();
    
  });
cartalogue.controller('SearchItemController', function ($scope,Item,Store) {
    $scope.master.searchItemClass="";
    $scope.stores=Store.query(function(){
        console.log($scope.stores);
    });
});
cartalogue.controller('SearchResultController',function($scope,Item,Store){
    
});