const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const sectionReiniciar = document.getElementById('reiniciar')
const botonMascotaJugador = document.getElementById('boton-mascota')
const botonReiniciar = document.getElementById('boton-reiniciar')
sectionReiniciar.style.display = 'none'

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota')
const spanMascotaJugador = document.getElementById('mascota-jugador')

const spanMascotaEnemigo = document.getElementById('mascota-enemigo')

const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')

const sectionMensajes = document.getElementById('resultado')
const ataquesJugador = document.getElementById('ataques-del-jugador')
const ataquesEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')
const contenedorAtaques =document.getElementById('contenedorAtaques')

const sectionVerMapa = document.getElementById('ver-mapa')
const mapa = document.getElementById('mapa')

let jugadorId = null
let enemigoId = null
let mokepones = []
let mokeponesEnemigos = []
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputBellastror 
let inputScordash 
let inputWavedoon 
let inputXolomoon 
let mascotaJugador
let mascotaJugadorObjeto
let ataqueMokepon
let ataquesMokeponEnemigo  
let botonTierra
let botonFuego
let botonAgua
let botones =  []
let indexAtaqueJugador
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = './assets/laberinto.png'
let alturaQueBuscamos
let anchoDelMapa = window.innerWidth - 20
const anchoMaximoDelMapa = 350

if( anchoDelMapa > anchoMaximoDelMapa){
    anchoDelMapa = anchoMaximoDelMapa - 20
}

alturaQueBuscamos = anchoDelMapa * 600 / 800

mapa.width = anchoDelMapa
mapa.height = alturaQueBuscamos


class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = 0){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0, mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0    
    }
    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
            )
    }
    

}
let Bellastror = new Mokepon ('Bellastror','./assets/kisspng-dragon-cartoon-organism-5ae47bbf1d0cc5.026939181524923327119.png', 5, './assets/bellastor.png')
 
let Scordash = new Mokepon ('Scordash','./assets/scordashh.png', 5, './assets/scordash.png')

let Wavedoon = new Mokepon ('Wavedoon','./assets/quetza.png', 5, './assets/quetzal.png')

let Xolomoon = new Mokepon ('Xolomoon','./assets/xolito(1).png', 5, './assets/xolii.png')


const BELLASTOR_ATAQUES = [
    { nombre:'💧', id: 'boton-agua'},
    { nombre:'🔥', id: 'boton-fuego'},
    { nombre:'☘️', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
]

Bellastror.ataques.push(...BELLASTOR_ATAQUES)

const SCORDASH_ATAQUES = [
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'☘️', id: 'boton-tierra'},
    { nombre:'💧', id: 'boton-agua'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
]

Scordash.ataques.push(...SCORDASH_ATAQUES)


const WAVEDOON_ATAQUES = [
    {nombre:'☘️', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
]

Wavedoon.ataques.push(...WAVEDOON_ATAQUES)

const XOLOMOON_ATAQUES = [
    {nombre:'☘️', id: 'boton-tierra'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
    {nombre:'💧', id: 'boton-agua'},
    {nombre:'🔥', id: 'boton-fuego'},
]

Xolomoon.ataques.push(...XOLOMOON_ATAQUES)

    mokepones.push(Bellastror,Scordash,Wavedoon,Xolomoon)

function iniciarJuego() {
        
        sectionSeleccionarAtaque.style.display = 'none'
        sectionVerMapa.style.display = 'none'
        
        mokepones.forEach((mokepon) =>{
           opcionDeMokepones = `
           <input type="radio" name="mascota" id=${mokepon.nombre} />
           <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
               <p>${mokepon.nombre}</p>
               <img src=${mokepon.foto} alt=${mokepon.nombre}>
           </label> 
           `
          contenedorTarjetas.innerHTML += opcionDeMokepones

         inputXolomoon = document.getElementById('Xolomoon')
         inputBellastror = document.getElementById('Bellastror')
         inputScordash = document.getElementById('Scordash')
         inputWavedoon = document.getElementById('Wavedoon')
        })
        
        

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)
      
    botonReiniciar.addEventListener('click', reiniciarJuego)

    unirseAlJuego()

}
 function unirseAlJuego(){
    fetch("http://192.168.100.104:8080/unirse")
    .then((res) => {
        if (res.ok) {
            res.text()
            .then((respuesta) => {
                console.log(respuesta);
                jugadorId = respuesta
            })
        }
    })
 }

function seleccionarMascotaJugador() {    
    
         if (inputXolomoon.checked) {
            spanMascotaJugador.innerHTML = inputXolomoon.id
          mascotaJugador = inputXolomoon.id
        } else if (inputBellastror.checked) {
            spanMascotaJugador.innerHTML = inputBellastror.id 
           mascotaJugador = inputBellastror.id
        }else if (inputScordash.checked) {
            spanMascotaJugador.innerHTML = inputScordash.id
           mascotaJugador = inputScordash.id
        }else if (inputWavedoon.checked) {
            spanMascotaJugador.innerHTML = inputWavedoon.id  
            mascotaJugador = inputWavedoon.id
            } else {
                alert('selecciona mascota')
                return
            }
            sectionSeleccionarMascota.style.display = 'none'

            seleccionarMokepon(mascotaJugador)

            extraerAtaques(mascotaJugador)
            sectionVerMapa.style.display = 'flex'
            iniciarMapa()
        
}
function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.100.104:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })   
    })
        
}

