function Heroe(){
	//Llamar al constructor de Kinetic.Rect
	Kinetic.Rect.call(this);
	/*setWidth(), setHeight() son métodos de Kinetic.Rect*/
	this.setWidth(40); //Ancho del heroe
	this.setHeight(70); //Alto del heroe
	this.vx = 15; //Velocidad X del heroe
	this.vy = 0; //Velocidad X del heroe
	this.direction = 1;
	this.contador = 0;
	
	this.caminar = function(){

	}
	this.retroceder = function(){
		
	}
	this.saltar = function(){
		
	}
	this.aplicarGravedad = function(){
		
	}
}

//Todo lo que Kinetic.Rect tiene se le añade a Heroe, como herencia
Heroe.prototype = Object.create(Kinetic.Rect.prototype);