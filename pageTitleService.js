'use strict';
define(['angular'], function(angular) {
  angular.module('page-title-service', [])
    .factory('PageTitleService', ['$state', function($state) {
      var validStateControllerCombinations = {};

      function loadLexicon(newCombinationsPromise) {
        newCombinationsPromise.then(function(result) {
          var newCombinations = result.data || result;
          for (var stateName in newCombinations){
            if(newCombinations.hasOwnProperty(stateName)){
              validStateControllerCombinations[stateName] = newCombinations[stateName];
            }
          }
        });
      }

      function setPageTitle(controllerName, newTitle) {
        if (validStateControllerCombinations[$state.current.name] === controllerName) {
          document.title = newTitle;
        }
      }

      return {
        loadLexicon: loadLexicon,
        setPageTitle: setPageTitle
      };
    }]);
});
