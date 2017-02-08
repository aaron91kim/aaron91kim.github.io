app.directive("fixCenter", ['$window', function($window) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

			var boxWidth = attrs.width;
			var boxHeight = attrs.height;
			element.css('width', boxWidth);
			element.css('height', boxHeight);
			element.css('position', 'fixed');
			element.css('z-index', 1050);
			var documentWidth = $(window).width() / 2;
			var documentHeight = $(window).height() / 2;
			console.log($(window).scrollTop());
			var messageBoxLeft = documentWidth - (boxWidth / 2) + $(window).scrollLeft();
			var messageBoxTop = documentHeight - (boxHeight / 2) + $(window).scrollTop();
			element.css('left', messageBoxLeft);
			element.css('top', messageBoxTop);

			scope.$watch(function() {
				return element.attr('class');
			}, function() {

				//backdrop
				if (!element.hasClass('ng-hide') && attrs.backdrop == "true") {

					$('<div class="modal-backdrop in"></div>').appendTo(document.body);
				} else {
					$(".modal-backdrop").remove();
				}
				//scrollable
				if (!element.hasClass('ng-hide') && attrs.scrollable == "false") {
					$('body').addClass('stop-scrolling');
				} else {
					$('body').removeClass('stop-scrolling');
				}

			})
		}
	}
}])