#!/bin/bash

# AdPlay VPS Setup Script (Ubuntu/Debian)
# Run this script on your VPS to install Docker and prepare the environment

echo "Updating system..."
sudo apt-get update && sudo apt-get upgrade -y

echo "Installing Docker..."
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install -y docker-ce docker-compose

echo "Starting Docker..."
sudo systemctl start docker
sudo systemctl enable docker

echo "Setting up Firewall (UFW)..."
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable

echo "Docker and Firewall setup complete!"
