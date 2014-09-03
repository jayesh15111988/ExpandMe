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
        var radiusSmall = 10;

        var x = 100,
            y = 100;
        this.addEventListener('mousemove', mouse_monitor);

        function drawFrameOnScreen() {

            canvasContext.globalCompositeOperation = "source-over";

            canvasContext.fillStyle = "rgba(0,0,0,1)";
            canvasContext.fillRect(0, 0, can.width, can.height);

            canvasContext.strokeStyle = "rgba(23,134,133,1)";
            canvasContext.beginPath();
            canvasContext.arc(mx, my, radiusSmall, 0, 2 * Math.PI, false);

            radiusSmall -= (0.1 + reductionFactor);

            if (radiusSmall < 0.001) {
                particleNumbers = 5;
                pointsRequired = 20;
                radiusSmall = 10;

                var end = new Date().getTime();
                var totalTime = (end - start) / 1000;

                points = Number((points).toFixed(2));
                totalTime = Number((totalTime).toFixed(2));

                summaryHolderForGameDuration.push({
                    'points': points,
                    'timeSpent': totalTime,
                    'stage': stageNumber
                });
                

                displayInstructionsViewWithInstructions("", 1);

                points = 0;

                stageNumber = 1;
                gameLevelNumber = -1;
                gameLevel = 1;
                if (typeof intervalGame !== 'undefined') {

                    clearInterval(intervalGame);
                }
            }

            canvasContext.closePath();
            canvasContext.stroke();

            for (var j = 0; j < particle.length; j++) {

                var par1 = particle[j];

                var centerDistance = Math.sqrt(Math.pow((par1.x - mx), 2) + Math.pow((par1.y - my), 2));

                if (centerDistance <= par1.radius + radiusSmall) {

                    //Remove current point from array to avoid cases of cheating
                    particle.splice(j, 1);

                    //Add new random point to maintain cardinality of points on screen
                    particle.push(new createNewRandomBall());

                    radiusSmall += par1.radius / 3;
                    points += par1.radius / 3;

                    if (points >= pointsRequired) {

                        particleNumbers += 10;
                        pointsRequired += 20;
                        reductionFactor += 0.1;

                        clearInterval(intervalGame);

                        var end = new Date().getTime();
                        var totalTime = (end - start) / 1000;

                        totalTime = Number((totalTime).toFixed(2));
                        points = Number((points).toFixed(2));

                        summaryHolderForGameDuration.push({
                            'points': points,
                            'timeSpent': totalTime,
                            'stage': stageNumber
                        });

                        var goingToNextStageInstruction = "Congrats, your total Score is - " + points + " Maximum total time this Game played is " + totalTime + " Seconds. You are Going to the stage " + (++stageNumber);
                        points = 0;

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

            this.x = Math.random() * 100;
            this.y = Math.random() * 100;

            //Very first level of our game
            if (gameLevelNumber == -1) {
                gameLevelNumber = 1;
            } else {

                //This factor determines how fast other balls move on the screen
                gameLevelNumber *= 1.05;
            }
            this.vx = (Math.random() * 5 * gameLevelNumber);
            this.vy = (Math.random() * 5 * gameLevelNumber);

            this.color = getNewColorWithRandomRGBValues();

            //Maximum radius limited to 20 units for any random ball thus generated on screen

            this.radius = Math.random() * 20;

        }

        //Collection of moving balls on screen

        var particle = [];

        for (var i = 0; i < particleNumbers; i++) {

            particle.push(new createNewRandomBall());

        }

        intervalGame = setInterval(drawFrameOnScreen, 33);
    }

    function getNewColorWithRandomRGBValues() {

        var r = Math.random() * 255 >> 0;
        var g = Math.random() * 255 >> 0;
        var b = Math.random() * 255 >> 0;
        return "rgba(" + r + "," + g + "," + b + ",0.5)";

    }