jad_app.controller("LoginCtrl", ["$rootScope", "$scope", "$location", "$firebaseSimpleLogin",
  function($rootScope, $scope, $location, $firebaseSimpleLogin) {
    
    $scope.attemptLogin = function(){
		$rootScope.loginObj.$login("password",$scope.log
		).then(function(user) {
		   console.log("Logged in as: ", user.uid);
		   console.log($rootScope.loginObj);
		   $location.path(["/dashboard"]);
		}, function(error) {
		   console.error("Login failed: ", error);
		});
	}
    
  }
]);