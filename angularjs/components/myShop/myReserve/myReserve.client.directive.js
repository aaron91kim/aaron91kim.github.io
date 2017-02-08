app.directive('myshopReserve', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myReserve/myReserve.client.partial.html",

		link: function(scope, element, attrs) {

			//reserve가 왔을때 실시간으로 업데이트하여줌.
			socket.on('updateReserve', function() {
				$("#alarm")[0].play();
				scope.getNewReserves();

			})

			scope.selectedDate = new Date();


			//selectedShop의 인덱스가 바뀌었을경우 현재 디렉티브에서 호출해야하는 함수.
			scope.$watch('selectedShop.shop._id', function() {
				scope.getNewReserves();
				scope.getOnedayReserves(scope.selectedDate);

			})
			scope.cancelBook = {
				reason: ''
			};
			scope.schedules = {};


			scope.setReservable = function(status) {
				var shopIdx = scope.selectedShop.shop._id;

				myShopService.setReservable(shopIdx, status).then(function(data) {

					if (data.status == 'success') {

						if (status) {
							showMessage('Now booking is available');

						} else {
							showMessage('Now booking is unavailable');
						}
						scope.selectedShop.shop.reservable = status;
					}

				});
			}
			scope.getNewReserves = function() {
				var shopIdx = scope.selectedShop.shop._id;

				myShopService.getNewReserves(shopIdx).then(function(data) {

					if (data.status == 'success') {
						console.log(data);
						scope.selectedShop.newReserves = data.reserves;

					}

				});

			}

			//클릭한 날의 예약을 확인함.
			scope.getOnedayReserves = function(selectedDate) {

				var shopIdx = scope.selectedShop.shop._id;

				scope.schedules.selectedDate = selectedDate;
				myShopService.getOnedayReserves(shopIdx, selectedDate).then(function(data) {

					if (data.status == 'success') {
						console.log(data);
						scope.selectedShop.reserves = data.reserves;
					}

				})
			}

			scope.setReserve = function(reserve, valid) {

				myShopService.setReserve(reserve, valid).then(function(data) {
					if (data.status == 'success') {
						scope.getNewReserves();
						if (valid) {
							showMessage('You accept this request');
						} else {
							scope.cancelForm = false;
							showMessage('You cancel this request');
						}
						socket.emit('updateReserve', {
							'room': scope.selectedShop.shop._id
						});
					}
				});
			}
			scope.setNoShow = function(noShow) {
				scope.selectedReserve.noShow = noShow
				myShopService.setNoShow(scope.selectedReserve).then(function(data) {
					if (data.status == 'success') {

						if (noShow) {
							showMessage(scope.selectedReserve.user.firstName + ' ' + scope.selectedReserve.user.lastName + ' didn\'t show up');
						} else {
							showMessage(scope.selectedReserve.user.firstName + ' ' + scope.selectedReserve.user.lastName + ' showed up');
						}
					}
				})
			}
			scope.showCancelForm = function(reserve) {
				console.log(reserve);
				scope.cancelForm = true;
				scope.cancelBook = reserve;

			}
			scope.showSelectedReserve = function(reserve) {
				scope.selectedReserve = reserve;
				scope.checkBookForm = true;

			}

			scope.getNewReserves();

			$("#reserve-status").datepicker({

				onSelect: function(date, obj) {

					scope.selectedDate = new Date(obj.selectedYear, obj.selectedMonth, obj.selectedDay)
						// scope.getSchedule(shopIdx, selectedDate);
					scope.getOnedayReserves(scope.selectedDate);


				}
			});

		}
	}
}])