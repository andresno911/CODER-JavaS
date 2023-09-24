//FUNCION PARA CREAR USUARIO Y CONTRASEÑA VINCULANDO A INPUTS DE FORMULARIOS
function registrarUsuario() {
    const nombreUsuarioInput = document.getElementById("nombreUsuarioRegistro");
    const contrasenaInput = document.getElementById("contrasenaRegistro");
    const fechaHoraActualElement = document.getElementById("fechaHoraActual");

    const nombreUsuario = nombreUsuarioInput.value;
    const contrasena = contrasenaInput.value;

    if (nombreUsuario.length >= 8 && contrasena.length >= 8) {
        if (!verificoUsuario(nombreUsuario)) {
            usuarios.push({ usuario: nombreUsuario, contraseña: contrasena });
            mostrarMensaje("Registro exitoso");

            // TRAEMOS LA FECHA
            const fechaHoraActual = new Date();
            const fechaHoraActualString = fechaHoraActual.toLocaleString();
            fechaHoraActualElement.textContent = `Fecha y hora actual: ${fechaHoraActualString}`;
        } else {
            mostrarMensaje("El nombre de usuario ya está registrado");
        }
    } else {
        mostrarMensaje("Por favor, complete todos los campos usando un mínimo de 8 caracteres");
    }
    nombreUsuarioInput.value = "";
    contrasenaInput.value = "";
}
//DEFINO ARRAY PARA GUARDAR USUARIOS Y CONTRASEÑAS
const usuarios = [];

//DEFINO FUNCION Y UTILIZO METODO .some PARA QUE NO SE CREEN DOS VECES EL MISMO USUARIO
function verificoUsuario(nombreUsuario) {
    return usuarios.some(usuario => usuario.usuario === nombreUsuario);
}

//DEFINO FUNCIONES PARA MOSTRAR MSJS VINCULANDO CON SUS RESPECTIVOS OUTPUTS
function mostrarMensaje(mensaje) {
    const output = document.getElementById("output");
    output.innerHTML = `<div class="alert alert-info">${mensaje}</div>`;
}

function mostrarResultado(errorMensaje) {
    const output = document.getElementById("outputResultado");
    output.innerHTML = `<div class="alert alert-info">${errorMensaje}</div>`;
}

// DEFINO FUNCION CALCULAR GANANCIA
function calcularGanancia(monto, tasa, dias) {
    return monto * tasa * dias;
}
//DEFINO LAS FUNCIONES AFUERA PARA QUE SE PARAMETRICEN DENTRO DEL IF Y FUNCIONEN CUANDO SE CUMPLEN LAS CONDICIONES
function realizarPlazoFijoPesos() { }
function realizarPlazoFijoDolares() { }

