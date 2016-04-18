// institute routes
cartalogue.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/search/result',{
			templateUrl: 'listing.html',
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