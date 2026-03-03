#!/bin/bash

echo "========================================================="
echo "AdPlay Startup Script (macOS / Linux)"
echo "========================================================="
echo ""
echo "Please wait while we start the Backend and Frontend..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed or not in your PATH."
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Function to handle cleanup on script exit (Ctrl+C)
cleanup() {
    echo ""
    echo "Stopping AdPlay..."
    # Kill child processes
    if [ -n "$BE_PID" ]; then kill $BE_PID 2>/dev/null; fi
    if [ -n "$FE_PID" ]; then kill $FE_PID 2>/dev/null; fi
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM to run cleanup
trap cleanup SIGINT SIGTERM

# Start Backend
echo "Starting Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi
npm run dev &
BE_PID=$!
cd ..

# Start Frontend
echo "Starting Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi
npm run start &
FE_PID=$!
cd ..

echo ""
echo "AdPlay is starting up!"
echo ""
echo "You can access the application shortly at:"
echo "Backend (API):   http://localhost:3000"
echo "Frontend (App):  http://localhost:4200"
echo ""
echo "Press Ctrl+C in this terminal to stop both servers."
echo ""

# Wait for background processes so the script doesn't exit immediately
wait $BE_PID $FE_PID
