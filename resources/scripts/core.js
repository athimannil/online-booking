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
	$scope.isPastMonth = function  (thisMonth) {
		return moment(thisMonth).isAfter(moment(), 'month');
	};
	// Monday week start
	moment.locale('en', {
	  week : {
	    dow : 1 // Monday is the first day of the week
	  }
	});
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
		$state.go("register");
	};

	// custom texts
	/*calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';
	$scope.$on('$destroy', function($scope) {
		calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
	});*/
}])
.config(function(calendarConfig) {

    console.log(calendarConfig); //view all available config

    calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';
    // calendarConfig.templates.calendarMonthView = 'path/to/custom/template.html'; //change the month view template to a custom template

    // calendarConfig.dateFormatter = 'moment'; //use either moment or angular to format dates on the calendar. Default angular. Setting this will override any date formats you have already set.

    // calendarConfig.allDateFormats.moment.date.hour = 'HH:mm'; //this will configure times on the day view to display in 24 hour format rather than the default of 12 hour

    // calendarConfig.allDateFormats.moment.title.day = 'ddd D MMM'; //this will configure the day view title to be shorter

    // calendarConfig.i18nStrings.eventsLabel = 'Events'; //This will set the events label on the day view

    // calendarConfig.displayAllMonthEvents = true; //This will display all events on a month view even if they're not in the current month. Default false.

    // calendarConfig.displayEventEndTimes = true; //This will display event end times on the month and year views. Default false.

    // calendarConfig.showTimesOnWeekView = true; //Make the week view more like the day view, with the caveat that event end times are ignored.

})
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
.controller('registerCtrl', function ($scope, moment, $state) {

});

