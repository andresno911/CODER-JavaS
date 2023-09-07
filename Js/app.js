
//DEFINO ARRAY PARA GUARDAR USUARIOS Y CONTRASEÑAS
const usuarios = [];

//DEFINO FUNCION Y UTILIZO METODO .some PARA QUE NO SE CREEN DOS VECES EL MISMO USUARIO
function verificoUsuario(nombreUsuario) {
    return usuarios.some(usuario => usuario.usuario === nombreUsuario);
}

//FUNCION PARA CREAR USUARIO Y CONTRASEÑA VINCULANDO A INPUTS DE FORMULARIOS
function registrarUsuario() {
    const nombreUsuarioInput = document.getElementById("nombreUsuarioRegistro");
    const contrasenaInput = document.getElementById("contrasenaRegistro");

    const nombreUsuario = nombreUsuarioInput.value;
    const contrasena = contrasenaInput.value;
    //APLICO IF PARA QUE LA INFORMACION CUMPLA CON LOS REQUISITOS
    if (nombreUsuario.length >= 8 && contrasena.length >= 8) {
        if (!verificoUsuario(nombreUsuario)) {
            usuarios.push({ usuario: nombreUsuario, contraseña: contrasena });
            mostrarMensaje("Registro exitoso");
        } else {
            mostrarMensaje("El nombre de usuario ya está registrado");
        }
    } else {
        mostrarMensaje("Por favor, complete todos los campos usando un mínimo de 8 caracteres");
    }

    // LIMPIO LOS INPUT
    nombreUsuarioInput.value = "";
    contrasenaInput.value = "";
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

            //USO IF PARA VERIFICAR QUE SE CUMPLAN CONDICIONES
            if (montoPesos >= 200000 && diasPlazoPesos >= 30) {
                const tasaInteres = tasaInteresanual / 365;
                const ganancia = calcularGanancia(montoPesos, tasaInteres, diasPlazoPesos);
                const resultadoMensaje = `Plazo fijo en pesos Simulado. Monto: ${montoPesos}. Dias: ${diasPlazoPesos} Ganancia: ${ganancia}`;
                //GUARDO RESULTADO EN LOCAL STORAGE
                localStorage.setItem('resultadoPlazoFijo', resultadoMensaje);

                // Actualizar el contenido del modal con la ganancia
                const gananciaResultado = document.getElementById("gananciaResultado");
                gananciaResultado.textContent = resultadoMensaje;

                // MUESTRO MODAL
                $('#gananciaModal').modal('show');
            } else {
                const errorMensaje = "Monto mínimo para plazo fijo en pesos es $200000 y los días deben ser mayores a 30.";
                mostrarResultado(errorMensaje);
            }
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

            //USO IF PARA VERIFICAR QUE SE CUMPLAN CONDICIONES
            if (montoDolares >= 100 && diasPlazoDolares >= 30) {
                const tasaInteresDolar = tasaInteresAnualDolares / 365;
                const ganancia = calcularGanancia(montoDolares, tasaInteresDolar, diasPlazoDolares)
                const resultadoDolarMensaje = `Pazo fijo en dolares Simulado.  Monto: ${montoDolares}. Dias: ${diasPlazoDolares} Ganancia: ${ganancia}`
                //GUARDO RESULTADO EN LOCAL STORAGE
                localStorage.setItem('resultadoPlazoFijoDolar', resultadoDolarMensaje);

                const gananciaResultado = document.getElementById("gananciaResultado")
                gananciaResultado.textContent = resultadoDolarMensaje;
                // MUESTRO MODAL
                $(`#gananciaModal`).modal(`show`);
            } else {
                const errorMensaje = "Monto minimo para plazo fijoi en dolares es de U$D 100 y los días deben ser mayores a 30."
                mostrarResultado(errorMensaje);
            }
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

    // CONTORLADOR DE EVENTO PARA BOTON QUE MUESTRA MIS ULTIMAS SIMULACIONES GUARDADAS EN EL LOCAL STORAGE
    botonMostrarLocalStorage.addEventListener("click", function () {

        const contenidoLocalStorage = localStorage.getItem("resultadoPlazoFijo");
        const contenidoLocalStorageD = localStorage.getItem("resultadoPlazoFijoDolar");

        if (contenidoLocalStorage || contenidoLocalStorageD) {
            const contenidoParaMostrar = contenidoLocalStorage || contenidoLocalStorageD;

            const contenidoLocalStorageElement = document.getElementById("Simulaciones");
            contenidoLocalStorageElement.textContent = contenidoParaMostrar;

            $(`#gananciaModal`).modal(`show`);
        } else {
            alert("No hay contenido en localStorage.");
        }
    });
});