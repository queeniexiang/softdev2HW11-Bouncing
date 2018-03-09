//retrieve node in DOM via ID                                                   
var c = document.getElementById("slate");
var stp = document.getElementById("stop");
var zoomZoom = document.getElementById("animaniac");
var clr = document.getElementById("clear");
var DVD = document.getElementById("bounce");

var logo = new Image();
logo.src = "../softdev2HW1--canvasAnimation/dvd_logo.png";

                                                                              
//instantiate a CanvasRenderingCOntext2D object                                 
var ctx = c.getContext("2d");

//ID used by window.requestAnimationFrame()
var id;

//Initializes x and y coordinates used by various circles created in the functions below
var x = 300;
var y = 300;

//Initializes the radius used by various circles created in the functions below
var radius = 20;

//Initiazlies the color used by various circles created in the functions below
var color = "black";

//Initializes the direction and speed of circle used in bounce()
var direction = 1;
var xspeed = 2.0;
var yspeed = 1.0;

var vector = 1; 


/* 
==========================
METHODS: 
==========================
*/

//Draws a circle
var addCircle = function(xcor, ycor, radius) {
    //Sets up the circle with x and y cor of mouse and a radius of 20
    ctx.arc(xcor, ycor, radius, 0, 2*Math.PI);

};

/* ========================== */

//Draws for animaniac
var animaniac = function() {
    window.cancelAnimationFrame(id);
    
    //Clearing
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);

    //Beginning
    ctx.beginPath();
        
    //Checking radius 
    console.log("radius: " + radius); 

    //Shrink / Grow when necessary 
    if ( (x + radius > 600) || (radius < 3) ) {
	vector *= -1; 
    }
    
    radius += (3 * vector);
    
    //Create circle
    addCircle(x,y,radius);
    
    //Fill in circle with color
    ctx.fillStyle = color;   
    ctx.fill();       
    
    id = window.requestAnimationFrame(animaniac);
    console.log("Frame ID: " + id);  
};

/* ========================== */
//Move method for bounce 
var move = function() {
    //If x-cor goes outside of canvas's width:
    //Reverse direction, set new speed
    if ( (x + 100 > 600) || (x < 0) )  {
	if (x + 100 > 600) {
	    x = 500; 
	}

	else {
	    x = 0;
	}
	    
	direction *= -1;
	xspeed = 1; //Math.random() * 2;
	//Random colors:
	var red = Math.floor( Math.random() * 255 );
	var green = Math.floor( Math.random() * 255 );
	var blue = Math.floor( Math.random() * 255 );
	//Fill the circle with black
	ctx.fillStyle = "rgb(" + red + "," + green + "," + blue + ")"; 
    }

    //If y-cor goes outside of canvas's height:
    //Reverse direction, set new speed
    if ( (y + 100 > 600) || (y < 0) ) {
	if (y + 100 > 600) {
	    y = 500;
	}

	else {
	    y = 0;
	}
	  
	direction *= -1;
	yspeed = 1; //Math.random() * 2;

	//Random colors:
	var red = Math.floor( Math.random() * 255 );
	var green = Math.floor( Math.random() * 255 );
	var blue = Math.floor( Math.random() * 255 );

	//Fill the circle 
	color = "rgb(" + red + "," + green + "," + blue + ")";
	ctx.fillStyle = color;
    }

    //Change x and y 
    x += (xspeed * direction);
    y += (yspeed * direction);

    /* 
    //Draw new circle
    ctx.arc(x, y, radius, 0, 2*Math.PI);
    ctx.fill(); */
};

var draw_logo = function() {
    ctx.beginPath();
    radius = 50;
    ctx.drawImage(logo, x, y, 100, 100);
}
/* ========================== */
//DVD bouncing motion
var bounce = function() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);
  
    draw_logo();

    //Draw rectangle
    // ctx.drawRect(x,y, 10, 10);

  
    //DVD movement
    move(x,y);

    id = window.requestAnimationFrame(bounce);
    console.log(id);
    
};

/* ========================== */

//Stops the animation
var stop = function() {
    window.cancelAnimationFrame(id);
};

/* ========================== */

//Clears the canvas
var clear = function() {
    radius = 20;
    x = 300;
    y = 300;
    console.log("clearing");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 600, 600);
};
/* ========================== */

zoomZoom.addEventListener("click", animaniac);
stp.addEventListener("click", stop);
clr.addEventListener("click", clear);
DVD.addEventListener("click", bounce); 


    
