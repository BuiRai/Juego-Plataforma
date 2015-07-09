var framesP = {
	//Animación de estar estático
	estatico: [{
		x: 30,
        y: 0,
        width: 65,
        height: 79
	}],
	//Animación de caminar
    caminar: [{
        x: 30,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 109,
        y: 0,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 0,
        width: 65,
		height: 79
	}, {
		x: 267,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 0,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 0,
		width: 65,
		height: 79
	}],
	//Animación de saltar (11 frames)
    saltarFrames: [{
        x: 109,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 188,
        y: 70,
        width: 65,
        height: 79
    },{
        x: 188,
        y: 70,
        width: 65,
        height: 79
    }, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
        x: 267,
        y: 70,
        width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 346,
		y: 70,
		width: 65,
		height: 79
	}, {
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	},{
		x: 425,
		y: 70,
		width: 65,
		height: 79
	}]
};
var stage, fondo, grupoAssets, puntaje, imagenFondo;
var keyboard = {};
var intv;
var personaje;
var grav = 0.8;
var val_reb = 0;
var bandera = false;
var juego = new Game();
/*Imágenes*/
var imgHeroe = new Image();
imgHeroe.src = "imgs/Heroe.png";
var imgEnemy = new Image();
imgEnemy.src = "imgs/enemy.png";
var imgMoneda = new Image();
imgMoneda.src = "imgs/moneda.png";
var imgPlata = new Image();
imgPlata.src = "imgs/pattern.png";
var imgPuerta = new Image();
imgPuerta.src = "imgs/puerta.png";
var imgLlave = new Image();
imgLlave.src = "imgs/llave.png";
var imgFondo = new Image();
imgFondo.src = "imgs/fondo.jpg";

grupoAssets = new Kinetic.Group({
	x:0,
	y:0
});

//Recibe como parametro un JSon
stage = new Kinetic.Stage({
	//Contenedor del Canvas
	container: "game",  //id del Div en donde estará Canvas
	width: 960,
	height: 500
});

/*Crear un objeto texto (del Kinetic) para dibujar sobre el Canvas, 
recibe un objeto JSon*/
puntaje = new Kinetic.Text({
	text: "Puntaje: 0", //El texto a dibujar
	height: 25,
	width: 150,
	x: stage.getWidth() - 150, //Posición X
	y: 0, //Posición Y
	fill: "#f7f7f7", //El color con el que se dibujara
	fontFamly: "Arial",
	fontSize: 20
});

imagenFondo = new Kinetic.Image({
	x:0,
	y:0,
	image: imgFondo,
	width: stage.getWidth(),
	height: stage.getHeight()
});

function nivelUno(){
	juego.puntaje = 0;
	if (bandera) return;
	juego.puntaje = 0;
	juego.llave = true;
	fondo = new Kinetic.Layer();
	/*Enemigos*/
	grupoAssets.add(new Enemigo(200,stage.getHeight()-75, imgEnemy));
	grupoAssets.add(new Enemigo(850,stage.getHeight()/3.9-60, imgEnemy));
	grupoAssets.add(new Enemigo(170,stage.getHeight()/3-60, imgEnemy));
	grupoAssets.add(new Enemigo(1020,stage.getHeight()-75, imgEnemy));
	grupoAssets.add(new Enemigo(1120,stage.getHeight()-75, imgEnemy));
	grupoAssets.add(new Enemigo(1220,stage.getHeight()-75, imgEnemy));

	/*Plataforma (piso)*/
	var piso = new Plataforma(0,stage.getHeight()-15, imgPlata);
	piso.setWidth(stage.getWidth() * 2);
	grupoAssets.add(piso);
	/*Plataforma (en el aire)*/
	grupoAssets.add(new Plataforma(20,stage.getHeight()/1.5, imgPlata));
	grupoAssets.add(new Plataforma(190,stage.getHeight()/3, imgPlata));
	grupoAssets.add(new Plataforma(510,stage.getHeight()/1.6, imgPlata));
	grupoAssets.add(new Plataforma(870,stage.getHeight()/3.9, imgPlata));

	/*Monedas*/
	grupoAssets.add(new Moneda(350, stage.getHeight()/3-130, imgMoneda));
	grupoAssets.add(new Moneda(650, stage.getHeight()/2-130, imgMoneda));
	grupoAssets.add(new Moneda(80, stage.getHeight()-80, imgMoneda));
	grupoAssets.add(new Moneda(910, stage.getHeight()/6, imgMoneda));
	grupoAssets.add(new Moneda(1220, stage.getHeight()-80, imgMoneda));

	/*Puerta*/
	grupoAssets.add(new Puerta(910, stage.getHeight()-85, imgPuerta));

	/*Heroe*/
	personaje = new Heroe(imgHeroe, framesP);
	personaje.setX(0);
	personaje.setY(stage.getHeight() - personaje.getHeight());
	personaje.limiteDer = stage.getWidth() - personaje.getWidth(); 
	personaje.limiteTope = stage.getHeight();

	fondo.add(imagenFondo);
	fondo.add(personaje);
	fondo.add(grupoAssets);
	fondo.add(puntaje);
	console.log(personaje);
	personaje.start();//Comienza a ejecitar la animación
	stage.add(fondo);
	/*setInterval() recibe dos parámetros, una función, y un número 
	representado por milisegundos, tiempo en que se ejecutara la 
	función del primer parametro*/
	intv = setInterval(frameLoop, 1000/20);
}

