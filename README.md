<div align="center">
  <img width="80px" src="https://user-images.githubusercontent.com/4210829/52112519-b13ff800-2641-11e9-93c6-f9d96b3db60c.png">
</div>

# 图床on七牛

基于七牛的图床插件，图片保存在七牛的 Bucket 中，具体实现原理可以参考 [我的博客](https://cjting.me/2017/01/23/build-an-img-bed-on-qiniu/)。

<p align="center">
  <img src="https://cloud.githubusercontent.com/assets/4210829/22183480/5b54e38a-e0fa-11e6-9f72-f6d7a19ad85d.gif"> 
</p>

## 安装

### Chrome 应用商店

[![Chrome Web Store](http://ww1.sinaimg.cn/large/9b85365dly1fzr0m6vhqlj20c0038mx9)](https://chrome.google.com/webstore/detail/%E5%9B%BE%E5%BA%8Aon%E4%B8%83%E7%89%9B/nikfegmndlnacioppfnmladfjanfdjfe/related?utm_source=chrome-ntp-icon&authuser=1)

### 下载安装

下载仓库，打开 Chrome 插件设置 `chrome://extensions/`，勾选 *开发者模式*，将仓库中的 `chrome` 文件夹拖入即可。

## 设置

图床使用七牛存储接口，图片将上传到用户设置的七牛空间中。因此，使用之前，需要首先设置七牛参数。

1. 注册七牛账号，登录。
2. 进入 <a target="_blank" href="https://portal.qiniu.com/bucket">Bucket管理</a>，新建一个用于存储图片的公开 bucket（例如 my-pictures），给 bucket 绑定域名，例如 asset.my.com。
3. 进入 <a target="_blank" href="https://portal.qiniu.com/user/key">密钥管理</a>，获取 AccessKey 以及 SecretKey。
4. （可选）查看 <a target="_blank" href="https://developer.qiniu.com/kodo/manual/1235/vars">魔法变量</a>，自定义保存文件名。如配置为 `image/$(year)$(mon)$(day)/$(etag)$(ext)`，则最终图片的保存路径为 `image/20190401/FlM6_0RQjjfz2jPHOlKqYeCkGMUM.jpg`。置空则默认为 `$(etag)$(ext)`。
5. 点击左上角的 *设置* 按钮，输入 AccessKey，SecretKey，Bucket Name(my-pictures)，bucket 所在地区例如华东以及 Bucket 绑定的域名，保存即可。

注意：**插件不会保存您的七牛 Access Token 以及 Secret Token，请放心使用**。

## Change Log

### 1.5 (2019.4.1)

- 支持自定义 SaveKey（感谢 [@kevinbai-cn](https://github.com/kevinbai-cn)的贡献）

### 1.4 (2019.2.1)

- 修复 Issue#3
- 修改了未配置时的文案，目前七牛已经不支持”测试域名“了

### 1.3 (2017.12.4)

- 修复 Issue#2

### 1.2 (2017.2.4)

- 设置页面增加滚动条，兼容小屏幕
- 增加区域选择，不同区域的存储空间，上传URL不同。

### 1.1 （2017.1.22）

- 历史记录按照时间顺序排列。

### 1.0 （2017.1.22）

- 完成基本功能。
