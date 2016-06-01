function HNApi($http){
  var service = this;

  service.showItem = function (id) {
    return $http.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json')
  };

};

angular
  .module('app')
  .service('HNApi', ['$http', HNApi]);
