app.directive('settingDesigner', ['userSettingService', function(userSettingService) {
    return {
        restrict: 'E',
        templateUrl: "/ng-app/components/userSetting/designer/designer.client.partial.html",
        link: function(scope, element, attrs) {

            scope.getDesignerDatas = function() {

                var promise = userSettingService.getDesignerDatas();

                promise.then(function(data) {

                    if (data.status == 'success') {

                        console.log(data);
                        scope.designerSetting = {
                            open: {
                                tel: data.data.open.tel,
                                schedule: data.data.open.schedule
                            },
                            desc: data.data.desc
                        }

                    } else {
                        console.log('login problem or who is not designer');
                    }

                })

            }

            scope.getDesignerDatas();


            scope.updateDesigner = function(designerSetting) {

                var promise = userSettingService.updateDesigner(designerSetting);

                promise.then(function(data) {

                    if (data.status == 'success') {
                        showMessage('Update complete');

                    } else {

                    }
                })

            }

        }
    }
}])