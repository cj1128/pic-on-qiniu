# 图床on七牛

![](http://ok2pw0x6d.bkt.clouddn.com/FjrbjEDqZNHmNmbLF2MgNln29vKE.png)

基于七牛的图床插件，图片保存在七牛的Bucket中，具体实现原理可以参考[我的博客](http://cjting.me/web2.0/2017-01-23-%E5%9B%BE%E5%BA%8Aon%E4%B8%83%E7%89%9B-%E7%AE%80%E5%8D%95%E5%A5%BD%E7%94%A8%E7%9A%84%E5%9B%BE%E5%BA%8A%E6%8F%92%E4%BB%B6.html)。

![](https://cloud.githubusercontent.com/assets/4210829/22183480/5b54e38a-e0fa-11e6-9f72-f6d7a19ad85d.gif)

## 安装

### Chrome应用商店

[![Chrome Web Store](http://ok2pw0x6d.bkt.clouddn.com/Fu6A9oFQcrNuGVo43Iza7XZnMZrk.jpg)](https://chrome.google.com/webstore/detail/%E5%9B%BE%E5%BA%8Aon%E4%B8%83%E7%89%9B/nikfegmndlnacioppfnmladfjanfdjfe/related?utm_source=chrome-ntp-icon&authuser=1)

### 下载安装

下载仓库，打开Chrome插件设置`chrome://extensions/`，勾选“开发者模式”，将仓库中的`chrome`文件夹拖入即可。

## 设置

图床使用七牛存储接口，图片将上传到用户设置的七牛空间中。因此，使用之前，需要首先设置七牛参数。

1. 注册七牛账号，登录。
2. 进入<a target="_blank" href="https://portal.qiniu.com/bucket">Bucket管理</a>，新建一个用于存储图片的公开bucket（例如my-pictures）。获取Bucket测试域名，例如ok2pw0x6d.bkt.clouddn.com。
3. 进入<a target="_blank" href="https://portal.qiniu.com/user/key">密钥管理</a>，获取Access Key以及Secret Key。
4. 点击左上角的“设置”按钮，输入Access Key，Secret Key，Bucket Name(my-pictures)以及Bucket测试域名，保存即可。

注意：**插件不会保存您的七牛Access Token以及Secret Token，请放心使用**。

