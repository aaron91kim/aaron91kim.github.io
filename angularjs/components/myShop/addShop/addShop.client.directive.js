app.directive('addShop', ['myShopService', function(myShopService) {
    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/myShop/addShop/addShop.client.partial.html",
        link: function(scope, element, attrs) {


            function initAddShop(scope) {
                return {
                    location: {
                        latitude: 0,
                        longitude: 0
                    },
                    address: '',
                    postalCode: ''
                }
            }

            scope.shopInfo = initAddShop(scope);

            function handleChangePlace(place, input) {
                var address = fillInAddress(place);
                address = addressToDBForm(address);
                address.findAddress = input.value;
                scope.shopInfo.location.latitude = place.geometry.location.lat();
                scope.shopInfo.location.longitude = place.geometry.location.lng();
                scope.shopInfo.address = address;
            }

            scope.initAutoPlace = function() {
                var inputForm = document.getElementById('address');
                var autocompleteFrom = new google.maps.places.Autocomplete(inputForm);
                google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
                    var place = autocompleteFrom.getPlace();
                    scope.$apply(function() {
                        handleChangePlace(place, inputForm);
                    })
                });
            }

            scope.addShop = function() {
                console.log(scope.shopInfo);
                var promise = myShopService.addShop(scope.shopInfo);
                promise.then(function(data) {
                    if (data.status == 'success') {
                        showMessage('Shop has been aplied successfully');
                        scope.shopInfo = {};
                        scope.getMyShopList();
                    }
                });
            }
            scope.initAutoPlace();
        }
    }
}])