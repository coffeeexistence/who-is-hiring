function whoIsHiring(HNApi) {
	return {
		restrict: 'E',
		controller: ['$scope', '$sce', '$filter',
		function($scope, $sce, $filter){
			var ctrl =  this;

			$scope.postings = [];
			$scope.filteredPostings = [];

			$scope.filterPostings = function(){
				$scope.filteredPostings = $filter('filterByArray')($scope.postings, $scope.searchQueries);
			};

			$scope.searchQueries = [""];

			var getPostings = function() {
				$scope.story.kids.forEach(function(kidId){
					HNApi.showItem(kidId).then(function (res){
						if(res.data.text) {
							res.data.htmlText = $sce.trustAsHtml(res.data.text);
							$scope.postings.push(res.data);
						}
					});
				});
			};

			$scope.loadStory = function(){
				if ($scope.storyId) {
					HNApi.showItem($scope.storyId).then(function(res){
						$scope.story = res.data;
						getPostings();
					})
				}
			};


  	}],
		controllerAs: 'hiringCtrl',
		templateUrl: 'templates/whoishiring/whoishiring.tpl.html',
	};
}

angular
	.module('app')
	.directive('whoIsHiring', ['HNApi', whoIsHiring]);
