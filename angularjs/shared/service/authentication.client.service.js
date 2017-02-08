'use strict';
// Authentication service for user variables
app.factory('Authentication', ['$window', '$rootScope',
	function($window, $rootScope) {
		var _this = this;

		this.isLogin;

		if ($window.sessionStorage['user']) {
			this.isLogin = true;
		} else {
			this.isLogin = false;
		}

		this.setUserInfo = function(userInfo) {
			$window.sessionStorage['user'] = JSON.stringify(userInfo);
		}

		this.updateUserInfo = function() {
			_this.setUserInfo($rootScope.initData);
		}
		this.getUserInfo = function() {
			if (_this.isLogin) {
				return JSON.parse($window.sessionStorage['user']);
			} else {
				return null;
			}
		}

		this.getLoginStatus = function() {
			return this.isLogin;
		}


		return _this;

	}
]);