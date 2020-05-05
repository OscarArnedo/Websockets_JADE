function login (){
    $(function () {
        $('#oscar').click(function () {
            var socket = io.connect('http://localhost:8888');
            //console.log("submit");
            var color1 = Math.floor(Math.random()*16777215).toString(16);
            var color = "#"+color1;
            localStorage.setItem("nombreUsuario", document.getElementById('nombre').value);
            localStorage.setItem("colorUsuario", color);
            let nomUsuari= document.getElementById('nombre');
            
            let enviarI = [];
            enviarI.push(nomUsuari);
            enviarI.push(color);
        
            let email= document.getElementById('nombre').value;
            socket.emit("login",email);
            return false;
        });  
  });   
}

function ranking(){
    $(function () {
        var socket = io.connect('http://localhost:8888');
           
        socket.on('ranking', function (data) {
            $(".uno").hide();
            $(".dos").hide();
            $(".tres").hide();
            $(".cuatro").hide();
            $(".cinco").hide();

            if(data[0] != null){
                document.getElementById('1').innerHTML = data[0];
                document.getElementById('2').innerHTML = data[1];
                document.getElementById('3').innerHTML = data[2];
                $(".uno").show();
            }
            if(data[3] != null){
                document.getElementById('4').innerHTML = data[3];
                document.getElementById('5').innerHTML = data[4];
                document.getElementById('6').innerHTML = data[5];
                $(".dos").show();
            }
            if(data[6] != null){
                document.getElementById('7').innerHTML = data[6];
                document.getElementById('8').innerHTML = data[7];
                document.getElementById('9').innerHTML = data[8];
                $(".tres").show();
            }
            if(data[9] != null){
                document.getElementById('10').innerHTML = data[9];
                document.getElementById('11').innerHTML = data[10];
                document.getElementById('12').innerHTML = data[11];
                $(".cuatro").show();
            }
            if(data[12] != null){
                document.getElementById('13').innerHTML = data[12];
                document.getElementById('14').innerHTML = data[13];
                document.getElementById('15').innerHTML = data[14];
                $(".cinco").show();
            }

        });
    });
}

function registrar (){
    $(function () {
        console.log("hola");
        $('#submitR').click(function () {
        console.log("hola2");
        var socket = io.connect('http://localhost:8888');
        let nombreR= document.getElementById('nombreR').value;
        let email= document.getElementById('email').value;
        let usuario = [];
        usuario.push(nombreR);
        usuario.push(email);
        console.log(usuario);
        socket.emit("registro",usuario);
        //location.reload();
        return false;
        });
  });
 
}

function okLogin (){
    var socket = io.connect('http://localhost:8888');
    
    socket.on('oklogin', function (data) {
        window.location.href="http://localhost:3000/juego";
    });
}

function mallogin (){
    var socket = io.connect('http://localhost:8888');
    
    socket.on('mallogin', function (data) {
        alert("EL USUARIO INTRODUCIDO NO EXISTE");
    });
}

window.addEventListener("load",mallogin, true);
window.addEventListener("load",login, true);
window.addEventListener("load",okLogin, true);
window.addEventListener("load",registrar, true);
window.addEventListener("load",ranking, true);
