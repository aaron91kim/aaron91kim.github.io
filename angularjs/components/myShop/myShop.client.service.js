'use strict';

app.service('myShopService', ['$http', '$location', '$q', '$upload', 'notificationService', function($http, $location, $q, $upload, notificationService) {

    this.addMember = function(shopIdx, member) {
        var d = $q.defer();

        var updateInfo = {
            'shopIdx': shopIdx,
            'member': member
        }

        $http.post('/myShop/addMember', updateInfo).then(function(result) {
            d.resolve(result.data);
        })
        return d.promise;
    }

    this.acceptNewDesigner = function(userIdx, shopIdx) {
        var d = $q.defer();
        var idx = {
            'userIdx': userIdx,
            'shopIdx': shopIdx
        };
        $http.post('/myShop/acceptNewDesigner', idx).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    };

    this.addShop = function(shopInfo) {
        var d = $q.defer();
        $http.post('/myShop/addShop', shopInfo).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    };



    this.getMyShopList = function() {
        var d = $q.defer();
        $http.get('/myShop/getMyShopList').then(function(result) {

            d.resolve(result.data);
        });
        return d.promise;
    };


    this.getOnedayReserves = function(shopIdx, date) {
        var d = $q.defer();

        var datas = {
            shopIdx: shopIdx,
            date: date.toString()
        }

        $http.post('/myShop/getOnedayReserves', datas).then(function(result) {

            d.resolve(result.data);
        });
        return d.promise;

    }


    this.getShopDatas = function(shopIdx) {
        var d = $q.defer();

        var shopIdx = {
            'shopIdx': shopIdx
        }
        $http.post('/myShop/getShopDatas', shopIdx).then(function(result) {

            d.resolve(result.data);
        });
        return d.promise;
    };

    this.getNewReserves = function(shopIdx) {
        var d = $q.defer();
        var datas = {
            shopIdx: shopIdx
        }
        $http.post('/myShop/getNewReserves', datas).then(function(result) {

            d.resolve(result.data);
        });
        return d.promise;

    }


    this.setWorkTime = function(shopIdx, dayOff, time) {
        var d = $q.defer();
        var info = {
            shopIdx: shopIdx,
            dayOff: dayOff,
            time: time
        };


        $http.post('/myShop/setWorkTime', info).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;


    }
    this.setReserve = function(reserve, valid) {
        console.log(reserve);
        var d = $q.defer();
        var datas = {
            'reserve': reserve,
            'valid': valid
        };


        $http.post('/myShop/setReserve', datas).then(function(result) {
            if (result.data.status == 'success') {
                notificationService.emitNotificationsUpdate(reserve.user._id)
            }
            d.resolve(result.data);
        });
        return d.promise;

    }
    this.setReservable = function(shopIdx, status) {
        var d = $q.defer();
        var datas = {
            'shopIdx': shopIdx,
            'status': status
        };

        $http.post('/myShop/setReservable', datas).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    }
    this.removeDesignerSelfFromShop = function(shopIdx) {
        var info = {
            shopIdx: shopIdx
        }
        var d = $q.defer();
        $http.post('/myShop/removeDesignerSelfFromShop', info).then(function(result) {
            d.resolve(result.data);
        })
        return d.promise;
    }



    this.declineNewDesigner = function(userIdx, shopIdx) {
        var d = $q.defer();
        var idx = {
            'userIdx': userIdx,
            'shopIdx': shopIdx
        };
        $http.post('/myShop/declineNewDesigner', idx).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    };

    this.removeMember = function(shopIdx, member) {
        var d = $q.defer();

        var updateInfo = {
            'shopIdx': shopIdx,
            'member': member,
        }

        $http.post('/myShop/removeMember', updateInfo).then(function(result) {
            d.resolve(result.data);
        })
        return d.promise;
    }


    this.removePhoto = function(shopIdx, photoInfo) {

        var d = $q.defer();
        console.log(shopIdx);
        console.log(photoInfo);


        photoInfo.shopIdx = shopIdx;
        $http.post('/myShop/removePhoto', photoInfo).then(function(result) {
            d.resolve(result.data);
        });

        return d.promise;
    }


    this.removeShop = function(shopIdx) {
        console.log('service is called')
        console.log(shopIdx);
        var d = $q.defer();
        var shopIdx = {
            'shopIdx': shopIdx
        }
        $http.post('/myShop/removeShop', shopIdx).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;

    }

    this.setDesignerLevel = function(change, designerIdx) {
        var d = $q.defer();
        var changes = {
            'level': change,
            'designerIdx': designerIdx
        }
        $http.post('/myShop/setDesignerLevel', changes).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    }
    this.setDescription = function(shopIdx, desc) {
        console.log(desc);
        var d = $q.defer();
        var data = {
            'shopIdx': shopIdx,
            'desc': desc
        }
        $http.post('/myShop/setDescription', data).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;
    }

    this.setEvents = function(shopIdx, events) {
        var d = $q.defer();

        var datas = {
            shopIdx: shopIdx,
            events: events
        }
        $http.post('/myShop/setEvents', datas).then(function(result) {
            d.resolve(result.data);
        });

        return d.promise;

    }


    this.setJob = function(jobInfo) {

        var d = $q.defer();

        $http.post('/myShop/setJob', jobInfo).then(function(result) {
            d.resolve(result.data);
        })

        return d.promise;
    }

    this.setMainImages = function(imageInfo) {
        var d = $q.defer();

        $upload.upload({
            url: '/myShop/setMainImages',
            method: 'POST',
            file: imageInfo.file,
            data: {
                'shopIdx': imageInfo.shopIdx,
                'position': imageInfo.position
            }
        }).success(function(data, status, headers, config) {

            d.resolve(data);

        });

        return d.promise;
    }


    this.setMember = function(shopIdx, member) {

        var d = $q.defer();

        var updateInfo = {
            'shopIdx': shopIdx,
            'member': member,

        }

        $http.post('/myShop/setMember', updateInfo).then(function(result) {
            d.resolve(result.data);
        })
        return d.promise;
    }


    this.setPhoto = function(shopIdx, photoInfo, photo) {
        var d = $q.defer();
        console.log(photoInfo);
        $upload.upload({
            url: '/myShop/setPhoto',
            method: 'POST',
            file: photo,
            data: {
                'shopIdx': shopIdx,
                'photoInfo': photoInfo
            }
        }).success(function(data, status, headers, config) {
            if (data.status = "success") {
                d.resolve(data.image);
            }
        });
        return d.promise;
    }


    this.setPrices = function(shopIdx, prices) {
        var d = $q.defer();

        var shop = {
            'shopIdx': shopIdx,
            'prices': prices
        }

        $http.post('/myShop/setPrices', shop).then(function(result) {
            d.resolve(result.data);
        })
        return d.promise;
    }

    this.setShopInfo = function(shopIdx, shopInfo) {
        var d = $q.defer();

        var info = {
            shopIdx: shopIdx,
            shopInfo: shopInfo
        }

        $http.post('/myShop/setShopInfo', info).then(function(result) {
            d.resolve(result.data);
        });
        return d.promise;

    };
    this.setNoShow = function(reserve) {
        console.log(reserve);
        var d = $q.defer();

        var data = {
            'reserve': reserve
        }

        $http.post('/myShop/setNoShow', data).then(function(result) {
            d.resolve(result.data);

        });
        return d.promise;

    }

    this.kickDesigner = function(userIdx, shopIdx) {
        var d = $q.defer();

        var info = {
            'userIdx': userIdx,
            'shopIdx': shopIdx
        };
        $http.post('/myShop/kickDesigner', info).then(function(result) {
            d.resolve(result.data);

        });

        return d.promise;
    }


}]);