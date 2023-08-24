//CREO ARRAY PARA ALMACENAR USUARIOS REGISTRAODS
const usuarios = [];

function verificoUsuario(nombreUsuario) {
    // UTILIZO METODO .some() PARA QUE NO SE REPITAN USUARIOS
    return usuarios.some(usuario => usuario.usuario === nombreUsuario);
}
// FUNCION PARA REGISTRAR USUARIO
function registrar() {
    const usuario = prompt("Ingrese un nombre de usuario (mínimo 8 caracteres):");
    const contraseña = prompt("Ingrese una contraseña (mínimo 8 caracteres):");
    // USO if PARA COMPROBAR QUE LOS DATOS REGISTRADOS CUMPLEN LOS REQUISITOS
    if (usuario.length >= 8 && contraseña.length >= 8) {
        // SI EL USUARIO NO EXISTE SE AGREGA USANDO .push() AL array usuarios
        if (!verificoUsuario(usuario)) {
            usuarios.push({ usuario, contraseña });
            alert("Registro exitoso");
            console.log("Registro exitoso");
            console.log("Usuarios actuales:", usuarios);
        } else {
            alert("El nombre de usuario ya está registrado");
            console.log("El nombre de usuario ya está registrado");
        }
    } else {
        alert("Por favor, complete todos los campos usando un mínimo de 8 caracteres");
        console.log("Por favor, complete todos los campos usando un mínimo de 8 caracteres");
    }
}
// DEFINO FUNCION CALCULAR GANANCIA
function calcularGanancia(monto, tasa, dias) {
    return monto * tasa * dias;
}
//USO while PARA DESARROLLAR LAS OPCIONES DE REGISTRO E INGRESO, EN case 2 TRAS INGRESAR DESARROLLO EL SIMULADOR DE PLAZO FIJO
while (true) {
    const opcion = prompt("Elija una opción:\n1. Registrar\n2. Ingresar\n3. Salir");

    switch (opcion) {
        case "1":
            registrar();
            break;
        case "2":
            const usuario = prompt("Ingrese su nombre de usuario:");
            const contraseña = prompt("Ingrese su contraseña:");

            //UTILIZO METODO .find() PARA VER SI EL USUARIO ESTA REGISTRADO
            const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

            if (usuarioEncontrado && usuarioEncontrado.contraseña === contraseña) {
                alert("Inicio de sesión exitoso");
                console.log("Inicio de sesión exitoso");

                do {
                    alert("Bienvenido a la Simulación de plazos fijos.");
                    const opcion = parseInt(prompt("Que operacion quiere realizar? \n1. Realizar plazo fijo en pesos \n2. Realizar plazo fijo en dólares \n3. Salir"));
                    // APLICO SWITCH PARA DESAROLLAR LAS OPCIONES QUE PUEDE ELEGIR EL USUARIO
                    switch (opcion) {
                        case 1:
                            let montoPesos = parseInt(prompt("Ingrese el monto en pesos:"));
                            let diasPlazoPesos = parseInt(prompt("Ingrese los días del plazo:"));
                            const tasaInteresanual = 1.18;

                            // APLICO if PARA VER SI LOS MONTOS CUMPLEN REQUISITOS
                            if (montoPesos >= 20000 && diasPlazoPesos >= 30) {
                                const tasaInteres = tasaInteresanual / 365;
                                const ganancia = calcularGanancia(montoPesos, tasaInteres, diasPlazoPesos);
                                alert(`Plazo fijo en pesos realizado. Ganancia: ${ganancia}`);
                            } else {
                                alert("Monto mínimo para plazo fijo en pesos es $20000 y los días deben ser mayores a 30.");
                            }
                            break;
                        case 2:
                            let montoDolares = parseInt(prompt("Ingrese el monto en dólares:"));
                            let diasPlazoDolares = parseInt(prompt("Ingrese los días del plazo:"));
                            const tasaInteresanualDolar = 0.0050;
                            // APLICO if PARA VER SI LOS MONTOS CUMPLEN REQUISITOS
                            if (montoDolares >= 100 && diasPlazoDolares >= 30) {
                                const tasaInteresDolares = tasaInteresanualDolar / 365;
                                const gananciaDolares = calcularGanancia(montoDolares, tasaInteresDolares, diasPlazoDolares);
                                alert(`Plazo fijo en dólares realizado. Ganancia: ${gananciaDolares}`);
                            } else {
                                alert("Monto mínimo para plazo fijo en dólares es $100 y los días deben ser mayores a 30.");
                            }
                            break;
                        case 3:
                            alert("Saliendo...");
                            break;
                        default:
                            alert("Opción inválida.");
                    }
                    entramos = parseInt(prompt("¿Quieres generar otra simulación? 1 para sí"));
                } while (entramos === 1);

            } else {
                alert("Usuario o contraseña incorrectos");
                console.log("Usuario o contraseña incorrectos");
            }
            break;
        case "3":
            alert("¡Hasta luego!");
            break;
        default:
            alert("Opción inválida");
            break;
    }
}