# Deployment Architecture

## Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Google Cloud Platform                    │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Compute Engine VM Instance                 │ │
│  │              (Ubuntu 22.04 LTS)                         │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Nginx Reverse Proxy (Port 80/443)               │  │ │
│  │  │  - SSL/TLS Termination                            │  │ │
│  │  │  - Static File Caching                            │  │ │
│  │  │  - Request Forwarding                             │  │ │
│  │  └─────────────────┬────────────────────────────────┘  │ │
│  │                    │                                     │ │
│  │                    ▼                                     │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Docker Container (Next.js App)                   │  │ │
│  │  │  - Port: 3000                                     │  │ │
│  │  │  - Node.js 20 Alpine                              │  │ │
│  │  │  - Standalone Output                              │  │ │
│  │  │  - Auto-restart                                   │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Systemd Service                                  │  │ │
│  │  │  - Auto-start on boot                             │  │ │
│  │  │  - Manages Docker Compose                         │  │ │
│  │  └──────────────────────────────────────────────────┘  │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │   Internet      │
                     │   Users         │
                     └─────────────────┘
```

## Components

### 1. Google Cloud VM
- **OS**: Ubuntu 22.04 LTS
- **Recommended Size**: e2-small (2 GB RAM, 2 vCPUs)
- **Disk**: 20 GB SSD
- **Region**: europe-west2 (London)

### 2. Nginx Reverse Proxy
- **Purpose**: Handle SSL, static files, and proxy requests
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Features**:
  - SSL/TLS termination with Let's Encrypt
  - Request forwarding to Node.js app
  - Static file caching
  - Security headers

### 3. Docker Container
- **Image**: Custom Next.js standalone build
- **Base**: Node.js 20 Alpine Linux
- **Port**: 3000 (internal)
- **Features**:
  - Multi-stage build for optimization
  - Health checks
  - Auto-restart policy
  - Minimal attack surface

### 4. Next.js Application
- **Framework**: Next.js 16
- **Runtime**: Node.js 20
- **Build**: Standalone output (optimized)
- **Features**:
  - Server-side rendering
  - Static generation
  - API routes (if needed)

## Traffic Flow

1. **User Request** → DNS resolves to VM IP
2. **Nginx (Port 80/443)** → Receives request
3. **SSL Termination** → Decrypts HTTPS traffic
4. **Proxy Pass** → Forwards to localhost:3000
5. **Docker Container** → Processes request
6. **Next.js App** → Generates response
7. **Response Path** → Back through Nginx to user

## Security Layers

```
Layer 1: Google Cloud Firewall
  ├─ Allow: SSH (22), HTTP (80), HTTPS (443)
  └─ Deny: All other ports

Layer 2: UFW (Ubuntu Firewall)
  ├─ Allow: SSH (22), HTTP (80), HTTPS (443)
  └─ Deny: All other ports

Layer 3: Nginx
  ├─ SSL/TLS encryption
  ├─ Rate limiting (optional)
  └─ Security headers

Layer 4: Docker Container
  ├─ Isolated environment
  ├─ Non-root user
  └─ Minimal dependencies

Layer 5: Next.js App
  ├─ Input validation
  ├─ CSRF protection
  └─ Security headers
```

## Monitoring & Logging

```
Application Logs
  └─ docker-compose logs -f

Nginx Logs
  ├─ Access: /var/log/nginx/access.log
  └─ Error: /var/log/nginx/error.log

System Logs
  └─ journalctl -u urbancodestudio.service

Container Stats
  └─ docker stats
```

## Backup Strategy

```
Daily Backup
  ├─ Application Code: Git repository
  ├─ Configuration: /opt/urbancodestudio
  └─ Nginx Config: /etc/nginx/sites-available/

Weekly Backup
  └─ Full VM snapshot (Google Cloud)

Monthly Backup
  └─ Offsite backup to Cloud Storage
```

## Scaling Options

### Vertical Scaling (Current Setup)
- Upgrade VM size (e2-small → e2-medium → e2-standard)
- Increase disk space
- Add more RAM/CPU

### Horizontal Scaling (Future)
- Load balancer + multiple VMs
- Cloud Run or GKE for container orchestration
- CDN for static assets (Cloudflare, Cloud CDN)

## Cost Breakdown (Estimated Monthly)

```
Component                  Cost (USD/month)
─────────────────────────────────────────
e2-small VM (London)       ~$15-20
Standard Disk (20 GB)      ~$2
Network Egress (1 GB)      ~$0.12
SSL Certificate (Let's)    Free
─────────────────────────────────────────
Total                      ~$17-22/month
```

### Free Tier Option
- e2-micro instance (0.25-1 GB RAM)
- First 30 GB egress free
- Cost: ~$0-5/month (within free tier)

## Performance Optimization

1. **Next.js Standalone Output**
   - Minimal bundle size
   - Fast cold starts
   - Reduced memory usage

2. **Docker Multi-stage Build**
   - Smaller image size
   - Faster deployments
   - Better caching

3. **Nginx Caching**
   - Static asset caching
   - Reduced app server load
   - Faster response times

4. **CDN (Optional)**
   - Cloudflare or Google Cloud CDN
   - Global edge caching
   - DDoS protection

## Deployment Process

```
┌─────────────────┐
│  Git Push       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  SSH to VM      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  git pull       │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  ./deploy.sh    │
└────────┬────────┘
         │
         ├─ Stop containers
         ├─ Build new image
         ├─ Start containers
         └─ Health check
         │
         ▼
┌─────────────────┐
│  Live! 🚀       │
└─────────────────┘
```

## High Availability Setup (Optional)

For mission-critical deployments:

```
┌──────────────────────────┐
│  Google Cloud Load       │
│  Balancer                │
└────────┬─────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────┐   ┌─────┐
│ VM1 │   │ VM2 │
└─────┘   └─────┘
    │         │
    └────┬────┘
         │
         ▼
┌──────────────────────────┐
│  Cloud SQL / Shared DB   │
└──────────────────────────┘
```

## Maintenance Schedule

**Daily**
- Check application logs
- Monitor disk space
- Review error rates

**Weekly**
- Security updates
- Docker cleanup
- Backup verification

**Monthly**
- Full system update
- SSL certificate renewal check
- Performance review

---

**Last Updated**: February 2026
