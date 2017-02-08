app.directive('sliderMain', function(){
	return {
        restrict : 'E',
        templateUrl : "/ng-app/shared/header/slider/slider.client.partial.html",
        link : function(scope, element, attrs){
        	scope.myInterval = 7000;
            var slides = scope.slides = [
                {
                    image : '/resource/img/slider/waves.gif',
                    image1 : '/resource/img/slider/0.png',  
                    text:'There is way to be fasion leader!',
                    text1:'Did you fail to hair cut?',
                    text2:'There is no more fail with this site'
                },
                {
                    image : '/resource/img/slider/waves.gif',
                    image1 : '/resource/img/slider/1.png', 
                    text:'Check the Prices',
                    text1:'Have you ever shocked for Prices?',
                    text2:'Check the prices on this site in advance'
                },
                {
                    image : '/resource/img/slider/waves.gif',
                    image1 : '/resource/img/slider/2.png', 
                    text:'Check your favorite designer!',
                    text1:'Does your favorite designer move to the other shop?',
                    text2:'You can check where is your favorite designer'
                },
                {
                    image : '/resource/img/slider/waves.gif',
                    image1 : '/resource/img/slider/3.png', 
                    text:'Check the comment!',
                    text1:'Is it okay to get haircut here?',
                    text2:'No more worries! you can check the comment that someone wrote'
                }
            ];

		}


    }

});