// Variables y referencias
const titulo = document.getElementById("titulo");
const pistaDeBaile = document.getElementById("pista-de-baile");
const nuevoColorInput = document.getElementById("nuevo-color");
const agregarColorBtn = document.getElementById("agregar-color");
const reiniciarBtn = document.getElementById("reiniciar");
const colorPopularDiv = document.getElementById("color-popular");
const sonido = document.getElementById("sonido");
const audioDisco = document.getElementById("audio-disco");
const discoVisual = document.createElement("div");

let votos = {}; // Objeto para llevar cuenta de los votos por color
let temporizador;

// Crear mensaje de error dinámico
const mensajeError = document.createElement("div");
mensajeError.style.color = "red";
mensajeError.style.marginTop = "10px";
nuevoColorInput.parentNode.insertBefore(mensajeError, nuevoColorInput.nextSibling);

// Función para validar si un color es válido
function esColorValido(color) {
    const div = document.createElement("div");
    div.style.color = color;
    return div.style.color !== ""; // Devuelve true si el color es válido
}

// Función para agregar color
function agregarColor(color) {
    // Validar si el color ingresado es válido
    if (!esColorValido(color)) {
        mensajeError.textContent = "⚠️ Por favor, ingresa un color válido.";
        return;
    }

    mensajeError.textContent = ""; // Limpia el mensaje de error si el color es válido

    // Crear o actualizar el div del color
    if (!votos[color]) {
        votos[color] = 0;

        // Crear un nuevo elemento visual para el color
        const colorDiv = document.createElement("div");
        colorDiv.className = "color";
        colorDiv.style.backgroundColor = color;
        colorDiv.style.width = "50px";
        colorDiv.style.height = "50px";
        colorDiv.style.margin = "5px";
        colorDiv.style.borderRadius = "5px";
        colorDiv.style.cursor = "pointer";
        colorDiv.style.display = "flex";
        colorDiv.style.alignItems = "center";
        colorDiv.style.justifyContent = "center";
        colorDiv.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.2)";
        colorDiv.innerText = votos[color]; // Mostrar los votos dentro del color

        // Evento al hacer clic para sumar votos
        colorDiv.addEventListener("click", () => {
            votos[color]++;
            colorDiv.innerText = votos[color]; // Actualizar votos en el elemento
            titulo.style.color = color; // Cambiar el color del título
            sonido.currentTime = 0; // Reinicia el sonido
            sonido.play(); // Reproducir sonido
            mostrarColorPopular(); // Actualizar el color más popular
        });

        // Agregar a la pista de baile
        pistaDeBaile.appendChild(colorDiv);
    }
}

// Función para reproducir sonido
function reproducirSonido() {
    sonido.currentTime = 0; // Reinicia el sonido
    sonido.play();
}

// Función para mostrar el color más popular
function mostrarColorPopular() {
    // Determinar el color más popular basado en votos
    const colorMasPopular = Object.keys(votos).reduce((a, b) =>
        votos[a] > votos[b] ? a : b
    );

    colorPopularDiv.innerText = `🎨 El color más popular es: ${colorMasPopular} con ${votos[colorMasPopular]} votos.`;
}

// Función para reiniciar la fiesta
function reiniciarFiesta() {
    pistaDeBaile.innerHTML = ""; // Limpiar la pista de baile
    titulo.style.color = "black"; // Restablecer el color del título
    colorPopularDiv.innerText = ""; // Limpiar el color popular
    votos = {}; // Reiniciar los votos
    mensajeError.textContent = ""; // Limpiar cualquier mensaje de error
    clearTimeout(temporizador); // Limpiar temporizador si estaba activo
}

// Evento para agregar un color cuando se hace clic en el botón
agregarColorBtn.addEventListener("click", () => {
    const nuevoColor = nuevoColorInput.value.trim(); // Obtener y limpiar el valor del input
    if (nuevoColor) {
        agregarColor(nuevoColor); // Llamar a la función para agregar el color
        nuevoColorInput.value = ""; // Limpiar el input
    }
});

discoVisual.id = "disco";
document.body.appendChild(discoVisual); // Añadir el disco al DOM

// Función para reproducir el disco
function reproducirDisco() {
    // Mostrar y activar el disco
    discoVisual.style.display = "block";

    // Reiniciar el audio si está en pausa
    audioDisco.currentTime = 0;
    audioDisco.play();

    // Ocultar el disco cuando el audio termine
    audioDisco.onended = () => {
        discoVisual.style.display = "none";
    };
}

// Botón para iniciar la reproducción (si es necesario)
const botonReproducir = document.createElement("button");
botonReproducir.textContent = "🎵 Reproducir Disco";
botonReproducir.style.marginTop = "20px";
document.body.appendChild(botonReproducir);

botonReproducir.addEventListener("click", reproducirDisco);

// Evento para reiniciar la fiesta cuando se hace clic en el botón
reiniciarBtn.addEventListener("click", reiniciarFiesta);
