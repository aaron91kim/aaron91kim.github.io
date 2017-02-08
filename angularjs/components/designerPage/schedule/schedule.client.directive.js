app.directive('designerSchedule', ['$rootScope', 'pageService', function($rootScope, pageService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/designerPage/schedule/schedule.client.partial.html",
		link: function(scope, element, attrs) {
			$("#designerCalender").datepicker("refresh");
			$("#designerCalender").datepicker({
				onSelect: function(date, obj) {
					var selectedDate = new Date(obj.selectedYear, obj.selectedMonth, obj.selectedDay);
					scope.selectedDate = selectedDate;
					scope.getSchedule(scope.selectedDate);
				}
			});
			scope.getSchedule = function(selectedDate) {
				pageService.getDesignerSchedule(scope.designerIdx, selectedDate).then(function(data) {
					scope.daySchedules = data.schedules;
				});
			}
			scope.$watch('designerIdx', function() {
				scope.selectedDate = new Date();
				scope.getSchedule(scope.selectedDate);
			});
		}
	}
}])