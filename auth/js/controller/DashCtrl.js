jad_app.controller('DashCtrl',["$scope", "$rootScope", "$firebase", "$location", "$firebaseSimpleLogin",
	function($scope,$rootScope,$firebase,$location, $firebaseSimpleLogin){
		
		
		console.log($rootScope.loginObj)
		
		if($rootScope.loginObj.user == null){
			$location.path(["/"]);
		}
	}
]);