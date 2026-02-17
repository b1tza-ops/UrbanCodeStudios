#!/bin/bash
set -e

echo "======================================"
echo "UrbanCode Studio - Deployment Script"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}⚠️  .env file not found. Creating from .env.example...${NC}"
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Please edit .env file with your configuration${NC}"
    exit 1
fi

echo "🛑 Stopping existing containers..."
docker-compose down || true

echo "🧹 Cleaning up old images..."
docker system prune -f

echo "🏗️  Building application..."
docker-compose build --no-cache

echo "🚀 Starting application..."
docker-compose up -d

echo ""
echo "⏳ Waiting for application to be ready..."
sleep 10

# Check if container is running
if [ "$(docker-compose ps -q app)" ]; then
    echo -e "${GREEN}✅ Application deployed successfully!${NC}"
    echo ""
    echo "📊 Container status:"
    docker-compose ps
    echo ""
    echo "🌐 Application is running at:"
    echo "   - Local: http://localhost:3000"
    echo "   - Network: http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "📝 To view logs: docker-compose logs -f"
    echo "🛑 To stop: docker-compose down"
    echo "🔄 To restart: docker-compose restart"
else
    echo -e "${RED}❌ Deployment failed. Check logs with: docker-compose logs${NC}"
    exit 1
fi