//DEFINO UN FUNCION PARA INICIAR SESION VINCULANDO A INPUTS DE FORMULARIOS
function iniciarSesion() {
    const nombreUsuarioInput = document.getElementById("nombreUsuarioSesion");
    const contrasenaInput = document.getElementById("contrasenaSesion");

    //UTILIZO .value PARA TRAER LOS VALORES OTORGADOS EN LOS CAMPOS DE TEXTO Y ALMACENARLOS EN LAS VARIABLES nombreUsuario Y contrasena
    const nombreUsuario = nombreUsuarioInput.value;
    const contrasena = contrasenaInput.value;

    //UTILIZO METODO .find() PARA VER SI EL USUARIO ESTA REGISTRADO
    const usuarioEncontrado = usuarios.find(u => u.usuario === nombreUsuario);

    if (usuarioEncontrado && usuarioEncontrado.contraseña === contrasena) {
        mostrarMensaje("Inicio de sesión exitoso");

        document.getElementById("formularioPesos").style.display = "block";
        document.getElementById("formularioDolares").style.display = "block";

        //DEFINO EL onclick DEL BOTON CON LA FUNCION QUE SIMULA EL PLAZO FIJO EN PESOS
        realizarPlazoFijoPesos = function () {
            const montoPesosInput = document.getElementById("montoPesos");
            const diasPlazoPesosInput = document.getElementById("diasPlazoPesos");

            const montoPesos = parseInt(montoPesosInput.value);
            const diasPlazoPesos = parseInt(diasPlazoPesosInput.value);
            const tasaInteresanual = 1.18;

            //USO OPERADOR TERNARIO PARA VERIFICAR QUE SE CUMPLAN CONDICIONES
            montoPesos >= 200000 && diasPlazoPesos >= 30
                ? (() => {
                    const tasaInteres = tasaInteresanual / 365;
                    const ganancia = calcularGanancia(montoPesos, tasaInteres, diasPlazoPesos);
                    const resultadoMensaje = `Plazo fijo en pesos Simulado. Monto: ${montoPesos}. Dias: ${diasPlazoPesos} Ganancia: ${ganancia}`;
                    localStorage.setItem('resultadoPlazoFijo', resultadoMensaje);

                    const gananciaResultado = document.getElementById("gananciaResultado");
                    gananciaResultado.textContent = resultadoMensaje;

                    $('#gananciaModal').modal('show');
                })()
                : mostrarResultado("Monto mínimo para plazo fijo en pesos es $200000 y los días deben ser mayores a 30.");

            // LIMPIO LOS INPUT
            montoPesosInput.value = " ";
            diasPlazoPesosInput.value = " ";
        }
        //DEFINO EL onclick DEL BOTON CON LA FUNCION QUE SIMULA EL PLAZO FIJO EN DOLARES
        realizarPlazoFijoDolares = function () {
            const montoDolarInput = document.getElementById("montoDolares");
            const diasPlazoDolareInput = document.getElementById("diasPlazoDolares");

            const montoDolares = parseInt(montoDolarInput.value);
            const diasPlazoDolares = parseInt(diasPlazoDolareInput.value);
            const tasaInteresAnualDolares = 0.0050;

            //USO IF TERNARIO PARA VERIFICAR QUE SE CUMPLAN CONDICIONES

            montoDolares >= 100 && diasPlazoDolares >= 30 ? (
                (() => {
                    const tasaInteresDolar = tasaInteresAnualDolares / 365;
                    const ganancia = calcularGanancia(montoDolares, tasaInteresDolar, diasPlazoDolares);
                    const resultadoDolarMensaje = `Pazo fijo en dólares simulado. Monto: ${montoDolares}. Días: ${diasPlazoDolares} Ganancia: ${ganancia}`;
                    localStorage.setItem('resultadoPlazoFijoDolar', resultadoDolarMensaje);
                    const gananciaResultado = document.getElementById("gananciaResultado");
                    gananciaResultado.textContent = resultadoDolarMensaje;
                    $(`#gananciaModal`).modal(`show`);
                })()
            ) : (
                mostrarResultado("Monto mínimo para plazo fijo en dólares es de U$D 100 y los días deben ser mayores a 30.")
            );
            // LIMPIO LOS INPUTS
            montoDolarInput.value = " ";
            diasPlazoDolareInput.value = " ";
        }
    } else {
        mostrarMensaje("Usuario o contraseña incorrectos");
    }
    // LIMPIO LOS INPUTS
    nombreUsuarioInput.value = "";
    contrasenaInput.value = "";
}
document.addEventListener("DOMContentLoaded", function () {
    // REFERENCIA DE BOTONES
    const botonBorrarLocalStorage = document.getElementById("borrarLocalStorage")
    const botonMostrarLocalStorage = document.getElementById("mostrarLocalStorage")

    // CONTROLADOR DE EVENTO PARA BOTON PARA BORRAR MI LOCAL STORAGE
    botonBorrarLocalStorage.addEventListener("click", function () {
        localStorage.removeItem("resultadoPlazoFijo");
        localStorage.removeItem("resultadoPlazoFijoDolar")
    });
    async function mostrarContenidoLocalStorage() {
        try {
            const contenidoPlazoFijo = localStorage.getItem("resultadoPlazoFijo");
            const contenidoPlazoFijoDolar = localStorage.getItem("resultadoPlazoFijoDolar");

            if (contenidoPlazoFijo || contenidoPlazoFijoDolar) {
                const contenidoParaMostrar = contenidoPlazoFijo || contenidoPlazoFijoDolar;

                const contenidoLocalStorageElement = document.getElementById("Simulaciones");
                contenidoLocalStorageElement.textContent = contenidoParaMostrar;

                $('#gananciaModal').modal('show');
            } else {
                alert("No hay contenido en localStorage.");
            }
        } catch (error) {
            console.error("Error al acceder al Local Storage:", error);
        }
    }
    //  CONTROLADOR DE EVENTO PARA BOTON MOSTRAR MI LOCAL STORAGE
    botonMostrarLocalStorage.addEventListener("click", mostrarContenidoLocalStorage);
});