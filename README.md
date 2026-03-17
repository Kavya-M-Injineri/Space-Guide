# SpaceGuard — Spacecraft Anomaly Detection Platform  

An intelligent telemetry monitoring system that uses an **LSTM Autoencoder** to detect anomalies in spacecraft sensor data — with adaptive thresholding, feature-level attribution, role-based access control, and a real-time React dashboard. Deployed on Hugging Face Spaces via Docker.

---

## Highlights

- Trained an **LSTM Autoencoder** to model normal spacecraft sensor behavior, flagging anomalies based on reconstruction error — enabling detection of subtle, gradual deviations that fixed-threshold systems miss
- Implemented **Peak-Over-Threshold (POT) adaptive thresholding** — limits self-adjust to changing sensor baselines, reducing false positives in dynamic operating conditions
- Built **feature attribution** into the anomaly pipeline — identifies which specific sensors contributed most to each alert, giving operators actionable "why" alongside the detection
- Designed a **3-tier incident classification system** (Info / Warning / Critical) based on deviation magnitude, enabling priority-based operator response
- Implemented **JWT authentication with RBAC** (Admin / Operator roles), structured audit logging for every detection event, and access-controlled API routes
- Deployed as a **Dockerized Hugging Face Space** with a React + Framer Motion frontend featuring real-time visual threat indicators (radar pulses, theme shifts on alert)

---

## Tech Stack

| Layer | Technology |
|---|---|
| ML Model | TensorFlow, Keras (LSTM Autoencoder) |
| Anomaly Thresholding | Peak-Over-Threshold (POT) algorithm |
| Backend | Python, Flask |
| Auth | JWT + RBAC (Admin / Operator) |
| Frontend | React, Vite, Framer Motion |
| Deployment | Docker, Hugging Face Spaces |

---

## Model Design

- **Architecture:** LSTM Autoencoder — encoder compresses temporal sensor sequences, decoder reconstructs them; high reconstruction error signals anomaly
- **Thresholding:** POT dynamically sets alert boundaries from the tail distribution of reconstruction errors
- **Attribution:** Per-feature reconstruction error breakdown highlights which sensors triggered the alert
- **Severity:** Deviation magnitude mapped to Info / Warning / Critical tiers

---

## Setup

### Prerequisites
- Python 3.9+, Node.js 18+

### Backend
```bash
git clone https://github.com/Kavya-M-Injineri/Space-Guide.git
cd Space-Guide/backend
pip install -r ../requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Default Credentials
| Field | Value |
|---|---|
| Service ID | `admin` |
| Access Key | `alpha9` |

---

## Deploy to Hugging Face Spaces

```bash
# Add HF remote
git remote add hf https://huggingface.co/spaces/YOUR_USERNAME/YOUR_SPACE_NAME

# Push (use HF Access Token as password when prompted)
git push -f hf main
```

Space SDK: **Docker** · App port: **7860**

---

## Project Structure

```
├── backend/
│   ├── app.py              # Flask API — inference, auth, logging
│   ├── model/              # LSTM Autoencoder + POT thresholder
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/     # Dashboard, radar display, alert panels
│       └── contexts/       # Auth + alert state
├── Dockerfile
└── requirements.txt
```

---

## Roadmap

- Time-to-failure prediction using remaining useful life (RUL) estimation
- Multi-architecture benchmarking (LSTM vs Transformer vs CNN Autoencoder)
- Improved anomaly clustering for pattern-based incident grouping
-
