angular.module('app').filter('filterByArray', function() {
    return function(postings, queries) {
        return postings.filter(function(posting) {
          queries.forEach(function(query){
            if(posting.text){
              result = posting.text.toLowerCase().indexOf(query.toLowerCase()) >= 0;
              if (!result) { console.log('did not match'); return false }
            } else {
              console.log('could not find text');
              return false;
            }
          });
          console.log('match!');
          return true;
        });
    };
});
