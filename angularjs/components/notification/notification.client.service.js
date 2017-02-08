'use strict';

app.service('notificationService', ['$http', '$q', '$rootScope', 'Authentication', function($http, $q, $rootScope, Authentication) {

    // notificationService.emitNotificationsUpdate(target);
    // real time notifications update with socket io
    this.emitNotificationsUpdate = function(target) {
        socket.emit('updateNotification', target);
    }

    this.getNotifications = function() {
        var d = $q.defer();

        $http.get('/notification/getNotification').then(function(result) {
            console.log(result);
            if (result.data.status == 'success') {
                $rootScope.initData.notifications = result.data.notifications;
                Authentication.updateUserInfo();
            }
            d.resolve(result.data);
        })

        return d.promise;
    }

    this.setToChecked = function(notificationIdx) {
        var d = $q.defer();
        var data = {
            'notificationIdx': notificationIdx
        }
        $http.post('/notification/setToChecked', data).then(function(result) {
            d.resolve(result.data);
        })

        return d.promise;
    }

    this.removeNotification = function(notificationIdx) {
        var d = $q.defer();
        var data = {
            'notificationIdx': notificationIdx
        }
        $http.post('/notification/removeNotification', data).then(function(result) {
            d.resolve(result.data);
        })

        return d.promise;
    }
}]);