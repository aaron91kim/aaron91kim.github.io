app.directive('searchDir', ['$rootScope', 'mainService', '$routeParams', function($rootScope, mainService, $routeParams) {

	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			//기본적인 search변수. 데이터의 갯수와 현재갯수를 담는다.
			scope.search = {
				location: {},
				query: "",
				shops: {
					max: 0,
					now: 0,
					datas: []
				},
				designers: {
					max: 0,
					now: 0,
					datas: []
				}
			}

			function handleChangePlace(place) {
				var address = new fillInAddress(place);
				address = addressToDBForm(address);
				scope.search.location = address;
			}

			scope.initAutoPlace = function() {
				var inputForm = document.getElementById('location');
				var autocompleteFrom = new google.maps.places.Autocomplete(inputForm);
				google.maps.event.addListener(autocompleteFrom, 'place_changed', function() {
					var place = autocompleteFrom.getPlace();
					scope.$apply(function() {
						handleChangePlace(place);
					})
				});
			}

			scope.searchInit = function() {
				var promise = mainService.initSearch(scope.search.location, scope.search.query);
				promise.then(function(data) {
					if (data.status == 'success') {
						mainService.searchedData = data;
						//데이터를 넣어주고 업데이트신호를 보냄.
						$rootScope.$emit('searchUpdate');

						scope.search.shops.datas = data.shops;
						scope.search.shops.max = data.shops.length;
						if (scope.search.shops.max > 5) {
							scope.search.shops.now = 5;
						} else {
							scope.search.shops.now = scope.search.shops.max;
						}

						scope.search.designers.datas = data.designers;
						scope.search.designers.max = data.designers.length;
						if (scope.search.designers.max > 5) {
							scope.search.designers.now = 5;
						} else {
							scope.search.designers.now = scope.search.designers.max;
						}
					}
				})
			}

			scope.showMoreShops = function() {

				scope.search.shops.now = scope.search.shops.now + 5;
				if (scope.search.shops.now > scope.search.shops.max) {
					scope.search.shops.now = scope.search.shops.max;
				}

			}

			scope.showMoreDesigners = function() {

				scope.search.designers.now = scope.search.designers.now + 5;
				if (scope.search.designers.now > scope.search.designers.max) {
					scope.search.designers.now = scope.search.designers.max;
				}

			}

			// initialize at the first time when this directive is loaded 
			scope.searchInit();
			scope.initAutoPlace();
		}
	}


}]);