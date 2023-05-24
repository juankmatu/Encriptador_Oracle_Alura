const mensaje = document.getElementById('mensaje');
const encriptar = document.getElementById('encriptar');
const desencriptar = document.getElementById('desencriptar');
const ningunMensaje = document.getElementById('ningunMensaje');
const mensajeEncontrado = document.getElementById('mensajeEncontrado');
const copiarMensaje = document.getElementById('copiarMensaje');
const mensajeEncriptado = document.getElementById('mensajeEncriptado');
const modal = document.getElementById('modal');
const modalButton = document.getElementById('modalButton');

const llaves = {
  e: 'enter',
  i: 'imes',
  a: 'ai',
  o: 'ober',
  u: 'ufat'
};

const llavesInvertidas = Object.keys(llaves).reduce((acumulador, siguiente) => {
  const valor = llaves[siguiente];
  acumulador[valor] = siguiente;
  return acumulador;
}, {});

function preRegExp(diccionario) {
  const preRegex = Object.keys(diccionario).reduce((acumulador, siguiente) => acumulador + '|' + siguiente);
  return new RegExp(preRegex, 'g');
}

function encriptarTexto(texto, diccionario) {
  return texto.replace(preRegExp(diccionario), (coincidencia) => diccionario[coincidencia]);
}

function verificarCadena(cadena) {
  const comprobacion = /[^a-z 0-9]/g.test(cadena);
  if (comprobacion) {
    modal.style.display = 'flex';
  }
  return !comprobacion;
}

function alternarMensaje(texto, textoEncriptado) {
  if (verificarCadena(texto) && texto !== '') {
    if (mensajeEncontrado.classList.contains('aside__content--none')) {
      mensajeEncontrado.classList.toggle('aside__content--none');
      ningunMensaje.classList.toggle('aside__content--none');
    }
    mensajeEncriptado.innerHTML = textoEncriptado;
  }
}

modalButton.addEventListener('click', function (e) {
  e.preventDefault();
  modal.style.display = 'none';
});

encriptar.addEventListener('click', function (e) {
  e.preventDefault();
  alternarMensaje(mensaje.value, encriptarTexto(mensaje.value, llaves));
});

desencriptar.addEventListener('click', function (e) {
  e.preventDefault();
  alternarMensaje(mensaje.value, encriptarTexto(mensaje.value, llavesInvertidas));
});

copiarMensaje.addEventListener('click', () => {
  navigator.clipboard.writeText(mensajeEncriptado.innerHTML);
});
