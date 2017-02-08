'use strict';

app.service('seoService', ['$rootScope', function($rootScope) {
  var title = 'Hairnode :: Find your style';
  var metaKeywords = 'hair salon in canada, hair salon';
  var metaDescription = '';

  this.setTitle = function(newTitle) {
    $rootScope.title = newTitle;
  }
  this.reset = function() {
      $rootScope.title = title;
      $rootScope.metaDescription = metaDescription;
      $rootScope.metaKeywords = metaKeywords;
    },
    this.setDescription = function(newMetaDescription) {
      $rootScope.metaDescription = newMetaDescription;
    },
    this.appendKeywords = function(newKeywords) {
      for (var key in newKeywords) {
        if (metaKeywords === '') {
          metaKeywords += newKeywords[key].name;
        } else {
          metaKeywords += ', ' + newKeywords[key].name;
        }
      }

      $rootScope.metaKeywords = metaKeywords;
    }


}]);