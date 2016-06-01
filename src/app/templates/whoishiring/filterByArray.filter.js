angular.module('app').filter('filterByArray', function() {
    return function(postings, queries) {
        return postings.filter(function(posting) {
            var result = true;
            queries.forEach(function(query){
                var queryResult = posting.text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
                if (!queryResult) { result = false }
            });
            return result;
        });
    };
});
