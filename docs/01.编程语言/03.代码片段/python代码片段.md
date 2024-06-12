---
title: Python 代码片段
categories:
  - 代码片段
tags:
  - Python
  - 代码片段
toc_style_simple: true
date: '2024-03-26 16:28:36'
update: '2024-03-26 16:29:22'
cover: 'https://top-img.pupper.cn/top-img/top-img-158.webp'
main_color: '#5e7e7e'
abbrlink: 44bde9f9
---

# MD5 加密
```Python
import hashlib
from common.loguru_conf import Logger

logger = Logger().logger


def getMd5(value, long=True, lower=True):
    """
    md5 加密
    :param value: 待加密的值
    :param long: 32 位或 16 位,默认为 32 位
    :param lower: 大写或小写,默认为小写
    :return: 加密后的值
    """
    try:
        md5 = hashlib.md5()
        md5.update(value.encode('utf-8'))
        if long:
            if lower:
                return (md5.hexdigest()).lower()
            else:
                return (md5.hexdigest()).upper()
        else:
            if lower:
                return (md5.hexdigest())[8:-8].lower()
            else:
                return (md5.hexdigest())[8:-8].upper()
    except Exception as e:
        logger.error(f'md5 加密程序错误:{e}')
        return None


if __name__ == '__main__':
    print(getMd5("000000"))
    print(getMd5('{"packageName": "com.eccalc.ichat", "userName": "chat2uapp@outlook.com"}'))
```

# loguru 初始化

```python
import time
from functools import wraps
from pathlib import Path
from tools.get_root_path import get_root_path
import loguru

logger = None


# 单例类的装饰器
def singleton_class_decorator(cls):
    """装饰器，单例类的装饰器"""
    _instance = None

    @wraps(cls)
    def wrapper_class(*args, **kwargs):
        nonlocal _instance
        if _instance is None:
            _instance = cls(*args, **kwargs)
        return _instance

    return wrapper_class


@singleton_class_decorator
class Logger:
    def __init__(self):
        self.__logger_add()  # 调用此方法以初始化日志器

    @staticmethod
    def __get_log_path():
        """获取日志文件路径"""
        project_path = get_root_path()  # 项目根目录
        creat_time = time.strftime("%Y-%m-%d", time.localtime())
        logs_file_path = Path(project_path).joinpath("logs", creat_time)
        logs_file_path.mkdir(
            parents=True, exist_ok=True
        )  # 使用exist_ok=True来避免目录已存在的错误
        project_log_filename = (
            f'{time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())}.log'
        )
        project_log_path = logs_file_path.joinpath(project_log_filename)
        return project_log_path.as_posix()

    def __logger_add(self):
        loguru.logger.add(
            sink=self.__get_log_path(),  # 水槽，分流器，可以用来输入路径
            rotation="00:00",  # 日志创建周期
            retention="1 day",  # 保存
            compression="zip",  # 文件的压缩格式
            encoding="utf-8",  # 编码格式
            enqueue=True,  # 具有使日志记录调用非阻塞的优点
        )

    @property
    def logger(self):
        global logger
        if logger is None:
            loguru.logger.debug(f"logger 初始化")
            logger = loguru.logger
            return logger
        return logger
```

# 读取 ini 配置文件

```Python
import configparser
from common.loguru_conf import Logger
from tools.get_root_path import get_root_path

logger = Logger().logger
config = None
config_ini = "/configs/config.ini"


def read_ini():
    """
    读取 config.ini 配置信息
    :return: dict
    """
    global config
    try:
        if config is None:
            config = configparser.ConfigParser()
            config_path = get_root_path() + config_ini
            config.read(config_path, encoding="utf-8")
            logger.debug(f"读取配置成功: {config}")
            return config
        return config
    except Exception as e:
        logger.error(f"读取配置文件报错: {e}")


def get_config(section: str):
    return read_ini()[section]
```

# 发送邮件

