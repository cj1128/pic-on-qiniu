import "./app.styl"
import React from "react"
import Upload from "upload"
import History from "history"
import Config from "config"
import cx from "classnames"
import { isConfigOk } from "qiniu"

export default class App extends React.Component {
  state = {
    tab: "upload",
  }

  showConfig = () => {
    this.refs.config.show()
  }

  onConfigUpdated = () => {
    this.forceUpdate()
  }

  render() {
    return (
      <div className="app">
        <div className="app__tab">
          <span onClick={ this.showConfig }>
            设置
          </span>
          <span
            className={ cx({"app__tab__current": this.state.tab === "upload"}) }
            onClick={ () => this.setState({tab: "upload"}) }
          >
            上传
          </span>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          <span
            className={ cx({"app__tab__current": this.state.tab === "history"}) }
            onClick={ () => this.setState({tab: "history"}) }
          >
            历史
          </span>
        </div>
        {
          isConfigOk() ?
            this.state.tab === "upload" ?
              <Upload />
              :
              <History />
            :
            <ConfigTip />
        }

        <Config
          ref="config"
          onConfigUpdated={ this.onConfigUpdated }
        />
      </div>
    )
  }
}

const ConfigTip = () =>
  <div className="config-tip">
    <h1>七牛参数配置</h1>
    <ol>
      <li>
        注册七牛账号，<a target="_blank" href="https://portal.qiniu.com/signin">登陆</a>。
      </li>

      <li>
        进入<a target="_blank" href="https://portal.qiniu.com/bucket">对象存储管理</a>，新建一个用于存储图片的公开存储空间（例如 my-pictures），绑定域名，例如 image.my.com。
      </li>

      <li>
        进入<a target="_blank" href="https://portal.qiniu.com/user/key">密钥管理</a>，获取 AccessKey 以及 SecretKey。
      </li>

      <li>
        （可选）查看<a target="_blank" href="https://developer.qiniu.com/kodo/manual/1235/vars">魔法变量</a>，自定义保存文件名。如配置为 image/$(year)$(mon)$(day)/$(etag)$(ext)，保存路径类似这样 image/20190401/FlM6_0RQjjfz2jPHOlKqYeCkGMUM.jpg。置空则默认为 $(etag)$(ext)。
      </li>

      <li>
        点击左上角的“设置”按钮，输入 AccessKey，SecretKey，存储空间名称(my-pictures)，存储空间区域，以及存储空间绑定域名，保存即可。
      </li>
    </ol>

    <p>
      系统不会以任何形式存储您的 AccessKey 和 SecretKey，请放心使用。
    </p>
  </div>

