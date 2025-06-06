@echo off

REM Check if .env file exists, if not create it from .env.example
if not exist .env (
    echo Creating .env file from .env.example...
    copy .env.example .env >nul
    echo .env file created. Please update it with your configuration.
) else (
    echo .env file already exists. Skipping creation.
)

echo Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
    echo Failed to install dependencies. Please check the error above.
    pause
    exit /b 1
)

echo Running seed script...
call npm run seed

if %ERRORLEVEL% NEQ 0 (
    echo Failed to run seed script. Please check the error above.
    pause
    exit /b 1
)

echo Setup complete! You can now start the server with 'npm run dev'
pause
