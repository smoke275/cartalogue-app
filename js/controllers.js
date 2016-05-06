/*global cartalogue*/
function onSuccessToast($mdToast,message){
    message = message || "Success";
    $mdToast.show(
      $mdToast.simple()
        .content(message)
        .position('bottom right')
        .hideDelay(2000)
    );
}
function onErrorToast($mdToast,message){
    message = message || "Error";
    $mdToast.show(
      $mdToast.simple()
        .content(message)
        .position('bottom right')
        .hideDelay(2000)
    );
}

cartalogue.controller("MasterController",function($scope, $timeout, $mdSidenav, $log,$location,Item,Store,User,Tag){
        $scope.master={};
    $scope.toggleMenu = buildDelayedToggler('left');
    $scope.master.account_mode = localStorage.getItem('account_mode') || 'customer';
    $scope.master.toggle_account_mode = function(){
      if($scope.master.account_mode=='seller')
        localStorage.setItem('account_mode',"customer");
      else
        localStorage.setItem('account_mode',"seller");
      
      $scope.master.account_mode = localStorage.getItem('account_mode');
      $scope.initMenu();
    }
    
    $scope.master.logged_in = function(){
      if(localStorage.getItem('satellizer_token')==null)
        return false;
      else
        return true;
    }
    
    $scope.master.logout = function(){
      localStorage.removeItem('satellizer_token');
      window.plugins.toast.showShortBottom('Logout Successful');  
      $scope.master.navigateTo('/')
    }
    $scope.closeMenu = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("closed menu");
        });
    };
    $scope.initMenu = function(){
          if($scope.master.account_mode=='customer'){
          $scope.menu=[
              {name:"Home",active:false,icon:"home",route:"/"},
              {name:"Request",active:false,icon:"add_shopping_cart",route:"/itemrequest"},
              ];
        }
        else if($scope.master.account_mode=='seller'){
          $scope.menu=[
              {name:"Home",active:false,icon:"home",route:"/"},
              {name:"Seller",active:false,icon:"shop",route:"/seller"},
              {name:"Inventory",active:false,icon:"shopping_basket",route:"/item/list"},
              {name:"Request List",active:false,icon:"dns",route:"/itemrequest/list"},
              ];
        }
        //check login status then push Login or Logout button
        if($scope.master.logged_in())
          $scope.menu.push({name:"Logout",active:false,icon:"account_box",route:"/logout"})
        else
          $scope.menu.push({name:"Login",active:false,icon:"account_box",route:"/login"})
    }
    $scope.initMenu();
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
        $scope.closeMenu()
        $location.path(route);
    };
    $scope.master.triggerCall = function(number){
        document.location.href = 'tel:' + number
    }
    $scope.master.itemQuerySearch = function(searchText){
        if($location.path!=='/search/item')
            $scope.master.navigateTo('/search/item');
        return Item.query({searchText:searchText}); 
    };
    $scope.master.tagQuerySearch = function(searchText){
        var tags= Tag.query({searchText:searchText},function(){
          console.log(tags);
        }); 
        return tags;
    };
    $scope.master.selectedItemChange=function(item){
        $scope.master.stores=Store.query({item:item.id},function(){
            $scope.master.navigateTo('/search/result')
        })
    };
    
    $scope.master.login_required = function(){
        User.get({"do":"verify"},function(){
          console.log("Logged in");
        },function(){
          $scope.master.navigateTo('/login');
        })
    }
});
cartalogue.controller('HomeController', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.master.searchItemClass="fab-input-bottom";
    $scope.master.onSearchItemFocus = function(){
        $scope.master.navigateTo('/search/item');
    };
    var map;
    var blue_dot = 'https://www.google.com/support/enterprise/static/geo/cdate/art/dots/blue_dot.png';
    var currentLocationMarker = new google.maps.Marker({
    map: map,
    icon: blue_dot
    });
    var infoWindow;
    $scope.goToCurrentLocation = function(){
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.master.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            currentLocationMarker.setPosition($scope.master.currentLocation);
            // infoWindow.setPosition($scope.master.currentLocation);
            // infoWindow.setContent('found.');
            map.setCenter($scope.master.currentLocation);
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
        setTimeout(function(){
          google.maps.event.trigger(map, 'resize');
          $scope.goToCurrentLocation();
        },500);
        currentLocationMarker.setMap(map);
        
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }
    initMap();
    
  });
