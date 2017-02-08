'use strict';

controllers.controller('UploadPhotoCtrl', ['$scope', '$rootScope', '$state', '$upload', '$ionicModal','$ionicPopup'
	,function($scope, $rootScope, $state, $upload, $ionicModal, $ionicPopup) {
  	
  	$ionicModal.fromTemplateUrl('ng-app/mobile/pages/photos/upload/uploadPhoto.keyword.client.modal.html', {
	    scope: $scope
	}).then(function(modal) {
	    $scope.keywordModal = modal;
	});

	$scope.myImage='';
    $scope.croppedImage='';

	$scope.showKeywordModal = function(){
		$scope.keywordModal.show();
	}
	$scope.closeKeywordModal = function(){
		$scope.keywordModal.hide();
	}

	var dataURItoBlob = function(dataURI) {
        var binary = atob(dataURI.split(',')[1]);
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        var array = [];
        for(var i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        return new Blob([new Uint8Array(array)], {type: mimeString});
    };

    // 사진의 이름과 정보를 설정한후에 업로드를 시켜줌.
    $scope.setPhoto = function() {

    	if($rootScope.initData._id){
    		if($rootScope.initData.verified == 'true'){

		        var photo = $("#cameraImage")[0].files[0];
		        console.log($scope);
		        if(photo){

			        var blob = dataURItoBlob($scope.croppedImage);
			        blob.name = photo.name;
			        var photoInfo = {
			    		'self' : true,
			    		'keywords' : $scope.keywords,
			    		'searchable' : $rootScope.initData.open.photo
			    	}
			        if(blob){
			            uploadPhoto(photoInfo, blob)
			        }
		        }else{
		        	$ionicPopup.alert({
	                  title:'사진업로드 실패',
	                  template : '사진을 선택해주세요.'
	                }) 
		        }
		    }else{
		    	$ionicPopup.alert({
                  title:'계정인증 요구',
                  template : '이메일이 인증이 안되어있습니다.'
                }) 
		    }
	    }else{
	    	$scope.requireLogin();
	    }
    }


    //업로드를 시켜줌. 업로드 후에 확인창을 띄어줄 것.
    var uploadPhoto = function(photoInfo, photo){
    	
	    $upload.upload({
	        url: '/designerSetting/uploadPhoto',
	        method:'POST',
	        file : photo,
	        data : {
	            'photoInfo' : photoInfo
	        }
	    }).success(function(data, status, headers, config){
	        // 확인창을 띄워주고 모든것을 초기화.
	        if(data.status == 'success'){
    			$("#cameraImage")[0].files[0] = null;
	        	$scope.keywords = [];
	        	$scope.resizedImage = '';
	        	angular.element("#preview").attr("src", '');

	        	$ionicPopup.confirm({
			      title : '사진업로드 완료',
			      template : '사진업로드를 완료하였습니다 <br/> 확인하시겠습니까?',
			      buttons: [
			        { 
			          text: '닫기',
			          onTap: function() { return false; }
			        },
			        {
			          text: '<b>확인</b>',
			          type: 'button-positive',
			          onTap: function() { return true; }
			        }
			      ]
			    }).then(function(res){

			      if(res){
			      	$state.go('app.singlePhoto',{'photoId' : data.photo._id})
			      }else{
			        //no
			      }
			    })

	        }else{
	        	$ionicPopup.alert({
                  title:'사진업로드 실패',
                  template : '업로드에 실패했습니다. <br/> 잠시후 다시 시도해주세요.'
                }) 
	        }

	    });
    }

    // 리사이즈를 위한 준비.
    var inputResize = function(file) {
        var option = {
        	'minHeight': 800,
        	'maxHeight': 800,
        	'maxWidth': 800,
        	'minWidth': 800,
        	'canvas' : true
	  	}
	  	var ori = 0;
	  	loadImage.parseMetaData(
		    file,
		    function (data) {
		        if (!data.imageHead) {
		            return;
		        }

		        if(data.exif){
		        	ori = data.exif.get('Orientation');
		        	option.orientation = ori;
		        }
		        
		        var loadingImage = loadImage(
		        	file,function(canvas){
        				var dataURL = canvas.toDataURL();
        				$scope.$apply(function($scope){
        					$scope.myImage = dataURL;
        				});
	        		}
	        	,option)
	        	
		    },
		    {
		        maxMetaDataSize: 502144,
		        disableImageHead: false
		    }
		);

    };

	angular.element('#cameraImage').on('change',function(event){
	  	$scope.$apply(function($scope){
          	inputResize(event.target.files[0]);
        });

	})
	$scope.updateCroppedImage = function(url){
		$scope.croppedImage = url;
	}
	// keyword modal
	$scope.keywords = [];
	$scope.addKeyword = function(key) {
        if (key) {
            var len = $scope.keywords.length;
            if (len < 5) {
                $scope.keywords.push(key);
            } else {
                // showMessage('키워드는 5개까지 가능합니다.');
            }
            key = '';
        } else {
            // showMessage('키워드를 입력해주세요.');
        }
    }
    $scope.removeKeyword = function(index) {
        $scope.keywords.splice(index, 1);
    }
    
    
}])
