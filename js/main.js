var stage, fondo;
var keyboard = {};
var intv;
var personaje;
var grav = 0.8;
var val_reb = 0;

//Recibe como parametro un JSon
stage = new Kinetic.Stage({
	//Contenedor del Canvas
	container: "game",  //id del Div en donde estará Canvas
	width: 960,
	height: 500
});

function nivelUno(){
	fondo = new Kinetic.Layer();
	personaje = new Heroe();
	personaje.setX(0);
	personaje.setY(stage.getHeight() - personaje.getHeight());
	personaje.limiteDer = stage.getWidth() - personaje.getWidth(); 
	personaje.limiteTope = stage.getHeight();
	fondo.add(personaje);
	stage.add(fondo);
}

function moverPersonaje(){
	//37 : flecha izquierda
	if (keyboard[37]) {
		personaje.retroceder();
	}
	//39 : flecha derecha
	if (keyboard[39]) {
		personaje.caminar();
	}
	//38 : flecha arriba
	if (keyboard[38]  && personaje.contador < 1) {
		personaje.saltar();
	}
}

function addKeyBoardEvents(){
	addEvent(document, "keydown", function(e){
		keyboard[e.keyCode] = true;
	});
	addEvent(document, "keyup", function(e){
		keyboard[e.keyCode] = false;
	});

	function addEvent(element, eventName, func){
		/*Este if es para ver si se puede ejecutar el addEventListener, 
		si se puede significa que no estamos en IE*/
		if (element.addEventListener) {
			//Para exploradores que no sean IE
			element.addEventListener(eventName, func, false);

		//Si no, se verifica si se tiene el attachEvent
		}else if(element.attachEvent){
			//Para exploradores que sean IE
			element.attachEvent(eventName, func);
		}	
	}	
}

/*Función para las colisiones, retorna:
true: si hay colisión
false: si no hay colisión*/
function hit(a,b){
	var hit = false;
	//Colisiones horizontales
	if (b.getX() + b.getWidth() >= a.getX() && b.getX() < a.getX() + a.getWidth()) {
		//Colisiones verticales
		if (b.getY() + b.getHeight() >= a.getY() && b.getY() < a.getY() + a.getHeight()) {
			hit = true;
		}
	}
	//Colisión de a con b
	if (b.getX() <= a.getX() && b.getX() + b.getWidth() >= a.getX() + a.getWidth()) {
		if (b.getY() <= a.getY() && b.getY() + b.getHeight() >= a.getY() + a.getHeight()) {
			hit = true;
		}
	}
	//Colisión de b con a
	if (a.getX() <= b.getX() && a.getX() + a.getWidth() >= b.getX() + b.getWidth()) {
		if (a.getY() <= b.getY() && a.getY() + a.getHeight() >= b.getY() + b.getHeight()) {
			hit = true;
		}
	}
	return hit;
}

function aplicarFuerzas(){
	personaje.aplicarGravedad(grav, val_reb);
}

addKeyBoardEvents();
nivelUno();
/*setInterval() recibe dos parámetros, una función, y un número 
representado por milisegundos, tiempo en que se ejecutara la función 
del primer parametro*/
intv = setInterval(frameLoop, 1000/20);
function frameLoop(){
	aplicarFuerzas();
	moverPersonaje();
	stage.draw();
}