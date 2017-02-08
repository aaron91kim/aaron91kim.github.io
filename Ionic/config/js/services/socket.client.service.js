'use strict';
// Authentication service for user variables
services.factory('socketService', ['$window', '$rootScope'
	,function($window, $rootScope) {
		var _this = this;
		
	    socket.on('error', function(){
		 	socket.socket.reconnect();
		});


		// 유저가 로그인햇을시
		this.joinOnlineList = function(){
			var loginData = {
                'userIdx' : $rootScope.initData._id,
                'time' : new Date()
            }

            // socket.emit('doLogin', data.user._id);
            socket.emit('joinOnlineList', loginData);

		}
		// 유저가 로그아웃했을시.
		this.outOnlineList = function(){
			var loginData = {
                'userIdx' : $rootScope.initData._id,
                'time' : new Date()
            }

            // socket.emit('doLogin', data.user._id);
            socket.emit('outOnlineList', loginData);
		}
		this.joinRoom = function(shopIdx){
			socket.emit('joinRoom',{
	            room : shopIdx,
	            'authority' : 'manager'
	        });
		}

		// 알림이 업데이트 되었을경우.
		this.emitNotificationsUpdate = function(target){
            socket.emit('updateNotification', target);
        }

        this.emitBookingUpdate = function(shopIdx){
        	//예약이 완료되는순간 이벤트를 발생시켜줌.
	        socket.emit('updateBooking',{
	            'room' : shopIdx
	        })
        }
        

        return _this;
	}
]);