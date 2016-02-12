angular.module('myApp', ['ui.bootstrap', 'mwl.calendar', 'angularMoment'])
	.controller('calendarCtrl', ['$scope','moment','$uibModal', function($scope, moment, $uibModal){
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

		    var modalInstance = $uibModal.open({
		      templateUrl: 'myModalContent.html',
		      controller: 'bookingCtrl',
		      resolve: {
		        bookingTimes: function () {
		          // return $scope.items;
		          return theBooking;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      // $scope.selected = selectedItem;
		    }, function () {
		      // $log.info('Modal dismissed at: ' + new Date());
		    });

		};

		// custom texts
		/*calendarConfig.templates.calendarMonthCell = 'customMonthCell.html';
		$scope.$on('$destroy', function($scope) {
			calendarConfig.templates.calendarMonthCell = 'mwl/calendarMonthCell.html';
		});*/
	}])
	.controller('bookingCtrl', function ($scope, $uibModalInstance, bookingTimes, moment) {
		$scope.bookingsToday = [
			{
				timeFrom: moment(9, 'hours').toDate(),
				timeTill: moment(9, 'hours').toDate(),
			},{
				timeFrom: moment(10, 'hours').toDate(),
				timeTill: moment(10, 'hours').toDate(),
			},{
				timeFrom: moment(11, 'hours').toDate(),
				timeTill: moment(11, 'hours').toDate(),
			},{
				timeFrom: moment(12, 'hours').toDate(),
				timeTill: moment(12, 'hours').toDate(),
			},{
				timeFrom: moment(13, 'hours').toDate(),
				timeTill: moment(13, 'hours').toDate(),
			},{
				timeFrom: moment(14, 'hours').toDate(),
				timeTill: moment(14, 'hours').toDate(),
			},{
				timeFrom: moment(15, 'hours').toDate(),
				timeTill: moment(15, 'hours').toDate(),
			},{
				timeFrom: moment(16, 'hours').toDate(),
				timeTill: moment(16, 'hours').toDate(),
			},{
				timeFrom: moment(17, 'hours').toDate(),
				timeTill: moment(17, 'hours').toDate(),
			}
		];
		$scope.items = bookingTimes;
		$scope.selected = {
			item: $scope.items[0]
		};
		$scope.ok = function () {
			$uibModalInstance.close($scope.selected.item);
		};
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});
