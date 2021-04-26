



/*Codigo calculadora de Temperatura*/
let farenheitInput = document.getElementById('farenheit');
let celciusInput = document.getElementById('celcius');
/*  Consola para identificacion
console.log(farenheitInput);
console.log(celciusInput);
*/
/*Funciones de cambio de temperatura*/
function farenheitToCelcius (val) {
    let res = (val - 32) * (5/9);
    return res.toFixed(2);
}

function celciusToFarenheit (val) {
    let res = val * (9/5) + 32;
    return res.toFixed(2);
}

function aCelcius() {
    let newVal = farenheit.value;
    let change = farenheitToCelcius(newVal); 
    celcius.value = change;
}

function aFarenheit() {
    let newVal = celcius.value;
    let change = celciusToFarenheit(newVal);
    farenheit.value = change;
}

farenheitInput.addEventListener("input", aCelcius);
celciusInput.addEventListener("input", aFarenheit);

/*Localización de ciudad*/

fetch('https://api.ipify.org/?format=json')
.then(value => {
    value.json().then(valueJSON => {
        console.log(valueJSON.ip);
        fetch('https://ipapi.co/' + valueJSON.ip + '/json/')
            .then(function(response) {
                response.json().then(jsonData => {
                countryCode = jsonData.country_code;
                city = jsonData.city;
                console.log(countryCode, city);
                console.log('Hola');

                fetch('https://api.weatherbit.io/v2.0/current?&city='+ city +'&country='+ countryCode +'&key=3c9d001fe33041f6952c6ba776944111')
                    .then(function(response) {
                        response.json().then(jsonData => {
                            let temp = jsonData.data[0].app_temp;
                            console.log(temp)
                            let anuncio = document.getElementById('tempCiudad');
                            let inputCalculadoraCelcius = document.getElementById('celcius');
                            let inputCalculadoraFarenheit = document.getElementById('farenheit');
                            anuncio.innerHTML = 'La temperatura en ' + city + ', ' + countryCode + ' es de: ' + temp + '\u00B0' + 'Celcius';
                            inputCalculadoraCelcius.value = temp;
                            inputCalculadoraFarenheit.value = celciusToFarenheit(temp);
                        });
                    });
                })
            })
    })
})

/*Buscador de Repositorios*/
let user = 'Zahid7118'; //Busqueda manual por JavaScript

function loadTableData(tableData) { //Se le da el objeto info (jsonData)
    const tableBody = document.getElementById('tableData');
    let dataHtml = '';
    for(let element of tableData) {
        dataHtml += `<tr><td>${element.name}</td><td><a target="_blank" href="${element.git_url.replace('git:','')}">${element.git_url.replace('git:','')}</a></td></tr>`;
    }
    console.log(dataHtml);
    tableBody.innerHTML = dataHtml;
}

function busqueda(ev) {
    ev.preventDefault();
    let nombreUsuario = document.getElementById('inputBusqueda').value;
    console.log(nombreUsuario);
    fetch('https://api.github.com/users/'+ nombreUsuario +'/repos')
    .then(function(response) {
        console.log(response.statusText)
        response.json().then(jsonData => {
            let info = jsonData
            console.log('No. de Repositarios encontrados: ' + info.length)
            console.log(info)
            console.log(info.message);
            if (info.message === 'Not Found' && info.length === undefined) {
                console.log(nombreUsuario)
                console.log('Usuario no encontrado');
                alert('Usuario no encontrado');
            } else {
                for(let i = 0; i < info.length; i++) {
                    console.log(info[i].name);
                    let url = info[i].git_url.replace('git:','');
                    console.log(url);
                }
                loadTableData(info);
            }
            
        });
        
    })
    .catch(error => console.log('error'))
}

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById('buttonBusqueda').addEventListener('click', busqueda);
})