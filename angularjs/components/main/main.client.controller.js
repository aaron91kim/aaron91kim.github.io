app.controller('mainCtrl', ['$rootScope', '$routeParams', '$scope', '$http', '$timeout', '$location', 'mainService', 'seoService', function($rootScope, $routeParams, $scope, $http, $timeout, $location, mainService, seoService) {

    $rootScope.nowTap = 'news';
    seoService.reset();

    //if it dosn't have both parameter page and designer then it has tapName as HotNews
    if (!$routeParams.page && !$routeParams.designer) {
        $rootScope.tapName = 'HotNews';
    }

    $rootScope.$on('loginEvent', function() {
        $scope.checkFavoriteShop();
    });

    $rootScope.$on('logoutEvent', function() {
        $scope.restoreFavoriteShop();
    })

    $rootScope.$on('searchUpdate', function() {
        $scope.checkFavoriteShop();


    });

    //가져온 데이터중에 favorite한 샵이 있는지 확인하고 값을 변경해줌
    $scope.checkFavoriteShop = function() {

        var session = $rootScope.initData._id;

        for (var i in $scope.loadShopData) {
            for (var j in $scope.loadShopData[i].favorites) {

                if ($scope.loadShopData[i].favorites[j].user == session) {
                    $scope.loadShopData[i].isFavorite = true;
                }
            }
        }
        console.log($scope.loadShopData);
    }


    //로그아웃시 전부 favorite이 아닌걸로 되돌림
    $scope.restoreFavoriteShop = function() {

        var session = $rootScope.initData._id;

        for (var i in $scope.loadShopData) {
            $scope.loadShopData[i].isFavorite = false;

        }
    }

    $scope.clickShop = function() {
        $('#main-tap a[href="#main-tap1"]').tab('show');
    }

}]);