 //Level of the game user is in - Starts with level one
        var gameLevelNumber = -1;
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

        var reductionFactor=0;
        //Interval to set / reset game frames
        var intervalGame;

        var boxStart;
        var pauseGameBox;

        //Maintaining global vars for canvas elements and 2D context
        
         var can = document.getElementById('expandMeCanvas');
         var canvasContext = can.getContext('2d');