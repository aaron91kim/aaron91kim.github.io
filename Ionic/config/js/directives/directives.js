directives.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        //페이스북 주소가 있을경우.
        if(attrs.fbsrc){
          attrs.$set('src',attrs.fbsrc);
        //페이스북주소도 없을경우.
        }else if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
        
      });
    }
  }
})
directives.directive('imageEqualizer', function($window) {
  return {
    link: function(scope, element, attrs) {

      var equalizeHeight = function(){
        var imageWidth = element.width();
        console.log(imageWidth);
        element.height(imageWidth);
      }
      var w = angular.element($window);

      equalizeHeight();    
      w.bind('resize',function(){
        equalizeHeight();
      })
    }
  }
})

directives.directive('hidePage', function(){
  return {
    restrict : 'A',
    link: function(scope, element, attrs){
      scope.accessCode = '';
      scope.accessKeyHint = '';
      scope.checkAccessKey = function(){
        if(scope.accessCode == 'a901432'){
          sessionStorage.setItem('secret', true);
          checkSessionStorage();
        }else{
          scope.accessKeyHint = '접속코드가 잘못되었습니다.'
        }
      }

      var checkSessionStorage = function(){
        if(sessionStorage.getItem('secret')){
          element.css('display','none');
          angular.element('#tempWrapper').removeClass('blur');

        }
      }
      checkSessionStorage();

    }
  }
})