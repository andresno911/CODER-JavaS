
// Definición de la función calcularGanancia que calcula la ganancia multiplicando el monto, la tasa y los días
function calcularGanancia(monto, tasa, dias) {
    return monto * tasa * dias; 
}

// Inicio bucle do-while que permite repetir la simulación
do {
    
    alert("Bienvenido a la Simulación de plazos fijos.");

    // Solicitar eleccion de opción
    const opcion = parseInt(prompt("Que operacion quiere realizar? \n1. Realizar plazo fijo en pesos \n2. Realizar plazo fijo en dólares \n3. Salir"));

    // Aplico switch para manejar diferentes casos basados en la opción elegida por el usuario
    switch (opcion) {
        case 1:
            // Solicita ingresar monto en pesos y los días del plazo; Defino constante tasaInteresanual
            let montoPesos = parseInt(prompt("Ingrese el monto en pesos:"));
            let diasPlazoPesos = parseInt(prompt("Ingrese los días del plazo:"));
            const tasaInteresanual = 0.97;

            // Aplico If para verificar si el monto y los días cumplen con los requisitos mínimos
            if (montoPesos >= 20000 && diasPlazoPesos >= 30) {
                // Calcula la tasa de interés diaria y la ganancia usando la función calcularGanancia
                const tasaInteres = tasaInteresanual / 365;
                const ganancia = calcularGanancia(montoPesos, tasaInteres, diasPlazoPesos);
                // Muestra la ganancia
                alert(`Plazo fijo en pesos realizado. Ganancia: ${ganancia}`);
            } else {
                // Muestra un mensaje de error si los requisitos mínimos no se cumplen
                alert("Monto mínimo para plazo fijo en pesos es $20000 y los días deben ser mayores a 30.");
            }
            break;

        case 2:
            // Solicita ingresar monto en dolares y los días del plazo; Defino constante tasaInteresanual
            let montoDolares = parseInt(prompt("Ingrese el monto en dólares:"));
            let diasPlazoDolares = parseInt(prompt("Ingrese los días del plazo:"));
            const tasaInteresanualDolar = 0.0050;

            // Aplico If para verificar si el monto y los días cumplen con los requisitos mínimos
            if (montoDolares >= 100 && diasPlazoDolares >= 30) {
                // Calcula la tasa de interés diaria y la ganancia usando la función calcularGanancia
                const tasaInteresDolares = tasaInteresanualDolar / 365;
                const gananciaDolares = calcularGanancia(montoDolares, tasaInteresDolares, diasPlazoDolares);
                // Muestra la ganancia
                alert(`Plazo fijo en dólares realizado. Ganancia: ${gananciaDolares}`);
            } else {
                // Muestra un mensaje de error si los requisitos mínimos no se cumplen
                alert("Monto mínimo para plazo fijo en dólares es $100 y los días deben ser mayores a 30.");
            }
            break;

        case 3:
            // Muestra un mensaje de salida
            alert("Saliendo...");
            break;

        default:
            // Muestra un mensaje de error para opciones inválidas
            alert("Opción inválida.");
    }
    
    // Solicita si se desea realizar otra simulación
    entramos = parseInt(prompt("Quieres generar otra simulacion? 1 para si"));
} while (entramos === 1); // El bucle se repetirá mientras la variable 'entramos' sea igual a 1