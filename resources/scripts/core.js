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
		.state('book', {
			url: "/book",
			templateUrl: "book.html",
			controller: 'bookCtrl',
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
.controller('homeCtrl', ['$scope','moment', '$state', function($scope, moment, $state){
	$scope.bookingPerDay = 5;
	var mySchedule = this;
	$scope.isCellOpen = true; // not working yet
	$scope.calendarView = 'month';
	$scope.calendarDate = new Date();
	$scope.bookings = [
		{
			title: 'Hello mate',
			type: 'info',
			// startsAt: new Date(moment().locale("en").add(18, 'd').format("MMM DD, YYYY HH:MM")),
			startsAt: moment().toDate(),
			// startsAt: moment('2012-12-12', "YYYY-MM-DD").toDate(),
			// startsAt: new Date(2016,1,3, 1),
			// endsAt: new Date(moment().locale("en").add(18, 'd').format("MMM DD, YYYY HH:MM")),
			endsAt: moment().toDate(),
			// endsAt: moment('2012-12-12', "YYYY-MM-DD").toDate(),
			// endsAt: new Date(2016,1,3, 1),

			editable: true,
			deletable: false,
			draggable: false,
			resizable: false,
			incrementsBadgeTotal: true,
			cssClass: 'a-css-class-name'
		},{
			title: 'Today is todate()',
			type: 'info',
			startsAt: moment().add(1, 'hours').toDate(),
			endsAt: moment().add(1, 'hours').toDate(),
			editable: true,
			deletable: false,
			draggable: true,
			resizable: true,
			incrementsBadgeTotal: true,
			cssClass: 'a-css-class-name'
		},{
			title: 'Today is saturday',
			type: 'info',
			startsAt: moment().add(2, 'hours').toDate(),
			endsAt: moment().add(2, 'hours').toDate(),
			editable: true,
			deletable: false,
			draggable: true,
			resizable: true,
			incrementsBadgeTotal: true,
			cssClass: 'a-css-class-name'
		},{
			title: 'Today is saturday',
			type: 'info',
			startsAt: moment().add(3, 'hours').toDate(),
			endsAt: moment().add(3, 'hours').toDate(),
			editable: true,
			deletable: false,
			draggable: true,
			resizable: true,
			incrementsBadgeTotal: true,
			cssClass: 'a-css-class-name'
		}
	];


	// Click on event in slide
	$scope.bookingClicked = function(theBooking){
		console.clear();
		console.log("This is your booking you clicked");
		console.log(theBooking);
	};
	// Click on calendar date
	$scope.dateClicked = function(theBooking){
		console.clear();
		console.log(theBooking);
		console.log(theBooking.date);
		console.log(moment(theBooking.date).toDate());
		console.log("hello mate");
		console.log(theBooking.events);
		console.log(theBooking.events.length);
		// $state.go("time");
		$state.go("book");
	};

	// custom texts
	/*calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';
	$scope.$on('$destroy', function($scope) {
		calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
	});*/
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
			$state.go("book");
		}
	};
})
.controller('bookCtrl', function ($scope, moment, $state) {

});
