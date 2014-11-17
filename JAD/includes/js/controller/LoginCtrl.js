jad_app.controller("LoginCtrl", ["$rootScope", "$scope", "$location", "$firebaseSimpleLogin",
	function($rootScope, $scope, $location, $firebaseSimpleLogin) {
		//onsubmit run login function
		$scope.attemptLogin = function(){
			$rootScope.loginObj.$login("password",$scope.log
			).then(function(user) {
				//console sucessful login
			    console.log("Logged in as: ", user.uid);
			    $location.path(["/dashboard"]);
			}, function(error) {
				//console login error
			    console.error("Login failed: ", error);
			    $scope.error = error.code;
			});//end error
		}//end attemptLogin function
		
		//onsubmit run createUser function
		$scope.create_user = function(){
			$rootScope.loginObj.$createUser($scope.create.email, $scope.create.password).then(function(user){
				//console sucessful createUser message
				console.log("User created: ",user.uid);	
				//run login function with newly created user
				$rootScope.loginObj.$login("password",$scope.create).then(function(){
					$location.path(["/user_info"])
				})//end login function
			},function(error){
				//console failed attempt to create user
				console.log("Creation failed: ",error);
				$scope.error = error.code;
			});//end error
		}//end create_user function  
	}//end of function
]);//end of controller