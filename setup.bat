@echo off
echo 'step 1:get your local ip'
pause
for /f "tokens=2 delims=:" %%a in ('ipconfig^|findstr "IPv4"') do (
 set IP=%%a
)
echo var baseUrl='http://%IP:~1%:50141';export {baseUrl} > ./config/ipconfig.js

echo 'step install װnode.js, please install nodejs in the c:/program files'
echo.&echo
echo   1.32bit
echo   2.64bit

set /p select= choose your version:
if %select%== 1 (start "" "./node-v8.1.2-x86.msi")
if %select%== 2 (start "" "./node-v8.1.2-x64.msi"
)
pause

echo 'step 4:config nodejs'
pause

echo set path=%path%;C:\Program Files (x86)\Nodejs
echo set path=%path%;C:\Program Files (x86)\nodejs
echo set path=%path%;C:\Program Files\Nodejs
echo set path=%path%;C:\Program Files\nodejs
pause

echo 'step 5:install and start server'
pause

start "" "run.bat"

exit
