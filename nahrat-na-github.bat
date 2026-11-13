@echo off
chcp 65001 >nul
cd /d "%~dp0"
set GIT_EXE=C:\Users\simiv\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe

echo ========================================================
echo   NAHRANI PROJEKTU DO https://github.com/VlachS/PortfolioVlach
echo ========================================================
echo.
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin https://github.com/VlachS/PortfolioVlach.git
"%GIT_EXE%" branch -M main
echo Nahravam soubory na GitHub (pokud vyskoci okno prohlizece, prihlas se)...
"%GIT_EXE%" push -u origin main

echo.
echo Hotovo!
pause
