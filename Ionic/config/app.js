// Ionic app App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'app.controllers' is found in controllers.js
angular.module('myApp', [
  'ionic',
  'ngCordova',
  'ngCookies',
  'ngImgCrop',
  'angularFileUpload',
  'myApp.controllers',
  'myApp.directives',
  'myApp.services',
  'facebook'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, FacebookProvider) {
  
  FacebookProvider.init('712699915433023');
  $ionicConfigProvider.tabs.position('bottom');

  $stateProvider
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "ng-app/mobile/menu/menu.client.partial.html",
    controller: 'MenuCtrl'
  })
  .state('app.photo', {
    url: "/photo",
    views: {
      'menuContent': {
        templateUrl: "ng-app/mobile/pages/photos/photos.client.partial.html",
        controller: 'PhotosCtrl'
      }
    }
  })
  .state('app.singlePhoto', {
    url: "/photo/photoInfo/:photoId",
    views: {
      'menuContent': {
        templateUrl: "ng-app/mobile/pages/photos/info/photoinfo.client.partial.html",
        controller: 'PhotoInfoCtrl'
      }
    }
  })
  .state('app.uploadPhoto',{
    url : "/photo/uploadPhoto",
    views : {
      'menuContent' : {
        templateUrl: "ng-app/mobile/pages/photos/upload/uploadPhoto.client.partial.html",
        controller: 'UploadPhotoCtrl'
      }
    }
  })
  .state('app.singleUser',{
    url : "/user/userInfo/:userId",
    views : {
      'menuContent' :{
        templateUrl : "ng-app/mobile/pages/users/info/userInfo.client.partial.html",
        controller : 'UserInfoCtrl'
      }
    }
  })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/photo');
})
.factory('authHttpResponseInterceptor',['$q','$rootScope',function($q,$rootScope){
    
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
                $rootScope.$emit('Unauthorized');
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $rootScope.$emit('Unauthorized');
                
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);

var services = angular.module('myApp.services',[]);
var controllers = angular.module('myApp.controllers', []);
var directives = angular.module('myApp.directives', []);
