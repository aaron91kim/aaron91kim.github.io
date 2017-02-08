app.controller('notificationCtrl', ['$scope', '$rootScope', 'notificationService', 'Authentication', 'seoService', function($scope, $rootScope, notificationService, Authentication, seoService) {

    $rootScope.$on('loginEvent', function() {})
    $rootScope.$on('logoutEvent', function() {})

    $scope.init = function() {
        seoService.reset();
        seoService.setTitle('Hairnode :: Notifications');
        notificationService.getNotifications().then(function(data) {
            if (data.status == 'success') {

            }
        })
    }

    $scope.init();

    $scope.setToChecked = function(notificationIdx) {

        notificationService.setToChecked(notificationIdx).then(function(data) {

            if (data.status == 'success') {
                $rootScope.initData.notifications = data.notifications;
                Authentication.updateUserInfo();
            }

        });
    }

    $scope.removeNotification = function(notificationIdx) {
        notificationService.removeNotification(notificationIdx).then(function(data) {
            if (data.status == 'success') {
                $rootScope.initData.notifications = data.notifications;
                Authentication.updateUserInfo();
            }
        });

    }
}]);