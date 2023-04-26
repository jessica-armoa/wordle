let intentos = 6;
let diccionario = ["APPLE", "BEACH", "BLACK", "BLOOM", "BREAD", "BRICK", "BRUSH", "EXACT",
                 "BUNCH", "CANDY", "CHAIR", "CHEST", "CHORD", "CLIFF", "CLOCK", "EXTRA",
                 "CLOUD", "COAST", "CRASH", "CREAM", "DANCE", "DESKS", "DOUBT", "EQUAL",
                 "DREAM", "DRIFT", "DRILL", "DRINK", "DRIVE", "DWARF", "EARTH", "TABLE",
                 "FAINT", "FAITH", "FLAME", "EMPTY", "ENEMY", "ENJOY", "ENTER", "ERROR"];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
const BOTON = document.getElementById("guess-button");
const OTRO_INTENTO = document.getElementById("recargar");
const INPUT = document.getElementById("guess-input");
const valor = INPUT.value;
const GRID = document.getElementById("grid");

window.addEventListener('load', init)
function init() {
  console.log('Esto se ejecuta solo cuando se carga la pagina web');
}

OTRO_INTENTO.addEventListener('click', function(e){
  location.reload()
});

//Para ue funcione el enter
INPUT.addEventListener("keyup", function (e) {
  BOTON.disabled = !INPUT.value.length;
  if (e.code === 'Enter') {
    BOTON.click();
  }
});
BOTON.addEventListener('click', intentar);
function intentar() {
  const INTENTO = leerIntento();
  //Validar intento
  if(!INTENTO){
    mostrarMensaje("<h2>Debes escribir una palabra</h2>");
    return;
  } else if(INTENTO.length !== 5){
    mostrarMensaje("<h2>La palabra debe tener solo CINCO letras</h2>");
    return;
  }
  mostrarMensaje("");
  if (INTENTO === palabra) {
    mostrarIntento(INTENTO);
    terminar("<h1>GANASTE!😀</h1>");
    return;
  }
  mostrarIntento(INTENTO);
  intentos--;
  INPUT.value = '';
  if (intentos == 0) {
    let mensaje = "<h1>PERDISTE!😖</h1>";
    let contenedor = document.getElementById('correct');
    contenedor.innerHTML = mensaje;
    terminar(`<h2>La palabra correcta era ${palabra}</h3>`);
  }
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  INPUT.disabled = true;
  BOTON.disabled = true;
  OTRO_INTENTO.style.display='block';
  mostrarMensaje(mensaje);
}

function mostrarMensaje(mensaje){
  let contenedor = document.getElementById('guesses');
  contenedor.innerHTML = mensaje;
}

function mostrarIntento(intento){
  const ROW = document.createElement('div');//Este elemento todavia no existe en el HTML y hay que inyectar
  ROW.className = 'row';
  for (let i in palabra) {
    const SPAN = document.createElement('span');
    SPAN.className = 'letter';
    SPAN.innerHTML = intento[i];
    if (intento[i] === palabra[i]) { //VERDE
      SPAN.style.backgroundColor = '#79b851';
    } else if (palabra.includes(intento[i])) { //AMARILLO
      SPAN.style.backgroundColor = '#f3c237';
    } else { //GRIS
      SPAN.style.backgroundColor = '#a4aec4';
    }
    ROW.appendChild(SPAN);
  }
  GRID.appendChild(ROW);
}