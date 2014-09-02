    


function enable(e) {

            //To adjust the position of ball as per the place where user clicks on the screen

            
            var canvasOffset = $('#expandMeCanvas').offset();

            var offsetX = canvasOffset.left;
            var offsetY = canvasOffset.top;


            //e is a mouse event when user clicks on the screen
            mx = e.pageX - offsetX;
            my = e.pageY - offsetY;
           

            if (mx >= can.width/2 && mx <= (200 + can.width / 2) && my >= can.height/3 && my <= (100 + can.height / 3)) {


                start = new Date().getTime();
                var gameLevel = 1;




            



                moveBalls();


            }

            if (mx > (can.width/2)+100 && mx <= (can.width/2)+200 && my >= 0 && my <= (50)) {
                moveBalls();
            }

            if (mx >= can.width/2 && mx <= (can.width/2)+100 && my >= 0 && my <= 50) {


                if (typeof intervalGame != "undefined") {
                    clearInterval(intervalGame);
                }

                



                //canvascanvasContexttext.fillStyle = "rgba(0,255,255,0.5)";
                //canvascanvasContexttext.fillRect((can.width/2)+100, 0, 100, 50);
                //canvascanvasContexttext.fillStyle = "rgba(222,21,25,1)";
                //canvascanvasContexttext.fillText("click to restart", (can.width/2)+125,25);
                displayInstructionsViewWithInstructions("Click Ok to restart");

            }

        }

        function disable() {}

        this.addEventListener('mouseup', enable);
        this.addEventListener('mousedown', disable);


        $(document).ready(function () {

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

            
            canvasContext.fillStyle = "rgba(0,0,45,1)";
            canvasContext.fillRect(0, 0, can.width, can.height);

            displayInstructionsViewWithInstructions("Click to start the Game. Grab power from other balls. Make sure you don't die! Enjoy!!");

            /*canvasContext.strokeStyle = "rgba(23,34,33,1)";
            canvasContext.strokeRect(can.width/2, can.height/3, 200, 100);


            canvasContext.fillStyle = "rgba(255,0,0,1)";

             canvasContext.fillText("Click to start the Game", (can.width/2)+5, ((can.height/3)+50));
             canvasContext.fillText("Grab power from other balls", (can.width/2)+5, ((can.height/3)+60));
              canvasContext.fillText("Make sure you don't die! Enjoy!!", (can.width/2)+5, ((can.height/3)+70));
*/

        })

        function mouse_monitor(e) {

            
            if (!isgameEnd) {
                


                
                var canvasOffset = $("#expandMeCanvas").offset();
                var offsetX = canvasOffset.left;
                var offsetY = canvasOffset.top;
                mx = e.pageX - offsetX;
                my = e.pageY - offsetY;
            }
        }

        var moveBalls = function () {

            var can = document.getElementById("expandMeCanvas");
            if (can.width < window.innerWidth) {
                can.width = window.innerWidth;
            }
            if (can.height < window.innerHeight) {
                can.height = window.innerHeight;
            }
            var radiusSmall = 10;
            points = 0;


            




            


            var x = 100,
                y = 100;
            this.addEventListener('mousemove', mouse_monitor);
            
            function drawFrameOnScreen() {


                
                canvasContext.globalCompositeOperation = "source-over";


                canvasContext.fillStyle = "rgba(0,0,0,1)";
                canvasContext.fillRect(0, 0, can.width, can.height);
               
                //canvasContext.fillStyle = "rgba(255,25,25,0.5)";
                //canvasContext.fillRect(can.width/2, 0, 100, 50);
                //canvasContext.fillStyle = "rgba(123,119,198,1)";
                //canvasContext.fillText("click to close", (can.width/2)+20, 25);


                //canvasContext.globalCompositeOperation = "source-over";
                //canvasContext.fillStyle = "rgba(233,23,24,1)";
                canvasContext.strokeStyle = "rgba(23,134,133,1)";
                canvasContext.beginPath();
                canvasContext.arc(mx, my, radiusSmall, 0, 2 * Math.PI, false);
               
        //console.log("Drawing on screen with"+mx+" and "+my+ " and small radius is "+radiusSmall);
                radiusSmall -= (0.1+reductionFactor);
            
                if (radiusSmall < 0.001) {
                    particleNumbers = 5;
                    pointsRequired = 20;
                    radiusSmall = 10;
                    
                    //canvasContext.fillStyle = "rgba(0,23,34,0.5)";

                    //canvasContext.fillRect(0, 0, can.width, can.height);

                    
                    //canvasContext.strokeRect(can.width/2, can.height/3, 200, 100);

                    //canvasContext.fillStyle = "rgba(255,0,0,1)";
                    

                    var end = new Date().getTime();
                    var totalTime = (end - start) / 1000;
                    
                    var gameOverInstructions="Game Over and Score is! "+points +" Click to restart"+"Maximum time played" + totalTime+ " Seconds";

                    displayInstructionsViewWithInstructions(gameOverInstructions,1);
                    //canvasContext.fillText( + points , (can.width/2)+10, (can.height/3)+20);
                    //canvasContext.fillText(, (can.width/2)+10, (can.height/3)+40);
                    //canvasContext.fillText(, (can.width/2)+10, (can.height/3)+60);
                   
                    stageNumber = 1;

                    clearInterval(intervalGame);
                }

                canvasContext.closePath();
                canvasContext.stroke();

                for (var j = 0; j < particle.length; j++) {
                    document.getElementById("dist2").innerHTML = j;
                    var par1 = particle[j];

                    var centerDistance = Math.sqrt(Math.pow((par1.x - mx), 2) + Math.pow((par1.y - my), 2));

                    if (centerDistance <= par1.radius + radiusSmall) {




                        radiusSmall += par1.radius / 10;
                        points += par1.radius / 10;
                        if (points >= pointsRequired) {

                            particleNumbers += 10;
                            pointsRequired += 20;
                            reductionFactor+=0.005;

                            clearInterval(intervalGame);


   						//	canvasContext.fillStyle = "rgba(0,23,34,0.5)";

                          //  canvasContext.fillRect(0, 0, can.width, can.height);

                            //canvasContext.strokeStyle = "rgba(23,134,133,1)";
                    //canvasContext.strokeRect(can.width/2, can.height/3, 200, 100);


                    //canvasContext.fillStyle = "rgba(255,0,0,1)";


                      //      var end = new Date().getTime();
                        //    var totalTime = (end - start) / 1000;
                         //   canvasContext.fillText("canvasContextgrats Score is!" + points,  (can.width/2)+10, (can.height/3)+20);
                           // canvasContext.fillText("Click to restart",  (can.width/2)+10, (can.height/3)+40);
                           // canvasContext.fillText("Maximum time played" + totalTime + " SecanvasContextds",  (can.width/2)+10, (can.height/3)+60);
                           // canvasContext.fillText("Going to stage" + (++stageNumber),  (can.width/2)+10, (can.height/3)+80);

                           var goingToNextStageInstruction = "canvasContextgrats Score is! " + points+" Maximum time played " + totalTime + " Seconds. And Going to stage " + (++stageNumber);
                           displayInstructionsViewWithInstructions(goingToNextStageInstruction)
                            points = 0;
                        
                        }
                        document.getElementById("dist2").innerHTML = points; //par1.radius+radiusSmall;  
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
                    if ( (part.x <= 0) || (part.x >=can.width)) {
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
                    gameLevelNumber *= 0.75;
                }
                this.vx = (Math.random() * 25 * gameLevelNumber) - Math.random() * 10;
                this.vy = (Math.random() * 15 * gameLevelNumber) - Math.random() * 10;

                

                this.color =getNewColorWithRandomRGBValues();
//Maximum radius limited to 20 units
                this.radius = Math.random() * 20;

            }

            //Collection of moving balls on screen
            
            var particle = [];
            
            for (var i = 0; i < particleNumbers; i++) {

                particle.push(new createNewRandomBall());

            }

            intervalGame = setInterval(drawFrameOnScreen, 33);
        }

        function getNewColorWithRandomRGBValues(){

                var r = Math.random() * 255 >> 0;
                var g = Math.random() * 255 >> 0;
                var b = Math.random() * 255 >> 0;
                return  "rgba(" + r + "," + g + "," + b + ",0.5)";

        }
    