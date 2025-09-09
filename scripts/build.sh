#!/bin/bash

# Build script for Client Display Application
set -e

echo "🚀 Starting build process..."

# Clean previous build
echo "🧹 Cleaning previous build..."
npm run clean

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run quality checks
echo "🔍 Running code quality checks..."
npm run lint
npm run format:check

# Run tests
echo "🧪 Running tests..."
npm run test

# Build application
echo "🏗️  Building application..."
npm run build

# Verify build
if [ -f "dist/index.html" ]; then
    echo "✅ Build completed successfully!"
    echo "📊 Build artifacts:"
    ls -la dist/
else
    echo "❌ Build failed - output not found"
    exit 1
fi