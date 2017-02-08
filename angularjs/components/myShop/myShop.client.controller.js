app.controller('myShopCtrl', ['$rootScope', '$scope', '$routeParams', 'myShopService', '$http', '$upload', 'seoService', function($rootScope, $scope, $routeParams, myShopService, $http, $upload, seoService) {

    $rootScope.$on('loginEvent', function() {
        $scope.getMyShopList();
    })
    $rootScope.$on('logoutEvent', function() {
        $scope.getMyShopList();
        $scope.selectedShop = null;
    })

    $scope.initAll = function() {
        seoService.reset();
        seoService.setTitle('Hairnode :: myShop');
        //초기 페이지 설정. 개발시에는 편의상 개발하고있는 페이지로 설정.
        $scope.directive = "";
        $scope.photos = [];
        $scope.selectedReserve = [];
        $scope.addMemberInfo = {};
        //현제 회원의 샵리스트를 가져옴.
        $scope.getMyShopList(); // 

    }

    $scope.getMyShopList = function() {
        console.log('called');
        myShopService.getMyShopList().then(function(data) {

            if (data.lists != null) {
                $scope.myShopLists = data.lists.working;

            } else {
                $scope.myShopLists = [];
            }
        })
    }

    //회원 정렬
    $scope.removeDesignerSelfFromShop = function() {
        var shopIdx = $scope.selectedShop.shop._id;
        myShopService.removeDesignerSelfFromShop(shopIdx).then(function(data) {
            if (data.status == 'success') {
                showMessage('You get out from (' + $scope.selectedShop.shop.shopName + ').');
                $scope.selectedShop = {};
                $scope.getMyShopList();
                $scope.withdrawForm = false;

            }
        });
    }

    $scope.removeShop = function() {

        var shopIdx = $scope.selectedShop.shop._id;
        myShopService.removeShop(shopIdx)
            .then(function(data) {
                if (data.status == 'success') {
                    showMessage('You removed your shop(' + $scope.selectedShop.shop.shopName + ').');
                    $scope.getMyShopList();
                    $scope.selectedShop = {};
                    $scope.getMyShopList();
                    $scope.removeShopForm = false;
                } else {
                    showMessage('You are not owner of this shop.');
                }
            });

    }

    //좌측 상단 샵을 선택할때 모든 정보를 받아와줌.
    $scope.selectShop = function(shopIdx, level) {

        //소켓룸에 접속함.
        socket.emit('joinRoom', {
            room: shopIdx,
            'authority': 'manager'
        });

        myShopService.getShopDatas(shopIdx).then(function(data) {
            //받아온 데이터를 넣어줌.
            $scope.selectedShop = data;
            //레벨을 넣어줌.
            seoService.setTitle('Hairnode :: myShop - ' + $scope.selectedShop.shop.shopName);

            $scope.selectedShop.myLevel = level;
            $scope.shopIdx = shopIdx;
            $scope.members = $scope.selectedShop.shop.members;
            $scope.prices = $scope.selectedShop.shop.price;
            $scope.photos = $scope.selectedShop.shop.photos;
            $scope.shopDesc = $scope.selectedShop.shop.desc;

            $scope.searchText = '';

        });
    }



    $scope.setDescription = function() {
        var shopIdx = $scope.selectedShop.shop._id;
        myShopService.setDescription(shopIdx, $scope.shopDesc).then(function(data) {

            if (data.status == 'success') {
                $('#shopDescModal').modal('hide')
                showMessage('We saved successfully.');
            } else {

            }
        })
    }

}]);