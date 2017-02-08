app.directive('forgotModal', ['signService', function(signService) {

    return {
        restrict: 'E',
        templateUrl : "/ng-app/shared/header/forgotPasswordModal/forgotPasswordModal.client.partial.html",
        link: function(scope, element, attrs) {
        	   
        	scope.forgot = {
        		mailCount : 0,
        		step : 1,
        		progress : false,
        		showTempKeyText : false
        	}

        	scope.sendTempKeyMail = function(){
        		scope.forgot.progress = true;
        		signService.sendTempKeyMail(scope.forgot.email).then(function(data){
        			if(data.status == 'success'){
        				//when it is successfully sent
	        			scope.forgot.message1 = "We sent varifying mail to your Email \n Please check your email.";
	        			scope.forgot.showTempKeyText = true;
	        			scope.forgot.mailCount++;
	        			scope.forgot.progress = false;
        			}else{
        				//there is no email
	        			scope.forgot.message1 = "We can't find your Email \n Please check your email again.";
	        			scope.forgot.showTempKeyText = false;
	        			scope.forgot.progress = false;
        			}
        		})
        		

        	}

        	scope.checkTempKey = function(){
        		
        		signService.checkTempKey(scope.forgot.tempKey).then(function(data){
        			console.log(data);
        			if(data.status == 'success'){
        				// 맞을경우
        				scope.forgot.step = 2;

        			}else{
        				//틀릴경우
        				scope.forgot.step = 1;
        				scope.forgot.message2 = "There is invalid key. please check again";

        			}
        		})


        			

        	}

        	scope.changePassword = function(){

        		signService.changePassword(scope.forgot.tempKey, scope.forgot.password).then(function(data){
        			if(data.status == "success"){
        				scope.forgotTosignIn();
        				showMessage('Password has been changed successfully.')
        			}else{
        				console.log('304 error');
        				scope.forgot.message3 = "There is temporary error. Please try again."
        			}
        		})
        		//비밀번호를 변경한후에 메시지를 띄워야함.


        	}

        }
    }

}]);