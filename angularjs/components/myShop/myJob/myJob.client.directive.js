app.directive('myshopJob', ['myShopService', function(myShopService) {
	return {
		restrict: 'E',
		templateUrl: "/ng-app/components/myShop/myJob/myJob.client.partial.html",
		link: function(scope, element, attrs) {

			var getAges = function() {
				var arr = [];
				for (var i = 20; i < 40; i++) {
					arr.push(i);
				}
				return arr;
			}
			var getHours = function() {
				var arr = [];
				for (var i = 0; i < 24; i++) {

					if (i <= 9) {
						arr.push('0' + i)
					} else {
						arr.push(i);
					}
				}

				return arr;
			}

			var ages = getAges();

			var genders = ['other', 'Female', 'Male'];
			var careers = ['other', 'junior', 'over one year', 'over three years', 'over five years', 'over seven years'];


			//ng-repeat을 통한 폼출력용 데이터
			scope.job = {
				status: false,
				pay: {
					way: true,
					from: '',
					to: ''
				},
				age: {
					way: true,
					from: ages,
					to: ages
				},
				gender: genders,
				position: String,
				career: careers,
				contact: String,
				desc: ''
			}

			scope.initJob = function() {

				//job에대한 값이 있으면 기존값을 불러오고 아니면 초기값을 넣어줌.
				if (scope.selectedShop.shop.job) {

					scope.manageJob = scope.selectedShop.shop.job;

				} else {
					//초기값.
					scope.manageJob = {
						status: false,
						pay: {
							way: true
						},
						age: {
							way: true
						},
						gender: [],
						position: '',
						career: [],
						contact: '',
						desc: ''

					}

				}

			}

			scope.$watch('selectedShop.shop._id', function() {
				scope.initJob();
			})


			//포지션을 지워줌.
			scope.removePosition = function() {
				event.preventDefault();
				scope.job.position.pop();
			}

			//구인구직을 설정.
			scope.setJob = function() {
				var manageJob = scope.manageJob;
				var shopIdx = scope.selectedShop.shop._id;

				var updateInfo = {
					manageJob: manageJob,
					shopIdx: shopIdx
				}

				myShopService.setJob(updateInfo).then(function(data) {
					if (data.status == 'success') {
						showMessage('save complete.');
					}

				})

			}



		}
	}
}])