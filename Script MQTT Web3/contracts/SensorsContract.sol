// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract SensorsContract {

    uint public dataTemp;
    
    uint256 public SensorCounter = 0;

    struct Sensor{
        uint256 id;
        string NoSerie;
        string Name;
        bool active;
        uint256 addAt;
    }

    event SensorAdd(
        uint256 id,
        string NoSerie,
        string Name,
        bool active,
        uint256 addAt
    );

    event SensorStatusActive(uint256 id, bool active);

    mapping(uint256 => Sensor) public sensors;

    constructor() {
        AddSensor("NUMERODESERIE01", "Sensor DS18B20 DALLAS");
    }

    function AddSensor(string memory _NoSerie, string memory _Name) public
    {
        SensorCounter++;
        sensors[SensorCounter] = Sensor(
            SensorCounter,
            _NoSerie,
            _Name,
            true,
            block.timestamp
        );
        emit SensorAdd(
            SensorCounter,
            _NoSerie,
            _Name,
            true,
            block.timestamp
        );
    }

    function SensorStatus(uint256 _id) public {
        Sensor memory _sensor = sensors[_id];
        _sensor.active = !_sensor.active;
        sensors[_id] = _sensor;
        emit SensorStatusActive(_id, _sensor.active);       
    }

    function setTemp(uint _data) public{
        dataTemp = _data;      
               
    }

    function getTemp() external view returns (uint) {
        return dataTemp;
    }
}