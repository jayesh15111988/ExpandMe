    $(document).ready(function() {

        var can = document.getElementById("expandMeCanvas");

        if (can.width < window.innerWidth) {
            can.width = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
        }
        if (can.height < window.innerHeight) {
            can.height = window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;

        }

        canvasContext.fillStyle = "rgba(120,190,125,0.5)";
        canvasContext.fillRect(0, 0, can.width, can.height);

        displayInstructionsViewWithInstructions("Click to start the Game. Grab power from other balls. Make sure you don't die! Enjoy!!", 0);

    })

    function mouse_monitor(e) {

        var canvasOffset = $("#expandMeCanvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        mx = e.pageX - offsetX;
        my = e.pageY - offsetY;

    }

    var moveBalls = function() {

        var can = document.getElementById("expandMeCanvas");
        if (can.width < window.innerWidth) {
            can.width = window.innerWidth;
        }
        if (can.height < window.innerHeight) {
            can.height = window.innerHeight;
        }

        this.addEventListener('mousemove', mouse_monitor);

        function drawFrameOnScreen() {

            canvasContext.globalCompositeOperation = "source-over";
            
            //This is a Canvas background
            canvasContext.fillStyle = "rgba(130,130,130,1)";
            canvasContext.fillRect(0, 0, can.width, can.height);

            //This is drawing of actual ring which moves with cursor on screen
            canvasContext.strokeStyle = "rgba(230,240,240,1)";
            canvasContext.beginPath();
            canvasContext.arc(mx, my, playerRadius, 0, 2 * Math.PI, false);

            playerRadius -= (0.1 + reductionFactor);

            if (playerRadius < 0.001) {
                particleNumbers = 5;
                pointsRequired = 20;
                playerRadius = 10;

                var end = new Date().getTime();
                var totalTime = (end - start) / 1000;

                points = Number((points).toFixed(decimalPointsToRoundTo));
                totalTime = Number((totalTime).toFixed(decimalPointsToRoundTo));

                summaryHolderForGameDuration.push({
                    'points': points,
                    'timeSpent': totalTime,
                    'stage': stageNumber
                });

                //Second parameter 1 indicates our game is over
                displayInstructionsViewWithInstructions("", 1);

                points = 0;

                stageNumber = 1;

                gameLevel = 1;

                if (typeof intervalGame !== 'undefined') {

                    clearInterval(intervalGame);
                }
            }

            canvasContext.closePath();
            canvasContext.stroke();
            var end = new Date().getTime();
            var totalTime = (end - start) / 1000;
            totalTime = Number((totalTime).toFixed(decimalPointsToRoundTo));
            scoreBoard.innerHTML = '  Stage Number : ' + stageNumber + '<br/>  Points : ' + points + '<br/>  Points Required : ' + pointsRequired + '<br/>  Time Spent Last : ' + totalTime;

            for (var j = 0; j < particle.length; j++) {

                var par1 = particle[j];

                var centerDistance = Math.sqrt(Math.pow((par1.x - mx), 2) + Math.pow((par1.y - my), 2));

                if (centerDistance <= par1.radius + playerRadius) {

                    //Remove current point from array to avoid cases of cheating
                    particle.splice(j, 1);

                    //Add new random point to maintain cardinality of points on screen
                    particle.push(new createNewRandomBall());

                    playerRadius += par1.radius / 3;
                    points += par1.radius / 3;

                    points = Number((points).toFixed(decimalPointsToRoundTo));

                    if (points >= pointsRequired) {

                        particleNumbers += particleNumbersIncrement;
                        pointsRequired += pointsRequiredToGoToNextStepIncrement;
                        reductionFactor += playerRadiusReductionFactorIncrement;

                        //No increment in ball radius while going to next stage - It gives undue advantage to player
                        //playerRadius+=playerRadiusNextStageIncrement;

                        clearInterval(intervalGame);

                        summaryHolderForGameDuration.push({
                            'points': points,
                            'timeSpent': totalTime,
                            'stage': stageNumber
                        });

                        var goingToNextStageInstruction = "Congrats, your total Score is - " + points + " Maximum total time this Game played is " + totalTime + " Seconds. You are Going to the stage " + (++stageNumber);
                        points = 0;
                        playerRadius = 15;
                        scoreBoard.innerHTML = 'Stage Number : ' + (stageNumber) + '<br/>Current Points : ' + points + '<br/>Points Required : ' + pointsRequired + '<br/>  Time Spent Last : ' + totalTime;
                        displayInstructionsViewWithInstructions(goingToNextStageInstruction, 0)

                    }

                }

            }

            for (var i = 0; i < particle.length; i++) {

                var part = particle[i];

                canvasContext.beginPath();
                canvasContext.fillStyle = part.color;
                canvasContext.arc(part.x, part.y, part.radius, 0, 2 * Math.PI, false); //Anticlockwise fill colors
                canvasContext.closePath();
                canvasContext.fill();

                //vx and vy are velocities in x and y direction respectively
                part.x += part.vx;
                part.y += part.vy;

                //Extreme left or Extreme right
                if ((part.x <= 0) || (part.x >= can.width)) {
                    part.x = Math.random() * can.width;
                }

                //Extreme top or Extreme Bottom
                else if ((part.y <= 0) || (part.y >= can.height)) {
                    part.y = Math.random() * can.height;
                }
            }

        }

        function createNewRandomBall() {

            this.x = Math.random() * can.width;
            this.y = Math.random() * can.height;

            //Very first level of our game

            var newVelocityIncrementor = stageNumber * ballsVelocityFactorIncrementParameter;

            
            this.vx = (Math.random() * 20 * newVelocityIncrementor);
            this.vy = (Math.random() * 20 * newVelocityIncrementor);

            this.color = getNewColorWithRandomRGBValues();

            //Maximum radius limited to 20 units for any random ball thus generated on screen

            this.radius = Math.random() * maximumBallRadius;

        }

        //Collection of moving balls on screen

        var particle = [];

        for (var i = 0; i < particleNumbers; i++) {

            particle.push(new createNewRandomBall());

        }

        intervalGame = setInterval(drawFrameOnScreen, (1 / frameRate) * 1000);
    }

    function getNewColorWithRandomRGBValues() {

        var r = Math.random() * 255 >> 0;
        var g = Math.random() * 255 >> 0;
        var b = Math.random() * 255 >> 0;
        return "rgba(" + r + "," + g + "," + b + ","+movingBallsOpaciity+")";

    }