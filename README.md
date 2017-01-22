# 图床on七牛

基于七牛的图床插件。图片保存在七牛的Bucket中。

## 安装

### Chrome应用商店

[![Chrome Web Store](http://ok2pw0x6d.bkt.clouddn.com/Fu6A9oFQcrNuGVo43Iza7XZnMZrk.jpg)](https://chrome.google.com/webstore/detail/nikfegmndlnacioppfnmladfjanfdjfe/publish-delayed?hl=zh-CN&authuser=1)

### 下载安装

下载仓库，打开Chrome插件设置`chrome://extensions/`，勾选“开发者模式”，将仓库中的`chrome`文件夹拖入即可。

## 使用

![](http://ok2pw0x6d.bkt.clouddn.com/FshihH-X8XPLfs-XQgfPYPr3UbO6.gif)

图床使用七牛存储接口，图片将上传到用户设置的七牛空间中。因此，使用之前，需要首先配置七牛参数。

### 七牛配置

1. 注册七牛账号，登录。
2. 进入<a target="_blank" href="https://portal.qiniu.com/bucket">Bucket管理</a>，新建一个用于存储图片的公开bucket（例如my-pictures）。获取Bucket测试域名，例如ok2pw0x6d.bkt.clouddn.com。
3.  进入<a target="_blank" href="https://portal.qiniu.com/user/key">密钥管理</a>，获取Access Key以及Secret Key。
4. 点击左上角的“设置”按钮，输入Access Key，Secret Key，Bucket Name(my-pictures)以及Bucket测试域名，保存即可。

注意：**插件不会保存您的七牛Access Token以及Secret Token，请放心使用**。

