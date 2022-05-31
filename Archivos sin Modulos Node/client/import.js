document.addEventListener("DOMContentLoaded", () => {
    App.init();
  });

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#getbutton").addEventListener("click", App.GetTemp());
  })

const sensorForm = document.querySelector('#sensorForm');

sensorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const numserie = sensorForm["numserie"].value;
    const name = sensorForm["name"].value;
    App.addSensor(numserie, name);   
});

//////////////////////////////////////////////////////////////////////////////////////////
const $select = document.querySelector("#miSelect");

const mostrar = () => {
  const indice = $select.selectedIndex;
  if(indice === -1) return; //  es cuando no hay elementos
  const opcionSeleccionada = $select.options[indice];
  document.getElementById("Sensortitle").innerText = opcionSeleccionada.text;
  document.getElementById("Sentitle").innerText = opcionSeleccionada.text;
  if(opcionSeleccionada.text == "Sensor DS18B20 DALLAS"){
    document.getElementById("NameDato").innerText = "Temperatura";
  }else{
    document.getElementById("NameDato").innerText = "Na  hay nada Aqui";
  }
  
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btnMostrar").addEventListener("click", mostrar);
});










     

