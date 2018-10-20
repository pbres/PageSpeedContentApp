angular.module("umbraco")
    .controller("ContentApps.PageSpeedApp", function ($scope, $http, $location, $window, editorState) {

        var vm = this;
        vm.CurrentNodeId = editorState.current.id;
        
        if (vm.CurrentNodeId !== 0) {
            vm.statusText = "Loading...";
            vm.title = editorState.current.variants[0].name;
            vm.completed = false;

            var baseUrl = new $window.URL($location.absUrl()).origin;
            var nodeUrl = baseUrl + editorState.current.urls[0].text;
            
            $http({
                method: 'GET',
                url: 'https://www.googleapis.com/pagespeedonline/v4/runPagespeed?url=' + nodeUrl
            }).then(function successCallback(response) {
                vm.score = response.data.ruleGroups.SPEED.score;
                vm.rules = response.data.formattedResults.ruleResults;
                vm.statusText = '';
                vm.completed = true;
            }, function errorCallback(response) {
                console.log(response);
                vm.statusText = 'Unable to get PageSpeed Insights for this page';
            });
        }
    });
