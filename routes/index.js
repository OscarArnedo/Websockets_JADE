/* GET home page. SERVIDOOOOOR!  */
const express = require("express");
const app = express();
const port = 8888;
var io = require('socket.io').listen(app.listen(port));

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert'); //utilitzem assercions
var ObjectId = require('mongodb').ObjectID;

var partidaAcabada = false;

var contadorTiempo = 0;

var colores = ['#46E4E6','#E4902C', '#167CCB', '#4C0CE1', '#BC0CE1', '#E10C0C', '#FFFFFF'];
var numColores = 6;

var tablero =
[
    { id: "a1", color: "n", posicion: "esquinaAI" },{ id: "a2", color: "n", posicion: "arriba" },{ id: "a3", color: "n", posicion: "arriba" }, { id: "a4", color: "n", posicion: "arriba" }, { id: "a5", color: "n", posicion: "arriba" }, { id: "a6", color: "n", posicion: "arribaBD" },
    { id: "b1", color: "n", posicion: "lateralI" }, { id: "b2", color: "n", posicion: "todo" }, { id: "b3", color: "n", posicion: "todo" }, { id: "b4", color: "n", posicion: "todo" }, { id: "b5", color: "n", posicion: "todo" }, { id: "b6", color: "n", posicion: "lateralD" }, 
    { id: "c1", color: "n", posicion: "lateralI" }, { id: "c2", color: "n", posicion: "todo" }, { id: "c3", color: "n", posicion: "todo" }, { id: "c4", color: "n", posicion: "todo" }, { id: "c5", color: "n", posicion: "todo" }, { id: "c6", color: "n", posicion: "lateralD" }, 
    { id: "d1", color: "n", posicion: "lateralI" }, { id: "d2", color: "n", posicion: "todo" }, { id: "d3", color: "n", posicion: "todo" }, { id: "d4", color: "n", posicion: "todo" }, { id: "d5", color: "n", posicion: "todo" }, { id: "d6", color: "n", posicion: "lateralD" },
    { id: "e1", color: "n", posicion: "lateralI" }, { id: "e2", color: "n", posicion: "todo" }, { id: "e3", color: "n", posicion: "todo" }, { id: "e4", color: "n", posicion: "todo" }, { id: "e5", color: "n", posicion: "todo" }, { id: "e6", color: "n", posicion: "lateralD" }, 
    { id: "f1", color: "n", posicion: "esquinaBI" }, { id: "f2",color: "n", posicion: "abajo" },{ id: "f3",color: "n", posicion: "abajo" }, { id: "f4", color: "n", posicion: "abajo" }, { id: "f5", color: "n", posicion: "abajo" }, { id: "f6", color: "n", posicion: "esquinaBD" },      
];

class Jugador {
  constructor() {
    this.nombre = '';
    this.color = '';
  }
  setNombre(nombre) {
    this.nombre = nombre;
  }
  setColor(color){
    this.color= color;
  }

  comprobarDerecha() {
    if (tablero[i+1].color == this.color ){
      tablero[i].color = this.color;
    }
  }

  comprobarAbajoIzquierda() {
    if (tablero[i+5].color == this.color ){
      tablero[i].color = this.color;
    }
  }

  comprobarAbajo() {
    if (tablero[i+6].color == this.color ){
      tablero[i].color = this.color;
    }
  }

  comprobarAbajoDerecha() {
    if (tablero[i+7].color == this.color ){
      tablero[i].color = this.color;
    }
  }

  comprobarIzquierda() {
    if (tablero[i-1].color == this.color ){
      tablero[i].color = this.color;
    }
    
  }

  comprobarArribaDerecha() {
    if (tablero[i-5].color == this.color ){
      tablero[i].color = this.color;
    }
  }

  comprobarArriba() {
    if (tablero[i-6].color == this.color ){
      tablero[i].color = this.color;

      if(jugadorUno.color == this.color){

      }
    }
  }

  comprobarArribaIzquierda() {
    if (tablero[i-7].color == this.color ){
      tablero[i].color = this.color;
    }
  }

