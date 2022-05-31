//Ejemplo MQTT & ESP32 con sensor de temperatura DHT22 by Biblioman
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHTesp.h"
#include <stdlib.h>
 
const char* ssid = "PC_Master_Race";
const char* password =  "12345678";
const char* mqttServer = "broker.emqx.io";
const int mqttPort = 1883;
const char* mqttUser = "theguerorex";
const char* mqttPassword = "12345678";
 
WiFiClient espClient;
PubSubClient client(espClient);
DHTesp dht;
 
void setup() {
 
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  dht.setup(14);

  Serial.print("Periodo minimo de muestreo: ");
  Serial.println(dht.getMinimumSamplingPeriod());
 
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Conectando a red WiFi...");
  }
 
  Serial.println("Conectado a la red WiFi");
 
  client.setServer(mqttServer, mqttPort);
 
  while (!client.connected()) {
    Serial.println("Conectando a Broquer MQTT...");
 
    if (client.connect("IOT-ESP32", mqttUser, mqttPassword )) {
 
      Serial.println("conectado");
 
    } else {
 
      Serial.print("conexion fallida ");
      Serial.print(client.state());
      delay(2000);
 
    }
  }
 
 
 
}
 
void loop() {
  delay(dht.getMinimumSamplingPeriod());
  float temperature = dht.getTemperature();
  char tempstring[3];
  dtostrf(temperature,3,1,tempstring);
  client.publish("ESP32ETH/TEMPERATURA", tempstring);
 
  client.loop();
}