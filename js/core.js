angular.module('myApp', ['mwl.calendar', 'ui.bootstrap'])
	.controller('calendarCtrl', ['$scope','moment','calendarConfig', function($scope, moment, calendarConfig){
		$scope.bookingPerDay = 5;
		var mySchedule = this;
		$scope.isCellOpen = true; // not working yet
		$scope.calendarView = 'month';
		$scope.calendarDate = new Date();
		$scope.bookings = [
			{
				title: 'Today',
				type: 'info',
				startsAt: new Date(2016,2,10, 1),
				endsAt: new Date(2016,2,10, 2),
				recursOn: 'month',

				editable: false,
				deletable: false,
				draggable: false,
				resizable: false,
				incrementsBadgeTotal: true,
				cssClass: 'a-css-class-name'
			},{
				title: 'Today is saturday',
				type: 'info',
				startsAt: new Date(2016,2,10, 3),
				endsAt: new Date(2016,2,10, 4),
				editable: false,
				deletable: false,
				draggable: true,
				resizable: true,
				incrementsBadgeTotal: true,
				recursOn: 'month',
				cssClass: 'a-css-class-name'
			},{
				title: 'Today is saturday',
				type: 'info',
				startsAt: new Date(2016,2,10, 3),
				endsAt: new Date(2016,2,10, 4),
				editable: false,
				deletable: false,
				draggable: true,
				resizable: true,
				incrementsBadgeTotal: true,
				recursOn: 'month',
				cssClass: 'a-css-class-name'
			},{
				title: 'Today is saturday',
				type: 'info',
				startsAt: new Date(2016,2,11, 3),
				endsAt: new Date(2016,2,11, 4),
				editable: false,
				deletable: false,
				draggable: true,
				resizable: true,
				incrementsBadgeTotal: true,
				recursOn: 'month',
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
			console.log("hello mate");
			console.log(theBooking);
			console.log(theBooking.length);
		};

		// custom texts
		/*calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';
		$scope.$on('$destroy', function($scope) {
			calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
		});*/
	}]);