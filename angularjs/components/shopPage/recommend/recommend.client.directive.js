app.directive('pageRecommend', ['pageService', function(pageService) {

    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/shopPage/recommend/recommend.client.partial.html",
        link: function(scope, element, attrs) {
            $('.slick-slider').slick({
                dots: false,
                slidesToShow: 4,
                slidesToScroll: 4
            });
        }
    }
}]);