app.directive('signupModal', ['signService', '$timeout' ,function(signService, $timeout){
	return {
        restrict : 'E',
        templateUrl : "/ng-app/shared/header/signUpModal/signUpModal.client.partial.html",
        link : function(scope, element, attrs){
        	scope.step = 1;
        	scope.signupUser = {
                'pwd' : '',
                'pwd2' : ''
            };

            element.find('input#signupPwd').bind('blur',function(event){
                if(scope.signupUser.pwd.length <= 6 && scope.signupUser.pwd2.length <= 6){
                    scope.signupMsg2 = "Password must be over 6 character";
                }
            })

        	scope.setUsertype = function(type){
                console.log(type);
        		scope.signupUser.userType = type;
        		if(type == 1){
        			scope.step = 2
        		}else{
        			scope.step = 3
        		}
        	}

            scope.nextStep = function(step){
                if(step > 1 && scope.isAgreement == true){
                    scope.step = 4
                } 

            }

        	scope.beforeStep = function(step){

        		if(step == 3 || step == 2  ) {
        			scope.step = 1
        		}else if(step == 4){
        			if(scope.signupUser.userType == 1){
        				scope.step = 2
        			}else{
        				scope.step = 3
        			}
        		}
        	}

            scope.fbSignup = function(signUp){
                
                signService.fbLogin(signUp);
                scope.clearForm();
                $('#signUpModal').modal('hide');

            }

            scope.signup = function(signUp) {
                if (scope.signupUser.pwd == scope.signupUser.pwd2 && scope.signupOk) {
                    
                    var promise = signService.signup(signUp);
                    
                    promise.then(function(data) {
                        console.log(data);
                        if(data.status == 'success') {
                            scope.clearForm();
                            $('#signUpModal').modal('hide');
                        }
                    });
                }
            };

            scope.clearForm = function(){
                scope.signupUser = {
                    email : '',
                    pwd  :'',
                    pwd2 : ''
                }
                scope.signupMsg1 = '';
                scope.signupMsg2 = '';
                scope.step = 1;
                scope.isAgreement = false;
            }



            scope.closeSignUpModal=function(){
                scope.clearForm();
                $('#signUpModal').modal('hide');

            }



            scope.checkEmail = function($event) {
                var signUp = scope.signupUser;

                scope.$watch('signupUser',function(){
                    console.log('value changed');
                    var signUp = scope.signupUser;
                })

                console.log($event);

                //탭을 눌르면 바로 검사
                if($event.keyCode == 9){

                }
                //이메일 정규표현식으로 패턴검사
                var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;


                if (pattern.test(signUp.email)) {

                    var promise = signService.checkEmail(signUp);
                    
                    promise.then(function(data) {

                        if (data.status == 'available') {

                            scope.signupMsg1 = 'This email is availale';

                            scope.signupOk = true;

                        } else {

                            scope.signupMsg1 = 'This email is not available';
                            scope.signupOk = false;
                        }
                    });
                } else {
                    scope.signupMsg1 = "This email is invalid";

                }

            };


            scope.checkPwd = function(signUp) {
                //회원가입시 비밀번호 일치 여부 확인하기.
                clearTimeout(timer);
                var timer = $timeout(function() {
                    if(signUp.pwd.length >= 6 && signUp.pwd2.length >= 6){
                        if (signUp.pwd == signUp.pwd2) {
                            scope.signupMsg2 = 'Password is matched';

                        }else{
                            scope.signupMsg2 = 'Passowrd is not matched';
                        } 
                    }
                }, 200);
            }
            
            

		}


    }

}]);