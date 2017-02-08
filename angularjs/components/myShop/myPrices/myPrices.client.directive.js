app.directive('myshopPrices', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myPrices/myPrices.client.partial.html",
		link: function(scope, element, attrs) {

			//아이템을 추가하여줌.
			scope.addItem = function(sort) {
				var obj = {
					'name': null,
					'price': null,
					'sale': null
				}

				switch (sort) {
					case 'cut':
						scope.prices.cut.push(obj)
						break;
					case 'color':
						scope.prices.color.push(obj)
						break;
					case 'clinic':
						scope.prices.clinic.push(obj)
						break;
					case 'perm':
						scope.prices.perm.push(obj)
						break;
				}

			}



			//price의 배열 내부 요소를 삭제.
			scope.removeItem = function(sort, index) {

				switch (sort) {
					case 'cut':
						scope.prices.cut.splice(index, 1);
						break;
					case 'color':
						scope.prices.color.splice(index, 1);
						break;
					case 'clinic':
						scope.prices.clinic.splice(index, 1);
						break;
					case 'perm':
						scope.prices.perm.splice(index, 1);
						break;
				}
			}

			//price를 최종적으로 세팅하여줌.
			scope.setPrices = function(prices) {
				var shopIdx = scope.selectedShop.shop._id;

				var promise = myShopService.setPrices(shopIdx, prices);
				promise.then(function(data) {
					if (data.status == 'success') {
						showMessage('We saved your Price information successfully.');
					}
				});
			}



		}
	}
}])