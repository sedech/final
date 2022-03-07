const cities = document.getElementById("selectCity");
const ciudadAgregada = document.getElementById("newCity")
const containerResultado = document.getElementById("container")
const resultadoDisplay = document.getElementById("city-weather")
const tempActual = document.getElementById("temp-act")
const sensacion = document.getElementById("sensacion")
const humidity = document.getElementById("humedad")
const descripcion = document.getElementById("descripcion")
const ciudadConsultada = document.getElementById("ciudadConsultada")
let citiesList = []

function validarCiudad() {
    let arrayCities = JSON.parse(localStorage.getItem("cities"));
    if (arrayCities == null) {
        return
    }
    for (let i = 0; i <= arrayCities.length; i++) {
        if (ciudadAgregada.value === arrayCities[i]) {
            return false
        }
    }
}

function cityAdd() {
    boolCity = validarCiudad()
    if (ciudadAgregada.value.length == 0) {
        result2.style.display = "block";
        alert("Escribir la ciudad deseada");
        result2.style.color = "green";
        setTimeout(function () {
            result2.style.display = "none";
        }, 2000)
        return;
    }
    else if (boolCity == false) {
        result2.style.display = "block";
        alert("La ciudad ya esta cargada");
        result2.style.color = "red"
        setTimeout(function () {
            return result2.style.display = "none";
        }, 2000)
    }
    else {
        result2.style.display = "block";
        alert(ciudadAgregada.value + " correctamente añadida");
        result2.style.color = "lime";
        citiesList.push(ciudadAgregada.value)
        localStorage.setItem("ciudadess", JSON.stringify(citiesList))
        ciudadAgregada.value = ""
        setTimeout(function () {
            return result2.style.display = "none";
        }, 2000)
    }
}

function updateSelect() {
    let arrayCiudades = JSON.parse(localStorage.getItem("ciudadess"));
    arrayCiudades.forEach(array => {
        let opcion = document.createElement('option');
        opcion.value = array;
        opcion.text = array;
        cities.add(opcion);
    })
}

function displayError() {
    var error = document.getElementById("result")

}

function checkCityWeather() {
    let city = document.getElementById("selectCity").value;
    if (cities.value != "") {
        resultadoDisplay.style.display = "block";

        let apiKey = "3936d0749fdc3124c6566ed26cf11978";
        let url = "https://api.openweathermap.org/data/2.5/weather?q=" + selectCity.value + "&appid=3936d0749fdc3124c6566ed26cf11978&units=metric&lang=es";
        fetch(url)
            .then((cityStorage) => cityStorage.json())
            .then(data => cityData(data))
            .catch((error) => {
                console.log(error);
            })
    }
    else {
        alert("no hay ninguna ciudad seleccionada")
    }

}
function cityData(data) {
    let tempValue = data['main']['temp'];
    let sensacionValue = data['main']['feels_like'];
    let humedadValue = data['main']['humidity'];
    let descripcionValue = data['weather'][0]['description'];

    ciudadConsultada.innerHTML = "Clima en: " + selectCity.value
    tempActual.innerHTML = "Temperatura actual: " + tempValue + " °C";
    sensacion.innerHTML = "Sensacion Termica: " + sensacionValue + " °C";
    humedad.innerHTML = "Humedad: " + humedadValue + " %";
    descripcion.innerHTML = descripcionValue;

}