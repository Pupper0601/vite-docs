---
title: PupperScrcpy(安卓投屏)
categories:
  - 常用工具
tags:
  - PC工具
abbrlink: 73fa49eb
toc_style_simple: true
cover: https://img.pupper.cn/top-img/top-img-126.webp
date: '2023-02-20 08:00:01'
update: '2023-02-20 17:53:18'
main_color: '#574b3e'
---

![](https://img.pupper.cn/img/20220726111740.png)
#### [Scrcpy 官网](https://github.com/Genymobile/scrcpy/blob/master/README.zh-Hans.md)



#### [PupperScrcpy 下载地址](https://wwe.lanzoui.com/iGfEjqtpdkd)



根据大佬的核心，使用`Pyside2`做了一个UI。

目的是为了省去繁琐的指令，能够简单、快速的使用。

>   关于无法输入中文的问题：                                                
>
>   ​    使用 搜狗 输入法即可解决。（去官网下载）   

```python
"""
-*-coding : UTF-8 -*-
@File     : PupperScrcpy.py
@Time     : 2021/6/28 16:47
@Author   : Pupper
@Email    : Pupper.cheng@gmail.com
@Software : PyCharm
"""
import os
import subprocess
import webbrowser

import time

from PySide2.QtWidgets import QApplication  # 1.应用对象
from PySide2.QtUiTools import QUiLoader  # 2.界面UI 文件需要导入代码里
from PySide2.QtCore import QFile  # 3.导入读取UI文件的库


class PupperScrcpy:
    def __init__(self, fileName):
        self.app = QApplication([])  # 4.创建一个应用对象
        self.qFile = QFile(fileName)  # 5.获取 UI 文件
        self.qFile.open(QFile.ReadOnly)  # 6.打开 UI 文件
        self.ui = QUiLoader().load(self.qFile)  # 7.加载 UI 对象
        self.qFile.close()  # 8.关闭 UI 文件
        self.Notice()
        self.DeviceSearch()
        self.ui.deviceScan.clicked.connect(self.DeviceSearch)
        self.ui.adbCheck.clicked.connect(self.ADBChick)
        self.ui.pathSet.clicked.connect(self.PathSet)
        self.ui.startCasting.clicked.connect(self.Projection)
        self.ui.clearText.clicked.connect(self.Clear)
        self.ui.scrcpyWebsite.clicked.connect(self.ScrcpyWebsite)
        self.ui.aboutMe.clicked.connect(self.about_Me)

    def Notice(self):
        self.ui.printText.appendPlainText('''
=====================================温馨提示================================
关于无法输入中文的问题：                                                
  使用 搜狗 输入法即可解决。（去官网下载）                                  
=============================================================================
        
        ''')


    def Projection(self):
        """
        投屏
        :return:
        """
        try:
            if self.ui.allDevice.isChecked():
                phoneList = PupperScrcpy.DeviceSearch(self)
                for i in phoneList:
                    self.ui.printText.appendPlainText(f'设备 {i[2]}：正在进行投屏......')
                    self.ui.printText.appendPlainText(f'设备 {i[2]}：投屏完成')
                    subprocess.Popen(
                        f"scrcpy -s {i[0]}",
                        shell=True,
                        stdout=subprocess.PIPE,
                        stderr=subprocess.STDOUT,
                        stdin=subprocess.PIPE
                    )
                    time.sleep(1)
            else:   # 单选
                equipment = self.ui.deviceList.currentText()
                phoneList = PupperScrcpy.DeviceSearch(self)
                for i in phoneList:
                    if equipment == i[2]:
                        subprocess.Popen(
                            f"scrcpy -s {i[0]}",
                            shell=True,
                            stdout=subprocess.PIPE,
                            stderr=subprocess.STDOUT,
                            stdin=subprocess.PIPE
                        )
                        self.ui.printText.appendPlainText(f'设备 {i[2]}：正在进行投屏......')
                        self.ui.printText.appendPlainText(f'设备 {i[2]}：投屏完成')
                        time.sleep(1)
                        break
        except Exception:
            self.ui.printText.appendPlainText('程序异常，请重新启动！')

    def DeviceSearch(self, combobox=False):
        """
        设备检测
        :return:
        """
        try:
            phone_list = subprocess.Popen(
                "adb devices -l",
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                stdin=subprocess.PIPE
            ).stdout.read().decode('UTF-8').split('\n')[1:-2]
            number_list1 = []
            number_list2 = []
            if phone_list:
                for i in phone_list:
                    listPhone = []
                    phone = i.split(' ')[:-2]
                    listPhone.append(phone[0])
                    listPhone.append(phone[-3])
                    listPhone.append(phone[-1][6:])
                    if phone[-3] == 'device':
                        number_list1.append(listPhone)
                        number_list2.append(phone[-1][6:])
                        self.ui.printText.appendPlainText(f'检测到设备：{phone[-1][6:]}')
                    else:
                        self.ui.printText.appendPlainText(f'如果手机没有弹出框，请重新插拔USB连接线。')
            else:
                self.ui.printText.appendPlainText('未检测到设备，请检查USB链接情况。')
            self.ui.deviceList.clear()
            self.ui.deviceList.addItems(number_list2)
            return number_list1
        except Exception:
            self.ui.printText.appendPlainText('程序异常，请重新启动')

    def ADBChick(self):
        """
        环境检测
        :return:
        """
        try:
            adb_test = subprocess.Popen(
                f"adb version",
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                stdin=subprocess.PIPE
            ).stdout.read().decode('UTF-8').split('\r')[0].split(' ')
            if adb_test[0] == 'Android':
                self.ui.printText.appendPlainText(f'ADB环境正常，当前ADB版本为：{adb_test[-1]}')

                return True
        except Exception:
            self.ui.printText.appendPlainText(f'ADB环境配置异常，请点击“环境配置”按钮配置ADB环境。')

    def PathSet(self):
        """
        Pash设置
        :return:
        """
        if self.ADBChick():
            self.ui.printText.appendPlainText('ADB环境已配置，无需重新配置')
        else:
            file_path = os.getcwd()
            path_test = subprocess.Popen(
                f'setx "Path" "{file_path};%path%"',
                shell=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                stdin=subprocess.PIPE
            )
            self.ui.printText.appendPlainText('ADB环境配置完成')

    def Clear(self):
        self.ui.printText.clear()

    def ScrcpyWebsite(self):

        try:
            webbrowser.get('chrome').open_new_tab('https://github.com/Genymobile/scrcpy/blob/master/README.zh-Hans.md')
        except Exception as e:
            webbrowser.open_new_tab('https://github.com/Genymobile/scrcpy/blob/master/README.zh-Hans.md')

    def about_Me(self):

        try:
            webbrowser.get('chrome').open_new_tab('https://pupper.cn')
        except Exception as e:
            webbrowser.open_new_tab('https://pupper.cn')


if __name__ == '__main__':
    requestTools = PupperScrcpy("Pupper_side2.ui")
    requestTools.ui.show()  # 9.显示 UI
    requestTools.app.exec_()  # 10.运行对象
```

