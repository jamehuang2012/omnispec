# Docker Build & Run Instructions

## Prerequisites

- Docker installed on your system ([Download Docker](https://www.docker.com/get-started))
- Docker Compose (usually included with Docker Desktop)

## Project Structure

```
payment-spec-demo/
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

## Method 1: Using Docker Commands

### Build the Docker Image

```bash
# Build the image with a tag
docker build -t payment-spec-demo:latest .

# Build with a specific tag version
docker build -t payment-spec-demo:1.0.0 .
```

### Run the Container

```bash
# Run the container
docker run -d \
  --name payment-spec-demo \
  -p 3000:3000 \
  payment-spec-demo:latest

# Run with environment variables
docker run -d \
  --name payment-spec-demo \
  -p 3000:3000 \
  -e PORT=3000 \
  -e HOST=0.0.0.0 \
  payment-spec-demo:latest
```

### Access the Application

Open your browser and navigate to:
- **Local**: http://localhost:3000
- **Network**: http://YOUR_IP_ADDRESS:3000

### Container Management

```bash
# View running containers
docker ps

# View logs
docker logs payment-spec-demo

# Follow logs in real-time
docker logs -f payment-spec-demo

# Stop the container
docker stop payment-spec-demo

# Start the container
docker start payment-spec-demo

# Restart the container
docker restart payment-spec-demo

# Remove the container
docker rm payment-spec-demo

# Remove the image
docker rmi payment-spec-demo:latest
```

## Method 2: Using Docker Compose (Recommended)

### Start the Application

```bash
# Build and start in detached mode
docker-compose up -d

# Build and start with logs
docker-compose up --build

# Force rebuild
docker-compose up --build --force-recreate
```

### Stop the Application

```bash
# Stop containers
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove containers, volumes, and images
docker-compose down --volumes --rmi all
```

### View Logs

```bash
# View logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# View logs for specific service
docker-compose logs -f payment-spec-demo
```

### Other Docker Compose Commands

```bash
# Restart the service
docker-compose restart

# View running services
docker-compose ps

# Execute command in running container
docker-compose exec payment-spec-demo sh
```

## Advanced Options

### Build with Different Port

Edit `docker-compose.yml`:

```yaml
ports:
  - "8080:3000"  # Map host port 8080 to container port 3000
```

Or use environment variable:

```bash
docker run -d \
  --name payment-spec-demo \
  -p 8080:3000 \
  payment-spec-demo:latest
```

### Build Multi-Platform Image

```bash
# Build for multiple platforms (requires buildx)
docker buildx build \
  --platform linux/amd64,linux/arm64 \
  -t payment-spec-demo:latest \
  .
```

### Push to Docker Registry

```bash
# Tag the image
docker tag payment-spec-demo:latest your-registry.com/payment-spec-demo:latest

# Login to registry
docker login your-registry.com

# Push the image
docker push your-registry.com/payment-spec-demo:latest
```

## Health Check

The Docker image includes a health check that runs every 30 seconds:

```bash
# Check container health status
docker inspect --format='{{.State.Health.Status}}' payment-spec-demo

# View health check logs
docker inspect --format='{{json .State.Health}}' payment-spec-demo | jq
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker logs payment-spec-demo

# Check if port is already in use
lsof -i :3000  # On Mac/Linux
netstat -ano | findstr :3000  # On Windows
```

### Can't access the application

```bash
# Verify container is running
docker ps

# Check container IP
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' payment-spec-demo

# Test from inside container
docker exec payment-spec-demo curl http://localhost:3000
```

### Rebuild from scratch

```bash
# Remove everything and rebuild
docker-compose down --volumes --rmi all
docker-compose build --no-cache
docker-compose up -d
```

## Production Deployment

### Using Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml payment-spec-demo

# List services
docker service ls

# Scale service
docker service scale payment-spec-demo_payment-spec-demo=3
```

### Using Kubernetes

Create `deployment.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: payment-spec-demo
spec:
  replicas: 3
  selector:
    matchLabels:
      app: payment-spec-demo
  template:
    metadata:
      labels:
        app: payment-spec-demo
    spec:
      containers:
      - name: payment-spec-demo
        image: payment-spec-demo:latest
        ports:
        - containerPort: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: payment-spec-demo
spec:
  type: LoadBalancer
  ports:
  - port: 80
    targetPort: 3000
  selector:
    app: payment-spec-demo
```

Deploy:

```bash
kubectl apply -f deployment.yaml
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | production | Node environment |
| HOST | 0.0.0.0 | Host to bind to |
| PORT | 3000 | Port to listen on |

## Docker Image Details

- **Base Image**: node:18-alpine
- **Size**: ~150MB
- **Port**: 3000
- **Health Check**: Enabled (every 30s)
- **Restart Policy**: unless-stopped

## Security Notes

- The image runs as a non-root user
- Only production dependencies are installed
- Minimal Alpine Linux base for smaller attack surface
- Health checks monitor application availability

## Support

For issues or questions:
1. Check the logs: `docker logs payment-spec-demo`
2. Verify the container is healthy: `docker ps`
3. Test locally: `curl http://localhost:3000`