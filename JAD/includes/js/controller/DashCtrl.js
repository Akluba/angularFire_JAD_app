jad_app.controller('DashCtrl',["$scope", "$rootScope", "$firebase", "$location", "$firebaseSimpleLogin",
	function($scope,$rootScope,$firebase,$location, $firebaseSimpleLogin){
		
		var canvas = document.getElementById('canvas'),
			ctx = canvas.getContext('2d'),
			canvasImg = document.getElementById('canvasImg'),
			ctxImg = canvasImg.getContext('2d'),
			mouseIsDown = false,
			imageObj = new Image();
			
			
		var offsetX,
			offsetY,
			startX,
			startY;
			
		/* ######################################################################
		############################ RESIZE CANVAS h/w ##########################
		###################################################################### */
		canvas.width = document.body.clientWidth-401;
		canvas.height = window.innerHeight;
		
		canvasImg.width = document.body.clientWidth-401;
		canvasImg.height = window.innerHeight;
		
		
		/* ######################################################################
		############################ LOAD IMAGE TO CANVAS #######################
		###################################################################### */
		imageObj.onload = function() {ctxImg.drawImage(imageObj, 50, 25, 933, 637);};
		imageObj.src = 'includes/img/floorPlan.jpg';


		/* ######################################################################
		############################ FIND CURRENT USER ##########################
		###################################################################### */
		$rootScope.loginObj.$getCurrentUser().then(function(user){
			console.log(user.uid);
			$scope.currentUserNum = user.id;
			
			var currentUserRef = new Firebase('https://jadapp.firebaseio.com/users/user'+$scope.currentUserNum+"/selections");
			$scope.currentUser = $firebase(currentUserRef).$asArray();
			$scope.currentUser.$loaded().then(function(){
				console.log("-------------------CURRENT USER-------------------");
				console.log("current user:"+$scope.currentUserNum);
			}).then(function(){
				canvasLoad();
			}).then(function(){
				loadUsers();
			})		
		})
		
		
		/* ######################################################################
		############################ LOAD USERS #################################
		###################################################################### */
		function loadUsers(){
			var usersRef = new Firebase('https://jadapp.firebaseio.com/users');
			$scope.usersArray = $firebase(usersRef).$asArray();
			$scope.usersArray.$loaded().then(function(){
				console.log($scope.usersArray[$scope.currentUserNum-3]);
				
				
				
				
				
				canvasChange();
			})
		}
		
		/* ######################################################################
		############################ DRAW TO CANVAS ONLOAD ######################
		###################################################################### */
		function canvasLoad(){	
			console.log("-------------------EXISTING SELECTIONS-------------------")
					
			/* ############################### USER 1 ####################################### */
			var user1Ref = new Firebase('https://jadapp.firebaseio.com/users/user1/selections');
			$scope.user1Array = $firebase(user1Ref).$asArray();
			$scope.user1Array.$loaded().then(function(){
				//console.log user 1's selections onload
				console.log("user1's selections" ,$scope.user1Array);
				//draw user 1's canvas rects onload
				for(i=0; i<$scope.user1Array.length; i++){
					ctx.beginPath();
					ctx.rect($scope.user1Array[i].rect[0],$scope.user1Array[i].rect[1],$scope.user1Array[i].rect[2],$scope.user1Array[i].rect[3]);
					ctx.fillStyle = 'rgba(255,0,0,0.5)';
					ctx.fill();
				}
				//watch for individual changes by user 1
				watchUser1();
			})
			
			/* ############################### USER 2 ####################################### */
			var user2Ref = new Firebase('https://jadapp.firebaseio.com/users/user2/selections');
			$scope.user2Array = $firebase(user2Ref).$asArray();
			$scope.user2Array.$loaded().then(function(){
				//console.log user 2's selections onload
				console.log("user2's selections" ,$scope.user2Array);
				//draw user 2's canvas rects onload
				for(i=0; i<$scope.user2Array.length; i++){
					ctx.beginPath();
					ctx.rect($scope.user2Array[i].rect[0],$scope.user2Array[i].rect[1],$scope.user2Array[i].rect[2],$scope.user2Array[i].rect[3]);
					ctx.fillStyle = 'rgba(0,255,0,0.5)';
					ctx.fill();
				}
				//watch for individual changes by user 2
				watchUser2();
			})
			
			/* ############################### USER 3 ####################################### */
			var user3Ref = new Firebase('https://jadapp.firebaseio.com/users/user3/selections');
			$scope.user3Array = $firebase(user3Ref).$asArray();
			$scope.user3Array.$loaded().then(function(){
				//console.log user 3's selections onload
				console.log("user3's selections" ,$scope.user3Array);
				//draw user 3's canvas rects onload
				for(i=0; i<$scope.user3Array.length; i++){
					ctx.beginPath();
					ctx.rect($scope.user3Array[i].rect[0],$scope.user3Array[i].rect[1],$scope.user3Array[i].rect[2],$scope.user3Array[i].rect[3]);
					ctx.fillStyle = 'rgba(0,0,255,0.5)';
					ctx.fill();
				}
				//watch for individual changes by user 3
				watchUser3();
			})
		}
		
		
		
		/* ######################################################################
		############################ WATCH FOR CHANGE ###########################
		###################################################################### */
		function watchUser1(){
			$scope.user1Array.$watch(function(event){
				console.log("-------------------USER ACTIVITY-------------------");
				console.log("user1:",event.event,event.key);
			})
		}
		
		function watchUser2(){
			$scope.user2Array.$watch(function(event){
				console.log("-------------------USER ACTIVITY-------------------");
				console.log("user2:",event.event,event.key);
			})
		}
		
		function watchUser3(){
			$scope.user3Array.$watch(function(event){
				console.log("-------------------USER ACTIVITY-------------------");
				console.log("user3:",event.event,event.key);
			})
		}
		
		
		/* ######################################################################
		############################ DRAW TO CANVAS ON CHANGE ###################
		###################################################################### */
		function canvasChange(){
			$scope.usersArray.$watch(function(){
				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				
				for(i=0; i<$scope.user1Array.length; i++){
					ctx.beginPath();
					ctx.rect($scope.user1Array[i].rect[0],$scope.user1Array[i].rect[1],$scope.user1Array[i].rect[2],$scope.user1Array[i].rect[3]);
					ctx.fillStyle = 'rgba(255,0,0,0.5)';
					ctx.fill();
				}
				
				for(i=0; i<$scope.user2Array.length; i++){
					ctx.beginPath();
					ctx.rect($scope.user2Array[i].rect[0],$scope.user2Array[i].rect[1],$scope.user2Array[i].rect[2],$scope.user2Array[i].rect[3]);
					ctx.fillStyle = 'rgba(0,255,0,0.5)';
					ctx.fill();
				}
				
				for(i=0; i<$scope.user3Array.length; i++){
					ctx.beginPath();
					ctx.rect($scope.user3Array[i].rect[0],$scope.user3Array[i].rect[1],$scope.user3Array[i].rect[2],$scope.user3Array[i].rect[3]);
					ctx.fillStyle = 'rgba(0,0,255,0.5)';
					ctx.fill();
				}
			})
		}
				
	
		/* ######################################################################
		############################ MOUSE DOWN FUNCTION ########################
		###################################################################### */
		$scope.mouseDown = function(e){
			offsetX = 401;
			offsetY = 0;
			
			mouseX = parseInt(e.clientX - offsetX);
		    mouseY = parseInt(e.clientY - offsetY);
		    
		    mouseIsDown=true;
			startX=mouseX;
			startY=mouseY;
			canvas.style.cursor="crosshair";
		}
		
		
		/* ######################################################################
		############################ MOUSE UP FUNCTION ##########################
		###################################################################### */
		$scope.mouseUp = function(e){
			mouseX = parseInt(e.clientX - offsetX);
		    mouseY = parseInt(e.clientY - offsetY);
		    
		    mouseIsDown=false;
			
			var selectionNum = $scope.currentUser.length+1,
			point1 = startX,
			point2 = startY,
			point3 = mouseX-startX,
			point4 = mouseY-startY,
			comment = "Please type your comment here..";
			
			
			$scope.currentUser.$add({"number": selectionNum, "rect":[point1,point2,point3,point4], "comment": comment});
			
			canvas.style.cursor="default";
		}
		
	
	}
]);