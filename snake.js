// canvas is used to draw graphics
function init(){
    canvas = document.getElementById("mycanvas"); 
    W = canvas.width=560;
    H = canvas.height=560;
    pen = canvas.getContext('2d');
    cs=32;
    
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
                pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-4,cs+9);
            }
        },

        updateSnake:function(){
            console.log("updating snakes"); 
            this.cells.pop();
            var headX =this.cells[0].x;
            var headY =this.cells[0].y;
            
            var X=headX+1;
            var Y=headY;
            this.cells.unshift({x:X,y:Y});

        }

    }; 
    snake.createSnake();
    // addEventListener on the DOM
    function keyPressed(){
        console.log("key Pressed");
    }



    document.addEventListener('keydown',keyPressed);

}



function draw(){
    //erase the old frame
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
}
function update(){
    snake.updateSnake();

}

function gameloop(){
    draw();
    update();
    
}

init();
var f=setInterval(gameloop,100);


