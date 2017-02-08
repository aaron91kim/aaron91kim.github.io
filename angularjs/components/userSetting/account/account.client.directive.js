app.directive('settingAccount', ['userSettingService', '$rootScope', function(userSettingService, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/userSetting/account/account.client.partial.html",
		link: function(scope, element, attrs) {

			scope.accountSetting = {
				mailing: $rootScope.initData.mailing,
				message: $rootScope.initData.message
			}

			console.log('account setting ');
			console.log(scope.accountSetting);
			scope.updateAccount = function() {

				var promise = userSettingService.updateAccount(scope.accountSetting);

				promise.then(function(data) {

					if (data.status == 'success') {
						showMessage('We saved your information successfully.');
						// if change is successed, we should change $rootScope value.
						$rootScope.initData.message = scope.accountSetting.message;
						$rootScope.initData.mailing = scope.accountSetting.mailing;
					}

				});
			}

		}
	}
}])