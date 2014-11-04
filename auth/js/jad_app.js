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

jad_app.run(['$firebaseSimpleLogin','$rootScope', function($firebaseSimpleLogin, $rootScope){
	var loginRef = new Firebase("https://aksms-example.firebaseio.com");
	
	$rootScope.loginObj = $firebaseSimpleLogin(loginRef);

	$rootScope.attemptLogin = function(){
		$rootScope.loginObj.$login("password",$scope.log
		).then(function(user) {
		   console.log("Logged in as: ", user.uid);
		   $location.path(["/dashboard"]);
		}, function(error) {
		   console.error("Login failed: ", error);
		});
	}
}]);