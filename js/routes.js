// institute routes
cartalogue.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
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
		when('/home',{
			templateUrl: 'home.html',
			controller: 'HomeController'
		}).
		otherwise({
			redirectTo: '/home'
		});
	}
]);