function extraerAtaques(mascotaJugador) {
    let ataques
    for (let i = 0; i < mokepones.length; i++) {
        if (mascotaJugador === mokepones [i].nombre){
        ataques = mokepones[i].ataques
        }
        
    }
    mostrarAtaques(ataques)
}  

function mostrarAtaques(ataques) {
   ataques.forEach((ataque) => {
    ataqueMokepon = `
    <button id=${ataque.id} class="boton-de-ataque BAtaque">${ataque.nombre}</button>
    `
    contenedorAtaques.innerHTML += ataqueMokepon
    })


   botonTierra = document.getElementById('boton-tierra')
   botonFuego = document.getElementById('boton-fuego')
   botonAgua = document.getElementById ('boton-agua')
   botones = document.querySelectorAll(`.BAtaque`)

}
   
   function secuenciaAtaque() {
    botones.forEach((boton) => {
        boton.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥'){
            ataqueJugador.push ('FUEGO')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else if (e.target.textContent === '💧') {  
                ataqueJugador.push('AGUA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            } else {
                ataqueJugador.push('TIERRA')
                console.log(ataqueJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            if (ataqueJugador.length === 5 ) {
                enviarAtaques()
               } 
        })
    })
    

}

function enviarAtaques(){
    console.log('Enviar ataques', ataqueJugador)
    fetch(`http://192.168.100.104:8080/mokepon/${jugadorId}/ataques`, { 
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            ataques: ataqueJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}

function obtenerAtaques() {
    console.log('OBTENER ATAQUES');

    fetch(`http://192.168.100.104:8080/mokepon/${enemigoId}/ataques`)
        .then(function (res) {
            if (res.ok) {
                res.json()
                    .then(function ({ ataques }) {
                        if (ataques.length === 5) {
                           ataqueEnemigo = ataques
                            combate()
                        }
                })
            
        }
    })
}

function seleccionarMascotaEnemigo(enemigo) {
    
   
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    secuenciaAtaque()
    }


function ataqueAleatorioEnemigo() {

    console.log('AtaquesEnemigo', ataquesMokeponEnemigo);
    let ataqueAleatorio = aleatorio(0, ataquesMokeponEnemigo.length -1)
    
    if(ataqueAleatorio == 0 || ataqueAleatorio ==1) {    
        ataqueEnemigo.push('FUEGO')
    } else if(ataqueAleatorio == 3 || ataqueAleatorio == 4) {
        ataqueEnemigo.push('TIERRA')
    } else {
        ataqueEnemigo.push('AGUA')
     }
    console.log(ataqueEnemigo)
    iniciarPelea() 
    }

function iniciarPelea(){
     if (ataqueJugador.length === 5){
        combate()
     }
}

function indexAmbosOponente(jugador, enemigo) {
    indexAtaqueJugador = ataqueJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}

function combate() {
    clearInterval(intervalo)
    console.log('COMBATE');

    for (let  index= 0; index < ataqueJugador.length; index++) {
        if(ataqueJugador[index] === ataqueEnemigo[index]) { 
            indexAmbosOponente(index, index)
            crearMensaje("EMPATE")
        }  else if (ataqueJugador[index] === 'FUEGO' && ataqueEnemigo
        [index] === 'TIERRA') { 
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }   else if (ataqueJugador[index] === 'AGUA' && ataqueEnemigo
        [index] === 'FUEGO') { 
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador 
        }   else if (ataqueJugador[index] === 'TIERRA' && ataqueEnemigo
        [index] === 'AGUA') { 
            indexAmbosOponente(index, index)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }   else {
            indexAmbosOponente(index, index)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }

    }
    revisarVidas()
}

    function revisarVidas(){

        if (victoriasJugador == victoriasEnemigo){
            crearMensajeFinal("ESTO ES EMPATE!!!")
    } else if (victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FUISTE EL VENCEDOR🏆🏆🏆🏆")
    }   else {
        crearMensajeFinal ('PERDEDOR')
    }
    
    }

    function crearMensaje(resultado) {
        

        let notification = document.createElement("p") 
        let nuevoAtaquesJugador = document.createElement("p") 
        let nuevoAtaquesEnemigo = document.createElement("p") 
          
        sectionMensajes.innerHTML = resultado   
        nuevoAtaquesJugador.innerHTML = indexAtaqueJugador
        nuevoAtaquesEnemigo.innerHTML = indexAtaqueEnemigo
        
        
        
        ataquesJugador.appendChild(nuevoAtaquesJugador)
        ataquesEnemigo.appendChild(nuevoAtaquesEnemigo)
                    
        }
function crearMensajeFinal(resultadoFinal) {
    
    
        sectionMensajes.innerHTML = resultadoFinal
            
       
        sectionReiniciar.style.display = 'block'
    }
    function reiniciarJuego() {
        location.reload()
    }


function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
    }

    function pintarCanvas(){
        mascotaJugadorObjeto.x =  mascotaJugadorObjeto.x +  mascotaJugadorObjeto.velocidadX
        mascotaJugadorObjeto.y =  mascotaJugadorObjeto.y +  mascotaJugadorObjeto.velocidadY
        lienzo.clearRect(0, 0, mapa.width, mapa.height)
        lienzo.drawImage( 
            mapaBackground,
            0,
            0,
            mapa.width,
            mapa.height
        )

        mascotaJugadorObjeto.pintarMokepon()

        enviarPosicion(mascotaJugadorObjeto.x,mascotaJugadorObjeto.y)

    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
}

 function enviarPosicion(x, y) {
            fetch(`http://192.168.100.104:8080/mokepon/${jugadorId}/posicion`, {
                method: "post", 
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    x,
                    y
                })
            })
            .then(function (res) {
                if (res.ok) {
                    res.json()
                        .then(function({ enemigos }) { 
                            mokeponesEnemigos = enemigos.map(function (enemigo) {
                                console.log({enemigo});
                                let mokeponEnemigo = null
                                const mokeponNombre = enemigo.mokepon.nombre || ""
                                if(mokeponNombre === "Bellastror") {
                                         mokeponEnemigo = new Mokepon ('Bellastror','./assets/kisspng-dragon-cartoon-organism-5ae47bbf1d0cc5.026939181524923327119.png', 5, './assets/bellastor.png',enemigo.id)
                                } else if (mokeponNombre === "Scordash") {
                                         mokeponEnemigo = new Mokepon ('Scordash','./assets/scordashh.png', 5, './assets/scordash.png',enemigo.id)
                                }  else if (mokeponNombre === "Wavedoon") { 
                                         mokeponEnemigo = new Mokepon ('Wavedoon','./assets/quetza.png', 5, './assets/quetzal.png',enemigo.id)
                                }  else if (mokeponNombre === "Xolomoon") {
                                         mokeponEnemigo = new Mokepon ('Xolomoon','./assets/xolito(1).png', 5, './assets/xolii.png',enemigo.id)
                                }
                                 
                                mokeponEnemigo.x = enemigo.x || 0
                                mokeponEnemigo.y = enemigo.y || 0

                                 return mokeponEnemigo                                                         
                                })
                            
                })
         }
     })
 }
    

        function moverArriba() {
            mascotaJugadorObjeto.velocidadY = -5
        }

        function moverAbajo(){
            mascotaJugadorObjeto.velocidadY =  5
        }

        function moverDerecha(){
            mascotaJugadorObjeto.velocidadX =  5
        }

        function moverIzquierda(){
            mascotaJugadorObjeto.velocidadX = - 5
        }
        function detenerMovimiento(){
            mascotaJugadorObjeto.velocidadX = 0
            mascotaJugadorObjeto.velocidadY = 0
        }

        function sePresionoUnaTecla(event){
            switch (event.key) {
                case 'ArrowUp':
                    moverArriba()
                    break
                case 'ArrowDown':
                moverAbajo()
                    break
                case'ArrowLeft':
                moverIzquierda()
                    break
                case'ArrowRight':
                    moverDerecha()
                    break
                
                default:
                    break;
            }      
          }
