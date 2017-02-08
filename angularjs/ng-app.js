var app = angular.module('hairnode', [
    'ngRoute',
    'facebook',
    'uiGmapgoogle-maps',
    // 'ngAnimate',
    'textAngular',
    'angularFileUpload',
    'ui.bootstrap',
    'seo'
]);

app.config(function($routeProvider, $locationProvider, FacebookProvider, uiGmapGoogleMapApiProvider) {

    FacebookProvider.init('894629970626168');
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    uiGmapGoogleMapApiProvider.configure({
        v: '3.17',
        libraries: ''
    })

    $routeProvider
        .when('/', {
            templateUrl: '/ng-app/components/main/main.client.index.html',
            reloadOnSearch: false
        })
        .when('/about', {
            templateUrl: '/ng-app/shared/footer/footer.html'
        })
        .when('/aboutUs', {
            templateUrl: '/ng-app/shared/footer/aboutUs.html'
        })
        .when('/termsOfService', {
            templateUrl: '/ng-app/shared/footer/termsOfService.html'
        })
        .when('/notifications', {
            templateUrl: '/ng-app/components/notification/notification.client.index.html',
            controller: 'notificationCtrl'
        })
        .when('/booking', {
            templateUrl: '/ng-app/components/booking/booking.client.index.html',
            controller: 'bookingCtrl'
        })
        .when('/favorites', {
            templateUrl: '/ng-app/components/favorite/favorite.client.index.html',
            controller: 'favoriteCtrl'
        })
        .when('/userSetting', {
            templateUrl: '/ng-app/components/userSetting/userSetting.client.index.html',
            controller: 'userSettingCtrl'
        })
        .when('/myShop', {
            templateUrl: '/ng-app/components/myShop/myShop.client.index.html',
            controller: 'myShopCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

});