  aPosiciones(posicionFicha) {
    // -------ESQUINAS ARRIBA--------
    if (posicionFicha == "esquinaAI") {
        this.comprobarDerecha();
        this.comprobarAbajo();
        this.comprobarAbajoDerecha();   
    }
    if (posicionFicha == "esquinaAD") {
       this.comprobarIzquierda();
       this.comprobarAbajoIzquierda();
       this.comprobarAbajo();
    }
    // -------ESQUINAS ABAJO--------
    if (posicionFicha == "esquinaBI") {
        this.comprobarIzquierda();
        this.comprobarArriba();
        this.comprobarArribaIzquierda();
    }
    if (posicionFicha == "esquinaBD") {
        this.comprobarIzquierda();
        this.comprobarArriba();
        this.comprobarArribaDerecha();
    }
    // -------LATERALES--------
    if (posicionFicha == "lateralI") {
        this.comprobarDerecha();
        this.comprobarAbajo();
        this.comprobarAbajoDerecha();
        this.comprobarArribaDerecha();
        this.comprobarArriba();
    }
    if (posicionFicha == "lateralD") {
        this.comprobarIzquierda();
        this.comprobarArribaIzquierda();
        this.comprobarArriba();
        this.comprobarAbajo();
        this.comprobarAbajoIzquierda();
    }
    // -------Centro--------
    if (posicionFicha == "todo") {
        this.comprobarIzquierda();
        this.comprobarDerecha();
        this.comprobarArribaIzquierda();
        this.comprobarAbajoDerecha();
        this.comprobarArriba();
        this.comprobarAbajo();
        this.comprobarArribaDerecha();
        this.comprobarAbajoIzquierda();
    }
    if (posicionFicha == "arriba") {
        this.comprobarDerecha();
        this.comprobarIzquierda();
        this.comprobarAbajo();
        this.comprobarAbajoDerecha();
        this.comprobarAbajoIzquierda();
    }
    if (posicionFicha == "abajo") {
        this.comprobarDerecha();
        this.comprobarIzquierda();
        this.comprobarArriba();
        this.comprobarArribaIzquierda();
        this.comprobarArribaDerecha();

    }
  }

}

class Partida{

  constructor() {
    this.jugadores = [];
    this.puntuaciones = [];
    this.puntuacionJ1 = 0;
    this.puntuacionJ2 = 0;
  }

  añadirJugador(jugador){
    this.jugadores.push(jugador);
  }

  contarPuntuaciones(){
    
    this.puntuaciones = [];
    this.puntuacionJ1 = 0;
    this.puntuacionJ2 = 0;

    for(let i=0; i<tablero.length; i++){
      if(tablero[i].color == this.jugadores[0].color){
        this.puntuacionJ1++;
      }else if(tablero[i].color == this.jugadores[1].color){
        this.puntuacionJ2++;
      }
    }

    this.puntuaciones.push(this.puntuacionJ1);
    this.puntuaciones.push(this.puntuacionJ2);

  }

  guardarPuntuaciones(){
    var ruta = 'mongodb://localhost:27017/websockets';
    
    MongoClient.connect(ruta, function (err, db) {
        assert.equal(null, err);
        console.log("Connexión correcta");

        afegirDocuments(db, err, function () { });
        db.close();
    });

    var afegirDocuments = function (db, err, callback) {
        db.collection('partidas').insertOne({
        "NombreJ1": jugadorUno.nombre,
        "ColorJ1": jugadorUno.color,
        "PuntuacionJ1": partida.puntuacionJ1,
        "NombreJ2": jugadorDos.nombre,
        "ColorJ2": jugadorDos.color,
        "PuntuacionJ2":partida.puntuacionJ2,
        "Tiempo": contadorTiempo
        });

        assert.equal(err, null);
        console.log("Afegit document a col·lecció usuaris");
        callback();

    };

    partidaAcabada = true;

  }

  guardarUsuarios(){
    var ruta = 'mongodb://localhost:27017/websockets';
    
    MongoClient.connect(ruta, function (err, db) {
        assert.equal(null, err);
        console.log("Connexión correcta");

        añadirUsuario1(db, err, function () { });
        db.close();
    });

    MongoClient.connect(ruta, function (err, db) {
      assert.equal(null, err);
      console.log("Connexión correcta");

      añadirUsuario2(db, err, function () { });
      db.close();
    });

    var añadirUsuario1 = function (db, err, callback) {
      db.collection('usuarios').insertOne({
      "nombre": jugadorUno.nombre,
      "color": jugadorUno.color,
      "puntuacion": partida.puntuacionJ1,
      "tiempo": contadorTiempo
      });
    }

    var añadirUsuario2 = function (db, err, callback) {
      db.collection('usuarios').insertOne({
        "nombre": jugadorDos.nombre,
        "color": jugadorDos.color,
        "puntuacion": partida.puntuacionJ2,
        "tiempo": contadorTiempo
        });
      assert.equal(err, null);
      console.log("Afegit document a col·lecció usuaris");
      callback();
    }
  }


}

