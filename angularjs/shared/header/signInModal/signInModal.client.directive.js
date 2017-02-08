app.directive('signinModal', ['$rootScope','signService',function($rootScope, signService ){
	return {
        restrict : 'E',
        templateUrl : "ng-app/shared/header/signInModal/signInModal.client.partial.html",
        link : function(scope, element, attrs){


        	element.bind('keyup',function(event){
        		if(event.keyCode == 27){
        			scope.loginUser.email = '';
        			scope.loginUser.pwd = '';
        		}
        	})

        	

            scope.fbLogin = function(){
            	signService.fbLogin({}).then(function(result){
            		if(result == 'success'){
            			$rootScope.$emit('loginEvent');
        				$('#signInModal').modal('hide');
            		}
            	});
            	

            }

            scope.login = function(user) {
		        var promise = signService.login(user);
		        promise.then(function(result) {

		            if (result.status == 'fail') { //아이디가 틀렸을경우
		                scope.msgtxt = "Please check your password and Email";

		            } else {
		                
		                $('#signInModal').modal('hide');
		                //로그인후 모달 초기화
		                user.email = '';
		                user.pwd = '';
		                scope.msgtxt = '';
		                //미용실추가페이지에서 로그인을 시도했을경우.
		                $rootScope.$emit('loginEvent');

		            }

		        });
		    }
        }
    }
}]);