'use strict';
define(['angular'], function(angular) {
  angular.module('page-title-service', [])
    .factory('PageTitleService', ['$state', function($state) {
      var validStateControllerCombinations = {};
      var combinationsPromise;

      function loadLexicon(newCombinationsPromise) {
        combinationsPromise = newCombinationsPromise;
      }

      function setPageTitle(controllerName, newTitle) {
        combinationsPromise.then(function(result) {
          var newCombinations = result.data || result;
          for (var stateName in newCombinations) {
            if (newCombinations.hasOwnProperty(stateName)) {
              validStateControllerCombinations[stateName] = newCombinations[stateName];
            }
          }
          if (validStateControllerCombinations[$state.current.name] === controllerName) {
            document.title = newTitle;
          }
        });
      }

      return {
        loadLexicon: loadLexicon,
        setPageTitle: setPageTitle
      };
    }]);
});
