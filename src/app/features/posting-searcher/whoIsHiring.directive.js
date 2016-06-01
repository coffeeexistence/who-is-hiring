function whoIsHiring(HNApi) {
	return {
		restrict: 'E',
		controller: ['$scope', '$sce',
		function($scope, $sce){
			var ctrl =  this;

			$scope.postings = [];

			$scope.visiblePostings = function(){
				return $scope.postings.slice(0, 100);
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
