# Smart Crop Predictor - IoT Agriculture Platform

An AI-powered agricultural intelligence platform with IoT integration for smart farming, crop prediction, and automated irrigation control.

## 🌟 Features

- **AI Crop Prediction**: ML-based crop recommendations with market analysis
- **IoT Hardware Integration**: Real-time sensor monitoring and control
- **Soil Analysis**: Comprehensive soil quality assessment
- **Weather Integration**: Live weather data and alerts
- **Automated Irrigation**: NodeMCU-based pump control via Blynk Cloud
- **Market Intelligence**: Real-time crop prices and profit analysis

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS
- **IoT**: ESP8266 NodeMCU + Blynk Cloud
- **Hardware**: Soil moisture sensor, water pump, 16x2 LCD display
- **APIs**: OpenWeatherMap, Blynk Cloud API

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Arduino IDE** (for hardware programming)
- **ESP8266 NodeMCU** and components
- **Blynk Cloud account** (free)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/corp-2.0.git
cd corp-2.0
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env` file in the project root:

```bash
# Blynk Cloud Token (get from Blynk app)
VITE_BLYNK_TOKEN=your_blynk_auth_token_here

# Optional: OpenWeatherMap API Key
VITE_WEATHER_API_KEY=your_weather_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

### 5. Build for Production

```bash
npm run build
# or
yarn build
```

## 🔧 Hardware Setup

### Required Components

- ESP8266 NodeMCU
- Soil moisture sensor (capacitive)
- 5V Relay module
- 12V Water pump
- 16x2 LCD display (I2C)
- Power supply (5V/2A)
- Jumper wires

### Wiring Connections

| ESP8266 Pin | Component | Connection |
|-------------|-----------|------------|
| 3V3 | Soil Sensor VCC | Power |
| GND | Soil Sensor GND | Ground |
| A0 | Soil Sensor Signal | Analog Input |
| 5V | Relay VCC | Power |
| GND | Relay GND | Ground |
| D3 | Relay IN | Control Signal |
| 3V3 | LCD VCC | Power |
| GND | LCD GND | Ground |
| D2 | LCD SDA | Data |
| D1 | LCD SCL | Clock |

### Arduino Setup

1. **Install ESP8266 Board Package**:
   - Open Arduino IDE
   - Go to File → Preferences
   - Add URL: `http://arduino.esp8266.com/stable/package_esp8266com_index.json`
   - Tools → Board → Boards Manager → Install "ESP8266"

2. **Install Required Libraries**:
   - `LiquidCrystal_I2C` by Frank de Brabander
   - `ArduinoJson` by Benoit Blanchon
   - `WebSockets` by Markus Sattler

3. **Upload Code**:
   - Open `arduino_code/blynk_irrigation_system/blynk_irrigation_system.ino`
   - Update WiFi credentials in the code
   - Update `BLYNK_AUTH_TOKEN` with your token
   - Select Board: "NodeMCU 1.0 (ESP-12E Module)"
   - Upload to your ESP8266

## 🌐 Blynk Cloud Configuration

### 1. Create Blynk Account

1. Visit [blynk.cloud](https://blynk.cloud)
2. Create a free account
3. Create a new template

### 2. Setup Virtual Pins

Configure these virtual pins in your Blynk template:

- **V0**: Soil Moisture Sensor (read-only)
- **V1**: Manual Pump Control (0/1)
- **V2**: Auto Mode Toggle (0/1)

### 3. Get Auth Token

1. In Blynk app/console, go to your device
2. Copy the Auth Token
3. Add it to your `.env` file and Arduino code

## 📱 Usage Guide

### Web Application

1. **Access the Platform**: Open `http://localhost:5173`

2. **Configure Hardware**:
   - Enter your Blynk token in "Blynk Controls"
   - Verify device shows "Online" status

3. **Select Location**: Click on the weather map to set farm location

4. **Choose Crop**: Select from 40+ crops with real harvest data

5. **Enter Farm Details**: Provide farm size, soil type, etc.

6. **Soil Analysis**: Input soil test results

7. **View Predictions**: Get AI-powered crop recommendations with:
   - Survival probability
   - Expected yield
   - Market value
   - Harvest timeline
   - Risk factors
   - Profit analysis

### Hardware Control

1. **Soil Monitoring**: Real-time moisture readings from V0
2. **Pump Control**: 
   - Manual: Toggle V1 for immediate control
   - Auto: Enable V2 for automatic watering based on moisture threshold
3. **LCD Display**: Shows current moisture and pump status

## 🗂️ Project Structure

```
corp-2.0/
├── src/
│   ├── components/          # React components
│   │   ├── BlynkControls.tsx
│   │   ├── CropPrediction.tsx
│   │   ├── HardwareDashboard.tsx
│   │   └── ...
│   ├── data/
│   │   └── crops.ts        # Crop database with 40+ crops
│   └── types/
│       └── index.ts        # TypeScript definitions
├── arduino_code/
│   └── blynk_irrigation_system/
│       └── blynk_irrigation_system.ino
├── docs/
│   ├── CONNECTION_DIAGRAM.md
│   ├── HARDWARE_SETUP.md
│   └── QUICK_START.md
└── README.md
```

## 🚨 Troubleshooting

### Common Issues

**Device Shows Offline**:
- Verify Blynk token matches in both web app and Arduino code
- Check WiFi connection on NodeMCU
- Ensure device is online in Blynk console

**Soil Sensor Reads 0%**:
- Check wiring connections
- Verify sensor power supply
- Use calibration controls in the UI
- Test with different ADC max values

**Pump Not Responding**:
- Ensure Auto Mode (V2) is OFF for manual control
- Check relay wiring and power supply
- Verify pump connections

**Web App Not Loading**:
- Check if development server is running
- Verify all dependencies are installed
- Check browser console for errors

## 📊 Crop Database

The platform includes comprehensive data for 40+ crops:

- **Fruits**: Apple, Banana, Mango, Grapes, Pomegranate, etc.
- **Vegetables**: Tomato, Potato, Onion, Carrot, etc.
- **Grains**: Wheat, Rice, Corn, Barley
- **Pulses**: Chickpea, Lentil, Black Gram, Green Gram

Each crop includes:
- Accurate harvest days (from your agricultural data)
- Market prices (₹/kg)
- Soil requirements
- Growing seasons
- Temperature ranges

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Blynk Cloud for IoT connectivity
- OpenWeatherMap for weather data
- Indian agricultural data sources for crop information
- ESP8266 community for hardware support

## 📞 Support

For support and questions:
- Check the documentation in `/docs` folder
- Review troubleshooting section above
- Open an issue on GitHub
- Contact: [your-email@example.com]

---

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned

**Happy Farming! 🌱**