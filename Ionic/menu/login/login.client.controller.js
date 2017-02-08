'use strict';

controllers.controller('LoginCtrl', ['$scope', '$http', '$timeout', '$ionicPopup', 'signService'
  ,function($scope, $http, $timeout, $ionicPopup, signService) {
    $scope.loginData = {
      remember : true
    }
    
    if(localStorage.getItem('userEmail')){
      $scope.loginData = {
        'email' : localStorage.getItem('userEmail')
      };
    }
  
  $scope.fbLogin = function(){

    signService.fbLogin($scope.loginData).then(function(result){
      if(result == 'success'){
        localStorage.setItem('userEmail', $scope.loginData.email);
        $scope.closeLoginModal();

      }
    });
  }
  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    signService.login($scope.loginData).then(function(result){
    console.log(result)
      if(result.status == 'success'){
        localStorage.setItem('userEmail', $scope.loginData.email);
        $scope.closeLoginModal();
      }else if(result.status == 'fail' && result.reason =='password'){
        $ionicPopup.alert({
          title:'비밀번호가 오류',
          template : '비밀번호가 틀렸습니다.<br /> 다시한번 확인해주세요.'
        })
      }else if(result.status == 'fail' && result.reason =='email'){
        $ionicPopup.alert({
          title:'가입이 되어있지 않은 이메일',
          template : '해당 이메일은 가입이 되어있지 않습니다. <br /> 다시한번 확인해주세요.'
        })
      }
    })
    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
  };

}])

