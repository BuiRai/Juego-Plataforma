function Heroe(imagen, animaciones){
	//Llamar al constructor de Kinetic.Sprite
	Kinetic.Sprite.call(this);
	/*setWidth(), setHeight() son métodos de Kinetic.Sprite*/
	this.setWidth(40); //Ancho del heroe
	this.setHeight(70); //Alto del heroe
	this.attrs.image = imagen;
	this.setAnimations(animaciones);
	this.setAnimation("caminar"); //Comienza con la animación caminar
	this.estaSaltando = false;
	this.direccion = true; //True: hacia adelante // false: hacia atras
	this.vx = 15; //Velocidad X del heroe
	this.vy = 0; //Velocidad y del heroe
	this.limiteDer = 0;
	this.limiteTope = 0;
	this.direccion = 1;
	this.contador = 0;
	this.attrs.frameRate = 10; //Velocidad de cambio de frames
	
	this.caminar = function(){
		if (this.direccion) {
			/*move() : Método de kinetic para mover un personaje, recibe:
			1o: cuanta distancia se movera en X
			2o: cuanta distancia se movera en Y*/
			this.move(this.vx, 0);
		}else{
			/*Regresar el método drawFunc a la normalidad*/
			this.attrs.drawFunc = function (a){
				var b=this.attrs.animation,
				c=this.attrs.index,
				d=this.attrs.animations[b][c],
				e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,0,0,d.width,d.height)
			}
			this.setScale({x:1});
			this.direccion = true;
		}
		
		if (this.getX() > this.limiteDer) {
			this.move(this.limiteDer - this.getX(), 0);
		}
	}
	this.retroceder = function(){
		if (!this.direccion) {
			this.move(-15, 0);	
		}else{
			/*Sobre escribir el método drwFunc()*/
			this.attrs.drawFunc = function (a){
				var b=this.attrs.animation,
				c=this.attrs.index,
				d=this.attrs.animations[b][c],
				e=a.getContext(),f=this.attrs.image;
				f&&e.drawImage(f,d.x,d.y,d.width,d.height,-d.width,0,d.width,d.height)
			}
			this.setScale({x:-1});
			this.direccion = false;
		}
		
		if (this.getX() < 0) {
			this.move(- this.getX(), 0);
		}
	}
	this.saltar = function(){
		this.estaSaltando = true;
		if (this.vy <= 2) {
			this.setAnimation("saltarFrames");
			this.vy = -20;
			this.contador++;
			/*afterFrame recibe dos parametros:
			1o: Número del frame (en este caso es el de caminar, el 0)
			2o: Que funcion hara despues de haber llegado al frame que 
			se le asigno en el primer parámetro*/
			this.afterFrame(10, function(){
				this.estaSaltando = false;
				this.setAnimation("estatico");
			});
		}
	}
	this.aplicarGravedad = function(gravedad, vRebote){
		this.vy += gravedad;
		this.move(0, this.vy);
		if ( (this.getY() + this.getHeight()) > this.limiteTope ) {
			this.setY(this.limiteTope - this.getHeight());
			this.vy = 0;
			this.contador = 0;
		}
	}
}

//Todo lo que Kinetic.Sprite tiene se le añade a Heroe, como herencia
Heroe.prototype = Object.create(Kinetic.Sprite.prototype);