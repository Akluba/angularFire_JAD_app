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
		canvas.width = document.body.clientWidth-280;
		canvas.height = window.innerHeight;
		
		canvasImg.width = document.body.clientWidth-280;
		canvasImg.height = window.innerHeight;
		
		
		/* ######################################################################
		############################ LOAD IMAGE TO CANVAS #######################
		###################################################################### */
		imageObj.onload = function() {ctxImg.drawImage(imageObj, 100, 25, 933, 637);};
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
				console.log("current user: ", user.uid);
				var usersRef = new Firebase('https://jadapp.firebaseio.com/users');
				$scope.usersArray = $firebase(usersRef).$asArray();
				$scope.usersArray.$loaded().then(function(){
					//draw rects on load
					drawCanvasRects();
					//watch for change to users
					$scope.usersArray.$watch(function(event){
						console.log(event.event+' by '+event.key);
						//draw rects with addition
						drawCanvasRects();						
					});//watch for changes to user object
				});//end usersArray loaded
			});//end then function
		});//end getCurrentUser function
		
		
		/* ######################################################################
		############################ DRAW RECT TO CANVAS ########################
		###################################################################### */
		function drawCanvasRects(){
			//clear canvas to redraw rects + new rect
			ctx.clearRect(0, 0, canvas.width, canvas.height);	
			//looping through all user objects			
			angular.forEach($scope.usersArray, function(users, key) {
				$scope.color = users['color'];
				var index = 1
				//looping through all user.selections objects
				angular.forEach(users['selections'], function(selection,key){
					//draw all user.selections.rect to cavas
					ctx.beginPath();
					ctx.rect(selection.rect[0],selection.rect[1],selection.rect[2],selection.rect[3]);
					ctx.fillStyle = $scope.color;
					ctx.fill();
					
					ctx.font = 'italic 18pt Calibri';
					ctx.fillStyle = 'white';
					ctx.fillText(index, (selection.rect[2]-10)/2 + selection.rect[0], (selection.rect[3]/2)+ selection.rect[1]);
					index ++;
				});//end forEach user selections
			});//end forEach users	
		}//end drawCanvasRects function
		
	
		/* ######################################################################
		############################ ADD SELECTION ##############################
		###################################################################### */
		$scope.mouseDown = function(e){
			offsetX = 280;
			offsetY = 0;
			
			mouseX = parseInt(e.clientX - offsetX);
		    mouseY = parseInt(e.clientY - offsetY);
		    
		    mouseIsDown=true;
			startX=mouseX;
			startY=mouseY;
			canvas.style.cursor="crosshair";
		}//end mousedown function
		//mouseup creating selections
		$scope.mouseUp = function(e){
			mouseX = parseInt(e.clientX - offsetX);
		    mouseY = parseInt(e.clientY - offsetY);
		    
		    mouseIsDown=false;
		    
			point1 = startX,
			point2 = startY,
			point3 = mouseX-startX,
			point4 = mouseY-startY,
			comment = "Please type your comment here..";
			//add selection to user
			$scope.currentUser.$add({"rect":[point1,point2,point3,point4], "comment": comment});
			
			canvas.style.cursor="default";
		}//end mouseup function
		
		
		/* ######################################################################
		############################ REMOVE SELECTION ###########################
		###################################################################### */
		$scope.remove_selection = function(num){
			//assign selection to remove
			var item = $scope.currentUser[num];
			//remove selection from user
			$scope.currentUser.$remove(item);
		}//end of remove_selection function
		
		
		/* ######################################################################
		############################ UPDATE SELECTION ###########################
		###################################################################### */
		$scope.update_selection = function(num, comment){
			$scope.currentUser[num].comment = comment;
			$scope.currentUser.$save(num);
		}//end of update_selection function
	}//end of main function
]);//end of controller