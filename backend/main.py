from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI

import random

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (for now)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_store = []

@app.get("/")
def home():
    return {"message": "Backend running"}

import time   

@app.get("/data")
def get_data():
    new_data = {
        "time": time.strftime("%H:%M:%S"),   
        "temperature": random.randint(25, 35),
        "humidity": random.randint(50, 70),
        "gas": random.randint(150, 300),
        "pm25": random.randint(30, 120)
    }

    data_store.append(new_data)

    if len(data_store) > 20:
        data_store.pop(0)

    return data_store

fan_state = {"status": "OFF"}

@app.get("/control")
def control_fan(action: str):
    if action == "toggle":
        fan_state["status"] = "ON" if fan_state["status"] == "OFF" else "OFF"

    return fan_state

@app.get("/fan")
def get_fan():
    return fan_state