---
title: SpaceGuard
emoji: 🛰️
colorFrom: blue
colorTo: indigo
sdk: docker
app_port: 7860
pinned: false
---

# SpaceGuard: Intelligent Anomaly Detection for Spacecraft

SpaceGuard is a platform built to monitor spacecraft health by detecting unusual patterns in telemetry data. It was designed to bridge the gap between complex deep learning models and the practical needs of mission operators, providing clear insights into system behavior when it matters most.

## Purpose and Key Features

The project focuses on making spacecraft data more actionable. Here is a breakdown of what the system does.

### Core Intelligence
The system uses an LSTM Autoencoder to learn the normal behavior of spacecraft sensors. By understanding what "normal" looks like, it can identify subtle deviations that might signal a problem.
- **Adaptive Limits**: Instead of using fixed thresholds, the system uses the Peak-Over-Threshold algorithm to adjust to changing conditions.
- **Incident Categorization**: Anomalies are classified as Info, Warning, or Critical based on how much they deviate from expected patterns.
- **Insights into Causes**: Using feature attribution, the system highlights which specific sensors contributed to an alert, helping operators understand the "why" behind an anomaly.

### Security and Access
Security was a priority during development to ensure that mission data remains protected.
- **Verified Access**: Secure login using JSON Web Tokens ensures only authorized personnel can access the terminal.
- **Roles and Permissions**: Built-in support for different user levels, such as Admin and Operator.
- **Audit Trails**: Every significant event and detection is logged in a structured format for later review.

### Human-Centric Interface
The dashboard was designed to provide high situational awareness without overwhelming the user.
- **Real-time Feedback**: The interface reacts to threats with visual cues like radar pulses and theme shifts.
- **Performance Analytics**: A dedicated view for reviewing model health, training loss, and historical detection rates.

## Technical Details
The system is built on a modern stack for both performance and reliability.
- **Backend**: Python, Flask, and TensorFlow handle the heavy lifting of data processing and model inference.
- **Frontend**: A responsive React interface built with Vite and Framer Motion for smooth, interactive feedback.
- **Deployment**: Configured with Docker for consistent environments.

## Getting Started

### Prerequisites
You will need Python 3.9 or higher and Node.js 18 or higher installed on your machine.

### Installation Steps

1. **Get the code**
   ```bash
   git clone https://github.com/Kavya-M-Injineri/Space-Guide.git
   cd Space-Guide
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r ../requirements.txt
   python app.py
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Accessing the Terminal
Use these credentials for the initial login:
- **Service ID**: admin
- **Access Key**: alpha9

### Manual Deployment (Hugging Face CLI)
If you cannot connect GitHub directly, you can push the code directly to Hugging Face:

1. **Create the Space**: Go to Hugging Face, create a New Space, and select **Docker** as the SDK.
2. **Add the Remote**: Run these commands in your local project terminal:
   ```bash
   git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME
   ```
3. **Push to HF**: 
   ```bash
   git push -f hf main
   ```
   *(When prompted, use your Hugging Face username and your **Access Token** as the password).*

## Future Goals
The project is ongoing, with plans to include better time-to-failure predictions and a more robust suite for benchmarking model performance against different neural architectures.

Mission Status: Fully Operational | Security Level: Alpha-9