::: code-group
``` Python [发送程序]
import json

import yagmail
from jinja2 import Template

from common.loguru_conf import Logger
from common.get_config import get_config
from tools.get_root_path import get_root_path

logger = Logger().logger
config = get_config("email")


class SendEmail(object):
    def __init__(self, email_subject, html_data):
        self._user_email = config.get("user_email")
        self._password = config.get("password")
        self._smtp_server = config.get("smtp_server")
        self._to_email = config.get("to_email")
        self.email_subject = email_subject
        self.html_data = html_data
        self._send_email()

    def _send_email(self):
        """
        发送邮件
        """
        to_email_list = self._to_email.split(",")
        yag = yagmail.SMTP(
            user=self._user_email,
            password=self._password,
            host=self._smtp_server,
            encoding="GBK",
        )
        yag.send(
            to=to_email_list, subject=self.email_subject, contents=self._html_message()
        )
        logger.info(f"邮件发送成功: {to_email_list}")

    def _html_message(self):
        """
        使用数据渲染 html 模板
        :return: 返回渲染后的 html 数据
        """
        email_template = get_root_path() + "/configs/email_template.html"
        html_str = ""
        with open(email_template, "r") as file:  # 读取模板文件
            html_list = file.readlines()
            for html in html_list:
                html_str += html.strip()
        template = Template(html_str)  # 创建模板对象
        rendered_template = template.render(
            alert_name=self.email_subject, data=self.html_data
        )  # 渲染模板，填充数据
        return rendered_template


if __name__ == "__main__":
    datas = {
        "versionNumber": "4.2.10",
        "updateTime": "2024-02-18 09:57:18",
        "privacyPolicy": "https://app.2uchat.cn/secret/zh3.html",
        "releaseState": "已上架",
        "auditOpinion": "\n应用审核意见：\n    通过\n    测试环境：Wi-Fi联网、HarmonyOS 3.0.0（Mate40Pro）、中文环境。",
        "language": "zh-CN",
        "appName": "通友",
    }
    SendEmail("测试邮件", datas)
```

```Python [html 模板]
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>上架告警通知</title>
<style>
    body {
        font-family: Arial, sans-serif;
    }
    .alert-details {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
    }
    .alert-details th, .alert-details td {
        border: 1px solid #ddd;
        padding: 8px;
        text-align: left;
    }
    .alert-details th {
        background-color: #f2f2f2;
    }
</style>
</head>
<body>
<h1 style="text-align: center;">上架告警通知 - {{ alert_name }}</h1>
<p>尊敬的【通友开发团队】：</p>
<p>您好！</p>
<p>系统在日常检测中查看到【通友】app 在应用市场存在异常，请您立即关注并采取相应的措施。</p>
<h2>告警详情</h2>
<table class="alert-details">
    <tr>
        <th>项目</th>
        <th>详情</th>
    </tr>
    {% for key, value in data.items() %}
    <tr>
        <td>{{ key }}</td>
        <td>{{ value }}</td>
    </tr>
    {% endfor %}
</table>
<p style="text-align: end;">[支持部门]</p>
<p style="text-align: end;">[程前德]</p>
<hr/>
<p style="text-align: center;">-*- 此邮件为系统自动发送, 如有需要请联系管理员处理 -*-</p>
</body>
</html>
```
:::

![](https://img.pupper.cn/img/1711442381.png)

# 发送企业微信

```Python
import json

import requests

from common.loguru_conf import Logger

logger = Logger().logger


def send_weixin(text: str):
    url = "https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=d4a2932b-511d-4ace-8810-c259adda7bdf"  # 这里就是群机器人的Webhook地址
    headers = {"Content-Type": "application/json"}  # http数据头，类型为json
    data = {
        "msgtype": "text",
        "text": {
            "content": text,  # 让群机器人发送的消息内容。
            "mentioned_list": [],
        },
    }
    res = requests.post(url, headers=headers, json=data)  # 利用requests库发送post请求
    if res.status_code == 200:
        logger.debug(f"微信预警发送成功: {text}")
        return
    logger.debug(f"微信预警发送失败: {text}")


if __name__ == "__main__":
    t = str(
        {
            "app_name": "通友",
            "pkg_name": "com.eccalc.ichat",
            "update_time": "2024年03月04日 17:24:35",
            "version_name": "4.2.11",
            "audit_status_name": "审核不通过",
            "audit_status": "444",
            "refuse_reason": "测试机型：OPPO Find X5； Android版本：13； 软件版本：PFFM10_11_C.36；,直播、社交、音视频类应用内需添加“青少年模式/未成年模式”功能。您的应用属性涉及相关，还请添加青少年模式/未成年模式功能，且需在进入应用后以弹窗的形式主动提醒用户，请您完善。详情可查看未成年人网络保护条例第四十三条（https://www.gov.cn/zhengce/content/202310/content_6911288.htm）",
        }
    )
    send_weixin(t)
```
