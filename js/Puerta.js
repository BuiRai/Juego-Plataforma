function Puerta(x,y, imagen){
	//Llamar al constructor de Kinetic.Image
	Kinetic.Image.call(this);
	this.setWidth(30);
	this.setHeight(70);
	this.setX(x);
	this.setY(y);
	this.setImage(imagen);
}

//Todo lo que Kinetic.Image tiene se le añade a Heroe, como herencia
Puerta.prototype = Object.create(Kinetic.Image.prototype);