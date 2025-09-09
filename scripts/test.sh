#!/bin/bash

# Test script for Client Display Application
set -e

echo "🧪 Running comprehensive test suite..."

# Install dependencies
echo "📦 Installing dependencies..."
npm ci

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run format check
echo "🎨 Checking code formatting..."
npm run format:check

# Run tests with coverage
echo "🧪 Running tests with coverage..."
npm run test:coverage

# Display coverage summary
echo "📊 Coverage Summary:"
cat coverage/lcov-report/index.html | grep -A 5 "Functions" || echo "Coverage report generated in coverage/ directory"

echo "✅ All tests passed!"