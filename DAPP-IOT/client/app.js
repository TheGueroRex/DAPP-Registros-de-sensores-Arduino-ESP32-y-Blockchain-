
App = {
    contracts: {},
    init: async () => {
      await App.loadWeb3();
      await App.loadAccount();
      await App.loadContract();
      await App.render();
      await App.renderElement();
      await App.selectSensor();
      await App.GetTemp();
    },

    loadWeb3: async () => {

      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (window.web3){
          web3 = new web3(window.web3.currentProvider)
      } 
      else {
        console.log("No ethereum browser is installed. Try it installing MetaMask ");
      }
    },
    loadAccount: async () => {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        App.account = accounts[0];
    },
    loadContract: async () => {
      const res = await fetch("SensorsContract.json")
      const sensorsContractJSON =await res.json()

      App.contracts.sensorsContract = TruffleContract(sensorsContractJSON)

      App.contracts.sensorsContract.setProvider(App.web3Provider)

      App.sensorsContract = await App.contracts.sensorsContract.deployed()
      
    },
    render: async () => {
        document.getElementById("account").innerText = App.account;
     },
    renderElement: async () => {
      const SensorCounter = await App.sensorsContract.SensorCounter();
      const SensorCounterNumber = SensorCounter.toNumber();

      let html = "";

      for (let i = 1; i <= SensorCounterNumber; i++) {
        const sensor = await App.sensorsContract.sensors(i);
        const sensorId = sensor[0].toNumber();
        const sensorNoSerie = sensor[1];
        const sensorName = sensor[2];
        const sensorActive = sensor[3];
        const sensorAddAt = sensor[4];

        let sensorElement = `<div class='option' id='${sensorId}'>${sensorName}</div>`;
      html += sensorElement;

      }
      //document.querySelector("#sensorList").innerHTML = html;

      

    },
    addSensor: async (numserie, name) => {
      try {
        const resul = await App.sensorsContract.AddSensor(numserie, name,{
          from: App.account,
        });
        console.log(resul.logs[0].args);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    selectSensor: async () => {

      const SensorCounter = await App.sensorsContract.SensorCounter();
      const SensorCounterNumber = SensorCounter.toNumber();


      const $select = document.querySelector("#miSelect");
      

      for (let i = 1; i <= SensorCounterNumber; i++) {
        const sensor = await App.sensorsContract.sensors(i);
        const sensorSerie = sensor[1];
        const sensorName = sensor[2];

        const opcion = document.createElement('option');

        opcion.value = sensorName;
        opcion.text = sensorName;
        
        $select.appendChild(opcion);

      }

    },

    GetTemp: async () => {
      const Temp = await App.sensorsContract.getTemp();
      const val = Temp.toNumber();
      console.log(val);
      
      document.querySelector("#getbutton").innerText = val;
      
    },
    
    

    

    
    
};



        

App.init()

