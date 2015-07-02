function Enemigo(x,y){
	//Llamar al constructor de Kinetic.Rect
	Kinetic.Rect.call(this);
	this.setWidth(60); //Ancho del enemigo
	this.setHeight(60); //Alto del enemigo
	this.setX(x);
	this.setY(y);
	this.contador = 0;
	this.setFill("blue");

	this.aleatorio = function(inferior, superior){
		var posibilidades = superior - inferior;
		var random = Math.random() * posibilidades;
		random = Math.floor(random);
		return parseInt(inferior) + random;
	}

	this.mover = function(){
		
	}
}

//Todo lo que Kinetic.Rect tiene se le añade a Heroe, como herencia
Enemigo.prototype = Object.create(Kinetic.Rect.prototype);