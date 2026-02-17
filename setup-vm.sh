#!/bin/bash
set -e

echo "======================================"
echo "UrbanCode Studio - VM Setup Script"
echo "======================================"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root (use sudo)"
    exit 1
fi

echo "📦 Updating system packages..."
apt-get update
apt-get upgrade -y

echo "🐳 Installing Docker..."
# Install Docker if not already installed
if ! command -v docker &> /dev/null; then
    apt-get install -y apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker installed successfully"
else
    echo "✅ Docker already installed"
fi

echo "🐙 Installing Docker Compose..."
# Install Docker Compose if not already installed
if ! command -v docker-compose &> /dev/null; then
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    echo "✅ Docker Compose installed successfully"
else
    echo "✅ Docker Compose already installed"
fi

echo "🌐 Installing Nginx..."
# Install Nginx if not already installed
if ! command -v nginx &> /dev/null; then
    apt-get install -y nginx
    systemctl enable nginx
    echo "✅ Nginx installed successfully"
else
    echo "✅ Nginx already installed"
fi

echo "🔥 Configuring firewall..."
# Configure UFW firewall
ufw --force enable
ufw allow 22/tcp    # SSH
ufw allow 80/tcp    # HTTP
ufw allow 443/tcp   # HTTPS
echo "✅ Firewall configured"

echo "📁 Setting up application directory..."
APP_DIR="/opt/urbancodestudio"
mkdir -p $APP_DIR
chown -R $USER:$USER $APP_DIR

echo ""
echo "======================================"
echo "✨ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo "1. Clone your repository to $APP_DIR"
echo "2. Copy .env.example to .env and configure"
echo "3. Run ./deploy.sh to deploy the application"
echo "4. Configure Nginx with ./nginx.conf"
echo ""
