app.controller('favoriteCtrl', ['$rootScope', '$scope', '$timeout', 'favoriteService', 'seoService', function($rootScope, $scope, $timeout, favoriteService, seoService) {

	$scope.init = function() {
		$scope.getFavoriteDatas();
		seoService.reset();
		seoService.setTitle('Hairnode :: My Favorite List');
	}

	$scope.getFavoriteDatas = function() {

		favoriteService.getFavoriteDatas().then(function(data) {
			if (data.status == 'success') {
				console.log(data);
				$scope.shopDatas = data.shopDatas;
				$scope.designerDatas = data.designerDatas;
			}
		});
	}

}])