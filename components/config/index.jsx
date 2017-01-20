/*
* @Author: CJ Ting
* @Date: 2017-01-19 16:13:06
* @Email: fatelovely1128@gmail.com
*/

import "./style"
import React from "react"
import { getItem, setItem } from "db"
import cx from "classnames"
import { isDescendant } from "utils"

export default class Config extends React.Component {
  state = {
    show: false,
    accessKey: getItem("accessKey"),
    secretKey: getItem("secretKey"),
    bucket: getItem("bucket"),
    bucketDomain: getItem("bucketDomain"),
  }

  hide = () => {
    this.setState({
      show: false,
    })
  }

  show = () => {
    this.setState({
      show: true,
    })
  }

  save = () => {
    setItem("accessKey", this.state.accessKey)
    setItem("secretKey", this.state.secretKey)
    setItem("bucket", this.state.bucket)
    setItem("bucketDomain", this.state.bucketDomain)
    this.hide()
    this.props.onConfigUpdated()
  }

  onClickOutside = evt => {
    if(!isDescendant(this.refs.root, evt.target)) {
      this.hide()
    }
  }

  render() {
    return (
      <div
        className={ cx("config", {"config--hide": !this.state.show}) }
        onClick={ this.onClickOutside }
        ref="root"
      >
        <div className="config__content">
          <h1 className="config__header">
            七牛参数设置
          </h1>
          <div className="config__item">
            <span>
              Access Key
            </span>
            <input
              type="text"
              value={ this.state.accessKey }
              onChange={ evt => this.setState({accessKey: evt.target.value}) }
            />
          </div>
          <div className="config__item">
            <span>
              Secret Key
            </span>
            <input
              type="text"
              value={ this.state.secretKey }
              onChange={ evt => this.setState({secretKey: evt.target.value}) }
            />
          </div>
          <div className="config__item">
            <span>
              Bucket
            </span>
            <input
              type="text"
              value={ this.state.bucket }
              onChange={ evt => this.setState({bucket: evt.target.value}) }
            />
          </div>

          <div className="config__item">
            <span>
              Bucket Domain
            </span>
            <input
              type="text"
              value={ this.state.bucketDomain }
              onChange={ evt => this.setState({bucketDomain: evt.target.value}) }
            />
          </div>

          <div className="config__button" onClick={ this.save }>
            保存
          </div>
        </div>
      </div>
    )
  }
}
