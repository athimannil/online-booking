import './scss/app.scss';

import angular from 'angular';
import angularCalander from 'angular-bootstrap-calendar';
import angularMoment from 'angular-moment';
import uibootstrap from 'angular-ui-bootstrap';
import uirouter from 'angular-ui-router';

var app = angular.module('myApp', [ uirouter, uibootstrap, angularCalander, angularMoment ])
  // .config(routing)
  .config(function($stateProvider, $urlRouterProvider, $qProvider) {
    $qProvider.errorOnUnhandledRejections(false);

    // Now set up the states
    $stateProvider
      .state('calander', {
        url: '/',
        templateUrl: './template/home.html',
        controller: 'homeCtrl',
      })
      .state('register', {
        url: '/{registerDay}',
        templateUrl: './template/register.html',
        controller: 'registerCtrl',
      })

      .state('time', {
        url: '/time',
        templateUrl: './template/time.html',
        controller: 'timeCtrl',
      })
      .state('booked', {
        url: '/booked',
        templateUrl: './template/booked.html',
        controller: 'bookedCtrl',
      });
    $urlRouterProvider.otherwise('/');
  })
  .controller('mainCtrl', ['$scope', function(){
    console.log('hello mate');
  }])
  .controller('homeCtrl', ['$scope', 'moment', '$state', 'bookme', 'bookingService', function($scope, moment, $state, bookme, bookingService){
    $scope.calendarView = 'month';
    $scope.viewDate = new Date();
    $scope.events = [{}];
    $scope.bookingDates = [{}];

    // Click on calendar date
    $scope.dateClicked = function(event){
      console.clear();
      if (
        event.events.length &&
        event.events[0].is_holiday == 0 &&
        event.isPast != true &&
        event.events[0].remaining_appointments != 0
      ) {
        // var theDate = moment(event.events[0].day).format('YYYY-MM-DD');
        var theDate = moment(event.date).format('YYYY-MM-DD');
        $state.go('register', {registerDay: theDate});
      } else {
        console.log('The day is holiday or NO event in this day');
        $state.go('register', {registerDay: moment(event.date).format('YYYY-MM-DD')});
      }
    };

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

  .controller('registerCtrl', function ($scope, moment, $stateParams, $state, bookme, scheduleService) {
    console.log('👇');
    console.clear();
    console.log($stateParams.registerDay);
    $scope.register = {};
    var thisDay = $stateParams.registerDay;
    if (moment(thisDay, 'YYYY-MM-DD', true).isValid()) {
      console.log('it is valid date');
      $scope.register.doc_id = 1;
      $scope.register.date = thisDay;
      $scope.bookingStatus = 'register';
      $scope.bookedDateTime = '';
    } else {
      console.log('go back and choose valid date');
      $scope.bookingStatus = 'notavailable';
    }
    // console.log(bookme.getRegistration());
    // $scope.bookedDate = bookme.getRegistration();
    // if (!$scope.bookedDate.appointmentDate) {
    // $state.go('/');
    // }
    // console.log(moment('12-12-2020', 'DD-MM-YYYY').isValid());

    $scope.sendForm = function() {
      alert('form sent');
    };

    $scope.registerMe = function () {
      // merge dob to one string
      $scope.register.dob = moment(new Date($scope.register.db.day + ' ' + $scope.register.db.month + ' ' + $scope.register.db.year)).utc().format('YYYY-MM-DD');
      // $scope.register.dob = moment(new Date($scope.register.db.day + ' ' + $scope.register.db.month + ' ' + $scope.register.db.year)).utc().format();

      delete $scope.register.db;
      console.log($scope.register);
      update($scope.register);
    };

    function update(theData) {
      return updateSchedule(theData).then(function() {
      // logger.info('Activated Avengers View');
      // console.log('update schedule');
      });
      function updateSchedule() {
        return scheduleService.updateSchedule(theData)
          .then(function(data) {
            console.log(data);
            console.log(data.status);
            if (data.status == 200) {
              $scope.bookingStatus = 'confirmed';
              $scope.bookedDateTime = data.data.date_time;
              console.log($scope.bookedDateTime);
              // alert('Successful');
              // $state.go('schedule');
            } else {
              $scope.bookingStatus = 'notavailable';
            }
          // console.log('update schedule');
          // $ctrl.schedules = data;
          // return $ctrl.schedules;
          });
      }
    }
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
        $state.go('register');
      }
    };
  })

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

    function getBookingFailed() {
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

    function updateBookingFailed() {
      // logger.error('XHR Failed for updateBooking.' + error.data);
    }
  }
}

angular
  .module('myApp')
  .factory('scheduleService', scheduleService);

// scheduleService.$inject = ['$http', 'logger'];
scheduleService.$inject = ['$http'];

// function scheduleService($http, logger) {
function scheduleService($http) {
  return {
    updateSchedule: updateSchedule
  };

  function updateSchedule(theData) {
    return $http.post('http://booking.startcode.in/appointment', theData)
      .then(updateScheduleComplete)
      .catch(updateScheduleFailed);

    function updateScheduleComplete(response) {
      // return response.data;
      //   console.log(response);
      return response;
    }

    function updateScheduleFailed(error) {
      console.log(error);
      return error;
      // logger.error('XHR Failed for updateSchedule.' + error.data);
    }
  }
}



app.directive('validSubmit', ['$parse', function ($parse) {
  return {
    // we need a form controller to be on the same element as this directive
    // in other words: this directive can only be used on a &lt;form&gt;
    require: 'form',
    // one time action per form
    link: function (scope, element, iAttrs, form) {
      form.$submitted = false;
      // get a hold of the function that handles submission when form is valid
      var fn = $parse(iAttrs.validSubmit);

      // register DOM event handler and wire into Angular's lifecycle with scope.$apply
      element.on('submit', function (event) {
        scope.$apply(function () {
          // on submit event, set submitted to true (like the previous trick)
          form.$submitted = true;
          // if form is valid, execute the submission handler function and reset form submission state
          if (form.$valid) {
            fn(scope, { $event: event });
            form.$submitted = false;
          }
        });
      });

      element.find('.form-group').each(function () {
        var formGroup = $(this);
        var inputs = formGroup.find('input[ng-model],textarea[ng-model],select[ng-model]');
        if (inputs.length > 0) {
          inputs.each(function () {
            var input = $(this);

            scope.$watch(function () {
              return input.hasClass('ng-invalid') && (!input.hasClass('ng-pristine') || form.$submitted);
            }, function (isInvalid) {
              formGroup.toggleClass('has-error', isInvalid);
            });
          });
        }
      });
    }
  };
}]);
