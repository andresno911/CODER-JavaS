
function calcularGanancia(monto, tasa, dias) {
    return monto * tasa * dias;
}

do {
    alert("Bienvenido a la Simulación de plazos fijos.");

    const opcion = parseInt(prompt("Que operacion quiere realizar? \n1. Realizar plazo fijo en pesos \n2. Realizar plazo fijo en dólares \n3. Salir"));

    switch (opcion) {
        case 1:
            let montoPesos = parseInt(prompt("Ingrese el monto en pesos:"));
            let diasPlazoPesos = parseInt(prompt("Ingrese los días del plazo:"));
            const tasaInteresanual = 0.97;

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
    entramos = parseInt(prompt("Quieres generar otra simulacion? 1 para si"));
} while (entramos === 1);
