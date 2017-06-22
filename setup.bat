@echo off
echo 'step 1:获取本地ip地址'
pause
for /f "tokens=4" %%a in ('route print^|findstr 0.0.0.0.*0.0.0.0') do (
 set IP=%%a
)
echo var baseUrl='http://%IP%:50141';export {baseUrl} > ./config/ipconfig.js

echo 'step 2.安装node.js,请使用默认配置安装与c:/program files, 安装完后再执行step3'
echo.&echo
echo   1.32bit
echo   2.64bit

set /p select=请输入数字 按回车继续:
if %select%== 1 (start "" "./node-v8.1.2-x86.msi")
if %select%== 2 (start "" "./node-v8.1.2-x64.msi"
)
pause

echo 'step 4:配置node环境变量'
pause

echo set path=%path%;C:\Program Files\Nodejs
pause

echo 'step 5:安装依赖并启动前端server'
pause