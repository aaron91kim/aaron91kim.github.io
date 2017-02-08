app.directive('removeAccount', ['userSettingService', '$location', '$timeout', '$rootScope', function(userSettingService, $location, $timeout, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/userSetting/removeAccount/removeAccount.client.partial.html",
		link: function(scope, element, attrs) {
			scope.removeAccount = {
				existingPassword: ''
			}

			//색상 바꿔주는 핸들러.
			$('.setting-input-password').on('focus', function() {

				$(this).siblings('p').fadeIn('fast');;
			});

			$('.setting-input-password').on('focusout', function() {
				$(this).css('background', 'white');
				$(this).siblings('p').fadeOut('fast');;
			});

			scope.removeUser = function() {
				var promise = userSettingService.removeUser(scope.removeAccount);
				promise.then(function(data) {
					if (data.status == 'success') {
						showMessage('We removed your account completely');

						$rootScope.favorites = null;
						$rootScope.loggedIn = false;
						$rootScope.isFavorite = false;
						$timeout(function() {
							$location.path('/');
						}, 2000);

					} else {
						scope.hint = 'password is invalid';
						scope.inputHighlight('#existingPassword', '#f45d6b');
					}
				});

			}


		}
	}
}])