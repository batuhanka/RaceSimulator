#!/bin/bash

# --- Configuration ---
# 1. Set the path to your project's root directory
PROJECT_ROOT="/home/batuhankandiran/RaceSimulator"

# 2. Set the name of your virtual environment directory (usually 'venv')
VENV_DIR="/home/batuhankandiran/RaceSimulatorVenv/"

# 3. Set the full path to the Python script you want to run
PYTHON_SCRIPT="/home/batuhankandiran/RaceSimulator/scripts/race_result_updater.py"
# ---------------------

# 4. Set the Git commit message
COMMIT_MESSAGE="Automated update: Race results for $(date +%F)"

# Change to the project directory
cd "$PROJECT_ROOT"

# Activate the virtual environment
source "$VENV_DIR/bin/activate"

# Execute the Python script
echo "Starting race result update for today results..."
python "$PYTHON_SCRIPT"

# Deactivate the virtual environment (optional, but good practice)
deactivate

# --- Git Automation ---

# Only proceed with Git commands if the Python script was successful
if [ $PYTHON_EXIT_CODE -eq 0 ]; then
    echo "Python script finished successfully. Preparing to commit changes..."

    # 1. Add all changes (assuming your results are tracked files)
    git add .

    # 2. Check if there are any changes to commit
    if ! git diff --cached --exit-code --quiet; then
        echo "Changes detected. Committing..."
        # 3. Commit the changes
        git commit -m "$COMMIT_MESSAGE"

        # 4. Push the changes to the remote repository (e.g., 'origin' and 'main/master')
        echo "Pushing changes to GitHub..."
        git push

        if [ $? -eq 0 ]; then
            echo "Successfully pushed changes to GitHub."
        else
            echo "ERROR: Git push failed. Authentication or network issue."
        fi
    else
        echo "No changes detected after script execution. Skipping commit and push."
    fi
else
    echo "ERROR: Python script failed (Exit Code: $PYTHON_EXIT_CODE). Skipping Git operations."
fi

echo "Update script finished."
