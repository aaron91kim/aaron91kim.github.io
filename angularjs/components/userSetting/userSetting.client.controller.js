'use strict';

app.controller('userSettingCtrl', ['$rootScope', '$scope', '$location', '$timeout', 'userSettingService', function($rootScope, $scope, $location, $timeout, userSettingService) {

    $scope.init = function() {

        // //값 초기화.
        // if($rootScope.loggedIn){
        //     // $scope.setting = {} ;
        //     // $scope.setting.desc = $rootScope.initData.desc;
        //     // $scope.setting.mailing = $rootScope.initData.mailing;
        //     // $scope.setting.message = $rootScope.initData.message;

        //    //  if($rootScope.initData.picture == null){
        //    //     $scope.beforePicture = $rootScope.initData.fbPicture; 
        //    // }else{
        //    //  $scope.beforePicture = '/userAssets/users/'+ $rootScope.initData._id+ '/' + $rootScope.initData.picture;
        //    // }


        // }else{
        //     //원래라면 잘못된 접근으로 다른페이지로 리디렉트해야함. 하지만 로그아웃할때 페이지 초기화가 안되어 제한됨.
        //     showMessage('Please sign in first');
        //     // $timeout(function(){

        //     //     $location.path('/');

        //     // },2000);

        // }


        $scope.subPage = 'designer';
        // $scope.letterCount = 0;

        // $scope.descOver = false; //설명문이 300자 넘엇을경우.

    };
    $scope.changeSubpage = function(subPage) {
        $scope.subPage = subPage
    }
    $scope.inputHighlight = function(id, color) {
        $(id).css('background', color);
        $(id).delay(1000).focus();
    }


}]);