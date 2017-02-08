app.directive('myshopMembers', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myMembers/myMembers.client.partial.html",
		link: function(scope, element, attrs) {

			// 회원추가.
			scope.addMember = function(member) {
				myShopService.addMember(scope.shopIdx, member).then(function(data) {
					console.log(data);
					if (data.status == 'success') {
						hideMessageForm('#addMemberForm');
						scope.addMemberInfo = {};
						scope.members = data.members;
						// showMessage('성공적으로 등록하였습니다.');

					}
				})
			}

			scope.orderBy = function(sort) {

				scope.predicate = sort;
				if (scope.reverse) {
					scope.reverse = false
				} else {
					scope.reverse = true;
				}
			}

			//회원 삭제
			scope.removeMember = function(member) {

				var promise = myShopService.removeMember(scope.shopIdx, member);

				console.log(scope.memberPaging.filteredMembers);

				promise.then(function(data) {
					if (data.status == 'success') {
						// scope.memberPaging.filteredMembers.splice(idx, 1);
						scope.members = data.members;
						// showMessage('성공적으로 삭제하였습니다.');
					}
				})
			}

			//회원정보 설정
			scope.setMember = function(member) {

				var promise = myShopService.setMember(scope.shopIdx, member);

				promise.then(function(data) {
					if (data.status == 'success') {

						// showMessage('성공적으로 변경하였습니다.');
					}
				})
			}



			//페이징처리를함.
			scope.setPaging = function() {

				scope.memberPaging = {
					currentPage: 0,
					pageSize: 11,
					filteredMembers: [],
					numberOfPages: function() {

						var pageNumber = Math.ceil(this.filteredMembers.length / this.pageSize);

						//페이지가 1 이하일때 현제페이지를 0과 1으로 초기화시킴.
						if (pageNumber == 1) {
							this.currentPage = 0;
						} else if (pageNumber == 0) {
							this.currentPage = -1;
						}
						return pageNumber

					}

				}

			}


			//페이징처리!
			scope.setPaging();



		}
	}
}])