var jugadorUno = new Jugador();
var jugadorDos = new Jugador();

var nombreJug = [
  {jugador: " ", colorJ: " "}, 
  {jugador: " ",colorJ: " " }
];

var partida = new Partida();

io.on('connection', function(socket){
  socket.on('informacion', function (data) { // recibo usuario, color, posicion
    for(i=0; i<tablero.length; i++){   
      if(data[0] == jugadorUno.nombre){
        if(data[2] == tablero[i].id){  
          if("n" == tablero[i].color){

             jugadorUno.aPosiciones(tablero[i].posicion);
          }            
         
        }
      }else if (data[0] == jugadorDos.nombre){
        if(data[2] == tablero[i].id){ 
          if("n" == tablero[i].color){
            jugadorDos.aPosiciones(tablero[i].posicion);
          }
                
          }
        }
      }
    });

    partida.añadirJugador(jugadorUno);
    partida.añadirJugador(jugadorDos);
    partida.contarPuntuaciones();
    
    
    if(partida.puntuacionJ1+partida.puntuacionJ2 == 36){
      if(partidaAcabada == false){
        partida.guardarUsuarios();
        partida.guardarPuntuaciones();
      }
    }

    setTimeout(()=>{
      io.sockets.emit('missatge', JSON.stringify(tablero));
      io.sockets.emit('puntuaciones', JSON.stringify(partida.puntuaciones));

    },30);
});

io.on('connection', function(socket){

    socket.on("informacionJugador",function(data){
      //console.log(data);

      let nombreJugadorP = data[0];
      let colorJugadorP = data [1];

      if (nombreJug[0].jugador == " " && nombreJug[1].jugador == " ") {
        
        let random1 = Math.floor((Math.random() * numColores) + 1);
        numColores--;
        let colorJugador1 = colores[random1];
        colores.splice(random1,1);

        nombreJug[0].jugador = nombreJugadorP;
        nombreJug[0].colorJ = colorJugador1;
        
        jugadorUno.setNombre(nombreJug[0].jugador);
        jugadorUno.setColor(nombreJug[0].colorJ);
        

        tablero[5].color=jugadorUno.color; 
   
    }else if (nombreJug[0].jugador.length > 0 && nombreJug[1].jugador == " ") {

      let random2 = Math.floor((Math.random() * numColores) + 1);
      numColores--;
      let colorJugador2 = colores[random2];
      colores.splice(random2,1);

      nombreJug[1].jugador = nombreJugadorP;
      nombreJug[1].colorJ = colorJugador2;

      jugadorDos.setNombre(nombreJug[1].jugador);
      jugadorDos.setColor(nombreJug[1].colorJ);

      tablero[30].color=jugadorDos.color;
      io.sockets.emit('contador','hola');
      
      function contar (){

        contadorTiempo ++;
        }setInterval(contar, 1000); 
      }

    });
    setTimeout(()=>{
      io.sockets.emit('mandarTablero', tablero);  
    },110);
});

