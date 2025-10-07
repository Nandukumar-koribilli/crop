// ===== BLYNK DEFINES MUST BE AT THE VERY TOP =====
#define BLYNK_TEMPLATE_ID "TMPL3cpGqHBTh"
#define BLYNK_TEMPLATE_NAME "Plant Irrigation System"
#define BLYNK_AUTH_TOKEN "Iqddn2cOjXUXPe-4jCKYt6MjX0dAdwck"

#define BLYNK_PRINT Serial

#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// LCD Setup (replace 0x27 if your scanner shows different)
LiquidCrystal_I2C lcd(0x27, 16, 2);

// WiFi credentials
char ssid[] = "nandu";
char pass[] = "123456789";

// Pins
#define BUZZER_PIN D8
#define RELAY_PIN D3
#define MOISTURE_PIN A0

// Moisture Threshold (adjust after testing your sensor)
int moistureThreshold = 250;

// Blynk Virtual Pin Values
int value = 0;   // Manual control
int value1 = 0;  // Auto mode

// Blynk Virtual Pin Handlers
BLYNK_WRITE(V1) {
  value = param.asInt();
}

BLYNK_WRITE(V2) {
  value1 = param.asInt();
}

void setup() {
  Serial.begin(9600);

  // Pins
  pinMode(RELAY_PIN, OUTPUT);
  pinMode(BUZZER_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);
  digitalWrite(BUZZER_PIN, LOW);

  // LCD Initialization
  lcd.init();         // Works for most LiquidCrystal_I2C libraries
  lcd.backlight();
  lcd.setCursor(0,0);
  lcd.print("Plant Irrigation");
  lcd.setCursor(0,1);
  lcd.print("System");
  delay(2000);
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Connecting WiFi");

  // Connect Blynk (port 80 for ESP8266)
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass, "blynk.cloud", 80);
}

void loop() {
  Blynk.run();

  // Read moisture
  int moistureValue = analogRead(MOISTURE_PIN);
  moistureValue = 1024 - moistureValue; // Reverse if necessary

  // Serial debug
  Serial.print("Moisture: "); Serial.print(moistureValue);
  Serial.print(" | Auto Mode: "); Serial.print(value1);
  Serial.print(" | Manual: "); Serial.print(value);
  Serial.print(" | Relay: "); Serial.println(digitalRead(RELAY_PIN));

  // Update LCD
  lcd.clear();
  lcd.setCursor(0,0);
  lcd.print("Moisture: ");
  lcd.print(moistureValue);
  lcd.setCursor(0,1);
  lcd.print("Motor: ");

  // Auto Mode Logic
  if (value1 == 1) {
    if (moistureValue < moistureThreshold) {   // Soil dry
      digitalWrite(RELAY_PIN, HIGH);          // Pump ON
      digitalWrite(BUZZER_PIN, HIGH);         // Buzzer ON
      lcd.setCursor(8,1); lcd.print("ON ");
    } else {                                   // Soil wet
      digitalWrite(RELAY_PIN, LOW);           // Pump OFF
      digitalWrite(BUZZER_PIN, LOW);          // Buzzer OFF
      lcd.setCursor(8,1); lcd.print("OFF");
    }
  }
  // Manual Mode Logic
  else {
    if (value == 1) {
      digitalWrite(RELAY_PIN, HIGH);
      digitalWrite(BUZZER_PIN, LOW);
      lcd.setCursor(8,1); lcd.print("ON ");
    } else {
      digitalWrite(RELAY_PIN, LOW);
      digitalWrite(BUZZER_PIN, LOW);
      lcd.setCursor(8,1); lcd.print("OFF");
    }
  }

  // Send moisture to Blynk
  Blynk.virtualWrite(V0, moistureValue);

  delay(2000); // Wait 2 seconds
}
