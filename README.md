# FraudGen — Synthetic Fraud Detection with Generative AI

FraudGen is an end-to-end fraud detection system that **generates synthetic transactions** and detects anomalies using **ML (GAN/VAE) + classical models**, served via **Flask APIs** with an  **React dashboard** for real-time insights. It’s designed to be **SaaS-ready** (multi-env, containerized, cloud deployable) and includes hooks for **LLM-based explainability**.

## ✨ Key Features
- **Synthetic Data Generation**: Create balanced fraud datasets (legit vs fraud) with configurable distributions.
- **Model Zoo**: Classical (Isolation Forest, XGBoost/GBDT), Autoencoders, and optional **GAN/VAE** generators.
- **REST API (Flask)**: `/predict`, `/train`, `/health` endpoints for inference and lifecycle ops.
- **React Dashboard (optional)**: Interactive charts, alert feed, score distributions, feature importances.
- **Observability**: Metrics/logs with Prometheus-style counters & structured JSON logs.
- **Cloud & DevOps Ready**: Docker, docker-compose, `.env` config, basic AWS/GCP deploy scripts.
- **LLM Explainability (optional)**: Summarize top features & rationale for a flagged transaction.

---

## 🏗️ Architecture

             ┌───────────────────────┐
             │  React Dashboard (UI) │
             │  • Alerts & Charts    │
             │  • User Interaction   │
             └──────────┬────────────┘
                        │
         HTTPS (REST APIs via Flask/FastAPI)
                        │
    ┌───────────────────┴────────────────────┐
    │              API Layer                 │
    │  • /train → model training             │
    │  • /predict → fraud detection          │
    │  • /generate → synthetic data          │
    │  • /explain → LLM explanations         │
    └───────────────────┬────────────────────┘
                        │
     ┌──────────────────┴────────────────────┐
     │               Services                │
     │  • Data Generator (GAN/VAE, rules)    │
     │  • ML Model Zoo (Isolation Forest,    │
     │    Autoencoder, XGBoost, GAN, VAE)    │
     │  • LLM Explainer                      │
     └──────────────────┬────────────────────┘
                        │
     ┌──────────────────┴────────────────────┐
     │              Database                 │
     │ • PostgreSQL/MySQL (transactions,     │
     │   predictions, models)                │
     │ • SQLite for local dev                │
     └──────────────────┬────────────────────┘
                        │
     ┌──────────────────┴────────────────────┐
     │         Storage & Deployment          │
     │  • Model Artifacts → Local/S3/GCS     │
     │  • Dockerized Services                │
     │  • CI/CD → AWS ECS/EKS or GCP GKE     │
     └───────────────────────────────────────┘

- **Storage**: PostgreSQL/MySQL for datasets & predictions (SQLite allowed in dev).
- **Artifacts**: Models logged to `./artifacts/` (or S3/GCS).
- **Config**: `.env` governs DB, model type, thresholds, API keys.

---

## 🧰 Tech Stack
**Backend**: Python, Flask, FastAPI (optional), scikit-learn, PyTorch/TF (for AE/GAN/VAE)  
**Frontend**: React + Vite (or CRA), Recharts/Plotly  
**Data**: Pandas, NumPy, PostgreSQL/MySQL (SQLAlchemy)  
**DevOps**: Docker, docker-compose, Makefile, Gunicorn, Nginx (optional), AWS

---

## 🚀 Quick Start

### 1) Clone & set up
```bash
git clone https://github.com/bhumiti28/FraudGen.git
cd FraudGen
cp .env.example .env   # edit values inside


