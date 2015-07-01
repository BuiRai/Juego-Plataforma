function Heroe(){
	//Llamar al constructor de Kinetic.Rect
	Kinetic.Rect.call(this);
	/*setWidth(), setHeight() son métodos de Kinetic.Rect*/
	this.setWidth(40); //Ancho del heroe
	this.setHeight(70); //Alto del heroe
	this.vx = 15; //Velocidad X del heroe
	this.vy = 0; //Velocidad X del heroe
	this.limiteDer = 0;
	this.direction = 1;
	this.contador = 0;
	this.setFill("red");
	
	this.caminar = function(){
		/*move() : Método de kinetic para mover un personaje, recibe:
		1o: cuanta distancia se movera en X
		2o: cuanta distancia se movera en Y*/
		this.move(this.vx, 0);
		if (this.getX() > this.limiteDer) {
			this.move(this.limiteDer - this.getX(), 0);
		}
	}
	this.retroceder = function(){
		this.move(-15, 0);
		if (this.getX() < 0) {
			this.move(- this.getX(), 0);
		}
	}
	this.saltar = function(){
		
	}
	this.aplicarGravedad = function(){
		
	}
}

//Todo lo que Kinetic.Rect tiene se le añade a Heroe, como herencia
Heroe.prototype = Object.create(Kinetic.Rect.prototype);