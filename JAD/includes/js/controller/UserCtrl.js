jad_app.controller('UserCtrl',["$scope", "$rootScope", "$firebase", "$location", "$firebaseSimpleLogin",
	function($scope,$rootScope,$firebase,$location, $firebaseSimpleLogin){
		//getCurrentUser function
		$rootScope.loginObj.$getCurrentUser().then(function(user){
			//setting user.uid from $getCurrentUser() results to currentUserNum variable
			$scope.currentUserNum = user.uid;
			var userRef = new Firebase('https://jadapp.firebaseio.com/users/'+$scope.currentUserNum);
			$scope.user = $firebase(userRef).$asObject();
			$scope.user.$loaded(function(){
				//find if user is existing or new
				$scope.existing = $scope.user.name;
				//save user details onclick
				$scope.save_user = function(){
					$scope.user.$save().then(function(){
						$location.path(["/dashboard"]);
					})//end set function
				}//end save user function
			})//end loaded function					
		});//end getCurrentUser function
	}//end controller function
]);//end controller