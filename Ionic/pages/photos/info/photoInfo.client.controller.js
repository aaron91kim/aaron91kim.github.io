'use strict';

controllers.controller('PhotoInfoCtrl', function($scope,$rootScope, $stateParams, $http, $window, $ionicModal, $ionicPopup) {
  // Create the login modal that we will use later
  
  $ionicModal.fromTemplateUrl('ng-app/mobile/pages/photos/info/photoInfo.comments.client.modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.commentModal = modal;
  });

  $scope.shouldShowDelete = false;
  $scope.feedPost = function(){
    var picture = $window.location.origin+'/userAssets/users/'+$scope.photo.writer._id+'/album/'+$scope.photo.photo;
    console.log(picture)
    FB.ui({
      method: 'feed',
      link: $window.location.href,
      picture : picture,
      caption : '네일핑키',
      description : '나에게 꼭 맞는 네일샵 비교해보세요.'
    }, function(response){
        console.log(response);
    });
  }

  $scope.getPhotoById = function(){
    $http({
      url : '/mobile/photo/getPhotoById',
      method : "GET",
      params : {
        'photoId' : $stateParams.photoId
      }
    }).then(function(result){
      $scope.photo = result.data.photo;
      console.log($scope.photo);

      $scope.checkLikePhoto();
    })
  
  }

  $scope.checkLikePhoto = function(){
    var result = false;
      if($scope.photo){
        angular.forEach($scope.photo.like, function(like){
            if(like.user == $rootScope.initData._id){
                return result = true;
            }
        })
      }
      return result;
  }

  //좋아요
  $scope.addLike = function(){
    if($rootScope.initData._id){
        var data = {
            photoIdx : $stateParams.photoId
        }
        $http.post('/main/addLike',data).then(function(result){
            if(result.data.status == 'success'){
                $scope.photo.like = result.data.photo.like;
                $scope.isLike = true;
            }
        });
    }else{
      $scope.requireLogin();
    }
      
  }

  $scope.removeLike = function(){
    if($rootScope.initData._id){
        var data = {
            photoIdx : $stateParams.photoId
        }
        $http.post('/main/removeLike',data).then(function(result){
            if(result.data.status == 'success'){
                $scope.photo.like = result.data.photo.like;
                $scope.isLike = false;
            }
        })
    }else{
      $scope.requireLogin();
    }
  }

  $scope.showComments = function(){
    $scope.commentModal.show();
  }
  $scope.closeComments = function() {
    $scope.commentModal.hide();
  };

  $scope.addPhotoComment = function(comment){
    console.log('called')
    if($rootScope.initData._id){
      if(comment){
        var data = {
            'photoIdx' : $stateParams.photoId,
            'comment' : comment
        }

        $http.post('/photo/addPhotoComment',data).then(function(result){

            if(result.data.status == 'success'){
                console.log(result);
                $scope.photo.comments.push(result.data.comment);
                $scope.comment = '';
                // $scope.photoCommentPaging.availablePage = Math.ceil($scope.photoCommentPaging.max / $scope.photoCommentPaging.num);

            }else if(result.data.status == 'fail' && result.data.reason == 'abusing'){
                // showMessage('잠시후 다시 시도해주세요.(코멘트 도배 방지)');
                $ionicPopup.alert({
                  title:'코멘트 도배 방지',
                  template : '잠시후 다시 시도해주세요.'
                }) 
                // abuse
            }
        })
      }else{
        $ionicPopup.alert({
          title:'코멘트를 입력해주세요.',
          template : '코멘트가 비어있습니다.'
        })
      }
    }else{
      $scope.requireLogin();
    }

  }

       
  $scope.removePhotoComment = function(comment){
      if($rootScope.initData._id){
        var data = {
            'photoIdx' : $stateParams.photoId,
            'commentIdx' : comment._id
        }

        $http.post('/photo/removePhotoComment',data).then(function(result){

            if(result.data.status == 'success'){
                $scope.photo.comments.splice($scope.photo.comments.indexOf(comment), 1);
            }
        })
      }else{
        $scope.requireLogin();
      }
  }
})
