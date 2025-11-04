#!/bin/bash

# KeenKloud CloudFront Cache Invalidation Script (Specific Paths)
# Usage: ./invalidate-specific.sh [path1] [path2] ...
# Example: ./invalidate-specific.sh /market/current.json /index.html

DISTRIBUTION_ID="E3LVF9216UA9W9"
DOMAIN_NAME="d2pzz4k5oasl24.cloudfront.net"

# Default paths if none provided
DEFAULT_PATHS=("/market/current.json" "/index.html" "/")

# Use provided paths or defaults
if [ $# -eq 0 ]; then
    PATHS=("${DEFAULT_PATHS[@]}")
    echo "🚀 Invalidating default paths for KeenKloud..."
else
    PATHS=("$@")
    echo "🚀 Invalidating specified paths for KeenKloud..."
fi

echo "Distribution ID: $DISTRIBUTION_ID"
echo "Domain: $DOMAIN_NAME"
echo "Paths to invalidate: ${PATHS[*]}"
echo ""

# Create invalidation
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "${PATHS[@]}" \
    --query "Invalidation.{Id:Id,Status:Status,CreateTime:CreateTime}" \
    --output table

echo ""
echo "✅ Cache invalidation initiated!"
echo "⏱️  It may take 5-15 minutes to complete."
echo "🌐 Your site will be updated at: https://keenkloud.net"

