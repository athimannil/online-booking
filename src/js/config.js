.config(function($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /state1

	// Now set up the states
	$stateProvider
		.state('calander', {
			url: "/",
			templateUrl: "home.html",
            controller: 'homeCtrl',
		})
		.state('register', {
			url: "/{registerDay}",
			templateUrl: "register.html",
			controller: 'registerCtrl',
		})

		.state('time', {
			url: "/time",
			templateUrl: "time.html",
            controller: 'timeCtrl',
		})
		.state('booked', {
			url: "/booked",
			templateUrl: "booked.html",
			controller: 'bookedCtrl',
		})
		;
	$urlRouterProvider.otherwise("/");
})
