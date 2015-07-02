function Plataforma(x,y){
	//Llamar al constructor de Kinetic.Rect
	Kinetic.Rect.call(this);
	this.setWidth(200);
	this.setHeight(40);
	this.setX(x);
	this.setY(y);
	this.setFill("black");
}

//Todo lo que Kinetic.Rect tiene se le añade a Heroe, como herencia
Plataforma.prototype = Object.create(Kinetic.Rect.prototype);