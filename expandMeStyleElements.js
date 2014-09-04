var mainInstructionsView = $("#instructionsDiv")[0];
var okButton = $("#okButton");

var actualGameInstructionsDiv = $("#gameInstructions")[0];
var scoreBoard=$("#scoreBoard")[0];
var horizontalLineFirst=$("#horizontalLineFirst")[0];
var horizontalLineSecond=$("#horizontalLineSecond")[0];

var instructionViewWidth  = screen.width / 2;
var instructionViewHeight = screen.height / 2;
var instructionViewTop    = screen.height / 8;
var instructionViewLeft   = screen.width / 4;

mainInstructionsView.style.width = instructionViewWidth + 'px';
mainInstructionsView.style.left = instructionViewLeft + 'px';

mainInstructionsView.style.height = instructionViewHeight + 'px';
mainInstructionsView.style.top = instructionViewTop + 'px';

actualGameInstructionsDiv.style.top = '30px';
actualGameInstructionsDiv.style.left = '0px';
actualGameInstructionsDiv.style.height = instructionViewHeight / 2 + 'px';
actualGameInstructionsDiv.style.width = instructionViewWidth + 'px';


okButton[0].style.top = ((instructionViewHeight / 2) - 50) + 'px';
okButton[0].style.left = (instructionViewWidth - instructionViewLeft - 90) + 'px';

okButton.bind('click', function() {

    hideInstructionsView();

    start = new Date().getTime();
    
    
    moveBalls();

});

//TO DO In future - Add control parameters on screen so that user can tweak them online

//TO Do for tomorrow - Add screen in the upper right corner to show current points and points to advance to next level
//That's it for this game and then move to grow up project
//WIP
//250-50 width-offset (random)
var scoreBoardLeftDistance=(screen.width-300);
scoreBoard.style.left=scoreBoardLeftDistance+'px';

horizontalLineFirst.style.left=scoreBoardLeftDistance+10+'px';
horizontalLineSecond.style.left=horizontalLineFirst.style.left;

//Initial state we will show all initial data
scoreBoard.innerHTML="Stage Number : 1<br/>Points : 0<br/>Points Required : 20";

function displayInstructionsViewWithInstructions(instructions, isGameFinished) {

    if (typeof intervalGame != "undefined") {
        clearInterval(intervalGame);
    }

    fillColorWithDefaultLightGreen();
    mainInstructionsView.style.display = 'block';

    if (isGameFinished) {
        
        var totalPoints = 0;
        var timeSpent = 0;
        var stagesCompleted = Object.keys(summaryHolderForGameDuration).length - 1;
        var individualStageStatistics = [];
        var HTMLTableString = '<table border="1" align="center" style="width:' + mainInstructionsView.style.width + '"><tr><td>Stage</td><td>Points</td><td>Total time</td></tr>';

        for (var index in summaryHolderForGameDuration) {
            individualStageStatistics = summaryHolderForGameDuration[index];
            totalPoints += individualStageStatistics['points'];
            timeSpent += individualStageStatistics['timeSpent'];
            HTMLTableString += '<tr><td>' + individualStageStatistics['stage'] + '</td><td>' + individualStageStatistics['points'] + '</td><td>' + individualStageStatistics['timeSpent'] + '</td></tr>';
        }

        HTMLTableString += '</table>';
        HTMLTableString += 'Click OK to restart the game';

        //Rounding off score and time to two decimal points
        totalPoints = Number((totalPoints).toFixed(decimalPointsToRoundTo));
        timeSpent = Number((timeSpent).toFixed(decimalPointsToRoundTo));

        actualGameInstructionsDiv.innerHTML = "Sorry, your Game is Over. Total score reached so far upto this level is : " + totalPoints + " Maximum total time this game played is : " + timeSpent + " Seconds<br/><br/>";
        actualGameInstructionsDiv.innerHTML += HTMLTableString;
        
        //Reset scoreboard once game is Over - Show all default values of points and stages
        scoreBoard.innerHTML="Stage Number : 1<br/>Points : 0<br/>Points Required : 20";
        
        summaryHolderForGameDuration.length = 0;

    } else {
    	
    	//If game is still in progress, show regular pints while making trnasition to next level 
    	//along with other instructions

        actualGameInstructionsDiv.innerHTML = instructions;

    }

}

function fillColorWithDefaultLightGreen() {
    canvasContext.fillStyle = "rgba(255,255,255,1.0)";
    canvasContext.fillRect(0, 0, can.width, can.height);
    canvasContext.fillStyle = "rgba(120,190,125,0.5)";
    canvasContext.fillRect(0, 0, can.width, can.height);

}

function hideInstructionsView() {
    mainInstructionsView.style.display = 'none';

}