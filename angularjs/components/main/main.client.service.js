'use strict';

app.service('mainService', ['$http', '$location', '$rootScope', '$q', function($http, $location, $rootScope, $q) {

    this.searchedData = 'default value';
    this.tapName = 'Hot News';

    //DB에서 쿼리에 해당하는 데이터를 가져와줌.
    this.initSearch = function(location, query) {
        var searchQuery = {
            'location': location,
            'query': query
        }

        var d = $q.defer();
        $http.post('/search/initSearch', searchQuery).then(function(result) {
            d.resolve(result.data);
        })
        return d.promise;

    };


    // //주소값을 가공하기 위한 함수.
    // var refineAddr = function(shops){
    //     console.log(shops);
    //     for(var i = 0; i < shops.length; i++){

    //         var splited = shops[i].shopAddr.addr1.split(" ");

    //         shops[i].shopAddr.addr1 = splited[0] +' '+ splited[1];
    //     }

    //     return shops;

    // }

}])