'use strict';

app.service('bookingService', ['$http', '$rootScope', '$routeParams', '$location', '$q'
    ,function($http, $rootScope, $routeParams, $location, $q) {

    	

    this.getBookingListBySession = function(){
        var d = $q.defer();

        $http.get('/booking/getBookingListBySession').then(function(result){
            d.resolve(result.data);

        })
        return d.promise;
    }
}])
