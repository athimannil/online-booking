angular.module('myApp', ['ui.router','ui.bootstrap', 'mwl.calendar', 'angularMoment'])
.config(function($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /state1

	// Now set up the states
	$stateProvider
		.state('/', {
			url: "/",
			templateUrl: "home.html",
            controller: 'homeCtrl',
		})
		.state('time', {
			url: "/time",
			templateUrl: "time.html",
            controller: 'timeCtrl',
		})
		.state('register', {
			url: "/register",
			templateUrl: "register.html",
			controller: 'registerCtrl',
		})
		.state('booked', {
			url: "/booked",
			templateUrl: "booked.html",
			controller: 'bookedCtrl',
		})
		;
	$urlRouterProvider.otherwise("/");
  //   .state('state1.list', {
  //     url: "/list",
  //     templateUrl: "partials/state1.list.html",
  //     controller: function($scope) {
  //       $scope.items = ["A", "List", "Of", "Items"];
  //     }
  //   })
  //   .state('state2', {
  //     url: "/state2",
  //     templateUrl: "partials/state2.html"
  //   })
  //   .state('state2.list', {
  //     url: "/list",
  //     templateUrl: "partials/state2.list.html",
  //     controller: function($scope) {
  //       $scope.things = ["A", "Set", "Of", "Things"];
  //     }
  //   });
})
.controller('mainCtrl', ['$scope', function($scope){
	console.log("hello mate");
}])
.controller('homeCtrl', ['$scope', 'moment', '$state', 'bookme', 'bookingService', function($scope, moment, $state, bookme, bookingService){
	$scope.calendarView = 'month';
	$scope.viewDate = new Date();
	$scope.events = [{}];
	$scope.bookingDates = [{}];

	// Click on event in slide
	$scope.bookingClicked = function(theBooking){
		console.clear();
		console.log("This is your booking you clicked");
		console.log(theBooking);
	};
	// Click on calendar date
	$scope.dateClicked = function(theBooking){
		// console.clear();
		// console.log(theBooking);
		// console.log(theBooking.date);
		// console.log(moment(theBooking.date).format());
		// console.log(moment(theBooking.date).toDate());
		// console.log("hello mate");
		// console.log(theBooking.events);
		// console.log(theBooking.events.length);
		// $state.go("time");

		// console.log(bookme.addDate({'appointmentDate': moment(theBooking.date).format()}));
		// console.log(bookme.addDate(moment(theBooking.date).format()));
		bookme.addDate(moment(theBooking.date).utc().format());
		$state.go("register");
	};

	// custom texts
	/*calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';
	$scope.$on('$destroy', function($scope) {
		calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
	});*/


	activate();
    function activate() {
        return getBooking().then(function() {
            for (var i = 0; i < $scope.bookingDates.length; i++) {
                // alert(result.d[i].employeename);
              //   console.log($scope.bookingDates[i].day);
                $scope.bookingDates[i].startsAt = new Date($scope.bookingDates[i].day);
            }

            console.log($scope.bookingDates);
            // document.write(JSON.stringify(json));
            $scope.events = $scope.bookingDates;
        });
        function getBooking() {
            return bookingService.getBooking()
                .then(function(data) {
                    $scope.bookingDates = data['current_schedules'];
                    // console.log($scope.bookingDates);
                    return $scope.bookingDates;
                });
        }
    }
}])
.controller('timeCtrl', function ($scope, moment, $state) {
	$scope.availableBookings = [
		{
			timeFrom: moment(9, 'hours').toDate(),
			timeTill: moment(9, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(10, 'hours').toDate(),
			timeTill: moment(10, 'hours').toDate(),
			booked: true
		},{
			timeFrom: moment(11, 'hours').toDate(),
			timeTill: moment(11, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(12, 'hours').toDate(),
			timeTill: moment(12, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(13, 'hours').toDate(),
			timeTill: moment(13, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(14, 'hours').toDate(),
			timeTill: moment(14, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(15, 'hours').toDate(),
			timeTill: moment(15, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(16, 'hours').toDate(),
			timeTill: moment(16, 'hours').toDate(),
			booked: false
		},{
			timeFrom: moment(17, 'hours').toDate(),
			timeTill: moment(17, 'hours').toDate(),
			booked: false
		}
	];

	$scope.chooseTime = function (theTime) {
		if (theTime.booked) {
			// statement
			console.log('Time is already booked');
		} else {
			// statement
			console.log('got to register page');
			$state.go("register");
		}
	};
})
.controller('registerCtrl', function ($scope, moment, $state, bookme) {
	console.log('👇');
	console.log(bookme.getRegistration());
	// $scope.bookedDate = bookme.getRegistration();
	// if (!$scope.bookedDate.appointmentDate) {
		// $state.go("/");
	// }
	// console.log(moment('12-12-2020', 'DD-MM-YYYY').isValid());
	$scope.registerMe = function (argument) {
		// merge dob to one string
		$scope.register.dob = moment(new Date($scope.register.db.day + ' ' + $scope.register.db.month + ' ' + $scope.register.db.year)).utc().format();
		// console.log($scope.register.dob);
		// console.log('👉 ' + $scope.register.dob);

		// delete $scope.register.db;
		// console.log($scope.register);

		bookme.addRegistration($scope.register);
		// console.log(bookme.yourName);
		$state.go("booked");

	};})
.controller('bookedCtrl', ['$scope','moment', '$state', 'bookme', function($scope, moment, $state, bookme){
	$scope.callService = function(argument) {
		// body...
		// $scope.me = bookme.getRegistration;
		// console.log(bookme.getRegistration);
		// console.log($scope.me);
		$scope.registerLog = bookme.getRegistration();
		console.log($scope.register);
	};
}])
.service('bookme', function(){
	var theUser = {};
	return{
		addDate: function (argument) {
			theUser.appointmentDate = argument;
			return theUser;
		},
		addRegistration: function (argument) {
			theUser.name = argument.name;
			theUser.mobile = argument.mobile;
			theUser.email = argument.email;
			theUser.city = argument.city;
			theUser.dob = argument.dob;
			console.log(argument);
			return theUser;
		},
		getRegistration: function () {
			return theUser;
		}
	};
});

angular
	.module('myApp')
	.factory('bookingService', bookingService);

// bookingService.$inject = ['$http', 'logger'];
bookingService.$inject = ['$http'];

// function bookingService($http, logger) {
function bookingService($http) {
	return {
		getBooking: getBooking,
		updateBooking: updateBooking
	};

	function getBooking() {
		return $http.get('http://booking.startcode.in/admin/current-schedule/1')
			.then(getBookingComplete)
			.catch(getBookingFailed);

		function getBookingComplete(response) {
			return response.data;
			// return response;
		}

		function getBookingFailed(error) {
			// logger.error('XHR Failed for getBooking.' + error.data);
		}
	}

	function updateBooking(theData) {
		return $http.post('http://booking.startcode.in/appointment', theData)
			.then(updateBookingComplete)
			.catch(updateBookingFailed);

		function updateBookingComplete(response) {
			// return response.data;
			// return response;
			console.log(response);
		}

		function updateBookingFailed(error) {
			// logger.error('XHR Failed for updateBooking.' + error.data);
		}
	}

}
