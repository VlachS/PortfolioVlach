@echo off
cd /d "%~dp0"
echo Spoustim Retro Arcade Portfolio (Simon Vlach)...
"C:\Users\simiv\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" "node_modules\vite\bin\vite.js" --port=3000 --open
pause