function moverPersonaje(){
	//Si no esta caminando e izquierda o derecha
	if ( (personaje.getAnimation() != "caminar") && (keyboard[37] || keyboard[39]) ){
		personaje.setAnimation("caminar");
	}
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
	/*Si el personaje no está saltando*/
	if (!(keyboard[39] || keyboard[38] || keyboard[37]) && !personaje.estaSaltando) {
		personaje.setAnimation("estatico");
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

function nivelDos(){
	fondo = new Kinetic.Layer();
	juego.llave = false;
	/*Enemigos*/
	grupoAssets.add(new Enemigo(200,stage.getHeight()/1-5-60, imgEnemy));
	grupoAssets.add(new Enemigo(850,stage.getHeight()/3.9-60, imgEnemy));
	grupoAssets.add(new Enemigo(25,stage.getHeight()/3-60, imgEnemy));
	grupoAssets.add(new Enemigo(500,stage.getHeight()-75, imgEnemy));
	grupoAssets.add(new Enemigo(6500,stage.getHeight()-75, imgEnemy));
	grupoAssets.add(new Enemigo(850,stage.getHeight()-75, imgEnemy));

	/*Plataforma (piso)*/
	var piso = new Plataforma(0,stage.getHeight()-15, imgPlata);
	piso.setWidth(stage.getWidth() * 2);
	grupoAssets.add(piso);
	/*Plataforma (en el aire)*/
	grupoAssets.add(new Plataforma(190,stage.getHeight()/1.5, imgPlata));
	grupoAssets.add(new Plataforma(10,stage.getHeight()/3, imgPlata));
	grupoAssets.add(new Plataforma(310,stage.getHeight()/5, imgPlata));
	grupoAssets.add(new Plataforma(870,stage.getHeight()/3.9, imgPlata));

	/*Monedas*/
	grupoAssets.add(new Moneda(350, stage.getHeight()/3-130, imgMoneda));

	/*Puerta*/
	grupoAssets.add(new Puerta(1800, stage.getHeight()-90, imgPuerta));

	/*Llave*/
	grupoAssets.add(new Llave(850, stage.getHeight()/3.9-60, imgLlave));

	/*Heroe*/
	personaje = new Heroe(imgHeroe, framesP);
	personaje.setX(0);
	personaje.setY(stage.getHeight() - 80);
	personaje.limiteDer = stage.getWidth() - personaje.getWidth(); 
	personaje.limiteTope = stage.getHeight();

	fondo.add(imagenFondo);
	fondo.add(personaje);
	fondo.add(grupoAssets);
	fondo.add(puntaje);
	console.log(personaje);
	personaje.start();//Comienza a ejecitar la animación
	stage.add(fondo);
	/*setInterval() recibe dos parámetros, una función, y un número 
	representado por milisegundos, tiempo en que se ejecutara la 
	función del primer parametro*/
	intv = setInterval(frameLoop, 1000/20);
}

function moverFondo(){
	if (personaje.getX() > (stage.getWidth())/2 && keyboard[39]) {
		personaje.vx = 2;
		for(i in grupoAssets.children){
			var asset = grupoAssets.children[i];
			asset.move(-5,0);
		}
	}else{
		personaje.vx = 10;
	}
}

function moverEnemigos(){
	var enemigos = grupoAssets.children;
	for(index in enemigos){
		var enemigo = enemigos[index];
		if ( enemigo instanceof Enemigo) {
			enemigo.mover();	
		}
	}
}

function aplicarFuerzas(){
	personaje.aplicarGravedad(grav, val_reb);
}

function detectarColPlataforma(){
	var plataformas = grupoAssets.children;
	for(index in plataformas){
		var plataforma = plataformas[index];

		if ( hit( plataforma, personaje ) ) {
			/*Si es un enemigo, entonces se procede a tomar alguna de las 
			siguientes dos decisiones:*/
			if ( plataforma instanceof Enemigo) {
				/*Si venimos de arriba matamos y removemos al enemigo*/
				if (personaje.vy > 2 && personaje.getY() < plataforma.getY() ) {
					plataforma.remove();
					juego.puntaje += 5;
					console.log(juego.puntaje);
				/*Perdimos el juego, el enemigo nos mato :'(*/
				}else{
					grupoAssets.removeChildren();
					document.querySelector("#lose").style.display = "block";
					document.querySelector("#game").style.display = "none";
					window.clearInterval(intv);
					bandera = false;
				}
			}
			/*Si es una plataforma, entoncces nos quedamos parados encima 
			de ella*/
			else if (plataforma instanceof Plataforma && personaje.getY() < plataforma.getY() && personaje.vy >= 0 ) {
				personaje.contador = 0;
				personaje.setY(plataforma.getY() - personaje.getHeight());
				personaje.vy *= val_reb;
			}
			/*Si es una moneda la quitamos del grupo y aumentamos el
			puntaje*/
			else if (plataforma instanceof Moneda) {
				plataforma.remove();
				juego.puntaje++;
			}
			/*Si es una llave se pone true en el juego y la removemos
			del grupo de assets*/
			else if (plataforma instanceof Llave) {
				plataforma.remove();
				juego.llave = true;
				continue;
			}else if(plataforma instanceof Puerta && juego.llave){
				if (juego.nivel == 1){
					grupoAssets.removeChildren();
					window,clearInterval(intv);
					juego.nivel = 2;
					nivelDos();
				}
				else if (juego.nivel == 2){
					grupoAssets.removeChildren();
					document.querySelector("#win").style.display = "block";
					document.querySelector("#game").style.display = "none";
					document.querySelector("#score").innerHTML = juego.puntaje;
					window.clearInterval(intv);
					bandera = false;
				}
			}
		}
	}
}

function actualizarTexto(){
	puntaje.setText("Puntaje: " + juego.puntaje);
}

addKeyBoardEvents();

function frameLoop(){
	aplicarFuerzas();
	actualizarTexto();
	detectarColPlataforma();
	moverFondo();
	moverPersonaje();
	moverEnemigos();
	stage.draw();
}