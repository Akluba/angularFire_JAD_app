var jad_app = angular.module('jad_app',['ngRoute','firebase']);

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
	}
]);

jad_app.run(['$firebaseSimpleLogin','$rootScope', '$location', function($firebaseSimpleLogin, $rootScope, $location){
	var loginRef = new Firebase("https://jadapp.firebaseio.com");
	
	$rootScope.loginObj = $firebaseSimpleLogin(loginRef);
	
	$rootScope.$on("$routeChangeStart", function(){
		$rootScope.loginObj.$getCurrentUser().then(function(user){
			if(user == null){
				$location.path(["/"]);
			}else{
				$location.path(["/dashboard"]);
			}
		})
	})
	
	
	
	
}]);