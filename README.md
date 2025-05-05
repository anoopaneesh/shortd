# shortd - Scalable URL Shortener

A high-performance, microservices-based URL shortener capable of handling millions of requests daily. Built with **React.js**, **Node.js**, **Redis**, **MongoDB**, **Kafka**, and **Docker**, this project offers real-time analytics, authentication, and blazing-fast redirection.

## 🚀 Features

- ⚡ **Blazing Fast Redirection** — Redis caching cuts URL lookup times by up to 80%.
- 🔐 **User Authentication** — JWT-based auth with email verification to secure API endpoints.
- 📈 **Real-Time Analytics** — Kafka-powered pipeline tracks click events, geo-location, device types, and more.
- 🧩 **Microservices Architecture** — Independent, containerized services for better scalability and maintainability.
- 🌐 **Modern UI** — Responsive React-based frontend for URL management and user dashboard.

---

## 🧱 Tech Stack

| Component       | Technology                |
|----------------|---------------------------|
| Frontend       | React.js                  |
| API Gateway    | Node.js (Express/NestJS)  |
| Database       | MongoDB                   |
| Cache          | Redis                     |
| Messaging      | Kafka + Apache Zookeeper  |
| Auth           | JWT, Email Verification   |
| Containerization | Docker + Docker Compose |

---

## 📂 Project Structure

shortd/
├── email-service/ # Handles email verification
├── analytics-service/ # Tracks and stores real-time click events
├── shortd-service/ # Core shortening logic and user APIs
├── shortd-ui/ # React frontend
├── docker-compose.yml # Multi-service orchestration
├── init.sh # Bootstrap script for setup
└── README.md # This file



---

## 🛠️ Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js (for local development/testing)
- Kafka & Zookeeper (or use Dockerized version)

### Run Locally with Docker Compose

```bash
# Start all services
./init.sh
```

```
docker compose up
```
---
## 🧪 Features in Detail

### 🔗 URL Shortening

- Generates unique, compact short links.
- Ensures each user can only shorten a limited number of URLs (if rate-limiting is enabled).
- Validates URLs before shortening.
- Handles high concurrency with horizontal scalability.

### 📊 Analytics

- Built with **Kafka** for real-time event streaming.
- Captures and stores the following data on each URL click:
  - Timestamp of access
  - IP-based geo-location
  - Browser and device information (user-agent parsing)
- Data is stored in a queryable format for reporting and dashboards.

### 🔐 Authentication & Authorization

- Users can register and log in using email + password.
- Email verification required for account activation.
- API access is protected using **JWT access tokens**.
- Optional support for refresh tokens and role-based access.

### 🚀 Performance & Optimization

- **Redis** used to cache URL mappings, reducing MongoDB hits.
- Cached entries expire based on LRU or TTL strategy.
- Load-tested to handle millions of redirection requests per day.

### 🧩 Microservices

- Services are fully containerized and orchestrated via **Docker Compose**.
- Each service (UI, API, Email, Analytics) can be scaled independently.
- Communication between services is decoupled and event-driven via **Kafka**.
---
## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).


## 📬 Contact

Created by [Anoop P K](https://github.com/anoopaneesh)  
Feel free to reach out via [pk.anoop@outlook.com](mailto:pk.anoop@outlook.com) or connect on [LinkedIn](https://www.linkedin.com/in/anoop-pk)




