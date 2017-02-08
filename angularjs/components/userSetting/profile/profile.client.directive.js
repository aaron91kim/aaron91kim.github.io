app.directive('settingProfile', ['userSettingService', '$upload', '$rootScope', function(userSettingService, $upload, $rootScope) {
    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/userSetting/profile/profile.client.partial.html",
        link: function(scope, element, attrs) {

            scope.profileSetting = {
                firstName: $rootScope.initData.firstName,
                lastName: $rootScope.initData.lastName,
                tel: $rootScope.initData.tel
            }
            console.log(scope.profileSetting);

            scope.updateProfile = function() {
                var promise = userSettingService.updateProfile(scope.profileSetting);

                promise.then(function(data) {
                    if (data.status == 'success') {
                        showMessage('save complete');
                    }
                });

            }


            scope.updateProfilePhoto = function($files) {
                var file = $files[0];
                console.log(file);
                scope.upload = $upload.upload({
                    url: '/userSetting/updateProfilePhoto',
                    method: 'POST',
                    // headers: {'enctype': 'multipart/form-data'},
                    file: file
                }).progress(function(evt) {
                    console.log('percent : ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function(data, status, headers, config) {
                    if (data.status = "success") {
                        //성공시 루트스코프의 내용과 스코프 내용을 업데이트 시켜줌.
                        $rootScope.initData.picture = file.name;
                        scope.beforePicture = '/userAssets/users/' + $rootScope.initData._id + '/' + file.name;

                        showMessage('Your profile photo has been changed');
                    }
                });
            }


        }
    }
}])