app.directive('myshopDesigners', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myDesigners/myDesigners.client.partial.html",
		link: function(scope, element, attrs) {

			//신청한 디자이너를 받아들임
			scope.acceptNewDesigner = function(userIdx, arrIdx) {
				var shopIdx = scope.selectedShop.shop._id;
				var promise = myShopService.acceptNewDesigner(userIdx, shopIdx);
				promise.then(function(data) {
					if (data.status == 'success') {
						console.log(data);
						var designerName = scope.selectedShop.pendingDesigners[arrIdx].user.firstName
						scope.selectedShop.pendingDesigners[arrIdx].user.lastName;
						// scope.selectedShop.pendingDesigners[arrIdx].working.level = 1;
						// scope.selectedShop.designers.push(scope.selectedShop.designers[arrIdx]);
						scope.selectedShop.designers = data.designers;
						var splicedDesigner = scope.selectedShop.pendingDesigners.splice(arrIdx, 1);
						showMessage(designerName + 'is now your shop\'s designer');
					}
				})
			}

			//신청한 디자이너를 거절함.
			scope.declineNewDesigner = function(userIdx, arrIdx) {
				var shopIdx = scope.selectedShop.shop._id;
				var promise = myShopService.declineNewDesigner(userIdx, shopIdx);
				promise.then(function(data) {
					if (data.status == 'success') {
						var designerName = scope.selectedShop.applyingDesigners[arrIdx].user.name;
						scope.selectedShop.applyingDesigners.splice(arrIdx, 1);

						showMessage(designerName + '님의 신청을 거부하였습니다.');
					}
				});
			}

			//디자이너를 퇴출시킴.
			scope.kickDesigner = function(userIdx, arrIdx) {
				var shopIdx = scope.selectedShop.shop._id;
				myShopService.kickDesigner(userIdx, shopIdx).then(function(data) {
					if (data.status == 'success') {
						var designerName = scope.selectedShop.designers[arrIdx].user.firstName +
							scope.selectedShop.designers[arrIdx].user.lastName;

						scope.selectedShop.designers.splice(arrIdx, 1);
						showMessage(designerName + 'has been removed');
					}
				})

			}


			scope.confirmOut = function(arrIdx) {
				scope.selectedShop.designers[arrIdx].isVisible = true;
			}

		}
	}
}])