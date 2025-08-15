#!/usr/bin/env bash
set -e

echo "Updating system packages..."
sudo apt update -y && sudo apt upgrade -y

# Instala Node.js via NVM se não existir
if command -v node &> /dev/null; then
    echo "Node.js is already installed: $(node -v)"
else
    echo "Installing Node.js via NVM..."
    curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

    nvm install --lts
    nvm use --lts
    echo "Node.js installed: $(node -v)"
fi

# Instala pnpm se não existir
if command -v pnpm &> /dev/null; then
    echo "pnpm is already installed: $(pnpm -v)"
else
    echo "Installing pnpm..."
    npm install -g pnpm
    echo "pnpm installed: $(pnpm -v)"
fi

echo "Installation completed."
echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo "pnpm version: $(pnpm -v)"
