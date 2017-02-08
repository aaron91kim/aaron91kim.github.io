app.directive('shopPage', function($routeParams) {

    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/shopPage/shopPage.client.index.html",
        link: function(scope, element, attrs) {

        }
    }

});

app.controller('pageCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$anchorScroll', '$timeout', 'myShopService', 'pageService', 'mainService', 'designerService', 'seoService', function($rootScope, $scope, $location, $routeParams, $anchorScroll, $timeout, myShopService, pageService, mainService, designerService, seoService) {

    // nowShopData : shopIdx 를 통하여 가져온 샵의 모든 데이터를 가지고있는변수


    if ($routeParams.page) {
        $scope.pageIdx = $routeParams.page;

    }

    //주소가 바뀔때 init을 하여줌.
    $scope.$watch(function() {
        return $routeParams.page
    }, function() {
        if ($routeParams.page) {
            $rootScope.nowTap = 'page';
            $scope.pageIdx = $routeParams.page;
            $rootScope.selectedShopIdx = $routeParams.page;
            $scope.init();
        }
    })

    //로그인 이벤트가 벌어졌을경우에 pageCtrl에서 필요한 처리
    $rootScope.$on('loginEvent', function() {

        //오직 페이지에 파라메터가 잇을때에만 실행해주어야함.
        if ($scope.pageIdx) {
            $scope.checkPendingDesigner();
            $scope.checkAppliedDesigner();
            $scope.checkFavorite();
            $scope.checkFavoriteDesigners();

        }
    });


    //로그아웃 이벤트가 벌어졌을경우에 pageCtrl에서 필요한 처리
    $rootScope.$on('logoutEvent', function() {
        if ($scope.pageIdx) {
            $scope.checkPendingDesigner();
            $scope.checkAppliedDesigner();
            $scope.checkFavorite();
            $scope.checkFavoriteDesigners();
        }
    })



    $scope.init = function() {
        //구글맵로딩
        console.log('called pageInit')



        //데이터를 받아페이지를 표시하여줌. 상단에 있는 구글맵도 추후 이 callback 안으로 들어가야함.
        myShopService.getShopDatas($scope.pageIdx).then(function(data) {

            //현제 선택되어잇는 미용실이름을 mainService에 넣고 신호를 보내어 mainCtrl제어
            $rootScope.tapName = data.shop.shopName;

            seoService.reset();
            seoService.setTitle('Hairnode :: ' + data.shop.shopName);
            seoService.setDescription();
            seoService.appendKeywords();

            //현제 선택된 shop에 data를 넣어줌.
            $scope.nowShopData = data;
            //favorite이 되어잇는지를 확인함.
            $scope.checkFavorite();

            $scope.checkPendingDesigner();
            $scope.checkAppliedDesigner();
            $scope.htmlReady();

            //favorite을 해제햇는지 안햇는지를 확인하는 $watch함수 등록.
            $scope.$watch('nowShopData.shop.favorites', function() {
                $scope.checkFavorite();
            });
            //디자이너 신청과 취소를 하였을때.
            $scope.$watch('nowShopData.designers', function() {
                $scope.checkFavoriteDesigners();
            })



            $scope.map = {
                center: {
                    latitude: $scope.nowShopData.shop.location.latitude,
                    longitude: $scope.nowShopData.shop.location.longitude
                },
                zoom: 15,
            };

            $scope.n = {};
            $scope.options = {
                scrollwheel: false
            };


            $scope.marker = {
                id: 0, // 유니크한 마커 번호 . 마커를 반복문으로 가져올때 쓰임. 
                coords: {
                    latitude: $scope.nowShopData.shop.location.latitude,
                    longitude: $scope.nowShopData.shop.location.longitude
                }
            }


        })

    }

    $scope.checkPendingDesigner = function() {
        if ($scope.nowShopData) {
            $scope.isPending = false;
            for (var i = 0; i < $scope.nowShopData.pendingDesigners.length; i++) {

                if ($scope.nowShopData.pendingDesigners[i].user._id == $rootScope.initData._id) {
                    $scope.isPending = true;
                }
            }
        }
    }
    $scope.checkAppliedDesigner = function() {
            if ($scope.nowShopData) {
                $scope.isApplied = false;
                for (var i = 0; i < $scope.nowShopData.designers.length; i++) {

                    if ($scope.nowShopData.designers[i].user._id == $rootScope.initData._id) {
                        $scope.isApplied = true;
                    }
                }
            }
        }
        //favorite이 되어잇는지를 반환함.
    $scope.checkFavorite = function() {
        if ($scope.nowShopData) {
            var isIn = false;

            for (var i = 0; i < $scope.nowShopData.shop.favorites.length; i++) {

                if ($scope.nowShopData.shop.favorites[i].user == $rootScope.initData._id) {

                    isIn = true;

                }
            }
            $scope.isFavorite = isIn;
        }
    }


    $scope.checkFavoriteDesigners = function() {

        for (var i in $scope.nowShopData.designers) {

            for (var j in $scope.nowShopData.designers[i].followers) {
                if ($scope.nowShopData.designers[i].followers[j].user == $rootScope.initData._id) {
                    $scope.nowShopData.designers[i].isFavoriteDesigner = true;
                }
            }
        }
    }


    //favorite을 추가하여줌.
    $scope.addFavorite = function() {
        if ($rootScope.loggedIn) {
            //세션을 체크한뒤 
            var shopIdx = $scope.nowShopData.shop._id;
            //클리닉 번호를 서비스단으로 보내줌.
            pageService.addFavorite(shopIdx).then(function(data) {

                if (data.status == 'success') {
                    $scope.nowShopData.shop.favorites = data.favorites;
                    showMessage('Now you are follower of this shop');
                }

            });

        } else {
            $scope.showLoginConfirm();
        }
    }

    //favorite을 취소함.
    $scope.delFavorite = function() {
        var shopIdx = $scope.nowShopData.shop._id;

        pageService.delFavorite(shopIdx).then(function(data) {

            if (data.status == 'success') {
                $scope.nowShopData.shop.favorites = data.favorites;
                showMessage('Now you are not follower of this shop');
            }
        });

    }


    $scope.addFollower = function(designerIdx, arrIdx) {

        if ($rootScope.initData._id) {

            designerService.addFollower(designerIdx).then(function(data) {
                if (data.status == 'success') {
                    $scope.nowShopData.designers[arrIdx].followers = data.followers;
                    $scope.nowShopData.designers[arrIdx].isFavoriteDesigner = true;
                    showMessage('Now you are follower of this designer');

                }
            });
        } else {
            $scope.showLoginConfirm();
        }

    }

    $scope.removeFollower = function(designerIdx, arrIdx) {
        if ($rootScope.initData._id) {

            designerService.removeFollower(designerIdx).then(function(data) {
                if (data.status == 'success') {
                    console.log(data);
                    $scope.nowShopData.designers[arrIdx].followers = data.followers;
                    $scope.nowShopData.designers[arrIdx].isFavoriteDesigner = false;
                    showMessage('Now you are not follower of this designer anymore');

                }
            });
        }

    }


    //when user click comment botton, we should scroll to comment section

    $scope.goToComments = function() {

        $location.hash('comments');

        // call $anchorScroll()
        $anchorScroll();
    }


    //로그인 안했을시.
    $scope.showLoginConfirm = function() {
        showMessageForm('#confirmation');
        $('<div class="modal-backdrop in"></div>').appendTo(document.body);
    }

    $scope.hideLoginConfirm = function() {
        $(".modal-backdrop").remove();
        hideMessageForm('#confirmation');
    }

    $scope.showLoginModal = function() {
        $(".modal-backdrop").remove();
        $('#signInModal').modal('show');
        hideMessageForm('#confirmation');
    }

}]);