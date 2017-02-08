app.directive('designerComment', ['$rootScope', 'pageService', function($rootScope, pageService) {

	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/designerPage/comment/comment.client.partial.html",

		link: function(scope, element, attrs) {

			//init
			scope.userComment = '';
			scope.selectedDesigner = '';
			scope.designerComments = {
					comments: [],
					'max': 0,
					'now': 0
				}
				//코멘트를 등록하여줌.
			scope.getComments = function() {
				pageService.getComments([scope.designerIdx], null, scope.designerComments.now).then(function(data) {
					scope.designerComments.now += data.comments.length;
					scope.designerComments.max = data.count;
					for (var i in data.comments) {
						scope.designerComments.comments.push(data.comments[i]);
					}
				})
			}

			scope.addComment = function(comment) {
				//로그인된상태에서만 가능.
				if ($rootScope.loggedIn) {
					if (comment != '' && comment) {
						pageService.addComment(scope.designerIdx, null, comment).then(function(data) {
							if (data.status == 'success') {
								scope.designerComments.comments.unshift(data.comment);
								scope.designerComments.max += 1;
								scope.designerComments.now += 1;
								scope.userComment = '';
							}
						});
					} else {
						//코멘트가 비어있을경우.
						showMessage('Please type some comment');
					}
				} else {
					scope.showLoginConfirm();
				}
			}

			scope.removeComment = function(commentIdx, arrIdx) {
				pageService.removeComment(commentIdx).then(function(data) {
					if (data.status == 'success') {
						scope.designerComments.comments.splice(arrIdx, 1);
						scope.designerComments.max -= 1;
						scope.designerComments.now -= 1;
					}
				})
			}

			scope.$watch('designerIdx', function() {
				scope.designerComments = {
					comments: [],
					'max': 0,
					'now': 0
				}
				scope.getComments();
			})

		}
	}
}]);