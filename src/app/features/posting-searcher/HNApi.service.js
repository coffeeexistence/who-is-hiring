function HNApi($http){
  var service = this;

  var pendingRequests = [];

  service.showItem = function (id) {
    //var canceler = $q.defer();
    //var promise = $http.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json', {timeout: canceler.promise});
    //pendingRequests.push(canceler);
    //return promise.then(function(res) {

    //  return res;
    //});
    //return promise;

    return $http.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json');
  };

  service.showUser = function (id) {
    return $http.get('https://hacker-news.firebaseio.com/v0/user/' + id + '.json');
  };

};

angular
  .module('app')
  .service('HNApi', ['$http', HNApi]);
