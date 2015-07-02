function Moneda(x,y){
	//Llamar al constructor de Kinetic.Rect
	Kinetic.Rect.call(this);
	this.setWidth(30);
	this.setHeight(30);
	this.setX(x);
	this.setY(y);
	this.setFill("yellow");
}

//Todo lo que Kinetic.Rect tiene se le añade a Heroe, como herencia
Moneda.prototype = Object.create(Kinetic.Rect.prototype);