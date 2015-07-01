function Enemigo(x,y){
	this.setWidth(60); //Ancho del enemigo
	this.setHeight(60); //Alto del enemigo
	this.setX(x);
	this.setY(y);
	this.contador = 0;

	this.aleatorio = function(inferior, superior){
		var posibilidades = superior - inferior;
		var random = Math.random() * posibilidades;
		random = Math.floor(random);
		return parseInt(inferior) + random;
	}

	this.mover = function(){
		
	}
}