'use strict';
define(['angular'], function(angular) {
  angular.module('page-title-service', [])
    .factory('PageTitleService', ['$state', function($state) {
      var validStateControllerCombinations = {};

      function loadLexicon(whiteListPromise) {
        whiteListPromise.then(function(result) {
          var loadedWhiteList = result.data;
          for (var stateName in loadedWhiteList){
            if(loadedWhiteList.hasOwnProperty(stateName)){
              validStateControllerCombinations[stateName] = loadedWhiteList[stateName];
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
