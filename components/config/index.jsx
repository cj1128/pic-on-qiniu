/*
* @Author: CJ Ting
* @Date: 2017-01-19 16:13:06
* @Email: fatelovely1128@gmail.com
*/

import "./style"
import React from "react"
import { getItem, setItem } from "db"
import { REGION_HUANAN, REGION_HUADONG, REGION_HUABEI, REGION_BEIMEI } from "db"
import cx from "classnames"
import Radio from "_radio"
import { isDescendant } from "utils"

export default class Config extends React.Component {
  state = {
    show: false,
    accessKey: getItem("accessKey"),
    secretKey: getItem("secretKey"),
    bucket: getItem("bucket"),
    bucketDomain: getItem("bucketDomain"),
    region: getItem("region") || REGION_HUADONG,
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
    setItem("accessKey", this.state.accessKey.trim())
    setItem("secretKey", this.state.secretKey.trim())
    setItem("bucket", this.state.bucket.trim())
    setItem("bucketDomain", this.state.bucketDomain.trim())
    setItem("region", this.state.region)
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
        <div className="config__content-wrapper">
          <div className="config__content">
            <h1 className="config__header">
              七牛参数设置
            </h1>

            <div className="config__item">
              <span>
                Access Key(AK)
              </span>
              <input
                type="text"
                value={ this.state.accessKey }
                onChange={ evt => this.setState({accessKey: evt.target.value}) }
              />
            </div>

            <div className="config__item">
              <span>
                Secret Key(SK)
              </span>
              <input
                type="text"
                value={ this.state.secretKey }
                onChange={ evt => this.setState({secretKey: evt.target.value}) }
              />
            </div>

            <div className="config__item">
              <span>
                存储空间名称
              </span>
              <input
                type="text"
                value={ this.state.bucket }
                onChange={ evt => this.setState({bucket: evt.target.value}) }
              />
            </div>

            <div className="config__item">
              <span>
                存储空间区域
              </span>
              <div className="config__regions">
                <Radio
                  text="华东"
                  checked={ REGION_HUADONG === this.state.region }
                  onChange={ () => this.setState({region: REGION_HUADONG}) }
                />
                <Radio
                  text="华北"
                  checked={ REGION_HUABEI === this.state.region }
                  onChange={ () => this.setState({region: REGION_HUABEI}) }
                />
                <Radio
                  text="华南"
                  checked={ REGION_HUANAN === this.state.region }
                  onChange={ () => this.setState({region: REGION_HUANAN}) }
                />
                <Radio
                  text="北美"
                  checked={ REGION_BEIMEI === this.state.region }
                  onChange={ () => this.setState({region: REGION_BEIMEI}) }
                />
              </div>
            </div>

            <div className="config__item">
              <span>
                存储空间测试域名
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
      </div>
    )
  }
}
