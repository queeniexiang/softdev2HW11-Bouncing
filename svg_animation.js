var clear = document.getElementById("clear");

var pic = document.getElementById("vimage");

var isClear = false;

var inMotion = false; 

var intv;

var dots = [];

//Clear Function: 
var clear_svg = function() {
    while (pic.lastChild) {
	pic.removeChild(pic.lastChild);
    }
    isClear = true;
    clearInterval(intv);
    dots = [];
    inMotion = false; 
};

//Draws dots when SVG is clicked
var clicked = function(e) {
    if (e.toElement == this) {
	dots.push(makeDot()); 
    }

    inMotion = true;

    if (inMotion) {
	intv = setInterval(go, 20);
	inMotion = !inMotion;
    }
};

//Drawing dots: 
var makeDot = function() {  
    var x = Math.random() * 500;
    var y = Math.random() * 500; 
    var radius = 25;
    var fillColor = "lime";
    
    var dot = document.createElementNS(
	"http://www.w3.org/2000/svg",
	"circle"
    )

    dot.display = function() {
	
	//Creating a circle based off of mouse positions (x, y coordinates) 
	dot.setAttribute("cx", x);
	dot.setAttribute("cy", y);
	dot.setAttribute("r", radius);
	dot.setAttribute("fill", fillColor); 
	pic.appendChild(this);
    };

    //Accessors:
    dot.getX = function() {
	return x;
    }

    dot.getY = function() {
	return y;
    }

    dot.getRadius = function() {
	return radius; 
    }
    
    dot.getColor = function() {
	return color;
    }

    //Mutators:
    dot.setX = function (newX) {
	x = newX;
    }
    
    dot.setY = function (newY) {
	y = newY;
    }

    //Accesors
    dot.setRadius = function (newR) {
	radius = newR;
    }
    
    dot.setColor = function (newC) {
	fillColor = newC;
    }

    //Initializes the direction and speed of circle used in bounce()
    var direction = 1;
    var xspeed = 2.0;
    var yspeed = 1.0;

    var vector = 1;
    
    dot.move = function() {
	//If x-cor goes outside of canvas's width:
	//Reverse direction, set new speed
	if ( (x + 100 > 500) || (x < 0) )  {
	    if (x + 100 > 500) {
		x = 400; 
	    }

	    else {
		x = 0;
	    }
	    
	    direction *= -1;
	    xspeed = 1; //Math.random() * 2;
	}

	//If y-cor goes outside of canvas's height:
	//Reverse direction, set new speed
	if ( (y + 100 > 500) || (y < 0) ) {
	    if (y + 100 > 500) {
		y = 400;
	    }

	    else {
		y = 0;
	    }
	    
	    direction *= -1;
	    yspeed = 1; //Math.random() * 2;  
	}

	//Change x and y 
	x += (xspeed * direction);
	y += (yspeed * direction);
    };
    
    return dot; 
};

var go = function() {
    ///var count1 = 0;
    //var count2 = 0;

    for (count1 = 0; count1 < dots.length; count1++) {
	dots[count1].move();
	dots[count1].display(); 
    }
};

//Tells SVG drawing space to listen to mouse clicks. Will trigger function clicked upon a mouse click. 
pic.addEventListener("click", clicked, true);

//Clears all SVG elements 
clear.addEventListener("click", clear_svg); 




    
