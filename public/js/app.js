'use strict';
(function(){
	var app = angular.module('snsct', ['ngRoute']);
	app.run(['$rootScope', '$location', 'loginServ', 'localStorageServ', function($rootScope, $location, loginServ, localStorageServ) {
		function logout() {
			loginServ.logout();
		};

		function onRouteChangeStartHandler(ev, next, current) {
			var isLoggedIn = loginServ.isLoggedIn();
			$rootScope.isLoggedIn = isLoggedIn;
			// console.log(next);
			// console.log(current);
			var redirectToLoginPage = (next.$$route && next.$$route.isAuthNeeded && (!isLoggedIn));
			var isLoginPage = next.$$route && (next.$$route.originalPath === '/login');

			if (isLoginPage && isLoggedIn) {
				var id;
				if($rootScope.id) {
					id = $rootScope.id;
					console.log(id);
					$location.path('/'+id+'/result');
				} else {
					id = localStorageServ.getUserId();
					$location.path('/'+id+'/result');
				}
			}

			if (redirectToLoginPage) {
				$location.path('/login');
			}


		}

		$rootScope.$on('$routeChangeStart', onRouteChangeStartHandler)

	}]);

	 function getAPIURL(API_ENDPOINT, ip) {
        var currentHostName = location.hostname;
        var HOST_NAME = (ip || currentHostName || 'localhost');
        var API_URL = '//' + HOST_NAME + ':3001' + API_ENDPOINT;
        return API_URL;
    }

     app.constant('SERVER', {
        login: getAPIURL('/auth/login/'),
        result: getAPIURL('/api/student/result/')
    })

	// app.constant('SERVER', {
	// 	host: '//localhost:3001'
	// })


	app.config(['$routeProvider', function($routeProvider) {
		$routeProvider
		// .when('/home', {
		// 	templateUrl: './partials/home.html',
		// 	isAuthNeeded: true
		// })
		.when('/:id/result', {
			templateUrl: './partials/home.html',
			isAuthNeeded: true
		})
		.when('/:id/result/sem/:sem',{
			templateUrl: './partials/result.html',
			isAuthNeeded: true
		})
		.when('/login', {
			templateUrl: './partials/login.html',
			isAuthNeeded: false
		})
		.when('/upload', {
			templateUrl: './partials/upload.html',
			isAuthNeeded: true
		})
		.otherwise('/login')
	}])


	function onReady() {
		$('.button-collapse').sideNav({ closeOnClick: true });
	}

	$(document).ready(onReady);
	 app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('HttpAuthInterceptorServ');
}]);

})();