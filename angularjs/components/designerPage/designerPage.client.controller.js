app.directive('designerPage', function($rootScope, $timeout, $compile) {

    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/designerPage/designerPage.client.index.html",
        link: function(scope, element, attrs) {

        }
    }
});


app.controller('designerCtrl', ['$rootScope', '$scope', '$location', '$routeParams', 'designerService', 'seoService', function($rootScope, $scope, $location, $routeParams, designerService, seoService) {

    //주소가 바뀔때 init을 하여줌.
    $scope.$watch(function() {
        return $routeParams.designer
    }, function() {
        if ($routeParams.designer) {
            $rootScope.nowTap = 'designer';
            $scope.designerIdx = $routeParams.designer;
            $scope.init();
        }
    })

    //로그인 이벤트가 벌어졌을경우에 pageCtrl에서 필요한 처리
    $rootScope.$on('loginEvent', function() {
        if ($scope.designer) {
            $scope.checkFollower();
        }
    });

    //로그아웃 이벤트가 벌어졌을경우에 pageCtrl에서 필요한 처리
    $rootScope.$on('logoutEvent', function() {
        if ($scope.designer) {
            $scope.checkFollower();
        }
    })

    $scope.init = function() {

        console.log('called designerInit');
        $scope.designer = {};
        $scope.requireLoginForm = false;
        $scope.getDesigner();
    }

    $scope.getDesigner = function() {
        designerService.getDesigner($scope.designerIdx).then(function(data) {
            if (data.status == 'success') {
                $scope.designer = data.designer;
                $rootScope.tapName = data.designer.user.firstName + ' ' + data.designer.user.lastName;
                $scope.checkFollower();
                $scope.checkWorking();
                // seoService
                seoService.reset();
                seoService.setTitle('Hairnode :: ' + data.designer.user.firstName + ' ' + data.designer.user.lastName);
                seoService.setDescription();
                seoService.appendKeywords();
            }
        });

    }



    $scope.checkFollower = function() {
        $scope.designer.isFollower = false;
        for (var i = 0; $scope.designer.followers.length > i; i++) {

            if ($scope.designer.followers[i].user == $rootScope.initData._id) {
                $scope.designer.isFollower = true;
            }
        }
    }


    $scope.addFollower = function() {
        if ($rootScope.initData._id) {
            designerService.addFollower($scope.designerIdx).then(function(data) {
                if (data.status == 'success') {
                    $scope.designer.followers = data.followers;
                    $scope.checkFollower();

                }
            });
        } else {
            console.log('로그인 안됨');
            $scope.requireLoginForm = true;
        }
    }

    $scope.removeFollower = function() {
        designerService.removeFollower($scope.designerIdx).then(function(data) {
            if (data.status == 'success') {
                $scope.designer.followers = data.followers;
                $scope.checkFollower();
            }
        });
    }

    $scope.showLoginModal = function() {
        $scope.requireLoginForm = false;
        $('#signInModal').modal('show');
    }

    $scope.checkWorking = function() {
        for (var i = $scope.designer.working.length - 1; i >= 0; i--) {
            if ($scope.designer.working[i].level == 0) {
                $scope.designer.working.splice(i, 1);
            }
        }
    }

}]);