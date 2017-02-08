'use strict';

app.service('favoriteService', ['$http', '$rootScope', '$routeParams', '$location' , '$q'
    ,function($http, $rootScope, $routeParams, $location , $q) {

        this.getFavoriteDatas =  function(){
            var d = $q.defer();
            $http.get('/getFavoriteDatas').then(function(result) {
               d.resolve(result.data);
               

            });
            return d.promise;
        };
    
}])
