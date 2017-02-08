'use strict';

controllers.controller('SignupCtrl', ['$scope', '$http', '$timeout', '$ionicPopup', 'signService'
  ,function($scope, $http, $timeout, $ionicPopup, signService) {
  $scope.step = 1;
  
  $scope.emailPass = false;
  $scope.passwordPass = false;

  $scope.signupData = {
    email : '',
    pwd : '',
    pwd2 : '',
    name : '',
    tel : ''
  };
  $scope.changeStep = function(step){
    $scope.step = step;
    $scope.hint = '';
  }
  $scope.fbLogin = function(){
    signService.fbLogin($scope.loginData).then(function(result){
      if(result == 'success'){
        $scope.closeSignupModal();
      }
    });
  }

  $scope.checkEmail = function() {
    //이메일 정규표현식으로 패턴검사

    var pattern = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (pattern.test($scope.signupData.email)) {
        var promise = signService.checkEmail($scope.signupData);
        promise.then(function(data) {
            if (data.status == 'available') {
                $scope.hint = '사용가능한 이메일 입니다.';
                $scope.emailPass = true;
            } else {
                $scope.hint = '사용할수 없는 이메일 입니다.';
                $scope.emailPass = false;
            }
        });
    } else {
        $scope.hint = "올바른 이메일 형식이 아닙니다.";
    }
    
  };

  $scope.checkPwd = function() {
      //회원가입시 비밀번호 일치 여부 확인하기.
      clearTimeout(timer);
      var timer = $timeout(function() {
          if($scope.signupData.pwd.length >= 6 && $scope.signupData.pwd2.length >= 6){
              if ($scope.signupData.pwd == $scope.signupData.pwd2) {
                  $scope.hint = '비밀번호가 일치합니다.';
                  $scope.passwordPass = true;

              }else{
                  $scope.hint = '비밀번호가 일치하지 않습니다.';
                  $scope.passwordPass = false;
              } 
          }
      }, 200);
  }

  // Perform the login action when the user submits the login form
  $scope.doSignup = function() {

    if($scope.signupData.name){
      if($scope.signupData.tel){
        signService.signup($scope.signupData).then(function(result){
          if(result.status == 'success'){
            localStorage.setItem('userEmail', $scope.signupData.email);
            $scope.closeSignupModal();
            $scope.showVerifyModal();
          }
        })
      }else{
        $scope.hint = '핸드폰번호를 입력해주세요.'
      }
    }else{
      $scope.hint = '이름을 입력해주세요.';
    }
  };
}])

