// canvas is used to draw graphics
function init(){
    canvas = document.getElementById("mycanvas"); 
    W = canvas.width=576;
    H = canvas.height=576;
    pen = canvas.getContext('2d');
    cs=32;
    gameover=false;
    score=5;

    //create an image object for food
    food_img =new Image();
    food_img.src="image/apple.png";

    trophy = new Image();
    trophy.src="image/trophy.png";

    food=getRandomFood();
    snake={
        init_length:5,
        color:"blue",
        cells:[],
        direction:"right",

        createSnake: function(){
            for(var i=this.init_length;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },

        drawSnake:function(){
            for(var i =0;i<this.init_length;i++){
                pen.fillStyle= this.color;
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-4,cs-4);
            }
        },

        updateSnake:function(){
			//console.log("updating snake according to the direction property");
			//check if the snake has eaten food, increase the length of the snake and 
			//generate new food object
			var headX = this.cells[0].x;
			var headY = this.cells[0].y;
            if(headX==food.x && headY==food.y){
				console.log("Food eaten");
				food = getRandomFood();
				score++;

			}
			else
			{
			    this.cells.pop();
			}


            var nextX,nextY;

            
            if(this.direction=="right"){
                nextX=headX+1;
                nextY=headY;
            }
            else if(this.direction=="left"){
                nextX=headX-1;
                nextY=headY;
            }
            else if(this.direction=="down"){
                nextX=headX;
                nextY=headY+1;
            }
            else{
                nextX=headX;
                nextY=headY-1;
            }
            this.cells.unshift({x:nextX,y:nextY});

            // Write a logic that prevents snake from getting out.
            var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);

            if(this.cells[0].y<0 || this.cells[0].x<0 ||this.cells[0].x>last_x || this.cells[0].y>last_y){
                gameover =true;
            }

        },

    }; 
    snake.createSnake();
    // addEventListener on the DOM
    function keyPressed(e){
        // conditional statement
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }
        else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }
        else if(e.key=="ArrowUp"){
            snake.direction="up";
        }
        else if(e.key=="ArrowDown"){
            snake.direction="down";
        }
    }



    document.addEventListener('keydown',keyPressed);

}



function draw(){
    //erase the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();

    pen.fillStyle=food.color;
    pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy,40,30,cs,cs);
    pen.fillStyle ="black";
    pen.font= "20px Roboto";
    pen.fillText(score,50,50);

}
function update(){
    snake.updateSnake();

}

function getRandomFood(){
    var foodX=Math.round(Math.random()*(W-cs)/cs);
    var foodY=Math.round(Math.random()*(H-cs)/cs);
    var food ={
        x:foodX,
        y:foodY,
        color:"red",
    };
    return food;
}      


function gameloop(){
    if(gameover==true){
        clearInterval(f);
        alert("game over");
        return;
    }
    draw();
    update();
    
}

init();
var f=setInterval(gameloop,100);


