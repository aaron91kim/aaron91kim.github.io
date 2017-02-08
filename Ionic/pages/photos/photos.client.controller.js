'use strict';

controllers.controller('PhotosCtrl', function($scope, $http, $location, $timeout, $state) {
  var timer = null;
  $scope.create = function(){
    $state.go('app.uploadPhoto')
  }
  $scope.search = {
    query : '',
    photos : {
      max : 0,
      now : 0,
      datas : []
    }
  }
  $scope.period = 'all';


  // 쿼리에 맞게 사진을 가져옴. 
  $scope.getPhotos = function(){
    $http({
      url : '/mobile/search/photo/getPhotos',
      method : "GET",
      params : {
        'query' : $scope.search.query
      }
    }).then(function(result){
      console.log(result.data);
      
      $scope.search.photos.datas = result.data.photos;
      $scope.search.photos.max = result.data.counter;
      if($scope.search.photos.max > 12){
        $scope.search.photos.now = 12;
      }else{
        $scope.search.photos.now = $scope.search.photos.datas.length;
      }
    });
  }

  $scope.$watch('search.query',function(newVal, oldVal){
    if (timer) $timeout.cancel(timer);
    if(newVal != oldVal){
      timer = $timeout(function() {
        $scope.getPhotos();
      }, 500); 
    }
  })

  $scope.getMorePhotos = function(){
   
      $http({
          url : '/mobile/search/photo/morePhotos',
          method : "GET",
          params : {
              'query' : $scope.search.query,
              'now' : $scope.search.photos.now,
              'sort' : $location.search().photoSort,
              'self' : $location.search().photoSelf
          }
      }).then(function(result){
        if(result.data.status == 'success'){
          
          angular.forEach(result.data.photos,function(photo){
            $scope.search.photos.datas.push(photo);
          })
          $scope.$broadcast('scroll.infiniteScrollComplete');
          $scope.search.photos.now = $scope.search.photos.now + result.data.photos.length;
        }

      })
    
  }


  // 
  $scope.getTop10Photos = function(date){
      //today week month year
    $http({
      url : '/mobile/photo/rank/getTop10Photos',
      method : "GET",
      params : {
          'date' : date
      }
    }).then(function(result){
      if(result.data.status == 'success'){
        $scope.top10Photos = result.data.photos;
      }
    })
  }  

  $scope.changePeriod = function(period){
    $scope.period = period;
    $scope.getTop10Photos(period);
  }


  // 세션의 좋아요를 통하여 사진을 가져옴.(로그인필요.)
  $scope.getPhotosByLike = function(){
    $http.get('/mobile/photo/getPhotosByLike').then(function(result){
        console.log(result);
        if(result.data.status == 'success'){
            $scope.likePhotos = result.data.photos;
        }
    })
  }


  $scope.toPhotoInfo = function(photo){
    $location.path('app/photo/photoInfo/'+photo._id);
  }

})
