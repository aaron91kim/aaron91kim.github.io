'use strict';

app.service('userSettingService', ['$http', '$location', '$q', function($http, $location, $q) {

    this.getDesignerDatas = function() {
        var d = $q.defer();

        $http.get('/userSetting/getDesignerDatas').then(function(result) {
            d.resolve(result.data);

        });
        return d.promise;
    }

    this.updateDesigner = function(setting) {
        var d = $q.defer();

        $http.post('/userSetting/updateDesigner', setting).then(function(result) {
            d.resolve(result.data);

        });
        return d.promise;
    }

    this.updateProfile = function(setting) {
        var d = $q.defer();

        $http.post('/userSetting/updateProfile', setting).then(function(result) {
            d.resolve(result.data);

        });
        return d.promise;
    }

    this.updateAccount = function(setting) {
        var d = $q.defer();

        $http.post('/userSetting/updateAccount', setting).then(function(result) {

            d.resolve(result.data);

        });
        return d.promise;
    }


    this.updatePassword = function(setting) {
        var d = $q.defer();

        $http.post('/userSetting/updatePassword', setting).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    }

    this.removeUser = function(setting) {
        var d = $q.defer();

        $http.post('/userSetting/removeUser', setting).then(function(result) {

            d.resolve(result.data);
        });
        return d.promise;
    }

}]);