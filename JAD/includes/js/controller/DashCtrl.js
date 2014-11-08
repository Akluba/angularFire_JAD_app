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
			//setting user.uid from $getCurrentUser() results to currentUserNum variable
			$scope.currentUserNum = user.uid;
			//reference for adding new selections object to currentUserNum
			var currentUserRef = new Firebase('https://jadapp.firebaseio.com/users/'+$scope.currentUserNum+'/selections');
			$scope.currentUser = $firebase(currentUserRef).$asArray();
			$scope.currentUser.$loaded().then(function(){
				console.log("-------------------CURRENT USER-------------------");
				console.log("current user: "+$scope.currentUserNum);
			}).then(function(){
				var usersRef = new Firebase('https://jadapp.firebaseio.com/users');
				$scope.usersArray = $firebase(usersRef).$asArray();
				$scope.usersArray.$loaded().then(function(){
					drawCanvasRects();
					$scope.usersArray.$watch(function(event){
						console.log('****************'+event.event+' by '+event.key+'****************');
						drawCanvasRects();
					});//watch for changes to user object
				});//end usersArray loaded
			});//end then function
		});//end getCurrentUser function
		
		
		/* ######################################################################
		############################ DRAW RECT TO CANVAS ########################
		###################################################################### */
		function drawCanvasRects(){
			
			console.log($scope.usersArray);
			//clear canvas to redraw rects + new rect
			ctx.clearRect(0, 0, canvas.width, canvas.height);	
			//looping through all user objects			
			angular.forEach($scope.usersArray, function(users, key) {
				console.log("-------------------user " + users.$id + "'s selections-------------------");
				$scope.color = users['color'];
				//looping through all user.selections objects
				angular.forEach(users['selections'], function(selection,key){
					//print all user.selections objects to console
					console.log(selection);
					//draw all user.selections.rect to cavas
					ctx.beginPath();
					ctx.rect(selection.rect[0],selection.rect[1],selection.rect[2],selection.rect[3]);
					ctx.fillStyle = $scope.color;
					ctx.fill();
				});//end forEach user selections
			});//end forEach users	
		}//end drawCanvasRects function
		
	
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
		
	
	}//end of main function
]);//end of controller