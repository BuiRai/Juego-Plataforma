function Puerta(x,y){
	//Llamar al constructor de Kinetic.Rect
	Kinetic.Rect.call(this);
	this.setWidth(30);
	this.setHeight(70);
	this.setX(x);
	this.setY(y);
	this.setFill("brown");
}

//Todo lo que Kinetic.Rect tiene se le añade a Heroe, como herencia
Puerta.prototype = Object.create(Kinetic.Rect.prototype);