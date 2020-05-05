
var partidaFinalizada = false;

function passarPosicion (){

    $(function () {
        $('td').click(function () {
            var posicionJugador = $(this).attr('id');           
            var socket = io.connect('http://localhost:8888');
           
            socket.on('missatge', function (data) {
                var tablero = JSON.parse(data);
                for (var x = 0; x < tablero.length; x++) {
                
                if(data[x].color != "n"){

                    var colorJ = tablero[x].color;
                    var posJugador = tablero[x].id;
                    document.getElementById(posJugador).style.backgroundColor=colorJ;

                    }   
                }
         
            });
          
            socket.on('puntuaciones', function (data) {
                var puntuaciones = JSON.parse(data);

            
                document.getElementById('puntuacionJ1').innerHTML=puntuaciones[0];
                document.getElementById('puntuacionJ2').innerHTML=puntuaciones[1];
                
                puntuacionesTotal = puntuaciones[0]+puntuaciones[1];
                if(puntuacionesTotal == 36){

                    $("#logout").show();

                }else{
                    $("#logout").hide();
                }
            });
            const colorJugador = localStorage.getItem("colorUsuario");
            const nombreJugador = localStorage.getItem("nombreUsuario");
            var info = [];
            info.push(nombreJugador,colorJugador,posicionJugador);
            socket.emit("informacion",info);

            return false;

        });
    });
    $("#logout").show();
}


function envioInformacion(){

    var socket = io.connect('http://localhost:8888');

    var colorJugador = localStorage.getItem("colorUsuario");
    var nombreJugador = localStorage.getItem("nombreUsuario");
    var informacionJugador = [];

    socket.on('mandarTablero', function (data) {
    
        for ( i = 0; i<data.length; i++){           
            if(data[i].color !="nada"){
                let  colorCasilla = data[i].color;
                let identificadorCasilla = data[i].id;
                document.getElementById(identificadorCasilla).style.backgroundColor=colorCasilla;
            }
        }
    });

    informacionJugador.push(nombreJugador,colorJugador);
    socket.emit("informacionJugador",informacionJugador);

}

function logout (){
    $(function () {
        $('button').click(function () {
            var socket = io.connect('http://localhost:8888');
            socket.emit("logout","logout");
            partidaFinalizada = true;  
            setTimeout(()=>{              
                window.location.href="http://localhost:3000/login";
            },50);
        });
    });
}

var tiempo = 0;
function aumentarTiempo(){
    if(!partidaFinalizada){
        tiempo++;
        document.getElementById("contador").innerHTML = tiempo;
    }
    
}
function contarTiempo(){
    var socket = io.connect('http://localhost:8888');
    socket.on('contador', function (data) {
        setInterval(aumentarTiempo,1000);
      console.log(data);
    });

}

window.addEventListener("load",contarTiempo, true);
window.addEventListener("load",passarPosicion, true);
window.addEventListener("load",envioInformacion, false);
window.addEventListener("load",logout, true);
