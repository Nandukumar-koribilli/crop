# Hardware Connection Diagram

## 🔌 Complete Wiring Guide

### ESP8266 NodeMCU Pinout
```
                    ESP8266 NodeMCU
    ┌─────────────────────────────────────────┐
    │  [1] 3V3    [2] GND                     │
    │  [3] EN     [4] GPIO16 (D0)             │
    │  [5] GPIO4  [6] GPIO0  (D3)             │
    │  [7] GPIO5  [8] GPIO2  (D4)             │
    │  [9] GPIO18 [10] GPIO15 (D8)            │
    │  [11] GPIO19[12] GPIO13 (D7)            │
    │  [13] GPIO23[14] GPIO12 (D6)            │
    │  [15] GPIO22[16] GPIO14 (D5)            │
    │  [17] TX    [18] RX                     │
    │  [19] GPIO21[20] GPIO3  (D9)            │
    │  [21] GPIO17[22] GPIO1  (D10)           │
    │  [23] GPIO16[24] GPIO3  (D9)            │
    │  [25] GPIO4 [26] GPIO0  (D3)            │
    │  [27] GPIO5 [28] GPIO2  (D4)            │
    │  [29] GPIO18[30] GPIO15 (D8)            │
    └─────────────────────────────────────────┘
```

## 📋 Component Connections

### 1. Soil Moisture Sensor
```
Soil Moisture Sensor    ESP8266 NodeMCU
┌─────────────────┐     ┌──────────────┐
│ VCC             │────▶│ 3V3          │
│ GND             │────▶│ GND          │
│ Signal (A0)     │────▶│ A0           │
└─────────────────┘     └──────────────┘
```

### 2. Relay Module
```
Relay Module            ESP8266 NodeMCU
┌─────────────────┐     ┌──────────────┐
│ VCC             │────▶│ 5V           │
│ GND             │────▶│ GND          │
│ IN              │────▶│ GPIO5 (D1)   │
└─────────────────┘     └──────────────┘
```

### 3. 16x2 LCD Display (I2C)
```
LCD Display (I2C)       ESP8266 NodeMCU
┌─────────────────┐     ┌──────────────┐
│ VCC             │────▶│ 3V3          │
│ GND             │────▶│ GND          │
│ SDA             │────▶│ GPIO4 (D2)   │
│ SCL             │────▶│ GPIO5 (D3)   │
└─────────────────┘     └──────────────┘
```

### 4. Water Pump
```
Water Pump              Relay Module
┌─────────────────┐     ┌──────────────┐
│ Positive (+)    │────▶│ NO (Normally │
│                 │     │  Open)       │
│ Negative (-)    │────▶│ COM (Common) │
└─────────────────┘     └──────────────┘

Power Supply            Relay Module
┌─────────────────┐     ┌──────────────┐
│ 12V Positive    │────▶│ VCC          │
│ 12V Negative    │────▶│ GND          │
└─────────────────┘     └──────────────┘
```

## 🔌 Complete Wiring Diagram

```
                    ESP8266 NodeMCU
    ┌─────────────────────────────────────────┐
    │  [1] 3V3    [2] GND                     │
    │  [3] EN     [4] GPIO16 (D0)             │
    │  [5] GPIO4  [6] GPIO0  (D3)             │
    │  [7] GPIO5  [8] GPIO2  (D4)             │
    │  [9] GPIO18 [10] GPIO15 (D8)            │
    │  [11] GPIO19[12] GPIO13 (D7)            │
    │  [13] GPIO23[14] GPIO12 (D6)            │
    │  [15] GPIO22[16] GPIO14 (D5)            │
    │  [17] TX    [18] RX                     │
    │  [19] GPIO21[20] GPIO3  (D9)            │
    │  [21] GPIO17[22] GPIO1  (D10)           │
    │  [23] GPIO16[24] GPIO3  (D9)            │
    │  [25] GPIO4 [26] GPIO0  (D3)            │
    │  [27] GPIO5 [28] GPIO2  (D4)            │
    │  [29] GPIO18[30] GPIO15 (D8)            │
    └─────────────────────────────────────────┘
            │
            │
    ┌───────┼───────┐
    │       │       │
    ▼       ▼       ▼
┌─────┐ ┌─────┐ ┌─────┐
│Soil │ │Relay│ │ LCD │
│Sensor│ │     │ │     │
└─────┘ └─────┘ └─────┘
    │       │
    │       ▼
    │   ┌─────┐
    │   │Pump │
    │   └─────┘
    │
    ▼
┌─────┐
│Power│
│Supply│
└─────┘
```

## 🔧 Step-by-Step Connection

### Step 1: Power Connections
1. Connect ESP8266 3V3 to breadboard positive rail
2. Connect ESP8266 GND to breadboard negative rail
3. Connect 5V power supply to breadboard (for relay)

### Step 2: Soil Moisture Sensor
1. Connect sensor VCC to 3V3 rail
2. Connect sensor GND to GND rail
3. Connect sensor Signal to A0 pin

### Step 3: Relay Module
1. Connect relay VCC to 5V rail
2. Connect relay GND to GND rail
3. Connect relay IN to GPIO5 (D1)

### Step 4: LCD Display
1. Connect LCD VCC to 3V3 rail
2. Connect LCD GND to GND rail
3. Connect LCD SDA to GPIO4 (D2)
4. Connect LCD SCL to GPIO5 (D3)

### Step 5: Water Pump
1. Connect pump positive to relay NO terminal
2. Connect pump negative to relay COM terminal
3. Connect 12V power supply to relay VCC/GND

## ⚠️ Important Notes

### Power Requirements
- ESP8266: 3.3V (can be powered via USB)
- Relay Module: 5V
- LCD Display: 3.3V
- Water Pump: 12V (check pump specifications)

### Safety Precautions
- Always disconnect power before making connections
- Double-check all connections before powering on
- Use appropriate wire gauges for power connections
- Ensure proper grounding
- Keep water away from electrical components

### Testing Sequence
1. Upload I2C scanner code first
2. Upload sensor test code
3. Test individual components
4. Upload main smart farm code
5. Test web interface

### Common Issues
- **LCD not working**: Check I2C address (usually 0x27 or 0x3F)
- **Relay not switching**: Check power supply and connections
- **Sensor readings wrong**: Calibrate sensor values
- **WiFi not connecting**: Check credentials and signal strength

## 📱 Mobile Access
Once connected, access the system via:
- Web browser: `http://[ESP8266_IP_ADDRESS]`
- Mobile app: Bookmark the web interface
- Remote access: Port forward router settings

## 🔄 Troubleshooting
1. Check all connections with multimeter
2. Verify power supply voltages
3. Test components individually
4. Check Serial Monitor for error messages
5. Ensure proper grounding
6. Verify WiFi credentials
