#!/bin/bash

# Quick Gold API Test Script
# Usage: ./scripts/quick-test.sh

echo "🧪 Quick Gold API Test"
echo "====================="
echo ""

# Check if server is running
if ! curl -s http://localhost:3000 > /dev/null; then
    echo "❌ Dev server is not running!"
    echo "   Start it with: npm run dev"
    exit 1
fi

echo "✅ Dev server is running"
echo ""

# Test the API
echo "📡 Testing /api/gold-rates..."
response=$(curl -s -w "\n%{http_code}" http://localhost:3000/api/gold-rates)
http_code=$(echo "$response" | tail -n1)
body=$(echo "$response" | sed '$d')

if [ "$http_code" = "200" ]; then
    echo "✅ API returned 200 OK"
    echo ""
    echo "📊 Response:"
    echo "$body" | jq '.' 2>/dev/null || echo "$body"
    echo ""
    echo "✅ Test passed! Your API is working."
    echo ""
    echo "🎯 Next steps:"
    echo "   • View in browser: http://localhost:3000/test-gold-api"
    echo "   • Run full tests: node scripts/test-gold-api.js"
else
    echo "❌ API returned $http_code"
    echo "$body"
    exit 1
fi
