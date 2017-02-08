app.directive('myshop', ['myShopService', '$window', '$timeout', function(myShopService, $window, $timeout) {
  return {
    restrict: 'E',
    templateUrl: "/ng-app/components/myShop/myShopInformation/myShopInformation.client.partial.html",
    link: function(scope, element, attrs) {

      scope.handleChangePlace = function(place, input) {
        var address = fillInAddress(place);
        address = addressToDBForm(address);
        address.findAddress = input.value;
        scope.manageShop.location.latitude = place.geometry.location.lat();
        scope.manageShop.location.longitude = place.geometry.location.lng();
        scope.manageShop.address = address;
        scope.map.center = scope.manageShop.location;
        scope.marker.coords = scope.manageShop.location;
      }

      scope.initAutoPlace = function() {
        var inputForm = document.getElementById('address');
        var autocompleteFrom = new google.maps.places.Autocomplete(inputForm);
        google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
          var place = autocompleteFrom.getPlace();

          scope.$apply(function() {
            scope.handleChangePlace(place, inputForm);

          })
        });
      }

      var initMyShop = function(scope) {

        scope.manageShop = {
            shopName: scope.selectedShop.shop.shopName,
            shopTel: scope.selectedShop.shop.shopTel,
            address: scope.selectedShop.shop.address,
            location: {
              latitude: scope.selectedShop.shop.location.latitude,
              longitude: scope.selectedShop.shop.location.longitude
            }
          }
          //google maps
        scope.map = {
          center: {
            latitude: scope.selectedShop.shop.location.latitude,
            longitude: scope.selectedShop.shop.location.longitude
          },
          zoom: 15
        };

        scope.options = {
          scrollwheel: false
        };

        scope.marker = {
          id: 0,
          title: scope.selectedShop.shop.shopName,
          coords: {
            latitude: scope.selectedShop.shop.location.latitude,
            longitude: scope.selectedShop.shop.location.longitude
          }
        }

        scope.marker.options = {
          draggable: true,
          clickable: true,
          labelAnchor: "100 0"
        }

        scope.events = {
          dragend: function(marker) {
            scope.manageShop.location.latitude = marker.getPosition().lat();
            scope.manageShop.location.longitude = marker.getPosition().lng();
          }
        }

        //초기값. 
        scope.weekDay = {
          from: {},
          to: {}
        };
        scope.weekend = {
          from: {},
          to: {}
        };

        //초기값. (아무것도 없을경우.)
        scope.offDays = [{
          day: 'mon',
          off: false
        }, {
          day: 'tue',
          off: false
        }, {
          day: 'wed',
          off: false
        }, {
          day: 'thu',
          off: false
        }, {
          day: 'fri',
          off: false
        }, {
          day: 'sat',
          off: false
        }, {
          day: 'sun',
          off: false
        }, ];

        //초기값 시간들.
        scope.openTime = {
          hours: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10',
            '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24'
          ],
          minutes: ['00', '15', '30', '45']
        }

        //쉬는날 배열.
        if (scope.selectedShop.shop.dayOff) {
          for (var i = 0; i < scope.offDays.length; i++) {
            for (var j = 0; j < scope.selectedShop.shop.dayOff.length; j++) {
              if (scope.offDays[i].day == scope.selectedShop.shop.dayOff[j]) {
                scope.offDays[i].off = true;
              }
            }
          }
        }
        //영업시간
        if (scope.selectedShop.shop.time) {
          scope.weekDay = scope.selectedShop.shop.time.weekDay;
          scope.weekend = scope.selectedShop.shop.time.weekend;
        }
      }

      scope.initMapPosition = function() {
        scope.marker.coords.latitude = scope.manageShop.location.latitude;
        scope.marker.coords.longitude = scope.manageShop.location.longitude;
        scope.map.center.latitude = scope.manageShop.location.latitude;
        scope.map.center.longitude = scope.manageShop.location.longitude;
      }


      scope.setShopInfo = function(shopInfo) {
        var shopIdx = scope.selectedShop.shop._id;
        var promise = myShopService.setShopInfo(shopIdx, shopInfo);
        promise.then(function(data) {
          if (data.status == 'success') {
            showMessage('We change the information completely.');
          }
        })
      }


      //shop의 영업시간과 휴일을 변경하여줌.
      scope.setWorkTime = function() {
        console.log(scope.offDays);
        var shopIdx = scope.selectedShop.shop._id;

        var dayOff = [];
        for (var i = 0; i < scope.offDays.length; i++) {
          if (scope.offDays[i].off == true) {
            dayOff.push(scope.offDays[i].day);
          }
        }

        var time = {
          weekDay: scope.weekDay,
          weekend: scope.weekend
        }

        var promise = myShopService.setWorkTime(shopIdx, dayOff, time);

        promise.then(function(data) {
          if (data.status == 'success') {
            showMessage('We change the information completely.');
          }
        })
      }

      //주소값.
      scope.$watch('selectedShop.shop._id', function() {
        initMyShop(scope);
        scope.initMapPosition();
      })

      scope.initAutoPlace();
    }
  }
}])