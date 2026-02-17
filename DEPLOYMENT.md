# Google Cloud VM Deployment Guide

This guide will help you deploy the UrbanCode Studio website to a Google Cloud VM instance.

## Prerequisites

- Google Cloud Platform account
- A domain name (optional, for production)
- Basic knowledge of Linux command line

## 1. Create a Google Cloud VM Instance

### Option A: Using Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **Compute Engine** > **VM instances**
3. Click **Create Instance**
4. Configure your instance:
   - **Name**: urbancode-studio
   - **Region**: Choose closest to your target audience (e.g., `europe-west2` for London)
   - **Machine type**: 
     - Development: `e2-micro` (0.25-1 GB memory, 2 vCPUs) - Free tier eligible
     - Production: `e2-small` or `e2-medium` (2-4 GB memory)
   - **Boot disk**: 
     - OS: Ubuntu 22.04 LTS
     - Size: 10-20 GB
   - **Firewall**: 
     - ✅ Allow HTTP traffic
     - ✅ Allow HTTPS traffic

5. Click **Create**

### Option B: Using gcloud CLI

```bash
gcloud compute instances create urbancode-studio \
    --zone=europe-west2-a \
    --machine-type=e2-small \
    --image-family=ubuntu-2204-lts \
    --image-project=ubuntu-os-cloud \
    --boot-disk-size=20GB \
    --tags=http-server,https-server
```

## 2. Connect to Your VM

### SSH via Console
Click the **SSH** button in the Google Cloud Console.

### SSH via gcloud CLI
```bash
gcloud compute ssh urbancode-studio --zone=europe-west2-a
```

## 3. Initial Server Setup

Once connected to your VM, run the setup script:

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Clone the repository
cd /opt
sudo git clone https://github.com/b1tza-ops/UrbanCodeStudios.git urbancodestudio
cd urbancodestudio

# Make scripts executable
sudo chmod +x setup-vm.sh deploy.sh

# Run the VM setup script (installs Docker, Nginx, etc.)
sudo ./setup-vm.sh
```

## 4. Configure Environment Variables

```bash
# Copy environment template
cp .env.example .env

# Edit environment variables
nano .env
```

Minimum configuration:
```env
NODE_ENV=production
PORT=3000
```

## 5. Deploy the Application

```bash
# Run deployment script
./deploy.sh
```

This will:
- Build the Docker image
- Start the application container
- Make it available on port 3000

## 6. Configure Nginx Reverse Proxy

### For HTTP (Initial Setup)

```bash
# Copy nginx configuration
sudo cp nginx.conf /etc/nginx/sites-available/urbancodestudio

# Edit and update your domain
sudo nano /etc/nginx/sites-available/urbancodestudio
# Replace 'your-domain.com' with your actual domain or VM IP

# Enable the site
sudo ln -s /etc/nginx/sites-available/urbancodestudio /etc/nginx/sites-enabled/

# Remove default site
sudo rm /etc/nginx/sites-enabled/default

# Test nginx configuration
sudo nginx -t

# Restart nginx
sudo systemctl restart nginx
```

Your site should now be accessible via HTTP!

### For HTTPS (Production Setup)

Install Certbot for Let's Encrypt SSL:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically configure Nginx for HTTPS
```

The certificate will auto-renew. Test renewal with:
```bash
sudo certbot renew --dry-run
```

## 7. Enable Auto-Start on Boot (Optional)

To ensure the application starts automatically when the VM reboots:

```bash
# Copy systemd service file
sudo cp urbancodestudio.service /etc/systemd/system/

# Update WorkingDirectory path if needed
sudo nano /etc/systemd/system/urbancodestudio.service

# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable urbancodestudio.service

# Start service
sudo systemctl start urbancodestudio.service

# Check status
sudo systemctl status urbancodestudio.service
```

## 8. Configure Firewall Rules

Google Cloud firewall rules should already be configured if you selected "Allow HTTP/HTTPS traffic" during VM creation. If not:

```bash
# Via gcloud CLI
gcloud compute firewall-rules create allow-http \
    --allow tcp:80 \
    --target-tags http-server \
    --description "Allow HTTP traffic"

gcloud compute firewall-rules create allow-https \
    --allow tcp:443 \
    --target-tags https-server \
    --description "Allow HTTPS traffic"
```

## 9. Point Your Domain to the VM

1. Get your VM's external IP:
   ```bash
   gcloud compute instances describe urbancode-studio \
       --zone=europe-west2-a \
       --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
   ```

2. Add DNS records at your domain registrar:
   - **A Record**: `@` → `YOUR_VM_IP`
   - **A Record**: `www` → `YOUR_VM_IP`

3. Wait for DNS propagation (5-30 minutes)

## 10. Verify Deployment

Visit your domain or VM IP in a browser:
- HTTP: `http://your-domain.com` or `http://YOUR_VM_IP`
- HTTPS: `https://your-domain.com` (after SSL setup)

## Useful Commands

### Application Management
```bash
# View logs
docker-compose logs -f

# Restart application
docker-compose restart

# Stop application
docker-compose down

# Rebuild and redeploy
./deploy.sh
```

### Update Application
```bash
cd /opt/urbancodestudio
git pull origin main
./deploy.sh
```

### Monitor Resources
```bash
# Check disk usage
df -h

# Check memory usage
free -h

# Check running containers
docker ps

# Check container resource usage
docker stats
```

### Nginx Management
```bash
# Test configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx

# View nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

## Troubleshooting

### Application not starting
```bash
# Check container logs
docker-compose logs

# Check if port 3000 is in use
sudo netstat -tlnp | grep 3000

# Restart Docker
sudo systemctl restart docker
```

### Nginx errors
```bash
# Check nginx error log
sudo tail -f /var/log/nginx/error.log

# Check nginx configuration
sudo nginx -t
```

### SSL certificate issues
```bash
# Check certificate status
sudo certbot certificates

# Renew certificate manually
sudo certbot renew
```

## Cost Optimization

- Use `e2-micro` instance (free tier eligible)
- Set up automatic shutdown during off-hours:
  ```bash
  # Stop VM at night (example: 10 PM)
  gcloud compute instances stop urbancode-studio --zone=europe-west2-a
  
  # Start VM in morning (example: 8 AM)
  gcloud compute instances start urbancode-studio --zone=europe-west2-a
  ```

## Security Best Practices

1. **Keep system updated**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Enable automatic security updates**:
   ```bash
   sudo apt install unattended-upgrades -y
   sudo dpkg-reconfigure -plow unattended-upgrades
   ```

3. **Configure UFW firewall** (done by setup script):
   ```bash
   sudo ufw status
   ```

4. **Use SSH keys instead of passwords**
5. **Regularly backup your data**
6. **Monitor logs for suspicious activity**

## Backup Strategy

```bash
# Backup application data
cd /opt/urbancodestudio
tar -czf ~/backup-$(date +%Y%m%d).tar.gz .

# Upload to Cloud Storage
gsutil cp ~/backup-*.tar.gz gs://your-backup-bucket/
```

## Support

For issues or questions:
- Check logs: `docker-compose logs`
- Review Google Cloud documentation
- Contact development team

---

**Last Updated**: February 2026