function iniciarMapa() {

    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    console.log(mascotaJugadorObjeto,mascotaJugador);
    intervalo = setInterval(pintarCanvas, 50)

    window.addEventListener('keydown',sePresionoUnaTecla)

    window.addEventListener('keyup', detenerMovimiento)
}

function obtenerObjetoMascota() { 
    for (let i = 0; i < mokepones.length; i++) { 
         if (mascotaJugador === mokepones[i].nombre) {
             return mokepones[i]
        }
    }

}
    function revisarColision(enemigo) {
        const arribaEnemigo = enemigo.y
        const abajoEnemigo = enemigo.y + enemigo.alto
        const derechaEnemigo = enemigo.x + enemigo.ancho
        const izquierdaEnemigo = enemigo.x

        const arribaMascota = 
            mascotaJugadorObjeto.y
        const abajoMascota = 
            mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
        const derechaMascota = 
            mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
        const izquierdaMascota = 
            mascotaJugadorObjeto.x

        if(
            abajoMascota < arribaEnemigo ||
            arribaMascota > abajoEnemigo ||
            derechaMascota < izquierdaEnemigo ||
            izquierdaMascota > derechaEnemigo 
        ) {
            return
    }


    detenerMovimiento()
    clearInterval(intervalo)
    console.log('se decteto una colision');

    enemigoId = enemigo.id
    sectionSeleccionarAtaque.style.display = 'flex'
    sectionVerMapa.style.display = 'none'
    seleccionarMascotaEnemigo(enemigo)   
}

window.addEventListener('load', iniciarJuego)