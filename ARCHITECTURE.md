# Deployment Architecture

## Overview

### Architecture with Cloudflare (Recommended)

```
                      ┌─────────────────┐
                      │   Internet      │
                      │   Users         │
                      └────────┬────────┘
                               │
                               ▼
              ┌────────────────────────────────┐
              │       Cloudflare CDN           │
              │  - SSL/TLS Termination         │
              │  - DDoS Protection             │
              │  - Global Caching              │
              │  - WAF (Web App Firewall)      │
              └────────────┬───────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    VPS (Any Provider)                        │
│         Google Cloud / DigitalOcean / Linode / Vultr         │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Ubuntu 22.04 LTS Server                    │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Nginx Reverse Proxy (Port 80/443)               │  │ │
│  │  │  - Real IP Restoration (Cloudflare)              │  │ │
│  │  │  - SSL/TLS (optional for Full Strict)            │  │ │
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
```

### Architecture without Cloudflare (Direct)

```
                      ┌─────────────────┐
                      │   Internet      │
                      │   Users         │
                      └────────┬────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                    VPS (Any Provider)                        │
│                                                               │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              Ubuntu 22.04 LTS Server                    │ │
│  │                                                          │ │
│  │  ┌──────────────────────────────────────────────────┐  │ │
│  │  │  Nginx Reverse Proxy (Port 80/443)               │  │ │
│  │  │  - SSL/TLS Termination (Let's Encrypt)           │  │ │
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
```

## Components

### 1. Cloudflare (Optional but Recommended)
- **Purpose**: Global CDN, SSL/TLS, DDoS protection, and performance
- **Features**:
  - Free SSL certificates
  - Global edge caching
  - DDoS protection (unlimited)
  - Web Application Firewall (WAF)
  - Analytics and monitoring
  - Bot protection
  - HTTP/3 and Brotli compression
- **Configuration**: See [CLOUDFLARE.md](./CLOUDFLARE.md)

### 2. VPS Server
- **OS**: Ubuntu 22.04 LTS
- **Minimum Size**: 1 GB RAM, 1 vCPU, 10 GB disk
- **Recommended Size**: 2 GB RAM, 2 vCPUs, 20 GB disk
- **Providers**: Google Cloud, DigitalOcean, Linode, Vultr, Hetzner, AWS, etc.
- **Region**: Choose closest to target audience

### 3. Nginx Reverse Proxy
- **Purpose**: Handle requests, SSL (optional with Cloudflare), and proxy to app
- **Port**: 80 (HTTP), 443 (HTTPS)
- **Features**:
  - SSL/TLS termination with Let's Encrypt (if not using Cloudflare Flexible)
  - Real IP restoration (when behind Cloudflare)
  - Request forwarding to Node.js app
  - Security headers
  - Cloudflare header passthrough

### 4. Docker Container
- **Image**: Custom Next.js standalone build
- **Base**: Node.js 20 Alpine Linux
- **Port**: 3000 (internal)
- **Features**:
  - Multi-stage build for optimization
  - Health checks
  - Auto-restart policy
  - Minimal attack surface

### 5. Next.js Application
- **Framework**: Next.js 16
- **Runtime**: Node.js 20
- **Build**: Standalone output (optimized)
- **Features**:
  - Server-side rendering
  - Static generation
  - API routes (if needed)

## Traffic Flow

### With Cloudflare (Recommended)

1. **User Request** → DNS resolves to Cloudflare IP
2. **Cloudflare CDN** → Checks cache, applies security rules
3. **SSL/TLS** → Cloudflare terminates HTTPS (browser to Cloudflare)
4. **Proxy to Origin** → Cloudflare forwards to your VPS IP
5. **Nginx (Port 80/443)** → Receives request from Cloudflare
6. **SSL Termination** → Decrypts HTTPS (optional, for Full Strict mode)
7. **Proxy Pass** → Forwards to localhost:3000
8. **Docker Container** → Processes request
9. **Next.js App** → Generates response
10. **Response Path** → Back through Nginx → Cloudflare → user (cached at edge)

### Without Cloudflare (Direct)

1. **User Request** → DNS resolves to VPS IP
2. **Nginx (Port 80/443)** → Receives request
3. **SSL Termination** → Decrypts HTTPS traffic
4. **Proxy Pass** → Forwards to localhost:3000
5. **Docker Container** → Processes request
6. **Next.js App** → Generates response
7. **Response Path** → Back through Nginx to user

## Security Layers

### With Cloudflare

```
Layer 1: Cloudflare
  ├─ DDoS protection (unlimited)
  ├─ Web Application Firewall (WAF)
  ├─ Bot protection
  ├─ Rate limiting
  └─ SSL/TLS encryption (browser to Cloudflare)

Layer 2: VPS Provider Firewall
  ├─ Allow: SSH (22), HTTP (80), HTTPS (443)
  └─ Deny: All other ports

Layer 3: UFW (Ubuntu Firewall)
  ├─ Allow: SSH (22), HTTP (80), HTTPS (443)
  └─ Deny: All other ports

Layer 4: Nginx
  ├─ Real IP restoration (Cloudflare)
  ├─ SSL/TLS encryption (Cloudflare to server, optional)
  ├─ Security headers
  └─ Request validation

Layer 5: Docker Container
  ├─ Isolated environment
  ├─ Non-root user
  └─ Minimal dependencies

Layer 6: Next.js App
  ├─ Input validation
  ├─ CSRF protection
  └─ Security headers
```

### Without Cloudflare

```
Layer 1: VPS Provider Firewall
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
