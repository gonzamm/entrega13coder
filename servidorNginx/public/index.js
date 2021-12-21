const socket = io();


socket.on("render", (data)=>{
    renderTabla();
    renderChat();
    mainLogin();
})

function renderTabla(){
    const tabla = document.getElementById('tBody');
    const url = '/api/productos-test';

    /* Funcion fetch para traerme todos los productos mediante GET */
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        /* Todo OK borro el contenido viejo de la tabla y escribo el nuevo */
        tabla.innerHTML="";
        for (const pto of data) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `${pto.titulo}`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `$ ${pto.precio}`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<img src = ${pto.thumbail} width="40"height="40">`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
      
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function renderChat(){
    const tabla = document.getElementById('tBodyChat');
    const url = '/api/chat';

    /* Funcion fetch para traerme el historial de chat mediante GET */
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {

        //Denormalizo la respuesta del servidor
        const schemaAutor = new normalizr.schema.Entity('author')
        const mySchema = new normalizr.schema.Array({
            author: schemaAutor
        })
        const denormalizeChat = normalizr.denormalize(data.normalizr.result, mySchema, data.normalizr.entities)

        //Comparativa largo
        const longNormalizado = JSON.stringify(data.normalizr).length;
        const longDenormalizado = JSON.stringify(denormalizeChat).length;
        console.log(`Largo original:${longDenormalizado} Largo normalizado:${longNormalizado}`)
        const compresion = ((longNormalizado*100) / longDenormalizado).toFixed(2)
        //Escribo el porcentaje
        document.getElementById('porcentaje').innerHTML= `Compresion: ${compresion}%`


        /* Todo OK borro el contenido viejo de la tabla y escribo el nuevo */
        tabla.innerHTML="";
        for (const chat of denormalizeChat) {
            let fila = document.createElement('tr');
            let aux1 = document.createElement('td');
            aux1.innerHTML = `<strong><font color="blue">${chat.author.id}</font></strong>`;
            let aux2 = document.createElement('td');
            aux2.innerHTML = `<img src = ${chat.author.avatar} width="40"height="40">`;
            let aux3 = document.createElement('td');
            aux3.innerHTML = `<i><font color="green">${chat.text}</font></i>`;
            fila.appendChild(aux1);
            fila.appendChild(aux2);
            fila.appendChild(aux3);
            tabla.appendChild(fila);
        }
        
    })
    .catch(function(error) {
      console.log(error);
    });
    return false;
}

function enviarChat(){
    /* Armando request para la funcion fetch */
    const url = '/api/chat';
    let data = {
        author:{ 
            id: document.getElementById('email').value, 
            nombre: document.getElementById('name').value, 
            apellido: document.getElementById('apellido').value, 
            edad: document.getElementById('edad').value, 
            alias: document.getElementById('alias').value,
            avatar: document.getElementById('avatar').value
        },
        text: document.getElementById('msg').value
    }

    const request = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
          }
    };

    /* Funcion fetch para postear un nuevo mensaje del chat */
    fetch(url, request)
        .then(function() {
            /* Todo OK renderizo la tabla para todos los clientes conectados y borro la info del input del mensaje */
            document.getElementById('msg').value = "";
            socket.emit("actualizacion");
    });

    return false;
}

function mainLogin(){
    const url = '/api/login';
    /* Funcion fetch para saber si esta logeado */
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) {
            let x = document.getElementById("usuarioLogin");
            x.innerHTML = data.user
            let y = document.getElementById("divBienvenida")
            y.style.display = "block";
            
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });

}

function logout(){
    const url = '/api/login';
    //Funcion fetch para saber si esta logeado
    const options = {
        method: "GET"
    }
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        if (data) {
            console.log(data)
            let x = document.getElementById("logout");
            x.innerHTML = "Hasta luego "+data.user
            setTimeout(function(){
                window.location.href = "api/logout"
            }, 2000);
            
        }else{
            window.location.href = "login.html";
        }
    })
    .catch(function(error) {
        console.log(error);
      });


}
