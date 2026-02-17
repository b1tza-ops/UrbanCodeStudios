# Troubleshooting Guide

Common issues and their solutions when deploying to Google Cloud VM.

## Table of Contents
1. [Application Issues](#application-issues)
2. [Docker Issues](#docker-issues)
3. [Nginx Issues](#nginx-issues)
4. [SSL Certificate Issues](#ssl-certificate-issues)
5. [Network Issues](#network-issues)
6. [Performance Issues](#performance-issues)

---

## Application Issues

### ❌ Application won't start

**Symptoms:**
```bash
docker-compose ps
# Shows container as "Exit 1" or "Restarting"
```

**Solutions:**

1. **Check logs:**
```bash
docker-compose logs app
```

2. **Verify .env file exists:**
```bash
ls -la .env
cat .env
```

3. **Check port conflict:**
```bash
sudo netstat -tlnp | grep 3000
# If something is using port 3000, stop it or change the port
```

4. **Rebuild from scratch:**
```bash
docker-compose down -v
docker system prune -a
./deploy.sh
```

### ❌ "Cannot find module" errors

**Solution:**
```bash
# Delete node_modules and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
./deploy.sh
```

### ❌ Build fails

**Check build logs:**
```bash
npm run build
# Review any TypeScript errors or build issues
```

**Common fixes:**
- Fix TypeScript errors
- Check for missing dependencies
- Ensure all required files are present

---

## Docker Issues

### ❌ Docker daemon not running

**Error:**
```
Cannot connect to the Docker daemon
```

**Solution:**
```bash
# Start Docker service
sudo systemctl start docker

# Enable on boot
sudo systemctl enable docker

# Check status
sudo systemctl status docker
```

### ❌ Docker Compose not found

**Solution:**
```bash
# Reinstall Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Verify
docker-compose --version
```

### ❌ Permission denied errors

**Solution:**
```bash
# Add user to docker group
sudo usermod -aG docker $USER

# Log out and back in, or run:
newgrp docker

# Test
docker ps
```

### ❌ Out of disk space

**Check space:**
```bash
df -h
```

**Clean up:**
```bash
# Remove unused Docker resources
docker system prune -a --volumes

# Remove old logs
sudo journalctl --vacuum-time=7d

# Check again
df -h
```

---

## Nginx Issues

### ❌ Nginx won't start

**Check configuration:**
```bash
sudo nginx -t
```

**Common fixes:**

1. **Port already in use:**
```bash
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :443
# Kill the process using the port or change nginx config
```

2. **Configuration syntax error:**
```bash
sudo nginx -t
# Fix any errors shown
```

3. **Missing SSL certificates:**
```bash
# Comment out SSL lines in nginx.conf until certificates are obtained
sudo nano /etc/nginx/sites-available/urbancodestudio
sudo systemctl restart nginx
```

### ❌ 502 Bad Gateway

**Symptoms:**
- Nginx is running but shows 502 error
- Application not accessible through browser

**Solutions:**

1. **Check if app container is running:**
```bash
docker-compose ps
# Should show "Up" status
```

2. **Check app is listening on port 3000:**
```bash
docker-compose logs app | grep "Ready"
curl http://localhost:3000
```

3. **Check nginx configuration:**
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

4. **Restart both services:**
```bash
docker-compose restart
sudo systemctl restart nginx
```

### ❌ 404 Not Found

**Check:**
- Nginx is forwarding to correct port
- Domain is correctly configured
- Site is enabled in nginx

```bash
ls -la /etc/nginx/sites-enabled/
cat /etc/nginx/sites-available/urbancodestudio
```

---

## SSL Certificate Issues

### ❌ Certbot fails to obtain certificate

**Common causes:**

1. **Domain not pointing to VM:**
```bash
# Check DNS
nslookup your-domain.com
# Should show your VM's IP
```

2. **Port 80 blocked:**
```bash
# Ensure firewall allows HTTP
sudo ufw status
# Should show 80/tcp ALLOW
```

3. **Nginx not running:**
```bash
sudo systemctl status nginx
sudo systemctl start nginx
```

**Get certificate manually:**
```bash
# Stop nginx temporarily
sudo systemctl stop nginx

# Get certificate
sudo certbot certonly --standalone -d your-domain.com -d www.your-domain.com

# Start nginx
sudo systemctl start nginx
```

### ❌ Certificate expired

**Renew manually:**
```bash
sudo certbot renew --force-renewal
sudo systemctl reload nginx
```

**Check auto-renewal:**
```bash
sudo systemctl status certbot.timer
sudo certbot renew --dry-run
```

---

## Network Issues

### ❌ Cannot connect to VM from outside

**Check firewall rules:**

1. **Google Cloud firewall:**
```bash
gcloud compute firewall-rules list
```

2. **UFW firewall:**
```bash
sudo ufw status
# Ensure ports 80 and 443 are allowed
```

3. **Open required ports:**
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

### ❌ DNS not resolving

**Check DNS records:**
```bash
nslookup your-domain.com
dig your-domain.com

# Should return your VM's IP address
```

**Wait for propagation:**
- DNS changes can take 5-30 minutes
- Use https://dnschecker.org to check global propagation

### ❌ Site slow or timing out

**Check application:**
```bash
# Test locally
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000

# Check resource usage
docker stats
htop
```

**Check network:**
```bash
# Test external access
curl -I http://your-domain.com

# Check nginx logs
sudo tail -f /var/log/nginx/access.log
```

---

## Performance Issues

### ❌ High memory usage

**Check what's using memory:**
```bash
free -h
docker stats
ps aux --sort=-%mem | head -10
```

**Solutions:**

1. **Increase VM memory:**
```bash
# Stop VM, resize, start VM
gcloud compute instances stop urbancode-studio --zone=europe-west2-a
# Resize in console or with gcloud
gcloud compute instances start urbancode-studio --zone=europe-west2-a
```

2. **Limit Docker memory:**
Edit `docker-compose.yml`:
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
```

### ❌ High CPU usage

**Check processes:**
```bash
htop
docker stats
```

**Solutions:**
- Upgrade VM type
- Check for infinite loops in code
- Optimize application code

### ❌ Slow page loads

**Test performance:**
```bash
# Time to first byte
curl -w "@curl-format.txt" -o /dev/null -s http://localhost:3000
```

**Optimizations:**

1. **Enable nginx caching:**
Add to nginx.conf:
```nginx
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=STATIC:10m max_size=1g;

location / {
    proxy_cache STATIC;
    proxy_cache_valid 200 1h;
    # ... other settings
}
```

2. **Check application logs:**
```bash
docker-compose logs app | grep "slow\|error"
```

---

## Emergency Recovery

### 🆘 Complete system failure

**Recovery steps:**

1. **Check VM status:**
```bash
gcloud compute instances list
```

2. **SSH into VM:**
```bash
gcloud compute ssh urbancode-studio --zone=europe-west2-a
```

3. **Check services:**
```bash
sudo systemctl status docker
sudo systemctl status nginx
docker-compose ps
```

4. **Nuclear option - full redeploy:**
```bash
cd /opt/urbancodestudio
git pull origin main
docker-compose down -v
docker system prune -a
./deploy.sh
sudo systemctl restart nginx
```

### 🆘 Lost access to VM

**Reset SSH keys:**
```bash
gcloud compute config-ssh
gcloud compute ssh urbancode-studio --zone=europe-west2-a
```

**Access via console:**
- Use Google Cloud Console's SSH-in-browser feature

---

## Getting Help

### Collect diagnostic information

```bash
# System info
uname -a
df -h
free -h

# Docker info
docker version
docker-compose version
docker ps -a
docker-compose logs app | tail -100

# Nginx info
sudo nginx -v
sudo nginx -t
sudo tail -100 /var/log/nginx/error.log

# Network info
ip addr show
sudo netstat -tlnp

# Save to file
{
  echo "=== System Info ==="
  uname -a
  df -h
  free -h
  echo "=== Docker Info ==="
  docker ps -a
  docker-compose logs app | tail -50
  echo "=== Nginx Info ==="
  sudo nginx -t
  sudo tail -50 /var/log/nginx/error.log
} > diagnostic-$(date +%Y%m%d-%H%M%S).log
```

### Support channels
- GitHub Issues
- Documentation
- Development team contact

---

**Last Updated**: February 2026
