#!/bin/bash

# AdPlay SSL Setup with Certbot (Let's Encrypt)
# Run this AFTER you have configured your domain in Nginx and pointed it to this VPS

echo "Installing Certbot..."
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx

echo "Requesting SSL Certificate..."
# Replace your-domain.com with your actual domain
# sudo certbot --nginx -d your-domain.com

echo "Certbot installation complete. Please run the command above manually after editing your domain."
