
var mainInstructionsView=$( "#instructionsDiv" )[0];
var okButton=$( "#okButton");
var actualGameInstructionsDiv=$("#gameInstructions")[0];





var instructionViewWidth=screen.width/2;
var instructionViewHeight=screen.height/2;
var instructionViewTop=screen.height/8 ;
var instructionViewLeft=screen.width/4;

mainInstructionsView.style.width = instructionViewWidth + 'px';
mainInstructionsView.style.left = instructionViewLeft + 'px';

mainInstructionsView.style.height = instructionViewHeight + 'px';
mainInstructionsView.style.top = instructionViewTop+ 'px';





actualGameInstructionsDiv.style.top='30px';
actualGameInstructionsDiv.style.left='0px';
actualGameInstructionsDiv.style.height=instructionViewHeight/2+'px';
actualGameInstructionsDiv.style.width=instructionViewWidth+'px';
actualGameInstructionsDiv.style.lineHeight=instructionViewHeight/2+'px';


okButton[0].style.top = ( (instructionViewHeight/2) -50)+ 'px';
okButton[0].style.left = (instructionViewWidth -instructionViewLeft-90)+ 'px';


okButton.bind('click', function() {

 hideInstructionsView();

 start = new Date().getTime();
 var gameLevel = 1;

moveBalls();


 //if (typeof intervalGame != "undefined") {
   //                 clearInterval(intervalGame);
     //           }

  
});

function displayInstructionsViewWithInstructions(instructions,toStartGame){
mainInstructionsView.style.display='inline';
actualGameInstructionsDiv.innerHTML=instructions;



}

function hideInstructionsView(){
	 mainInstructionsView.style.display='none';

	}