cartalogue.controller('RegisterController',function($scope,$http,$auth,$mdToast,User){
  $scope.master.searchItemClass='hide';
  
  $scope.register = function(){
    localStorage.setItem('account_mode',$scope.user.type);
    $auth.signup($scope.user)
    .then(function(response) {
      // Redirect user here to login page or perhaps some other intermediate page
      // that requires email address verification before any other part of the site
      // can be accessed.
      $scope.master.navigateTo('/login')
    })
    .catch(function(response) {
      // Handle errors here.
    });
   
  }
});
cartalogue.controller('LoginController',function($scope,$window,$http,$location,$auth,User,DeviceToken){
  $scope.master.searchItemClass='hide';
    $scope.login=function(){
      $auth.login($scope.user)
    .then(function(response) {
      // Redirect user here after a successful log in.
      window.plugins.toast.showShortBottom('Login Successful')
      DeviceToken.save({'device_token':localStorage.getItem('device_token')},function(){
      })
      $scope.master.navigateTo('/')
    })
    .catch(function(response) {
      // Handle errors here, such as displaying a notification
      // for invalid email and/or password.
      window.plugins.toast.showShortBottom(JSON.stringify(response));
    });
    }
});

cartalogue.controller('LogoutController',function($scope){
  $scope.master.searchItemClass='hide';
  $scope.master.logout();
});

// Customer controllers
cartalogue.controller('SearchItemController', function ($scope,Item,Store) {
    $scope.master.searchItemClass="";
    $scope.stores=Store.query(function(){
        console.log($scope.stores);
    });
});
cartalogue.controller('SearchResultController',function($scope,Item,Store){
    document.activeElement.blur();
    $scope.open_state=50;
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: $scope.master.currentLocation,
          zoom: 12
        });
        setTimeout(function(){
          google.maps.event.trigger(map, 'resize'); 
          setMarkers();
        },500)
        // currentLocationMarker.setMap(map);
    }
    function setMarkers(){
      var centre={
        lat:0.0,lng:0.0
      }
        for(var i=0;i<$scope.master.stores.length;i++){
            new google.maps.Marker({
                position: $scope.master.stores[i].location,
                map: map,
                title: $scope.master.stores[i].name
              });
            
            centre.lat+= $scope.master.stores[i].location.lat;
            centre.lng+= $scope.master.stores[i].location.lng;
        }
        centre.lat = centre.lat/$scope.master.stores.length;
        centre.lng = centre.lng/$scope.master.stores.length;
        navigator.geolocation.getCurrentPosition(function(position) {
            $scope.master.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            // currentLocationMarker.setPosition(pos);
            // infoWindow.setPosition(pos);
            // infoWindow.setContent('found.');
            map.setCenter(centre);
            map.setZoom(12)
          });
    }
    initMap();

});
cartalogue.controller('StoreController',function($scope,$routeParams,Store){
    $scope.store = Store.get({id:$routeParams.id},function(){
        console.log($scope.store);
    })
    $scope.master.searchItemClass="hide";
    
})
cartalogue.controller('DirectionsController',function($scope,$routeParams){
    $scope.master.searchItemClass="hide";

    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;

    function initialize() {
    navigator.geolocation.getCurrentPosition(function(position) {
        $scope.master.currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        directionsDisplay = new google.maps.DirectionsRenderer();
        var mapOptions = {
            zoom:12,
            center: $scope.master.currentLocation
        }
        map = new google.maps.Map(document.getElementById("map"), mapOptions);
        directionsDisplay.setMap(map);
        calcRoute();

      });
        
    }
    
    function calcRoute() {
        
        var start = $scope.master.currentLocation;
        var end = {lat:Number($routeParams.lat),lng:Number($routeParams.lng)}
        var request = {
        origin:start,
        destination:end,
        travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(result);
            }
        });
    }
    initialize();
});



