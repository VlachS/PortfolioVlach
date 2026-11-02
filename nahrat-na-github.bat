@echo off
chcp 65001 >nul
cd /d "%~dp0"
set GIT_EXE=C:\Users\simiv\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe

echo ========================================================
echo   NAHRANI PROJEKTU DO NOVEHO REPOZITARE NA GITHUBU
echo ========================================================
echo.
echo 1. Otevri v prohlizeci: https://github.com/new
echo 2. Zadej nazev noveho repozitare (napr. portfolio-automat)
echo 3. Nezaklikavej README ani .gitignore a klikni na "Create repository"
echo.
set /p REPO_URL="Vloz URL noveho repozitare (napr. https://github.com/VlachS/portfolio-automat.git): "

if "%REPO_URL%"=="" (
    echo Nebyla zadana URL adresa.
    pause
    exit /b 1
)

"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin %REPO_URL%
"%GIT_EXE%" branch -M main
echo.
echo Nahravam soubory na GitHub (pokud vyskoci okno prohlizece, prihlas se)...
"%GIT_EXE%" push -u origin main

echo.
echo Hotovo!
pause
