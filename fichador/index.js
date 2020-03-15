const prompt = require('prompt-sync')();
const peticion = require('request-promise');

// const año = prompt('Elige el año en el que vas a fichar. Ejemplo: 2020\n');
// const mes = prompt('Elige el mes en el que vas a fichar. Ejemplo: enero\n');
// const timeClockin = prompt('Selecciona un horario de entrada.' +
//     'Ejemplo: Si quieres entrar entre las 8:00 y las 8:30 deberías introducir 8:00-8:30. ' +
//     'Si quieres entrar todos los dias a las 8:00' +
//     'sólo tienes que poner 8:00. ¿Qué horario de entrada quieres?:\n');
//
//
// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);
// });
(async () => {

    const semana = ['domingo','lunes','martes', 'miercoles', 'jueves', 'viernes', 'sábado'];

    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    let opciones = {
        method: 'POST',
        uri: 'https://mcp.soprahronline.com/hr-business-services-rest/business-services/gp/WAW05B02?role=EEMPSPR(SPRSPR114498)&startpop=231067&lang=F&voc=FGA',
        headers: {
            'Connection': 'keep-alive',
            'Pragma': 'no-cache',
            'Accept-Language': 'es-ES',
            'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            'Sec-Fetch-Dest': 'empty',
            'Origin': 'https://mcp.soprahronline.com',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Referer': 'https://mcp.soprahronline.com/SopraGP4U/WAW05BE0',
            'Cookie': 'JSESSIONID=177409A649A0140840FFEA2A9E21BFD8; Lb-esp-prod-pub=AcMiRV0BBAroUiFgsjVpIw$$; virtualSessionId=4qAuDtjJSHPBHhLb1MuMyryOUuBqt3wiI6CdhTzsP6yNaOyoYypK2D4ZJXEjX6Rt; com.hraccess.portal.connection.id=4qAuDtjJSHPBHhLb1MuMyryOUuBqt3wiI6CdhTzsP6yNaOyoYypK2D4ZJXEjX6Rt'
        },
        json: true,
        body: {
            "occurrences": {
                "occurrence": [
                    {
                        "@population": "POPS0SAL-Employee",
                        "@domain": "DOMT0SAL-Modif",
                        "@datasection": "ZY5B",
                        "@dossier": "231067",
                        "@action": "C",
                        "data": [
                            {
                                "item": "DATBAD",
                                "value": "2020/03/11"
                            },
                            {
                                "item": "NULIGN",
                                "value": "0"
                            },
                            {
                                "item": "HEUFOR",
                                "value": "08:00"
                            },
                            {
                                "item": "SENS",
                                "value": "I"
                            },
                            {
                                "item": "COMENT",
                                "value": " "
                            }
                        ]
                    }
                ]
            }
        }
    };

    async function recorrerMes(anio, mes) {
        const dias = new Date(anio, mes+1, 0).getDate();
        console.log("El mes tiene " + dias + " dias");
        let diaSemana;
        let numeroSemana;
        for (let dia = 1; dia <= dias; dia++) {
            diaSemana = semana[new Date(anio, mes, dia).getDay()];
            numeroSemana = new Date(anio, mes, dia).getDay();
            if (numeroSemana > 0 && numeroSemana < 6) {
                result = await prompt('¿Quieres fichar el ' + diaSemana + ' ' + dia + ' (y/n/stop): ');
                if (result === "stop") {
                    process.exit();
                } else if (result === "yes" || result === "y") {
                    clockIn();
                    clockOut();
                }
            }
        }
    }

    async function clockIn() {
        opciones.body.occurrences.occurrence[0].data.forEach(element => {
            if (element.item === 'SENS') {
                element.value = 'I';
            } else if (element.item === 'DATBAD') {
                element.value = '2020/03/12';
            } else if (element.item === 'HEUFOR' || element.item === 'HEUBAD'){
                element.value = '8:00';
            } else if (element.item === 'NULIGN') {
                element.value = '0';
            }
        });
        console.log("INMNNNNNNNNNNNNNNNNN");
        try {
            const response = await peticion(opciones);
            console.log(response);
        } catch (error) {
            console.log(error.response);
        }
    }

    async function clockOut() {
        opciones.body.occurrences.occurrence[0].data.forEach(element => {
            if (element.item === 'SENS') {
                element.value = 'O';
            } else if (element.item === 'DATBAD') {
                element.value = '2020/03/12';
            } else if (element.item === 'HEUFOR' || element.item === 'HEUBAD'){
                element.value = '17:00';
            } else if (element.item === 'NULIGN') {
                element.value = '0';
            }
        });
        console.log("OUTTTTTTTTTTTTTTTTTTTT");
        try {
            peticion(opciones).then(function (parsedBody) {
                console.log("Bien" + parsedBody)
            })
                .catch(function (err) {
                    console.log(err);
                });
        } catch (error) {
            console.log(error.response);
        }
    }


    // Main
    const hoy = new Date();
    console.log('Bienvenido!');
    console.log('Vas a fichar el mes ' + meses[hoy.getMonth()] + ' del año ' + hoy.getFullYear());
    let result = await prompt('¿Quieres cambiar la fecha (y/n/stop)?: ');
    if (result === "stop") {
        process.exit();
    }
    else if (result === 'yes' || result === 'y' ) {
        const anio = await prompt('Elige el año en el que vas a fichar (ejemplo: 2020): ');
        let mes = await prompt('Elige el mes en el que vas a fichar (ejemplo: enero: ');

        const fecha = new Date(anio, meses.indexOf(mes.toLowerCase()));
        recorrerMes(fecha.getFullYear(), fecha.getMonth());
    } else {
        // Día actual
        const fecha = new Date();
        recorrerMes(fecha.getFullYear(), fecha.getMonth());
    }
})();

