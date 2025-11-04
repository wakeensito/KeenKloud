#!/bin/bash

# KeenKloud CloudFront Cache Invalidation Script
# This script invalidates the CloudFront cache for your KeenKloud website

DISTRIBUTION_ID="E3LVF9216UA9W9"
DOMAIN_NAME="d2pzz4k5oasl24.cloudfront.net"

echo "🚀 Invalidating CloudFront cache for KeenKloud..."
echo "Distribution ID: $DISTRIBUTION_ID"
echo "Domain: $DOMAIN_NAME"
echo ""

# Invalidate all paths to clear the entire cache
aws cloudfront create-invalidation \
    --distribution-id $DISTRIBUTION_ID \
    --paths "/*" \
    --query "Invalidation.{Id:Id,Status:Status,CreateTime:CreateTime}" \
    --output table

echo ""
echo "✅ Cache invalidation initiated!"
echo "⏱️  It may take 5-15 minutes to complete."
echo "🌐 Your site will be updated at: https://keenkloud.net"

