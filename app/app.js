angular.module('flickr', [
    'ui.router',
    'search',
    'wu.masonry',
    'infinite-scroll'
]);
angular.module('infinite-scroll').value('THROTTLE_MILLISECONDS', 500);
angular.module('flickr')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider
            //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
            .state('flickr', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/sightseeting');
    })
    .run([
        '$rootScope', '$state', '$stateParams',
        function ($rootScope, $state, $stateParams) {
            // Attach state variables to rootScope so we can access them
            // in controllers.
            $rootScope.$state = $state;
            $rootScope.$stateParams = $stateParams;
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                throw error;
            });
        }
    ])
;