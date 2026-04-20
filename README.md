# 🌿 AI-Based Indoor Air Quality Monitoring & Control System

## 🚀 Overview
An intelligent IoT-based system designed to **monitor, analyze, and control indoor air quality in real time**.  
The system integrates multiple environmental sensors with a web-based dashboard and automated control logic to maintain healthy indoor conditions.

## 🧠 Key Features
- 📡 Real-time air quality monitoring
- 🌡️ Temperature & humidity tracking (DHT11)
- 🧪 Gas detection (MQ135)
- 🌫️ PM2.5 particulate monitoring
- 📊 Live dashboard with modern UI (React)
- 🔄 Real-time data updates (FastAPI backend)
- 🎛️ Fan control system (manual toggle)
- ⏱️ Time-series data visualization (graphs)
- ⚡ Scalable architecture (ready for ESP32 integration)
  
## 📊 Air Quality Classification

| PM2.5 Value | Status      | Meaning |
|------------|------------|--------|
| 0 – 50     | 🟢 Good     | Safe air quality |
| 51 – 100   | 🟡 Moderate | Acceptable but not ideal |
| >100       | 🔴 Hazardous| Harmful, requires action |

## ⚙️ Tech Stack

### 🖥️ Frontend
- React (Vite)
- Recharts (for visualization)
- CSS (custom UI)

### ⚙️ Backend
- FastAPI (Python)
- REST API architecture

### 📡 Hardware (Planned / Integrated)
- ESP32 Microcontroller
- DHT11 Sensor
- MQ135 Gas Sensor
- PM2.5 Sensor

## 🔄 How It Works

1. Sensors collect environmental data
2. ESP32 sends data to backend (simulated currently)
3. Backend processes & stores latest readings
4. Frontend fetches data every 2 seconds
5. Dashboard displays:
   - Live sensor values
   - Air quality status
   - Graph trends
6. User can control fan via dashboard.
