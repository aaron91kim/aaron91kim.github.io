'use strict';

app.controller('bookingCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'bookingService', 'seoService', function($rootScope, $scope, $location, $routeParams, bookingService, seoService) {

    // get booking list with session
    $scope.init = function() {
        seoService.reset();
        seoService.setTitle('Hairnode :: My Booking status');

        bookingService.getBookingListBySession().then(function(data) {
            if (data.status == 'success') {
                $scope.bookingList = data.bookings;
                $scope.setPaging();
                $scope.selectedBooking = {};
                $scope.selectBooking($scope.bookingList[0]);
            }
        })

    }

    $scope.orderBy = function(sort) {

        $scope.predicate = sort;
        if ($scope.reverse) {
            $scope.reverse = false
        } else {
            $scope.reverse = true;
        }
    }

    $scope.setPaging = function() {

        $scope.bookingPaging = {
            currentPage: 0,
            pageSize: 10,
            filteredBookings: [],
            bookingOfPages: function() {

                var pageNumber = Math.ceil(this.filteredBookings.length / this.pageSize);

                //페이지가 1 이하일때 현제페이지를 0과 1으로 초기화시킴.
                if (pageNumber == 1) {
                    this.currentPage = 0;
                } else if (pageNumber == 0) {
                    this.currentPage = -1;
                }
                return pageNumber
            }
        }
    }

    $scope.selectBooking = function(booking) {
        $scope.selectedBooking = booking;
    }

    $scope.totalPrice = function() {
        var total = 0;

        angular.forEach($scope.selectedBooking.items, function(item) {

            if (item.sale) {
                total = item.sale
            } else {
                total = item.price
            }
        })

        return total;
    }

}])

app.filter('statusCounter', function() {
    return function(bookingList, sort) {

        var count = 0;
        angular.forEach(bookingList, function(booking) {
            if (booking.status == sort) {
                count += 1
            }
        })
        return count
    };
});

app.filter('totalPrice', function() {

    return function(booking) {
        var total = 0;
        angular.forEach(booking.items, function(item) {
            if (item.sale) {
                total += item.sale
            } else {
                total += item.price
            }
        })
        booking.total = total;
        return total
    };
});

app.filter('bookingStatus', function() {
    var status = '';
    return function(booking) {
        // booking
        if (!booking.isChecked) {
            booking.status = 'Pending';
            status = 'Pending';
        }

        // canceled
        if (booking.isChecked && !booking.isValid) {
            status = 'Canceled';
            booking.status = 'Canceled';
        }

        // booking
        if (booking.isChecked && booking.isValid) {
            status = 'Approved';
            booking.status = 'Approved';
        }


        return status
    }

})