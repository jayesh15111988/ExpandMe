
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

//Commenting out for a while - Creating problem for long strings 
//actualGameInstructionsDiv.style.lineHeight=instructionViewHeight/2+'px';


okButton[0].style.top = ( (instructionViewHeight/2) -50)+ 'px';
okButton[0].style.left = (instructionViewWidth -instructionViewLeft-90)+ 'px';




okButton.bind('click', function() {

 hideInstructionsView();

 start = new Date().getTime();


 

moveBalls();


  
});




function displayInstructionsViewWithInstructions(instructions,isGameFinished){

    if (typeof intervalGame != "undefined") {
                    clearInterval(intervalGame);
           }

fillColorWithDefaultLightGreen();
mainInstructionsView.style.display='block';


if(isGameFinished){

//Add all points and total itme show it on the top
//Summarize all points on each stage and display in table format
//TO DO for tomorrow


	
}
else{
	actualGameInstructionsDiv.innerHTML=instructions;

}


}

function fillColorWithDefaultLightGreen(){
canvasContext.fillStyle = "rgba(255,255,255,1.0)";
canvasContext.fillRect(0, 0, can.width, can.height);
canvasContext.fillStyle = "rgba(120,190,125,0.5)";
canvasContext.fillRect(0, 0, can.width, can.height);

}

function hideInstructionsView(){
	 mainInstructionsView.style.display='none';

	}
