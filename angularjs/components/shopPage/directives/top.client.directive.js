app.directive('pageSlider', ['pageService', function(pageService) {

    return {
        restrict: 'E',
        scope: {
            idx: '='
        },
        templateUrl: '/ng-app/components/main/shopPage/slider/slider.client.partial.html',
        link: function(scope, element, attrs) {


            //슬라이더를 만들어줌.
            $('#carousel').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                itemWidth: 70,
                itemMargin: 5,
                maxItems: 3,
                asNavFor: '#slider'
            });

            $('#slider').flexslider({
                animation: "slide",
                controlNav: false,
                animationLoop: false,
                slideshow: false,
                sync: "#carousel"
            });
        }
    }
}]);