io.on('connection', function(socket){

  socket.on('logout', function(socket){
    jugadorUno.nombre = "";
    jugadorUno.color = "";
    jugadorDos.nombre = "";
    jugadorDos.color = "";
    partida.jugadores = [];
    partida.puntuacionJ1 = 0;
    partida.puntuacionJ2 = 0;
    partida.puntuaciones = [];
    tablero =
    [
      { id: "a1", color: "n", posicion: "esquinaAI" },{ id: "a2", color: "n", posicion: "arriba" },{ id: "a3", color: "n", posicion: "arriba" }, { id: "a4", color: "n", posicion: "arriba" }, { id: "a5", color: "n", posicion: "arriba" }, { id: "a6", color: "n", posicion: "arribaBD" },
      { id: "b1", color: "n", posicion: "lateralI" }, { id: "b2", color: "n", posicion: "todo" }, { id: "b3", color: "n", posicion: "todo" }, { id: "b4", color: "n", posicion: "todo" }, { id: "b5", color: "n", posicion: "todo" }, { id: "b6", color: "n", posicion: "lateralD" }, 
      { id: "c1", color: "n", posicion: "lateralI" }, { id: "c2", color: "n", posicion: "todo" }, { id: "c3", color: "n", posicion: "todo" }, { id: "c4", color: "n", posicion: "todo" }, { id: "c5", color: "n", posicion: "todo" }, { id: "c6", color: "n", posicion: "lateralD" }, 
      { id: "d1", color: "n", posicion: "lateralI" }, { id: "d2", color: "n", posicion: "todo" }, { id: "d3", color: "n", posicion: "todo" }, { id: "d4", color: "n", posicion: "todo" }, { id: "d5", color: "n", posicion: "todo" }, { id: "d6", color: "n", posicion: "lateralD" },
      { id: "e1", color: "n", posicion: "lateralI" }, { id: "e2", color: "n", posicion: "todo" }, { id: "e3", color: "n", posicion: "todo" }, { id: "e4", color: "n", posicion: "todo" }, { id: "e5", color: "n", posicion: "todo" }, { id: "e6", color: "n", posicion: "lateralD" }, 
      { id: "f1", color: "n", posicion: "esquinaBI" }, { id: "f2",color: "n", posicion: "abajo" },{ id: "f3",color: "n", posicion: "abajo" }, { id: "f4", color: "n", posicion: "abajo" }, { id: "f5", color: "n", posicion: "abajo" }, { id: "f6", color: "n", posicion: "esquinaBD" },      
    ];

    nombreJug = [
      {jugador: " ", colorJ: " "}, 
      {jugador: " ",colorJ: " " }
    ];

    partidaAcabada = false;

    numColores = 6;

    colores = ['#46E4E6','#E4902C', '#167CCB', '#4C0CE1', '#BC0CE1', '#E10C0C', '#FFFFFF'];

  });
});

io.on('connection', function(socket){
    var ruta = 'mongodb://localhost:27017/websockets';
    var ranking = [];
    MongoClient.connect(ruta, function (err, db) {
      assert.equal(null, err);
    
      var cursor = db.collection('usuarios').find().sort({puntuacion:-1}).limit(5); //Ranking de 5 Personas
          
      cursor.each(function (err, doc) {
        if(doc !=  null){
          //console.log(doc);
          ranking.push(doc.nombre);
          ranking.push(doc.puntuacion);
          ranking.push(doc.tiempo);
          io.sockets.emit('ranking',ranking);
        }
      });
    });
        
});


io.on('connection', function (socket) {
  socket.on('login', function (data) {
    console.log("login");
    var ruta = 'mongodb://localhost:27017/websockets';
    MongoClient.connect(ruta, function (err, db) {
        assert.equal(null, err);
        console.log("Connexió login");
        comprobarRegistre(db, err, function () { });

    });
    var comprobarRegistre = function (db, err, callback) {
      db.collection('usuariosRegistrados').find({email: data}).toArray(function (err, result) {
        if(err) throw err;
        if(result.length > 0) {
          io.sockets.emit('oklogin', 'si');
          console.log("va bien");
        }else{
          console.log("va mal");
          io.sockets.emit('mallogin', 'no');
        }
      });
      
      assert.equal(err, null);
      callback();
    }
  });

});


io.on('connection', function (socket) {
  socket.on('registro', function (data) { 
    console.log(data);
    var ruta = 'mongodb://localhost:27017/websockets';
    MongoClient.connect(ruta, function (err, db) {
        assert.equal(null, err);
        console.log("Connexión correcta");

        añadirUsuario(db, err, function () { });
        db.close();
    });


    var añadirUsuario = function (db, err, callback) {
        db.collection('usuariosRegistrados').insertOne({
          "nombre": data[0],
          "email": data[1]
        });

        assert.equal(err, null);
        console.log("Añadido");
        callback();
    };
    console.log(data);
  });
});



exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.juego = function(req, res){
    res.render('juego', { title: 'Express' });
};

exports.login = function(req, res){
  res.render('login', { title: 'Express' });
};

/*exports.registro = function(req, res){
  res.render('registro', { title: 'Express' });
};*/