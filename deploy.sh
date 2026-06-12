#!/bin/bash

set -e

echo "🚀 Starting Frontend Deployment..."

docker build \
  --build-arg VITE_API_URL=https://api.endpointforge.ir \
  --build-arg VITE_APP_DOMAIN=endpointforge.ir \
  --build-arg VITE_APP_PORT=443 \
  --build-arg VITE_APP_PROTOCOL=https \
  -t endpoint-forge-frontend:latest .

docker save -o frontend.tar endpoint-forge-frontend:latest

rsync --progress -e "ssh -o StrictHostKeyChecking=no" frontend.tar deployer@87.107.5.95:/home/deployer/app/endpointforge/frontend/

ssh -o StrictHostKeyChecking=no deployer@87.107.5.95 << 'EOF'
  cd /home/deployer/app/endpointforge/frontend/
  docker rm -f endpointforge_frontend
  docker load -i frontend.tar
  docker run -d \
  --name endpointforge_frontend \
  --restart always \
  -p 127.0.0.1:3000:80 \
  endpoint-forge-frontend:latest
  docker image prune -f
  rm frontend.tar
EOF

rm frontend.tar

echo "✅ Deployment Complete!"
