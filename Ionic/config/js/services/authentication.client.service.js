'use strict';
// Authentication service for user variables

services.factory('Authentication', ['$window', '$rootScope','$location', '$timeout',
	function($window, $rootScope, $location, $timeout) {
		var _this = this;
		
		this.isLogin;

		if($window.sessionStorage['user']){
			this.isLogin = true;
		}else{
			this.isLogin = false;
		}

		this.setUserInfo = function(userInfo){
			$window.sessionStorage['user'] = JSON.stringify(userInfo);			
		}

		this.updateUserInfo = function(){
			_this.setUserInfo($rootScope.initData);
		}
		this.getUserInfo = function(){
			if(_this.isLogin){
				return JSON.parse($window.sessionStorage['user']);
			}else{
				return null;
			}
		}
		
		this.getLoginStatus = function(){
			return this.isLogin;
		}

		this.checkLoginAndRedirect = function(){
			if(!$rootScope.loggedIn){
				//원래라면 잘못된 접근으로 다른페이지로 리디렉트해야함. 하지만 로그아웃할때 페이지 초기화가 안되어 제한됨.
	            showMessage('로그인을 해야 이용할수 있는 서비스입니다. 잠시후 메인화면으로 돌아갑니다.');
	            $timeout(function(){
	                $location.path('/');
	            },1600);
	        }
		}

		this.checkVerifiedAccountAndRedirect = function(){
			if($rootScope.initData.verified != 'true'){
				//원래라면 잘못된 접근으로 다른페이지로 리디렉트해야함. 하지만 로그아웃할때 페이지 초기화가 안되어 제한됨.
	            showMessage('이메일 인증을해야 이용할 수 있는 서비스입니다. 잠시후 메인화면으로 돌아갑니다.');
	            $timeout(function(){
	                $location.path('/');
	            },1600);
	        }
		}


		return _this;

	}
]);