app.directive('pageSlider', ['pageService', function(pageService) {
    return {
        restrict: 'E',
        templateUrl: '/ng-app/components/shopPage/slider/slider.client.partial.html',
        link: function(scope, element, attrs) {
            scope.myInterval = 5000;
            scope.$watch('pageIdx', function() {
                scope.slides = [{
                    image: "/userAssets/shops/" + scope.pageIdx + "/image1.jpg"
                }, {
                    image: "/userAssets/shops/" + scope.pageIdx + "/image2.jpg"
                }, {
                    image: "/userAssets/shops/" + scope.pageIdx + "/image3.jpg"
                }]

            })
        }
    }
}]);