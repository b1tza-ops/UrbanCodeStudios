# Cloudflare Setup Guide

This guide covers setting up Cloudflare with your UrbanCode Studio website deployed on a VPS.

## Table of Contents
1. [Why Cloudflare?](#why-cloudflare)
2. [Adding Your Domain to Cloudflare](#adding-your-domain-to-cloudflare)
3. [DNS Configuration](#dns-configuration)
4. [SSL/TLS Settings](#ssltls-settings)
5. [Nginx Configuration for Cloudflare](#nginx-configuration-for-cloudflare)
6. [Security Settings](#security-settings)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

---

## Why Cloudflare?

Cloudflare provides:
- **Free SSL/TLS certificates** - Automatic HTTPS
- **CDN** - Global content delivery network
- **DDoS protection** - Enterprise-level security
- **Caching** - Faster page loads worldwide
- **Analytics** - Traffic insights and monitoring
- **Firewall** - Web application firewall (WAF)

---

## Adding Your Domain to Cloudflare

### Step 1: Create Cloudflare Account

1. Go to [cloudflare.com](https://cloudflare.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Add Your Site

1. Click **"Add a Site"** in the Cloudflare dashboard
2. Enter your domain name (e.g., `urbancodestudio.com`)
3. Click **"Add site"**
4. Select the **Free** plan
5. Click **"Continue"**

### Step 3: Scan DNS Records

Cloudflare will automatically scan your existing DNS records:
1. Review the detected records
2. Ensure important records are present
3. Click **"Continue"**

### Step 4: Update Nameservers

Cloudflare will provide two nameservers (e.g., `ns1.cloudflare.com`, `ns2.cloudflare.com`):

1. Log in to your **domain registrar** (where you bought the domain)
2. Find the **nameserver settings**
3. Replace your current nameservers with Cloudflare's nameservers
4. Save changes
5. Return to Cloudflare and click **"Done, check nameservers"**

**Note**: Nameserver changes can take 24-48 hours to propagate, but usually complete within a few hours.

---

## DNS Configuration

### Required DNS Records

After adding your site to Cloudflare, configure these DNS records:

#### A Record for Root Domain
```
Type: A
Name: @
IPv4 address: YOUR_VPS_IP
Proxy status: Proxied (orange cloud)
TTL: Auto
```

#### A Record for WWW Subdomain
```
Type: A
Name: www
IPv4 address: YOUR_VPS_IP
Proxy status: Proxied (orange cloud)
TTL: Auto
```

### Proxied vs DNS Only

- **Proxied (Orange Cloud)**: Traffic goes through Cloudflare (recommended)
  - Enables CDN, caching, DDoS protection
  - Hides your real server IP
  - Provides SSL/TLS encryption

- **DNS Only (Grey Cloud)**: Direct connection to your server
  - No Cloudflare features
  - Exposes your server IP
  - Use only for special cases (e.g., mail servers)

**Recommendation**: Keep your website records **Proxied** (orange cloud).

---

## SSL/TLS Settings

Cloudflare provides free SSL certificates. Configure SSL/TLS settings correctly:

### Step 1: Choose SSL/TLS Mode

In Cloudflare Dashboard:
1. Go to **SSL/TLS** section
2. Select the **Overview** tab
3. Choose encryption mode:

#### Option A: Full (Strict) - Recommended for Production

```
Cloudflare ← HTTPS → Your Server ← HTTPS → Next.js App
```

**Requirements:**
- Valid SSL certificate on your server (Let's Encrypt)
- HTTPS configured in Nginx

**Setup:**
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Certbot will automatically configure Nginx
```

#### Option B: Full - Good for Development

```
Cloudflare ← HTTPS → Your Server ← HTTPS (self-signed OK) → Next.js App
```

**Requirements:**
- Any SSL certificate on your server (self-signed is acceptable)
- Less secure than Full (Strict)

#### Option C: Flexible - Quick Start (Not Recommended for Production)

```
Cloudflare ← HTTPS → Your Server ← HTTP → Next.js App
```

**Requirements:**
- No SSL certificate needed on your server
- **Security risk**: Traffic between Cloudflare and your server is unencrypted

**Only use for initial testing!**

### Step 2: Enable Always Use HTTPS

1. Go to **SSL/TLS** → **Edge Certificates**
2. Enable **"Always Use HTTPS"**
3. This redirects all HTTP traffic to HTTPS

### Step 3: Enable Automatic HTTPS Rewrites

1. In **SSL/TLS** → **Edge Certificates**
2. Enable **"Automatic HTTPS Rewrites"**
3. Automatically converts HTTP links to HTTPS

### Step 4: Set Minimum TLS Version

1. In **SSL/TLS** → **Edge Certificates**
2. Set **Minimum TLS Version** to **TLS 1.2** or higher
3. Improves security

---

## Nginx Configuration for Cloudflare

When using Cloudflare, Nginx needs special configuration to get real visitor IPs.

### Update nginx.conf

Replace your existing `/etc/nginx/sites-available/urbancodestudio` with this Cloudflare-optimized configuration:

```nginx
# Cloudflare IP ranges (for real IP restoration)
# Update these periodically from: https://www.cloudflare.com/ips/
set_real_ip_from 173.245.48.0/20;
set_real_ip_from 103.21.244.0/22;
set_real_ip_from 103.22.200.0/22;
set_real_ip_from 103.31.4.0/22;
set_real_ip_from 141.101.64.0/18;
set_real_ip_from 108.162.192.0/18;
set_real_ip_from 190.93.240.0/20;
set_real_ip_from 188.114.96.0/20;
set_real_ip_from 197.234.240.0/22;
set_real_ip_from 198.41.128.0/17;
set_real_ip_from 162.158.0.0/15;
set_real_ip_from 104.16.0.0/13;
set_real_ip_from 104.24.0.0/14;
set_real_ip_from 172.64.0.0/13;
set_real_ip_from 131.0.72.0/22;
set_real_ip_from 2400:cb00::/32;
set_real_ip_from 2606:4700::/32;
set_real_ip_from 2803:f800::/32;
set_real_ip_from 2405:b500::/32;
set_real_ip_from 2405:8100::/32;
set_real_ip_from 2a06:98c0::/29;
set_real_ip_from 2c0f:f248::/32;

# Use CF-Connecting-IP header for real visitor IP
real_ip_header CF-Connecting-IP;

server {
    listen 80;
    listen [::]:80;
    server_name your-domain.com www.your-domain.com;

    # For SSL Full (Strict) mode - redirect HTTP to HTTPS
    # Cloudflare will handle the external HTTPS redirect
    # This is for direct server access
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name your-domain.com www.your-domain.com;

    # SSL certificate from Let's Encrypt
    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security headers (some may be redundant with Cloudflare)
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cloudflare will handle caching, but local cache for direct access
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header CF-Connecting-IP $http_cf_connecting_ip;
        proxy_set_header CF-IPCountry $http_cf_ipcountry;
        proxy_set_header CF-Ray $http_cf_ray;
        proxy_set_header CF-Visitor $http_cf_visitor;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Apply Configuration

```bash
# Update the configuration file
sudo nano /etc/nginx/sites-available/urbancodestudio

# Replace 'your-domain.com' with your actual domain
# Update SSL certificate paths if different

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## Security Settings

### Enable Security Features

In Cloudflare Dashboard → **Security**:

#### 1. Security Level
- Set to **Medium** (default)
- Increase to **High** if under attack
- Available options: Essentially Off, Low, Medium, High, I'm Under Attack!

#### 2. Challenge Passage
- Set to **30 minutes** (default)
- How long a visitor has access after passing a challenge

#### 3. Browser Integrity Check
- **Enable** (recommended)
- Blocks visitors with known malicious behavior

#### 4. Enable Bot Fight Mode (Free Plan)
- Go to **Security** → **Bots**
- Enable **Bot Fight Mode**
- Protects against automated threats

### Configure Firewall Rules (Optional)

Create custom firewall rules:

1. Go to **Security** → **WAF** → **Firewall rules**
2. Click **"Create a Firewall rule"**

**Example: Block specific countries**
```
Field: Country
Operator: equals
Value: XX (country code)
Action: Block
```

**Example: Challenge suspicious user agents**
```
Field: User Agent
Operator: contains
Value: bot
Action: Challenge
```

### Enable Rate Limiting (Optional - Paid Feature)

Protect against DDoS and brute force attacks:
1. Go to **Security** → **WAF** → **Rate limiting rules**
2. Create rules to limit requests per IP

---

## Performance Optimization

### Enable Caching

#### 1. Caching Level

In **Caching** → **Configuration**:
- Select **Standard** caching level
- Cloudflare caches static content automatically

#### 2. Browser Cache TTL

- Set to **4 hours** or **1 day**
- How long browsers cache content

#### 3. Always Online

- **Enable** Always Online
- Serves cached version if your server is down

### Enable Auto Minify

In **Speed** → **Optimization**:
- Enable **Auto Minify** for:
  - ✅ JavaScript
  - ✅ CSS
  - ✅ HTML

### Enable Brotli Compression

In **Speed** → **Optimization**:
- Enable **Brotli** compression
- Better compression than gzip

### Enable Rocket Loader (Optional)

In **Speed** → **Optimization**:
- Enable **Rocket Loader**
- Speeds up JavaScript loading
- **Test carefully** - may break some sites

### Create Page Rules

Go to **Rules** → **Page Rules**:

#### Rule 1: Cache Everything for Homepage
```
URL: your-domain.com/
Setting: Cache Level
Value: Cache Everything
```

#### Rule 2: Bypass Cache for API Routes (if any)
```
URL: your-domain.com/api/*
Setting: Cache Level
Value: Bypass
```

### Enable HTTP/3

In **Network**:
- Enable **HTTP/3 (with QUIC)**
- Latest HTTP protocol for better performance

---

## Verifying Your Setup

### 1. Check Nameservers

```bash
nslookup -type=NS your-domain.com
# Should show Cloudflare nameservers
```

### 2. Check DNS Records

```bash
nslookup your-domain.com
# Should show Cloudflare IP (not your VPS IP if proxied)
```

### 3. Test SSL

Visit: https://www.ssllabs.com/ssltest/
- Enter your domain
- Should get A or A+ rating with Cloudflare

### 4. Check Headers

```bash
curl -I https://your-domain.com
# Should see Cloudflare headers like:
# cf-ray: ...
# cf-cache-status: ...
# server: cloudflare
```

### 5. Test Website

1. Visit `http://your-domain.com` - should redirect to HTTPS
2. Visit `https://your-domain.com` - should load correctly
3. Visit `https://www.your-domain.com` - should work
4. Check mobile responsiveness
5. Test from different locations (use VPN or online tools)

---

## Troubleshooting

### Problem: Website Not Loading

**Check:**
1. Nameservers are updated (can take 24-48 hours)
2. DNS records are correct (A records pointing to VPS IP)
3. DNS records are **Proxied** (orange cloud)
4. Your VPS server is running and accessible

**Test direct access:**
```bash
# Add VPS IP to /etc/hosts temporarily
echo "YOUR_VPS_IP your-domain.com" | sudo tee -a /etc/hosts

# Test direct access
curl -I http://YOUR_VPS_IP
```

### Problem: SSL Errors

**Solutions:**

1. **Check SSL/TLS mode in Cloudflare**
   - Use **Full** or **Full (Strict)**
   - Ensure you have SSL certificate on server for Full (Strict)

2. **Verify SSL certificate on server**
   ```bash
   sudo certbot certificates
   # Check expiration date
   ```

3. **Check Nginx SSL configuration**
   ```bash
   sudo nginx -t
   sudo systemctl status nginx
   ```

### Problem: 502 Bad Gateway

**Check:**
1. Next.js app is running: `docker-compose ps`
2. App is accessible locally: `curl http://localhost:3000`
3. Nginx is running: `sudo systemctl status nginx`
4. Nginx can reach the app: `sudo tail -f /var/log/nginx/error.log`

### Problem: Redirect Loop

**Usually caused by:**
- Incorrect SSL/TLS mode
- Both Cloudflare and Nginx trying to force HTTPS

**Fix:**
1. In Cloudflare: Use **Full** or **Full (Strict)** SSL mode
2. In Nginx: Let Cloudflare handle the HTTP to HTTPS redirect
3. Configure Nginx to accept HTTPS from Cloudflare

### Problem: Real IP Not Showing

**Fix:**
1. Ensure Cloudflare IP ranges are in nginx.conf
2. Verify `real_ip_header CF-Connecting-IP;` is set
3. Reload Nginx: `sudo systemctl reload nginx`

### Problem: Slow Performance

**Check:**
1. Caching is enabled in Cloudflare
2. Auto Minify is enabled
3. Brotli compression is enabled
4. Browser Cache TTL is set appropriately

**Test:**
```bash
# Check cache status
curl -I https://your-domain.com | grep cf-cache-status
# Should show: HIT, DYNAMIC, BYPASS, or MISS
```

---

## Monitoring & Analytics

### Cloudflare Analytics

In **Analytics** → **Traffic**:
- View requests, bandwidth, threats blocked
- See traffic by country
- Monitor cache performance

### Cloudflare Security Events

In **Security** → **Events**:
- View blocked requests
- See firewall rule matches
- Monitor bot traffic

### Performance Insights

In **Speed** → **Performance**:
- Core Web Vitals
- Page load times
- Performance recommendations

---

## Regular Maintenance

### Weekly
- [ ] Check security events for unusual activity
- [ ] Review analytics for traffic patterns
- [ ] Verify site is loading correctly

### Monthly
- [ ] Update Cloudflare IP ranges in nginx.conf
- [ ] Review and optimize page rules
- [ ] Check SSL certificate expiration
- [ ] Review firewall rules effectiveness

### Quarterly
- [ ] Audit all Cloudflare settings
- [ ] Test failover scenarios
- [ ] Review performance metrics
- [ ] Update documentation

---

## Additional Resources

- **Cloudflare Documentation**: https://developers.cloudflare.com/
- **Cloudflare Community**: https://community.cloudflare.com/
- **Cloudflare Status**: https://www.cloudflarestatus.com/
- **Cloudflare IP Ranges**: https://www.cloudflare.com/ips/

---

## Support

For issues:
1. Check [Troubleshooting](#troubleshooting) section
2. Review Cloudflare dashboard for errors
3. Check server logs: `docker-compose logs -f`
4. Check Nginx logs: `sudo tail -f /var/log/nginx/error.log`
5. Contact development team

---

**Last Updated**: February 2026
