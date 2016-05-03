/*global cartalogue*/
cartalogue.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/seller',{
			templateUrl: 'seller.html',
			controller: 'SellerController'
		}).
		when('/item/list',{
			templateUrl: 'item-list.html',
			controller: 'ItemListController'
		}).
		when('/item/add',{
			templateUrl: 'item-update.html',
			controller: 'ItemAddController'
		}).
		when('/item/:id',{
			templateUrl: 'item-update.html',
			controller: 'ItemUpdateController'
		}).
		when('/itemrequest/list',{
			templateUrl: 'request-list.html',
			controller: 'ItemRequestListController'
		}).
		when('/itemrequest/:id?',{
			templateUrl: 'request.html',
			controller: 'ItemRequestController'
		}).
		
		
		
		
		
		when('/directions/:lat/:lng',{
			templateUrl: 'directions.html',
			controller: 'DirectionsController'
		}).
		when('/store/:id',{
			templateUrl: 'store.html',
			controller: 'StoreController'
		}).
		when('/search/result',{
			templateUrl: 'result.html',
			controller: 'SearchResultController'
		}).
		when('/search/item',{
			templateUrl: 'search.html',
			controller: 'SearchItemController'
		}).
		when('/register',{
			templateUrl: 'register.html',
			controller: 'RegisterController'
		}).
		when('/login',{
			templateUrl: 'login.html',
			controller: 'LoginController'
		}).
		when('/logout',{
			templateUrl: 'login.html',
			controller: 'LogoutController'
		}).
		when('/home',{
			templateUrl: 'home.html',
			controller: 'HomeController'
		}).
		otherwise({
			redirectTo: '/home'
		});
	}
]);