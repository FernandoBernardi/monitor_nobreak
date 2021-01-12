Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "C:\Users\User.DESKTOP-RE4T60F\Documents\npmServer\batScan.bat" & Chr(34), 0
Set WinScriptHost = Nothing