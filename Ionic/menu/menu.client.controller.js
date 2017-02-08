'use strict';

controllers.controller('MenuCtrl', function($scope, $rootScope, $window, $location, $ionicModal,$ionicPlatform, $ionicPopup,$ionicSideMenuDelegate, signService) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  
  $rootScope.initData = {

  }
  // 새로고침 눌렀을때 로그인이 풀려버리므로 세션스토리지를 검사함.
  signService.isLogged();

  // 세션과 쿠키가 만료되었을경우.
  $rootScope.$on('Unauthorized',function(){
    $scope.showLoginModal();
  })

  // 로그인모달을 생성함.
  $ionicModal.fromTemplateUrl('ng-app/mobile/menu/login/login.client.modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.loginModal = modal;
  });

  // 회원가입모달을 생성함.
  $ionicModal.fromTemplateUrl('ng-app/mobile/menu/signup/signup.client.modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signupModal = modal;
  });

  // 인증모달을 생성함.
  $ionicModal.fromTemplateUrl('ng-app/mobile/menu/verify/verify.client.modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.verifyModal = modal;
  });
  // $ionicPlatform.registerBackButtonAction(function () {
  //   //close your ionic modal here

  //   if($ionicSideMenuDelegate.isOpenLeft()){
  //     toggleLeft($ionicSideMenuDelegate.isOpenLeft())
  //   } ;
    
  // }, 100);
  // 로그인모달을 보여줌.
  $scope.showLoginModal = function() {
    $scope.loginModal.show();
  };

  // 로그인모달을 숨김.
  $scope.closeLoginModal = function() {
    $scope.loginModal.hide();
  };

  // 회원가입모달을 보여줌.
  $scope.showSignupModal = function() {
    $scope.signupModal.show();
  };

  // 회원가입모달을 숨김.
  $scope.closeSignupModal = function() {
    $scope.signupModal.hide();
  };

  // 인증모달을 보여줌.
  $scope.showVerifyModal = function(){
    $scope.verifyModal.show();
  }
  //인증모달을 숨김.
  $scope.hideVerifyModal = function(){
    $scope.verifyModal.hide();
  }

  //로그인을 할지 여부를 물어보는 confirm 팝업
  $scope.requireLogin = function(){
    console.log($ionicPopup.confirm);
    $ionicPopup.confirm({
      title : '로그인을 해주세요',
      template : '로그인 하시겠습니까?',
      buttons: [
        { 
          text: '닫기',
          onTap: function() { return false; }
        },
        {
          text: '<b>로그인</b>',
          type: 'button-positive',
          onTap: function() { return true; }
        }
      ]
    }).then(function(res){
      console.log(res);
      if(res){
        $scope.showLoginModal()
      }else{
        //no
      }
    })
  }

  //PC version
  $scope.goToPC = function(){
    localStorage.setItem('view','PC');
    console.log($window.location);
    $window.location.href = $window.location.origin;
  }

  // 로그아웃을함.
  $scope.doLogout = function() {
    signService.logout().then(function(result){
      if(result.status == 'success'){
        $rootScope.$emit('logout');
      }
    })
  };

  
  
})


