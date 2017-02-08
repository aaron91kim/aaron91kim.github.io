app.directive('userVerify', [ '$routeParams', '$http', '$timeout', '$rootScope', 'signService','Authentication'
	,function($routeParams,$http ,$timeout, $rootScope, signService, Authentication){
	return {
		restrict : 'E',
        templateUrl : "ng-app/shared/header/verify/verify.client.partial.html",
		link : function(scope, element, attrs){
			
			//routeParam.ver 이 있을경우 인증처리를 하여줌.
			if($routeParams.ver){

				$http.get('/verify/'+$routeParams.ver).then(function(result){
					if(result.data.isVer==true){
						
						$rootScope.initData.verified ="true";
						Authentication.setUserInfo($rootScope.initData);
						
						$rootScope.showVer=true;
						
						$timeout(function(){
							$rootScope.showVer=false;
						},2300)
					}
					
				});
			}

			//메일을 받지 못하였을경우를 위해 재전송을 하여줌.
			scope.sendVerifyingMailAgain = function(data){
		        var promise = signService.sendVerifyingMailAgain({email:data});
		        promise.then(function(result){
		            alert("We sent you email again")
		        })
		    }

		}
		


	}


}])