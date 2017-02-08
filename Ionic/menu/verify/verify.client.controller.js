'use strict';

controllers.controller('VerifyCtrl', ['$scope', '$rootScope', '$http', '$ionicPopup', 'signService'
  ,function($scope, $rootScope, $http, $ionicPopup, signService) {
  
  	$scope.verify = {
  		'code' : ''
  	};

	$scope.verifyUser = function(){
		console.log($scope.verify.code);
		var data = {
			'email' : $rootScope.initData.email,
			'code' : $scope.verify.code
		}
		$http.post('/verify', data).then(function(result){
			if(result.data.status=='success'){
				console.log(result.data);
				signService.saveLoginStatus(result.data);
				$ionicPopup.alert({
		          title:'인증완료',
		          template : '이메일 인증을 완료했습니다.'
		        })
		        $scope.hideVerifyModal();
			}else{
				$ionicPopup.alert({
		          title:'인증실패',
		          template : '인증에 실패했습니다. 인증번호를 확인해주세요.'
		        })
			}
		});
	}

	//메일을 받지 못하였을경우를 위해 재전송을 하여줌.
	$scope.sendVerifyingMailAgain = function(){
        $http.post('/verify/reVerAction',{
        	'email' : $rootScope.initData.email
        }).then(function(result){
        	console.log(result);
        	if(result.data.status = "success"){
        		$ionicPopup.alert({
		          title:'인증번호 재전송',
		          template : '인증번호를 재전송 하였습니다.'
		        })
        	}

        });
       
    }
}])

