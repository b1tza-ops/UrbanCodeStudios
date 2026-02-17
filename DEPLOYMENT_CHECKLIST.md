# Google Cloud VM Deployment Checklist

Use this checklist to ensure a smooth deployment of UrbanCode Studio to Google Cloud VM.

## Pre-Deployment Checklist

### Google Cloud Setup
- [ ] Google Cloud Platform account created
- [ ] Billing account configured
- [ ] Project created in Google Cloud Console
- [ ] Compute Engine API enabled
- [ ] `gcloud` CLI installed (optional, for CLI deployment)

### Domain Setup (Optional)
- [ ] Domain name purchased
- [ ] Access to domain DNS settings
- [ ] DNS configured to point to VM IP

### Local Preparation
- [ ] Code repository cloned and updated
- [ ] All files committed to Git
- [ ] Production build tested locally (`npm run build`)

---

## Deployment Process

### Phase 1: Create VM Instance (15 minutes)

- [ ] **Create VM Instance**
  - Name: `urbancode-studio`
  - Region: `europe-west2` (London) or closest to target audience
  - Machine type: `e2-small` (recommended) or `e2-micro` (free tier)
  - Boot disk: Ubuntu 22.04 LTS, 20 GB
  - Firewall: Allow HTTP and HTTPS traffic

- [ ] **Note VM External IP**
  ```bash
  gcloud compute instances describe urbancode-studio \
    --zone=europe-west2-a \
    --format='get(networkInterfaces[0].accessConfigs[0].natIP)'
  ```
  IP Address: ___________________________

- [ ] **SSH into VM**
  ```bash
  gcloud compute ssh urbancode-studio --zone=europe-west2-a
  ```

### Phase 2: Server Setup (10 minutes)

- [ ] **Update system packages**
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```

- [ ] **Create application directory**
  ```bash
  cd /opt
  sudo git clone https://github.com/b1tza-ops/UrbanCodeStudios.git urbancodestudio
  cd urbancodestudio
  ```

- [ ] **Make scripts executable**
  ```bash
  sudo chmod +x setup-vm.sh deploy.sh
  ```

- [ ] **Run setup script**
  ```bash
  sudo ./setup-vm.sh
  ```
  - Installs Docker
  - Installs Docker Compose
  - Installs Nginx
  - Configures firewall

### Phase 3: Application Deployment (5 minutes)

- [ ] **Configure environment**
  ```bash
  cp .env.example .env
  nano .env
  ```
  Update any necessary environment variables

- [ ] **Deploy application**
  ```bash
  ./deploy.sh
  ```

- [ ] **Verify deployment**
  ```bash
  docker-compose ps
  curl http://localhost:3000
  ```

- [ ] **Test external access**
  - Open browser to `http://YOUR_VM_IP:3000`
  - Verify site loads correctly

### Phase 4: Nginx Configuration (10 minutes)

- [ ] **Copy nginx configuration**
  ```bash
  sudo cp nginx.conf /etc/nginx/sites-available/urbancodestudio
  ```

- [ ] **Edit configuration**
  ```bash
  sudo nano /etc/nginx/sites-available/urbancodestudio
  ```
  - Replace `your-domain.com` with actual domain
  - OR use VM IP for testing

- [ ] **Enable site**
  ```bash
  sudo ln -s /etc/nginx/sites-available/urbancodestudio /etc/nginx/sites-enabled/
  sudo rm /etc/nginx/sites-enabled/default
  ```

- [ ] **Test nginx configuration**
  ```bash
  sudo nginx -t
  ```

- [ ] **Restart nginx**
  ```bash
  sudo systemctl restart nginx
  ```

- [ ] **Test HTTP access**
  - Open browser to `http://YOUR_DOMAIN` or `http://YOUR_VM_IP`
  - Verify site loads through Nginx

### Phase 5: Domain Configuration (If applicable) (15 minutes)

- [ ] **Configure DNS records**
  At your domain registrar:
  - A Record: `@` → `YOUR_VM_IP`
  - A Record: `www` → `YOUR_VM_IP`

- [ ] **Wait for DNS propagation** (5-30 minutes)
  ```bash
  nslookup your-domain.com
  ```

- [ ] **Test domain access**
  - Open browser to `http://your-domain.com`
  - Verify site loads

### Phase 6: SSL Setup (10 minutes)

- [ ] **Install Certbot**
  ```bash
  sudo apt install certbot python3-certbot-nginx -y
  ```

