#!/bin/bash

# --- Configuration ---
# 1. Set the path to your project's root directory
PROJECT_ROOT="/home/batuhankandiran/RaceSimulator"

# 2. Set the name of your virtual environment directory (usually 'venv')
VENV_DIR="/home/batuhankandiran/RaceSimulatorVenv/"

# 3. Set the full path to the Python script you want to run
PYTHON_SCRIPT="/home/batuhankandiran/RaceSimulator/scripts/race_result_updater.py"
# ---------------------

# Change to the project directory
cd "$PROJECT_ROOT"

# Activate the virtual environment
source "$VENV_DIR/bin/activate"

# Execute the Python script
echo "Starting race result update for today results..."
python "$PYTHON_SCRIPT"

# Deactivate the virtual environment (optional, but good practice)
deactivate

echo "Update script finished."