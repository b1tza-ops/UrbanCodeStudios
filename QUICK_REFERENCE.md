# Quick Reference Guide - Google Cloud VM

## Initial Setup (One Time)

```bash
# 1. SSH into VM
gcloud compute ssh urbancode-studio --zone=europe-west2-a

# 2. Clone repository
cd /opt
sudo git clone https://github.com/b1tza-ops/UrbanCodeStudios.git urbancodestudio
cd urbancodestudio

# 3. Run setup script
sudo chmod +x setup-vm.sh deploy.sh
sudo ./setup-vm.sh

# 4. Configure environment
cp .env.example .env
nano .env

# 5. Deploy
./deploy.sh

# 6. Configure Nginx
sudo cp nginx.conf /etc/nginx/sites-available/urbancodestudio
sudo nano /etc/nginx/sites-available/urbancodestudio  # Edit domain
sudo ln -s /etc/nginx/sites-available/urbancodestudio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx

# 7. Setup SSL (optional)
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Common Operations

### View Application Logs
```bash
cd /opt/urbancodestudio
docker-compose logs -f
```

### Restart Application
```bash
cd /opt/urbancodestudio
docker-compose restart
```

### Stop Application
```bash
cd /opt/urbancodestudio
docker-compose down
```

### Update & Redeploy
```bash
cd /opt/urbancodestudio
git pull origin main
./deploy.sh
```

### Check Application Status
```bash
cd /opt/urbancodestudio
docker-compose ps
docker stats
```

### Nginx Operations
```bash
# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx

# Restart Nginx
sudo systemctl restart nginx

# View logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### SSL Certificate Management
```bash
# Check certificate status
sudo certbot certificates

# Renew certificates
sudo certbot renew

# Test auto-renewal
sudo certbot renew --dry-run
```

## Troubleshooting

### Application won't start
```bash
# Check Docker logs
docker-compose logs

# Check if port is in use
sudo netstat -tlnp | grep 3000

# Restart Docker service
sudo systemctl restart docker
```

### Site not accessible
```bash
# Check if container is running
docker ps

# Check Nginx status
sudo systemctl status nginx

# Check Nginx configuration
sudo nginx -t

# Check firewall
sudo ufw status
```

### Out of disk space
```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a

# Remove old logs
sudo journalctl --vacuum-time=7d
```

## Performance Monitoring

```bash
# System resources
htop

# Disk usage
df -h
du -sh /opt/urbancodestudio

# Memory usage
free -h

# Docker stats
docker stats

# Network connections
sudo netstat -tlnp
```

## Backup

```bash
# Create backup
cd /opt/urbancodestudio
tar -czf ~/backup-$(date +%Y%m%d).tar.gz .

# Upload to Cloud Storage (if configured)
gsutil cp ~/backup-*.tar.gz gs://your-backup-bucket/
```

## Security Updates

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Check for security updates
sudo apt list --upgradable
```

## Useful Aliases (Add to ~/.bashrc)

```bash
alias app-logs='cd /opt/urbancodestudio && docker-compose logs -f'
alias app-restart='cd /opt/urbancodestudio && docker-compose restart'
alias app-status='cd /opt/urbancodestudio && docker-compose ps'
alias app-deploy='cd /opt/urbancodestudio && ./deploy.sh'
alias nginx-reload='sudo systemctl reload nginx'
alias nginx-test='sudo nginx -t'
```

After adding, run: `source ~/.bashrc`

## Emergency Contacts

- **Repository**: https://github.com/b1tza-ops/UrbanCodeStudios
- **Google Cloud Console**: https://console.cloud.google.com/
- **SSL Certificate Issues**: https://letsencrypt.org/docs/
