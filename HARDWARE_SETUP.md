# ESP8266 NodeMCU Hardware Setup Guide

## 📋 Required Components
- ESP8266 NodeMCU (WiFi-enabled microcontroller)
- Soil Moisture Sensor (Capacitive or Resistive)
- 5V Relay Module
- 12V Water Pump
- 16x2 LCD Display with I2C Backpack
- Power Supply (5V/2A for pump, 3.3V for sensors)
- Jumper Wires
- Breadboard (optional)

## 🔌 Wiring Diagram

### ESP8266 NodeMCU Pinout
```
    3V3  [1]  [2]  GND
    EN   [3]  [4]  GPIO16
    GPIO4 [5]  [6]  GPIO0
    GPIO5 [7]  [8]  GPIO2
    GPIO18[9]  [10] GPIO15
    GPIO19[11] [12] GPIO13
    GPIO23[13] [14] GPIO12
    GPIO22[15] [16] GPIO14
    TX   [17] [18] RX
    GPIO21[19] [20] GPIO3
    GPIO17[21] [22] GPIO1
    GPIO16[23] [24] GPIO3
    GPIO4 [25] [26] GPIO0
    GPIO5 [27] [28] GPIO2
    GPIO18[29] [30] GPIO15
```

### Connections

#### Soil Moisture Sensor
- VCC → 3.3V
- GND → GND
- Signal → A0 (Analog Input)

#### Relay Module
- VCC → 5V
- GND → GND
- IN → GPIO5 (D1)

#### 16x2 LCD (I2C)
- VCC → 3.3V
- GND → GND
- SDA → GPIO4 (D2)
- SCL → GPIO5 (D3)

#### Water Pump
- Positive → Relay NO (Normally Open)
- Negative → Relay COM (Common)
- Power Supply → Relay VCC/GND

## 🔧 Arduino IDE Setup

### 1. Install ESP8266 Board Package
1. Open Arduino IDE
2. Go to File → Preferences
3. Add this URL to Additional Board Manager URLs:
   ```
   http://arduino.esp8266.com/stable/package_esp8266com_index.json
   ```
4. Go to Tools → Board → Boards Manager
5. Search "ESP8266" and install "ESP8266 by ESP8266 Community"

### 2. Install Required Libraries
Go to Tools → Manage Libraries and install:
- `ESP8266WiFi` (built-in)
- `LiquidCrystal_I2C` by Frank de Brabander
- `ArduinoJson` by Benoit Blanchon
- `WebSockets` by Markus Sattler

### 3. Board Settings
- Board: "NodeMCU 1.0 (ESP-12E Module)"
- Upload Speed: 115200
- CPU Frequency: 80MHz
- Flash Size: 4MB (FS:2MB OTA:~1019KB)
- Debug Level: None
- Port: Select your COM port

## 📡 WiFi Configuration

### Method 1: Hardcode (Quick Setup)
Edit the Arduino code and change these lines:
```cpp
const char* ssid = "YOUR_WIFI_NAME";
const char* password = "YOUR_WIFI_PASSWORD";
```

### Method 2: WiFi Manager (Recommended)
The code includes WiFi Manager for easy setup:
1. Upload the code
2. Connect to "SmartFarm_Setup" WiFi network
3. Open browser to 192.168.4.1
4. Enter your WiFi credentials

## 🌐 Web Interface Integration

### API Endpoints
The ESP8266 will create a web server with these endpoints:

- `GET /api/status` - Get all sensor data
- `POST /api/pump` - Control water pump
- `POST /api/lcd` - Update LCD display
- `GET /api/sensors` - Get individual sensor readings

### WebSocket Events
- `sensor_update` - Real-time sensor data
- `pump_status` - Pump state changes
- `lcd_update` - LCD display updates

## 🔄 Data Flow

1. **Sensors** → ESP8266 reads analog/digital values
2. **ESP8266** → Processes data and updates LCD
3. **ESP8266** → Sends data to web server via HTTP/WebSocket
4. **Web Interface** → Displays real-time data and controls
5. **User Actions** → Web interface sends commands to ESP8266
6. **ESP8266** → Executes commands (pump control, LCD updates)

## 🛠️ Troubleshooting

### Common Issues

#### ESP8266 Won't Connect to WiFi
- Check SSID and password
- Ensure 2.4GHz network (ESP8266 doesn't support 5GHz)
- Check signal strength
- Try WiFi Manager mode

#### Soil Sensor Readings Inconsistent
- Check wiring connections
- Calibrate sensor (dry vs wet readings)
- Ensure stable power supply
- Check for loose connections

#### Relay Not Switching
- Verify relay module power (5V)
- Check GPIO pin assignment
- Test relay with multimeter
- Ensure proper grounding

#### LCD Display Blank
- Check I2C address (usually 0x27 or 0x3F)
- Verify SDA/SCL connections
- Check power supply (3.3V)
- Try different I2C scanner code

#### Pump Not Working
- Check relay switching
- Verify pump power supply (12V)
- Check pump connections
- Test pump directly with power supply

### Testing Steps

1. **Upload Code**: Verify successful upload
2. **Check Serial Monitor**: Look for WiFi connection status
3. **Test Web Interface**: Open browser to ESP8266 IP
4. **Test Sensors**: Check sensor readings in web interface
5. **Test Pump**: Use web interface to control pump
6. **Test LCD**: Send messages to LCD display

## 📊 Calibration

### Soil Moisture Sensor
1. Place sensor in completely dry soil
2. Note the reading (should be low, ~0-20%)
3. Place sensor in water
4. Note the reading (should be high, ~80-100%)
5. Update calibration values in code

### LCD Display
1. Upload I2C scanner code to find address
2. Update address in main code if different
3. Test with simple "Hello World" message

## 🔒 Security Notes

- Change default WiFi credentials
- Use HTTPS for production (requires SSL certificate)
- Add authentication for web interface
- Regularly update firmware
- Use strong passwords

## 📱 Mobile Access

The web interface is responsive and works on mobile devices:
1. Connect to same WiFi network as ESP8266
2. Open browser to ESP8266 IP address
3. Bookmark for easy access
4. Use browser "Add to Home Screen" for app-like experience

## 🔄 Updates and Maintenance

### Firmware Updates
1. Modify Arduino code as needed
2. Upload new code to ESP8266
3. Test all functions
4. Update web interface if needed

### Hardware Maintenance
- Clean soil sensor regularly
- Check pump for debris
- Inspect wiring for damage
- Replace batteries if using battery power

## 📞 Support

If you encounter issues:
1. Check this guide first
2. Verify all connections
3. Test components individually
4. Check serial monitor for error messages
5. Review code for typos or incorrect pin assignments
