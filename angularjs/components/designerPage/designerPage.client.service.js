app.service('designerService', ['$http', '$rootScope', '$routeParams', '$location', '$q'
    ,function($http, $rootScope, $routeParams, $location, $q) {

    this.getDesigner = function(designerIdx){
        var d = $q.defer(); 

        var data = {
            designerIdx : designerIdx
        }
        $http.post("/designer/getDesigner",data).then(function(result){
            d.resolve(result.data)
        });


        return d.promise;
    }
    


    this.addFollower = function(designerIdx){

        var d = $q.defer();

        var datas = {
            'designerIdx' : designerIdx
        }

        $http.post('/designerPage/addFollower',datas).then(function(result){
            d.resolve(result.data);

        })
        return d.promise;
    } 


    this.removeFollower = function(designerIdx){

        var d = $q.defer();

        var datas = {
            'designerIdx' : designerIdx
        }

        $http.post('/designerPage/removeFollower',datas).then(function(result){
            d.resolve(result.data);

        })
        return d.promise;
    } 

    
}])
