'use strict';

controllers.controller('UserInfoCtrl', function($scope,$rootScope, $location, $stateParams, $http, $window, $ionicModal, $ionicPopup) {
  // Create the login modal that we will use later
  
  $ionicModal.fromTemplateUrl('ng-app/mobile/pages/users/info/userInfo.comments.client.modal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.commentModal = modal;
  });

  $scope.showComments = function(){
    $scope.commentModal.show();
  }
  $scope.closeComments = function() {
    $scope.commentModal.hide();
  };


  $scope.isFollower = false;
  $scope.userPhotos = {
    'photos' : [],
    'max' : 0,
    'now' : 0
  }
  $scope.userComments = {
    comments : [],
    'max' : 0,
    'now' : 0
  } 


  $scope.init = function(){
    $scope.getUserById();
    $scope.getComments();
    $scope.getPhotosByWriter();
  }

  $scope.getUserById = function(){
    $http({
      url : '/mobile/user/getUserById',
      method : "GET",
      params : {
        'userIdx' : $stateParams.userId
      }
    }).then(function(result){
      $scope.user = result.data.user;
    })
  
  }
  
// ************** 팔로워 ********************* 
  

  $scope.checkFollower = function(){
    if($scope.user){
      var result = false;
      angular.forEach($scope.user.followers, function(follower){
        if(follower.user == $rootScope.initData._id){
          return result = true;
        }
      })
      return result;
    }
  }

  $scope.addFollower = function(){
    if($rootScope.initData._id){
        if($rootScope.initData.verified == 'true'){

            var datas = {
                'userIdx' : $stateParams.userId
            }

            $http.post('/mobile/user/follower/addFollower',datas).then(function(result){
                if(result.data.status == 'success'){
                    $scope.user.followers = result.data.followers;
                    $scope.checkFollower();

                }
            })
        }else{
            
        }
    }else{
      $scope.requireLogin();

    }
  }

  $scope.removeFollower = function(){
    var datas = {
        'userIdx' : $stateParams.userId
    }
    $http.post('/mobile/user/follower/removeFollower',datas).then(function(result){
        if(result.data.status == 'success'){
            $scope.user.followers = result.data.followers;
            $scope.checkFollower();
        }

    })
  }  
// /************** 팔로워 ********************* /




// ************** 코멘트 ********************* 
  $scope.getComments = function(){
        
    $http.get('/mobile/user/comment/getComments',{
        params : {
          'userIdx' : $stateParams.userId,
          'skip' : $scope.userComments.now
        }
    }).then(function(result){
      console.log(result);
        if(result.data.status == 'success'){
            //네일샵전체코멘트와 현제 몇개가 있는지를 넣어줌.    
            $scope.userComments.max = result.data.count;
            $scope.userComments.now = $scope.userComments.now + result.data.comments.length; 

            angular.forEach(result.data.comments,function(comment){
              $scope.userComments.comments.push(comment);
            })
        }
    })
  }

  $scope.removeComment = function(comment){
    if($rootScope.loggedIn){
      var data = {
        'commentIdx' : comment._id
      }
      $http.post('/mobile/user/comment/removeComment',data).then(function(result){
        if(result.data.status == 'success'){
          $scope.userComments.comments.splice($scope.userComments.comments.indexOf(comment), 1);
          $scope.userComments.max += 1;
          $scope.userComments.now += 1;
        }
      })

    }
  }


  $scope.addComment = function(comment){
      
      //로그인된상태에서만 가능.
      if($rootScope.loggedIn){
        if($rootScope.initData.verified == 'true'){
            if(comment != '' && comment){
              var datas = {
                to: $stateParams.userId, 
                comment : comment
            }
            $http.post('/mobile/user/comment/addComment', datas).then(function(result){
                if(result.data.status == 'success'){
                  socketService.emitNotificationsUpdate(userIdx);
                  $scope.userComments.comments.unshift(result.data.comment);
                  $scope.userComments.max += 1;
                  $scope.userComments.now += 1;
                }else if(result.data.status == 'abusing'){
                  $ionicPopup.alert({
                    title:'코멘트 도배 방지',
                    template : '잠시후 다시 시도해주세요.'
                  }) 
                }
            });
                  
                
            }else{
                //코멘트가 비어있을경우.
                $ionicPopup.alert({
                  title:'코멘트를 입력해주세요',
                  template : '코멘트가 비어있습니다. <br/> 코멘트를 입력해주세요.'
                }) 
            }

          }else{
            $ionicPopup.alert({
              title:'인증요구',
              template : '이메일을 인증해야 이용할수있는 서비스입니다.'
            }) 
          }

      }else{
          $scope.requireLogin();
      }



  }
  

// /************** 코멘트 *********************/


  $scope.getPhotosByWriter = function(){

    $http.get('/mobile/user/getPhotosByWriter',{
        params : {
          'userIdx' : $stateParams.userId,
          'skip' : $scope.userPhotos.now
        }
    }).then(function(result){
            console.log(result);

        if(result.data.status == 'success'){
            //네일샵전체코멘트와 현제 몇개가 있는지를 넣어줌.    
            $scope.userPhotos.max = result.data.count;
            $scope.userPhotos.now = $scope.userPhotos.now + result.data.photos.length; 

            angular.forEach(result.data.photos,function(photo){
              $scope.userPhotos.photos.push(photo);
            })
        }
    })

  }

  $scope.toPhotoInfo = function(photo){
    $location.path('app/photo/photoInfo/'+photo._id);
  }

})
