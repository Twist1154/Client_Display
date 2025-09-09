#!/bin/bash

# CI Integration Test Script
set -e

echo "🔄 Running CI integration tests..."

# Test 1: Clean install and build
echo "📦 Testing clean install and build..."
rm -rf node_modules package-lock.json
npm install
npm run ci

# Test 2: Verify build artifacts
echo "🔍 Verifying build artifacts..."
if [ ! -f "dist/index.html" ]; then
    echo "❌ Build artifact missing: index.html"
    exit 1
fi

if [ ! -f "dist/bundle."*".js" ]; then
    echo "❌ Build artifact missing: bundle.js"
    exit 1
fi

# Test 3: Verify coverage report
echo "📊 Verifying coverage report..."
if [ ! -d "coverage" ]; then
    echo "❌ Coverage directory not found"
    exit 1
fi

# Test 4: Security audit
echo "🔒 Running security audit..."
npm run security-audit

echo "✅ All CI integration tests passed!"
echo "🎉 CI/CD pipeline is ready for production!"