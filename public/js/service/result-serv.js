'use strict';
(function(){
	angular.module('snsct')
	.factory('resultServ', ['$http', 'localStorageServ', 'SERVER', resultServ]);
	function resultServ($http, localStorageServ, SERVER) {
		function getResult(sem) {
			var Id = JSON.parse(localStorageServ.getUserData()).id;
			// return $http.get(SERVER.host+'/api/student/result/' + Id +'/' + sem, {params: {id: Id}})
			return $http.get(SERVER.result + Id +'/' + sem, {params: {id: Id}})
			.then(function(res) {
				var data = res.data;
				// console.log(data);
				return data;
			})
		}
		return {
			getResult: getResult
		}
	}
})();