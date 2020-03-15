const prompt = require('prompt-sync')();
// const request = require('request');

// const año = prompt('Elige el año en el que vas a fichar. Ejemplo: 2020\n');
// const mes = prompt('Elige el mes en el que vas a fichar. Ejemplo: enero\n');
// const timeClockin = prompt('Selecciona un horario de entrada.' +
//     'Ejemplo: Si quieres entrar entre las 8:00 y las 8:30 deberías introducir 8:00-8:30. ' +
//     'Si quieres entrar todos los dias a las 8:00' +
//     'sólo tienes que poner 8:00. ¿Qué horario de entrada quieres?:\n');
//
// let postClockOut = {
//     'method': 'POST',
//     'url': 'https://mcp.soprahronline.com/hr-business-services-rest/business-services/gp/WAW05B02?role=EEMPSPR(SPRSPR114498)&startpop=231067&lang=F&voc=FGA',
//     'headers': {
//         'Connection': 'keep-alive',
//         'Pragma': 'no-cache',
//         'Accept-Language': 'es-ES',
//         'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.106 Safari/537.36',
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
//         'Cache-Control': 'no-cache',
//         'Sec-Fetch-Dest': 'empty',
//         'Origin': 'https://mcp.soprahronline.com',
//         'Sec-Fetch-Site': 'same-origin',
//         'Sec-Fetch-Mode': 'cors',
//         'Referer': 'https://mcp.soprahronline.com/SopraGP4U/WAW05B02',
//         'Cookie': 'JSESSIONID=93F16A8EA4FD13CCDA8C178D6A2D1089; Lb-esp-prod-pub=ACpxa10BBApgEj8EP5EgcQ$$; virtualSessionId=QlWDdqvIEcpesuVNMJNUw2E4Ya0unbPRBHmH948VVT1d9g7rYzI11LbYMkNkYbQn; com.hraccess.portal.connection.id=QlWDdqvIEcpesuVNMJNUw2E4Ya0unbPRBHmH948VVT1d9g7rYzI11LbYMkNkYbQn'
//     },
//     'body': JSON.stringify({"occurrences":{"occurrence":[{"@population":"POPL0SAL-Modif","@domain":"DOML0SAL-Modif","@datasection":"ZY5B","@dossier":"231067","@action":"C","data":[{"item":"SENS","value":"O"},{"item":"DATBAD","value":"2020/03/10"},{"item":"HEUFOR","value":"18:00"},{"item":"HEUBAD","value":"18:00"},{"item":"NULIGN","value":"0"}]}]}})
// };
//
// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);
// });
(async function(){
const semana = ['domingo','lunes','martes', 'miercoles', 'jueves', 'viernes', 'sábado'];
const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
let result;
// Día actual
const now = new Date();

    console.log('Bienvenido!');
    console.log('Vas a fichar el mes: ' + meses[now.getMonth()-1] + ' del año ' + now.getFullYear());
    result = await prompt('¿Quieres cambiar la fecha (y/n/stop)?: ');
    if (result === 'yes') {
        const año = await prompt('Elige el año en el que vas a fichar (ejemplo: 2020): ');
        const mes = await prompt('Elige el mes en el que vas a fichar (ejemplo: enero: ');
    } else if (result === "stop") {
        process.exit();
    }
/*console.log(now);
console.log(now.getFullYear());
console.log(now.getMonth());
console.log(now.getDate());*/


/*const first = new Date(now.getFullYear(), now.getMonth(), now.getDate());
console.log(first);
console.log(first.getFullYear());
console.log(first.getMonth());
console.log(first.getDate());*/

// Numero de días del mes actual
const dias = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
console.log(dias);
// Primer día del mes
// console.log(new Date(now.getFullYear(), now.getMonth(), 1));
// Día de la semana
// console.log(semana[new Date(now.getFullYear(), now.getMonth(), 1).getDay()]);

// console.log('¿Quieres fihcar el ' + semana[new Date(now.getFullYear(), now.getMonth(), 0).getDay() + 1]);

/*var d=new Date();
console.log(d.getDay());*/
// Obtenemos el número de días del mes
// const dias = new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
// const dia = semana[new Date(now.getFullYear(), now.getMonth()+1, 8).getDate()];
// console.log(new Date(now.getFullYear(), now.getMonth(), 12).getDate());
// console.log(now.getFullYear(), now.getMonth());
let diaSemana;
for (let dia = 1; dia <= dias; dia++) {
    diaSemana = semana[new Date(now.getFullYear(), now.getMonth(), dia).getDay()];
    console.log(diaSemana);
    // console.log(dia);
    numeroSemana = new Date(now.getFullYear(), now.getMonth(), dia).getDay();
    if (numeroSemana > 0 && numeroSemana < 6)  {
        result = await prompt('¿Quieres fichar el ' + diaSemana + ' ' + dia + ' (y/n/stop): ');
        if (result === "stop") {
            process.exit();
        }
}
})();

