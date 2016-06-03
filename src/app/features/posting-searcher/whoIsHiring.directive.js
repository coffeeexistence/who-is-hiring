function whoIsHiring(HNApi) {
	return {
		restrict: 'E',
		controller: ['$scope', '$sce', '$filter', '$mdSidenav', '$mdMedia',
		function($scope, $sce, $filter, $mdSidenav, $mdMedia){
			var ctrl =  this;

			$scope.$mdMedia = $mdMedia;

			$scope.openLeftMenu = function() {
		    $mdSidenav('left').toggle();
		  };

			var submissionLimit = 12;

			$scope.submissions = [];
			$scope.filteredSubmissions = [];

			var filterSubmissions = function() {
				var searchTerm = "hiring?"
				$scope.filteredSubmissions = $filter('filter')($scope.submissions, searchTerm);
			};

			var getSubmissions = function(ids) {
				ids.forEach(function(id, i, ids){
					HNApi.showItem(id).then(function(res){
						$scope.submissions.push(res.data);
						if (id == ids[ids.length-1]) { filterSubmissions() }
					});
				});
			};

			var getUserSubmissions = function() {
				HNApi.showUser('whoishiring').then(function(res) {
					var submissionIds = res.data.submitted.splice(0, submissionLimit);
					getSubmissions(submissionIds);
				});
			};

			$scope.postings = [];
			$scope.filteredPostings = [];

			$scope.filterPostings = function(){
				$scope.filteredPostings = $filter('filterByArray')($scope.postings, $scope.searchQueries);
			};

			$scope.searchQueries = [""];

			$scope.getPostings = function(submission) {
				submission.kids.forEach(function(kidId){
					HNApi.showItem(kidId).then(function (res){
						if(res.data.text) {
							res.data.htmlText = $sce.trustAsHtml(res.data.text);
							$scope.postings.push(res.data);
						}
					});
				});
			};

			getUserSubmissions();

  	}],
		controllerAs: 'hiringCtrl',
		templateUrl: 'templates/whoishiring/whoishiring.tpl.html',
	};
}

angular
	.module('app')
	.directive('whoIsHiring', ['HNApi', whoIsHiring]);
