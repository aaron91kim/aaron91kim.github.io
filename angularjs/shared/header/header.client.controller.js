'use strict';

app.controller('signCtrl', ['$rootScope', '$window', '$scope', 'signService','Authentication','notificationService'
    ,function($rootScope, $window, $scope, signService, Authentication, notificationService) {
    
    $rootScope.isHeader = true;
    var timer;

    $scope.msgtxt = '';
    $scope.reload = function(){
        $window.location.href='/'
    }



    $scope.init = function() {
        $rootScope.initData = {};
        $rootScope.initData.verified = 'true';
        
        signService.isLogged();
       

        //회원종류를 선택을 안하고 바로 눌렀을경우를 대비하여 초기값을 할당하여줌.
        $scope.signupUser = {};
        $scope.signupUser.userType = 1;

    }

    // socket events.
    socket.on('updateNotification',function(){
        notificationService.getNotifications();
        console.log('you should update notifications');
    })

    


    $scope.logout = function() {

        var promise = signService.logout();
        promise.then(function(data) {
            if (data.status == 'success') {
                
                $rootScope.$emit('logoutEvent');
            }
        })
        //세션을 삭제가 완료 됫을경우. 

    }


    $scope.isLogged = function() {
        signService.isLogged($scope);
    }


    $scope.dropdownMyMenu = function() {
        $('.myMenu').toggle(100);
    }



    $scope.signInToUp = function() {
        $('#signInModal').modal('hide');
        $('#signUpModal').modal('show');
    }
    $scope.signInToForgot = function() {
        $('#signInModal').modal('hide');
        $('#forgotPassword').modal('show');
    }
    $scope.forgotTosignIn = function(){
        $('#signInModal').modal('show');
        $('#forgotPassword').modal('hide');
    }


}]);
