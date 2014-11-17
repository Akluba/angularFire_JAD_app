var jad_app = angular.module('jad_app',['ngRoute','firebase','monospaced.elastic']);

jad_app.config([
	"$routeProvider",
	function($routeProvider){
		$routeProvider
		.when('/',{
			templateUrl: 'app/view/login.html',
			controller: 'LoginCtrl'
		})
		
		.when('/dashboard',{
			templateUrl: 'app/view/dash.html',
			controller: 'DashCtrl'
		})
		
		.when('/create_user',{
			templateUrl: 'app/view/create.html',
			controller: 'LoginCtrl'
		})
		
		.when('/user_info',{
			templateUrl: 'app/view/user_info.html',
			controller: 'UserCtrl'
		})
	}
]);

jad_app.run(['$firebaseSimpleLogin','$rootScope', '$location', function($firebaseSimpleLogin, $rootScope, $location){
	var loginRef = new Firebase("https://jadapp.firebaseio.com");
	
	$rootScope.loginObj = $firebaseSimpleLogin(loginRef);
	
	/*
$rootScope.$on("$routeChangeStart", function(){
		$rootScope.loginObj.$getCurrentUser().then(function(user){
			if(user == null){
				$location.path(["/"]);
			}else{
				$location.path(["/dashboard"]);
			}
		})
	})
*/
}]);

jad_app.filter('toArray', function () {
'use strict';
 
return function (obj) {
if (!(obj instanceof Object)) {
return obj;
}
 
return Object.keys(obj).filter(function(key){if(key.charAt(0) !== "$") {return key;}}).map(function (key) {
return Object.defineProperty(obj[key], '$key', {__proto__: null, value: key});
});
};
});