'use strict';

app.directive('pageJob', ['pageService', function(pageService) {
	return {

		restrict: 'E',
		templateUrl: "/ng-app/components/shopPage/job/job.client.partial.html",
		link: function(scope, element, attrs) {


			//미용실에 미용사가 구직신청을 함.
			scope.applyJob = function() {
				var shopIdx = scope.nowShopData.shop._id;

				pageService.applyJob(shopIdx).then(function(data) {
					if (data.status == 'success') {
						console.log(data);
						showMessage('You applied to ' + scope.nowShopData.shop.shopName);
						scope.isPending = true;
					}
				});
			}

			//미용사가 미용실에 구직신청을 취소함.
			scope.cencelJob = function() {
				var shopIdx = scope.nowShopData.shop._id;

				pageService.cencelJob(shopIdx).then(function(data) {
					if (data.status == 'success') {
						console.log(data);
						showMessage('You cancel your application');
						scope.isPending = false;
					}
				})

			}


		}


	}



}])