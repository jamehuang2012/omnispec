# Quick Start Guide - Docker Setup

## 🚀 Fast Start (3 Steps)

### 1. Create Required Files

Create these files in your project root:

**Dockerfile** - Already provided above

**package.json** - Already provided above

**.dockerignore** - Already provided above

**docker-compose.yml** - Already provided above

### 2. Build and Run

```bash
# Option A: Using Docker Compose (Easiest)
docker-compose up -d

# Option B: Using Docker Commands
docker build -t payment-spec-demo .
docker run -d -p 3000:3000 --name payment-spec-demo payment-spec-demo
```

### 3. Access

Open browser: **http://localhost:3000**

---

## ⚡ Common Commands

```bash
# View logs
docker-compose logs -f

# Stop
docker-compose down

# Restart
docker-compose restart

# Rebuild
docker-compose up --build -d
```

---

## 📁 Required Project Structure

```
your-project/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── package.json
├── server.js
└── public/
    ├── index.html
    ├── css/
    │   └── styles.css
    └── js/
        ├── app.js
        └── data.js
```

---

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Change port in docker-compose.yml
ports:
  - "8080:3000"  # Use port 8080 instead
```

**Container won't start?**
```bash
docker logs payment-spec-demo
```

**Need to rebuild from scratch?**
```bash
docker-compose down --volumes --rmi all
docker-compose up --build -d
```

---

## ✅ Verify Installation

```bash
# Check if container is running
docker ps

# Test the application
curl http://localhost:3000

# Check health
docker inspect --format='{{.State.Health.Status}}' payment-spec-demo
```

---

## 🎯 Next Steps

1. Access: http://localhost:3000
2. Try the Request tab
3. Generate and validate JSON payloads
4. Explore the Response tab

---

## 💡 Pro Tips

- Use `docker-compose` for easier management
- Check logs frequently: `docker-compose logs -f`
- Health check runs automatically every 30 seconds
- The app auto-restarts unless explicitly stopped

---

## 🔧 Custom Configuration

**Change Port:**
```bash
docker run -d -p 8080:3000 --name payment-spec-demo payment-spec-demo
```

**Set Environment Variables:**
```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=development \
  --name payment-spec-demo \
  payment-spec-demo
```

---

## 📚 Full Documentation

See the complete Docker Build & Run Instructions document for advanced options, production deployment, and Kubernetes setup.