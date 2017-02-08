app.directive('hotNews', function($rootScope, $timeout, $compile) {

	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/main/hotNews.html",
		link: function(scope, element, attrs) {}
	}
});

app.directive('tapControl', ['$rootScope', '$window', function($rootScope, $window) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			function getScrollOffsets(w) {

				// Use the specified window or the current window if no argument 
				w = w || window;

				// This works for all browsers except IE versions 8 and before
				if (w.pageXOffset != null) return {
					x: w.pageXOffset,
					y: w.pageYOffset
				};

				// For IE (or any browser) in Standards mode
				var d = w.document;
				if (document.compatMode == "CSS1Compat") {
					return {
						x: d.documentElement.scrollLeft,
						y: d.documentElement.scrollTop
					};
				}

				// For browsers in Quirks mode
				return {
					x: d.body.scrollLeft,
					y: d.body.scrollTop
				};
			}

			angular.element($window).bind("scroll", function() {

				var nowScroll = getScrollOffsets($window)
				if (nowScroll.y > 490) {
					element.addClass('chase-scroll');
				} else {
					element.removeClass('chase-scroll');
				}

			});
		}
	}
}]);