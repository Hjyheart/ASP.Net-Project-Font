@echo off
echo 'step 1:��ȡ����ip��ַ'
pause
for /f "tokens=4" %%a in ('route print^|findstr 0.0.0.0.*0.0.0.0') do (
 set IP=%%a
)
echo var baseUrl='http://%IP%:50141';export {baseUrl} > ./config/ipconfig.js

echo 'step 2.��װnode.js,��ʹ��Ĭ�����ð�װ��c:/program files, ��װ�����ִ��step3'
echo.&echo
echo   1.32bit
echo   2.64bit

set /p select=���������� ���س�����:
if %select%== 1 (start "" "./node-v8.1.2-x86.msi")
if %select%== 2 (start "" "./node-v8.1.2-x64.msi"
)
pause

echo 'step 4:����node��������'
pause

echo set path=%path%;C:\Program Files\nodejs
pause

echo 'step 5:��װ����������ǰ��server'
pause