// Seller controllers
cartalogue.controller('SellerController',function($scope,$routeParams,Store,FileUpload){
  $scope.master.login_required();
  $scope.master.searchItemClass='hide';
  $scope.master.store = Store.get({'id':'my'});
  
  $scope.update = function(){
    $scope.master.store.location={
      "lat":map.getCenter().lat(),
      "lng":map.getCenter().lng()
    }
    if(angular.isArray($scope.master.store.image_url) && $scope.master.store.image_url[0] instanceof File){
        FileUpload.save($scope.master.store.image_url[0]).then(
            function(data){
               	$scope.master.store.image_url = data.data;
                $scope.master.store.$save(function(){console.log("success")}); 
            },function(){console.log("Error")});
    }
    else{ 
        $scope.master.store.$save(function(){console.log('Success')},function(){console.log("error")}); 
    }
    // Store.update({id:$scope.master.store.id},$scope.master.store,function(response){
    //   console.log(response)
    // });
  }
  var map;
    var blue_dot = 'https://www.google.com/support/enterprise/static/geo/cdate/art/dots/blue_dot.png';
    var currentLocationMarker = new google.maps.Marker({
    map: map,
    icon: blue_dot
    });
    var infoWindow;
    $scope.goToCurrentLocation = function(){
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            $scope.master.currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            currentLocationMarker.setPosition($scope.master.currentLocation);
            // infoWindow.setPosition($scope.master.currentLocation);
            // infoWindow.setContent('found.');
            map.setCenter($scope.master.currentLocation);
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
        setTimeout(function(){
          google.maps.event.trigger(map, 'resize');
          currentLocationMarker.setMap(map);
          $scope.goToCurrentLocation();
        },500)
        
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {   
      infoWindow = new google.maps.InfoWindow({map: map});
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
    }
    initMap();
});
cartalogue.controller('ItemListController',function($scope,$routeParams,Store,Item){
  $scope.master.login_required();
  $scope.master.store = Store.get({'id':'my'},function(){
      $scope.items = Item.query({'store':$scope.master.store.id})
  });
  $scope.master.searchItemClass='hide';
  $scope.delete =function(item){
    Item.delete(item,function(){
       $scope.items = Item.query({'store':$scope.master.store.id})
    })
  }

  // console.log($scope.items)
})
cartalogue.controller('ItemUpdateController',function($scope,$routeParams,Store,Item,Tag,FileUpload){
  $scope.master.login_required()
  $scope.master.searchItemClass='hide';

  $scope.item = Item.get({id:$routeParams.id});
  $scope.update = function(){
    
    for (i in $scope.item.tags){
      $scope.item.tags[i] = $scope.item.tags[i].id;
    }
    if(angular.isArray($scope.item.image_url) && $scope.item.image_url[0] instanceof File){
        FileUpload.save($scope.item.image_url[0]).then(
            function(data){
              console.log(data);
                $scope.item.image_url = data.data;
                Item.save($scope.item,function(){console.log("success")
                  $scope.master.navigateTo('/item/list')
                }); 
            },function(){console.log("Error")});
    }
    else{ 
        Item.save($scope.item,function(){console.log('Success')
          $scope.master.navigateTo('/item/list')
        },function(){console.log("error")}); 
    }
  }
})
cartalogue.controller('ItemAddController',function($scope,$routeParams,Store,Item,FileUpload){
  $scope.master.login_required();
  $scope.master.searchItemClass='hide';
  $scope.item={};
  if(!angular.isArray($scope.item.tags))
  $scope.item.tags=[];
  $scope.update = function(){
    console.log("New item adding")
    for (i in $scope.item.tags){
      $scope.item.tags[i] = $scope.item.tags[i].id;
    }
    if(angular.isArray($scope.item.image_url) && $scope.item.image_url[0] instanceof File){
        FileUpload.save($scope.item.image_url[0]).then(
            function(data){
                $scope.item.image_url = data.data;
                Item.save($scope.item,function(){console.log("success")
                  $scope.master.navigateTo('/item/list')
                }); 
            },function(){console.log("Error")});
    }
    else{ 
        Item.save($scope.item,function(){console.log('Success')
          $scope.master.navigateTo('/item/list')
        },function(){console.log("error")}); 
    }
  }
})
cartalogue.controller('ItemRequestController',function($scope,$routeParams,Store,ItemRequest,Tag){
  $scope.master.login_required();
  $scope.master.searchItemClass='hide';
  $scope.item = {};
  $scope.item.tags=[];
  $scope.request = function(){
    console.log("New item request")
    for (i in $scope.item.tags){
      $scope.item.tags[i] = $scope.item.tags[i].id;
    }
     
        ItemRequest.save($scope.item,function(){console.log('Success')
          window.plugins.toast.showShortBottom('Item request Successful');
          $scope.master.navigateTo('/')
        },function(response){console.log("error :")}); 
    
  }
})

cartalogue.controller('ItemRequestListController',function($scope,$routeParams,ItemRequest){
    $scope.master.login_required();
  $scope.master.searchItemClass='hide';
  $scope.itemrequests = ItemRequest.query({"mode":"seller"});
});