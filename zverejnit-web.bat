@echo off
chcp 65001 >nul
cd /d "%~dp0"
set GIT_EXE=C:\Users\simiv\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\git\cmd\git.exe
set NODE_EXE=C:\Users\simiv\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe
set REPO=https://github.com/VlachS/PortfolioVlach.git

echo ========================================================
echo   ZVEREJNENI WEBU NA GITHUB PAGES
echo ========================================================
echo.
echo [1/3] Sestavuji web (vcetne videi)...
"%NODE_EXE%" "node_modules\vite\bin\vite.js" build
if errorlevel 1 (
    echo CHYBA pri sestaveni webu.
    pause
    exit /b 1
)

echo.
echo [2/3] Nahravam zdrojovy kod do vetve main...
"%GIT_EXE%" add -A
"%GIT_EXE%" commit -q -m "Aktualizace webu"
"%GIT_EXE%" push %REPO% main
if errorlevel 1 (
    echo CHYBA pri nahravani. Zkontroluj prihlaseni / token.
    pause
    exit /b 1
)

echo.
echo [3/3] Nahravam hotovy web do vetve gh-pages...
cd dist
if exist .git rmdir /s /q .git
"%GIT_EXE%" init -q -b gh-pages
"%GIT_EXE%" config user.name "VlachS"
"%GIT_EXE%" config user.email "VlachS@users.noreply.github.com"
"%GIT_EXE%" add -A
"%GIT_EXE%" commit -q -m "Zverejneni webu"
"%GIT_EXE%" push -f %REPO% gh-pages
if errorlevel 1 (
    echo CHYBA pri nahravani webu.
    cd ..
    pause
    exit /b 1
)
rmdir /s /q .git
cd ..

echo.
echo ========================================================
echo   HOTOVO! Web bude za 1-2 minuty na adrese:
echo   https://vlachs.github.io/PortfolioVlach/
echo ========================================================
pause
