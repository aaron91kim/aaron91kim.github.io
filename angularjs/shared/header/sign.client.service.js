'use strict';
app.service('signService', ['$http', '$location', '$rootScope' ,'$q', '$window', 'Facebook','Authentication'
    ,function($http, $location, $rootScope ,$q, $window, Facebook, Authentication) {

    //내부함수를 쓰기위해
    var _this = this;

    this.signup = function(user) {
        var d = $q.defer();
        
        $http.post('/sign/signupAction', user).then(function(result) {
            _this.saveLoginStatus(result.data);
            d.resolve(result.data);
        });
        return d.promise;
    },


    this.fbLogin = function(signUp){
        var d = $q.defer();

        Facebook.login(function(response) {

        }, {
            scope: 'public_profile,email'
        });

        _this.getLoginStatus().then(function(status){
            if(status == "connected"){
                //facebook 유저 데이터를 불러옴.
                _this.getFbUser().then(function(fbUser){

                    // 새로가입한경우.
                    if(signUp.userType){
                        fbUser.userType = signUp.userType;
                        _this.getFbPicture().then(function(url){
                            fbUser.fbPicture = url;
                            $http.post('/sign/fbLoginAction', fbUser).then(function(result) {
                                d.resolve(result.data.status);
                                _this.saveLoginStatus(result.data)

                            })
                        })
                    }else{
                        //if user is already signed up.
                        $http.post('/sign/fbLoginAction', fbUser).then(function(result) {
                            d.resolve(result.data.status);
                            _this.saveLoginStatus(result.data)

                        })
                    }
                    
                })
            }else{
                console.log('there is not connected. you should try again');
            }
        })
        return d.promise;
    }


    this.saveLoginStatus = function(data){

        if(data.status == 'success'){
            $rootScope.initData = data.user;
            Authentication.setUserInfo(data.user);
            Authentication.isLogin = true;
            $rootScope.loggedIn = true;
            console.log($rootScope.initData._id);
            //socket
            var loginData = {
                'userIdx' : $rootScope.initData._id,
                'time' : new Date()
            }

            // socket.emit('doLogin', data.user._id);
            socket.emit('doLogin', loginData);

        }
    }


    this.getLoginStatus = function(){
        var d = $q.defer();

        Facebook.getLoginStatus(function(response) {
            d.resolve(response.status);
        });
        return d.promise;
    }

    this.getFbPicture = function(){
        var d = $q.defer();
        Facebook.api("me/picture", {
            "width": "200",
            "height": "200"
        }, function(response) {
            d.resolve(response.data.url);
        });

        return d.promise;
    }

    this.getFbUser = function(){
        var d = $q.defer();

        Facebook.api('/me', function(response) {
            d.resolve(response);
           
        })
        return d.promise;
    }


    this.sendVerifyingMailAgain=function(abc){
        console.log(abc)
        var d = $q.defer();
        $http.post('/verify/reVerAction',abc).then(function(result){
        d.resolve(result.data);

        });
        return d.promise;
    };

    this.login = function(user){
        var d = $q.defer();
        $http.post('/sign/loginAction', user).then(function(result) {
            if (result.data.status == 'success') {
                console.log(result);
                    _this.saveLoginStatus(result.data)
                }
         d.resolve(result.data);
        });
        return d.promise;
    };
 
    this.logout= function() {
        var d = $q.defer();
        $http.get('/sign/sessionRemove').then(function(result){
            //로그아웃후 결과를 알려줌.
            if(result.data.status == "success"){
                
                var logoutData = {
                    'userIdx' : $rootScope.initData._id,
                    'time' : new Date()
                }
                socket.emit('doLogout',logoutData);

                $rootScope.initData = {};
                $rootScope.loggedIn = false;
                $rootScope.initData.verified = 'true';
                $rootScope.favorites = null;
                $rootScope.isFavorite = false;
                Authentication.isLogin = false;
                $window.sessionStorage.removeItem('user');
            }
            
            d.resolve(result.data);

        });
        return d.promise;
    },

    this.isLogged= function() {

        if($window.sessionStorage['user']){
            Authentication.isLogin = true;
            $rootScope.loggedIn = true;
            $rootScope.initData = Authentication.getUserInfo();
            console.log($rootScope.initData._id);
        }else{
            Authentication.isLogin = false;
            $rootScope.loggedIn = false;
        }
    }


    this.checkEmail =  function(email, callback) {
        var d = $q.defer();
        $http.post('/sign/checkEmail', email).then(function(result) {
           d.resolve(result.data);
           

        });
        return d.promise;
    };


    // forgot passwords
    this.sendTempKeyMail = function(email){
        var d = $q.defer();
        var data = {
            'email' : email
        }
        $http.post('/forgot/sendTempKey',data).then(function(result){
            d.resolve(result.data);
        })

        return d.promise;

    }

    this.checkTempKey = function(tempKey){
        var d = $q.defer();
        var data = {
            'tempKey' : tempKey
        }
        $http.post('/forgot/checkTempKey',data).then(function(result){
            d.resolve(result.data);
        })

        return d.promise;

    }

    this.changePassword = function(tempKey, password){
        
        var d = $q.defer();
        var data = {
            'tempKey' : tempKey,
            'password' : password
        }
        $http.post('/forgot/changePassword',data).then(function(result){
            d.resolve(result.data);
        })

        return d.promise;

    }


    
}])
