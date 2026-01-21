#!/bin/bash
# Build frontend and start Flask server
cd /home/runner/workspace
npm run build 2>&1 | head -20
cp client/public/sw.js client/public/manifest.json client/public/icon-192.png client/public/icon-512.png client/public/offline.html dist/public/ 2>/dev/null
python flask_backend/app.py
