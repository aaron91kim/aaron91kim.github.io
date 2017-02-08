app.directive('myshopEvents', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myEvents/myEvents.client.partial.html",
		link: function(scope, element, attrs) {

			scope.$watch('selectedShop.shop._id', function() {
				scope.initEvent();
			});


			scope.initEvent = function() {
				var events = scope.selectedShop.shop.events;

				var eventObj = {
					title: "",
					percent: null
				}

				//ng-repeat을통해 DOM을 구성함.
				scope.events = {
					mainType: events.mainType,
					eventType: events.eventType,
					eventDesc: events.eventDesc,
					desc: events.desc,
					event: [eventObj]
				};

				if (events.event.length > 0) {
					scope.events.event = events.event;
				}

			}


			scope.addEvent = function() {
				var eventObj = {
					title: "",
					percent: null
				}

				scope.events.event.push(eventObj);


			}

			//할인이벤트 배열중 하나를 삭제
			scope.removeEvent = function(idx) {
				scope.events.event.splice(idx, 1);
			}

			//이벤트를 설정해줌.
			scope.setEvents = function(events) {
				var shopIdx = scope.selectedShop.shop._id;

				myShopService.setEvents(shopIdx, events).then(function(data) {

					if (data.status == 'success') {
						showMessage('We saved successfully.');
					}
				});
			}



		}
	}
}])