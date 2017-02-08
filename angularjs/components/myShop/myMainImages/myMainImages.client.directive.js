app.directive('myshopMainimages', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myMainImages/myMainImages.client.partial.html",
		link: function(scope, element, attrs) {


			//메인이미지들을 설정
			scope.setMainImages = function($files, imagePosition) {
				var shopIdx = scope.selectedShop.shop._id;
				var file = $files[0];

				var imageInfo = {
					'shopIdx': shopIdx,
					'file': file,
					'position': imagePosition
				}

				myShopService.setMainImages(imageInfo).then(function(data) {
					if (data.status == 'success') {
						// showMessage('we save your image successfully');

					}
				});

			}


			$("#mainUpload").change(function() {
				readURL(this, '#mainPreview');
			});
			$("#image1Upload").change(function() {
				readURL(this, '#image1Preview');
			});
			$("#image2Upload").change(function() {
				readURL(this, '#image2Preview');
			});
			$("#image3Upload").change(function() {
				readURL(this, '#image3Preview');
			});



		}
	}
}])