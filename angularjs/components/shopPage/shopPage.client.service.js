'use strict';

app.service('pageService', ['$http', '$rootScope', '$routeParams', '$location', '$q', 'notificationService', function($http, $rootScope, $routeParams, $location, $q, notificationService) {


    this.applyJob = function(shopIdx) {

        var d = $q.defer();

        var shopIdx = {
            'shopIdx': shopIdx
        }
        $http.post('/applyDesigner', shopIdx).then(function(result) {
            d.resolve(result.data);

        })
        return d.promise;

    }

    this.addComment = function(to, where, comment) {
        var d = $q.defer();

        var datas = {
            to: to,
            where: where,
            comment: comment
        }

        $http.post('/addComment', datas).then(function(result) {
            if (result.data.status == 'success') {
                notificationService.emitNotificationsUpdate(to);
            }
            d.resolve(result.data);

        })
        return d.promise;
    }



    this.addFavorite = function(shopIdx) {
        var d = $q.defer();

        $http.post('/addFavorite', {
            'shopIdx': shopIdx
        }).then(function(result) {
            d.resolve(result.data);
        });

        return d.promise;
    };


    this.addReserve = function(info) {
        var d = $q.defer();
        console.log(info);
        var time = info.selectedTime;
        var date = info.selectedDate;

        var reserveDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes())



        var totalInfo = {
            designer: info.selectedDesigner.user._id,
            items: info.selectedItems,
            date: reserveDate.toString(),
            shop: info.selectedShop,
            memo: info.memo
        }

        $http.post('/reserve/addReserve', totalInfo).then(function(result) {
            d.resolve(result.data);

        })


        return d.promise;
    }

    this.cencelJob = function(shopIdx) {

        var d = $q.defer();

        var shopIdx = {
            'shopIdx': shopIdx
        }

        $http.post('/cencelJob', shopIdx).then(function(result) {
            d.resolve(result.data);

        })
        return d.promise;

    }
    this.delFavorite = function(shopIdx) {
        //지워야 하는 배열 위치를 넘겨줌
        var d = $q.defer();

        $http.post('/delFavorite', {
            'shopIdx': shopIdx
        }).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    }



    this.getComments = function(designers, shopIdx, skip) {
        var d = $q.defer();


        var datas = {
            'designers': designers,
            'shopIdx': shopIdx,
            'skip': skip
        }


        $http.post('/getComments', datas).then(function(result) {
            d.resolve(result.data);

        })
        return d.promise;

    }

    this.getDesignerSchedule = function(designerIdx, date) {

        var d = $q.defer();

        var datas = {
            designerIdx: designerIdx,
            date: date.toString()
        }

        $http.post('/reserve/getDesignerSchedule', datas).then(function(result) {
            d.resolve(result.data);

        })
        return d.promise;

    }

    this.removeComment = function(commentIdx) {

        var d = $q.defer();

        var datas = {
            'commentIdx': commentIdx
        }

        $http.post('/removeComment', datas).then(function(result) {
            d.resolve(result.data);

        })
        return d.promise;
    }

}])