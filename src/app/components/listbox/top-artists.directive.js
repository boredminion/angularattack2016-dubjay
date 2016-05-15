(function() {
  'use strict';

  angular
    .module('museek')
    .component('topArtists', {
      templateUrl: 'app/components/listbox/top-artists.html',
      controller: TopArtistsController
    });

  /** @ngInject */
  function TopArtistsController($scope, $http, $log, config, placeholder, apiMethods) {
    var ctrl = this;
    ctrl.placeholderArtist = placeholder.ARTIST;

    $scope.$on('onUserSearch', function(event, evtParam) {
      if (evtParam) {
        onUserChange(evtParam);

        if (evtParam.totalPlaycount) {
          ctrl.totalPlaycount = evtParam.totalPlaycount;
        }
      }
    });

    function onUserChange(evtParam) {
      var parameters =
        angular.element.param({
          method: apiMethods.GET_USER_TOP_ARTISTS,
          api_key: config.API_KEY,
          format: config.FORMAT,
          user: evtParam.user,
          period: evtParam.period,
          limit: evtParam.limit
        });

      var requestTopArtists = {
        method: 'GET',
        url: config.URL + parameters,
        headers: {},
        data: {}
      }

      $http(requestTopArtists).then(function successCallback(response) {
          ctrl.artists = response.data['topartists']['artist'];
        },
        function errorCallback(response) {
          $log.error({
            type: response.status,
            msg: response.data
          });
        });
    }
  }
})();
