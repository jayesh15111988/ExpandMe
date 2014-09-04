 var gameLevel;
 var maximumBallRadius=20;
 //Did user die?
 var isgameEnd = false;
 //Number of Moving particles visible on the screen
 var particleNumbers = 5;
 //Minimum points required to move to the next level
 var pointsRequired = 20;
 //Stage number - Presumably same as level number but refers to next level user is going to
 var stageNumber = 1;
 //Did user click the mouse button to put shrinking circle to specified position?

 //Factor by which circle should be shrinking each time frame refreshes - More the value, difficult is the game

 var reductionFactor = 0;
 //Interval to set / reset game frames
 var intervalGame;
 var points = 0;
 var boxStart;
 var pauseGameBox;

 var summaryHolderForGameDuration = [];

 //Maintaining global vars for canvas elements and 2D context

 var can = document.getElementById('expandMeCanvas');
 var canvasContext = can.getContext('2d');
 var playerRadius = 15;

 var particleNumbersIncrement=10;
 var pointsRequiredToGoToNextStepIncrement=20;
 var playerRadiusReductionFactorIncrement=0.1;
 var playerRadiusNextStageIncrement=10;
 var decimalPointsToRoundTo=2;
 var ballsVelocityFactorIncrementParameter=0.2;
 var movingBallsOpaciity=0.8;
 var frameRate=33;
