#!/bin/bash
# Production startup script for Render deployment

echo "Starting Hayya.AI server on port ${PORT:-8000}..."
uvicorn app:app --host 0.0.0.0 --port ${PORT:-8000} --workers 2
