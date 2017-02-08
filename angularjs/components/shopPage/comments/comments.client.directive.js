'use strict';

app.directive('pageComment', ['$rootScope', 'pageService', function($rootScope, pageService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/shopPage/comments/comments.client.partial.html",
		link: function(scope, element, attrs) {

			scope.userComment = '';
			scope.selectedDesigner = '';

			scope.shopComments = {
				comments: [],
				'max': 0,
				'now': 0
			}

			scope.$watch('nowShopData.designers', function() {
				if (scope.nowShopData) {
					scope.getComments();
				}

			})

			//코멘트를 등록하여줌.
			scope.addComment = function(comment) {

				//로그인된상태에서만 가능.
				if ($rootScope.loggedIn) {

					if (comment != '' && comment) {

						if (scope.selectedDesigner != '') {


							var shopIdx = scope.nowShopData.shop._id;
							var designerIdx = scope.selectedDesigner;



							pageService.addComment(designerIdx, shopIdx, comment).then(function(data) {
								if (data.status == 'success') {

									scope.shopComments.comments.unshift(data.comment);
									scope.shopComments.max += 1;
									scope.shopComments.now += 1;
									scope.userComment = '';

								}
							});
						} else {
							showMessage('Please select a designer');
						}
					} else {
						//코멘트가 비어있을경우.
						showMessage('Please type some comments');
					}



				} else {
					scope.showLoginConfirm();
				}



			}

			//코멘트를 삭제함.
			scope.removeComment = function(commentIdx, arrIdx) {

				pageService.removeComment(commentIdx).then(function(data) {
					if (data.status == 'success') {
						showMessage('You delete your comment completely.');
						scope.shopComments.comments.splice(arrIdx, 1);
						scope.shopComments.max -= 1;
						scope.shopComments.now -= 1;
					}
				})
			}


			//미용사 이미지를 눌렀을때 코멘트를 가져옴. 또한 더보기 버튼을 눌렀을경우에도 코멘트를 추가로 가져와서 넣어줌.
			scope.getComments = function() {
				var designers = [];
				var shopIdx = scope.pageIdx;
				// var designerIdx = scope.selectedDesigner;

				for (var i = 0; i < scope.nowShopData.designers.length; i++) {
					designers.push(scope.nowShopData.designers[i].user._id);
				}



				pageService.getComments(designers, shopIdx, scope.shopComments.now).then(function(data) {

					if (data.status == 'success') {
						//미용실전체코멘트와 현제 몇개가 있는지를 넣어줌.    
						scope.shopComments.max = data.count;
						scope.shopComments.now += data.comments.length;

						for (var i in data.comments) {
							scope.shopComments.comments.push(data.comments[i]);
						}
					}

				})



			}



			//이용후기에서 디자이너이미지를 눌러 디자이너를 선택함.
			scope.selectDesignerInComment = function(userIdx) {
				if (scope.selectedDesigner == userIdx) {
					scope.selectedDesigner = '';
				} else {
					scope.selectedDesigner = userIdx;

					//초기화하여줌.
					// $scope.selectedComments.comments = [];
					// $scope.selectedComments.now = 0;
					// $scope.selectedComments.max = 0;

					// $scope.getComments();
				}
			}



		}
	}
}]);