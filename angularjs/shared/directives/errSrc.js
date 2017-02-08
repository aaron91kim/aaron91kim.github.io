app.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {

        //페이스북 주소가 있을경우.
        if (attrs.fbsrc) {
          attrs.$set('src', attrs.fbsrc);
          //페이스북주소도 없을경우.
        } else if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }

      });
    }
  }
});