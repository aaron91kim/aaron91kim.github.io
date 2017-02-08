app.directive('settingPassword', ['userSettingService', '$rootScope', function(userSettingService, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/userSetting/password/password.client.partial.html",
		link: function(scope, element, attrs) {

			//색상 바꿔주는 핸들러.
			$('.setting-input-password').on('focus', function() {

				$(this).siblings('p').fadeIn('fast');
			});

			$('.setting-input-password').on('focusout', function() {
				$(this).css('background', 'white');
				$(this).siblings('p').fadeOut('fast');
			});

			scope.passwordSetting = {
				existingPassword: "",
				newPassword: "",
				rePassword: ""
			}



			scope.updatePassword = function() {

				//비밀번호 정규표현식 6자 이상에 숫자하나 필요.
				var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d$@$!%*#?&]{6,}$/;
				var regexOk = regex.test(scope.passwordSetting.newPassword);

				//정규표현식과 일치하지 않을경우.
				if (scope.passwordSetting.newPassword == scope.passwordSetting.rePassword && regexOk) {
					scope.alertMessage2 = "";
					var promise = userSettingService.updatePassword(scope.passwordSetting);
					promise.then(function(data) {
						if (data.status == 'success') {
							showMessage('Password has been changed successfully.');

							if ($rootScope.initData.facebook.isFacebook) {
								$rootScope.initData.facebook.hasPassword = true;
							}
							//다시 비밀번호를 바꿀수도 있기때문에 변경된 값으로 값을 다시 할당하여줌.
							scope.pwd = scope.passwordSetting.newPassword;
							scope.passwordSetting.existingPassword = "";
							scope.passwordSetting.rePassword = "";
							scope.passwordSetting.newPassword = "";
							scope.hint = "";
							//highlighted inputs have to be white after finish
							$('.setting-input-password').css('background', 'white');
						} else {
							scope.hint = 'Existing password is invalid';
							scope.inputHighlight('#existingPassword', '#f45d6b');
						}
					});
				} else {
					if (!regexOk) {
						scope.hint = 'Your password must contain between 6 and 16 characters. For added security, use numbers, letters';
						scope.inputHighlight('#newPassword', '#f45d6b');
					} else {
						scope.hint = 'Password is not matched';
						scope.inputHighlight('#rePassword', '#f45d6b');
					}
				}

			}


		}
	}
}])