- [ ] **Obtain SSL certificate**
  ```bash
  sudo certbot --nginx -d your-domain.com -d www.your-domain.com
  ```
  Follow prompts:
  - Enter email address
  - Agree to terms
  - Choose redirect option (recommended)

- [ ] **Test SSL certificate**
  ```bash
  sudo certbot certificates
  ```

- [ ] **Test HTTPS access**
  - Open browser to `https://your-domain.com`
  - Verify SSL certificate is valid
  - Check automatic HTTP → HTTPS redirect

- [ ] **Test auto-renewal**
  ```bash
  sudo certbot renew --dry-run
  ```

### Phase 7: Auto-Start Setup (Optional) (5 minutes)

- [ ] **Copy systemd service file**
  ```bash
  sudo cp urbancodestudio.service /etc/systemd/system/
  ```

- [ ] **Update service file if needed**
  ```bash
  sudo nano /etc/systemd/system/urbancodestudio.service
  ```

- [ ] **Enable service**
  ```bash
  sudo systemctl daemon-reload
  sudo systemctl enable urbancodestudio.service
  sudo systemctl start urbancodestudio.service
  ```

- [ ] **Verify service**
  ```bash
  sudo systemctl status urbancodestudio.service
  ```

- [ ] **Test auto-start**
  ```bash
  # Reboot VM
  sudo reboot
  # Wait 2 minutes, then check if site is accessible
  ```

---

## Post-Deployment Verification

### Functionality Tests
- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Mobile menu works on mobile devices
- [ ] Contact form displays (no backend needed)
- [ ] All pages accessible (About, FAQs, Privacy, Terms)
- [ ] Images and assets load properly
- [ ] CSS styling applied correctly

### Performance Tests
- [ ] Page load time < 3 seconds
- [ ] Mobile responsiveness works
- [ ] Lighthouse score > 90 (if checking)

### Security Tests
- [ ] HTTPS working (if configured)
- [ ] HTTP redirects to HTTPS (if configured)
- [ ] Firewall rules configured
- [ ] Only necessary ports open (22, 80, 443)

### Monitoring Setup
- [ ] Application logs accessible
  ```bash
  docker-compose logs -f
  ```
- [ ] Nginx logs accessible
  ```bash
  sudo tail -f /var/log/nginx/access.log
  ```
- [ ] Disk space monitored
  ```bash
  df -h
  ```

---

## Documentation References

After deployment, save these for future reference:

- [ ] **Server Information**
  - VM Name: ___________________________
  - VM IP: ___________________________
  - Domain: ___________________________
  - Region/Zone: ___________________________

- [ ] **Credentials**
  - SSH Key location: ___________________________
  - Google Cloud Project: ___________________________

- [ ] **Important Commands** (See QUICK_REFERENCE.md)
  - View logs: `docker-compose logs -f`
  - Restart: `docker-compose restart`
  - Update: `git pull && ./deploy.sh`

- [ ] **Documentation Files**
  - [x] README.md - Project overview
  - [x] DEPLOYMENT.md - Detailed deployment guide
  - [x] QUICK_REFERENCE.md - Common commands
  - [x] ARCHITECTURE.md - System architecture
  - [x] TROUBLESHOOTING.md - Problem solutions

---

## Maintenance Schedule

Set reminders for:

- [ ] **Weekly** (Every Monday)
  - Check application logs
  - Monitor disk space
  - Review error rates

- [ ] **Monthly** (First of month)
  - Security updates: `sudo apt update && sudo apt upgrade`
  - Docker cleanup: `docker system prune`
  - SSL certificate check: `sudo certbot certificates`

- [ ] **Quarterly** (Every 3 months)
  - Full backup
  - Performance review
  - Update dependencies

---

## Emergency Contacts

- **Repository**: https://github.com/b1tza-ops/UrbanCodeStudios
- **Google Cloud Console**: https://console.cloud.google.com/
- **Documentation**: See TROUBLESHOOTING.md

---

## Deployment Complete! 🎉

✅ Website is live at: ___________________________

**Next Steps:**
1. Monitor application for first 24 hours
2. Set up regular backups
3. Configure monitoring alerts (optional)
4. Share URL with stakeholders

**Support Resources:**
- Quick commands: See QUICK_REFERENCE.md
- Problems: See TROUBLESHOOTING.md
- Architecture: See ARCHITECTURE.md

---

**Deployment Date**: ___________________________  
**Deployed By**: ___________________________  
**Notes**: ___________________________
