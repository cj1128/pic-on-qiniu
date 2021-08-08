import "./style.styl"
import React from "react"
import Dropzone from "react-dropzone"
import "sweetalert/dist/sweetalert.css"
import swal from "sweetalert"
import { IconLink, IconMarkdown } from "utils"
import { upload } from "qiniu"
import Clipboard from "clipboard"
import toastr from "toastr"
import Loading from "_loading"

export default class Upload extends React.Component {
  state = {
    files: [],
  }

  componentDidMount() {
    window.addEventListener("paste", this.handlePaste)
  }

  componentWillUnmount() {
    window.removeEventListener("paste", this.handlePaste)
  }

  handlePaste = (evt) => {
    var items = evt.clipboardData.items
    if (!items) return

    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        var blob = items[i].getAsFile()
        var source = window.URL.createObjectURL(blob)
        blob.preview = source
        this.setState(
          {
            files: [blob],
          },
          this.uploadFiles
        )
      }
    }
  }

  handleDrop = (files) => {
    this.setState({ files: files }, this.uploadFiles)
  }

  uploadFiles = () => {
    const files = this.state.files
    for (let file of files) {
      upload(file, (err, url) => {
        if (err) {
          this.setState(
            {
              files: [],
            },
            () => swal(err.message, "", "error")
          )
        } else {
          file.url = url
          this.setState({
            files: files,
          })
        }
      })
    }
  }

  renderFiles() {
    return this.state.files.map((file) => (
      <Item url={file.url} file={file} key={file.preview} />
    ))
  }

  render() {
    return (
      <div className="upload">
        <Dropzone
          accept="image/*"
          className="upload__dropzone"
          activeClassName="upload__dropzone--active"
          onDrop={this.handleDrop}
        >
          {this.state.files.length === 0 ? (
            <p className="upload__placeholder">
              点击、拖拽或复制上传~支持多个文件~
            </p>
          ) : (
            this.renderFiles()
          )}
        </Dropzone>
      </div>
    )
  }
}

class Item extends React.Component {
  static propTypes = {
    file: React.PropTypes.object.isRequired,
    url: React.PropTypes.string,
  }

  onRenderCopyURL = (el) => {
    if (el == null) {
      this.copyURL.destroy()
      return
    }

    this.copyURL = new Clipboard(el, {
      text: () => {
        return this.props.url
      },
    })

    this.copyURL.on("success", function () {
      toastr.success("拷贝 URL 成功")
    })
  }

  onRenderCopyMarkdown = (el) => {
    if (el == null) {
      this.copyMarkdown.destroy()
      return
    }

    this.copyMarkdown = new Clipboard(el, {
      text: () => {
        return `![](${this.props.url})`
      },
    })

    this.copyMarkdown.on("success", function () {
      toastr.success("拷贝 Markdown Link 成功")
    })
  }

  renderResult() {
    return (
      <div className="upload__item__result">
        <span>{this.props.url}</span>

        <img
          className="upload__copy-url"
          title="Copy URL"
          ref={this.onRenderCopyURL}
          src={IconLink}
        />

        <img
          className="upload__copy-markdown"
          title="Copy as Markdown"
          ref={this.onRenderCopyMarkdown}
          src={IconMarkdown}
        />
      </div>
    )
  }

  render() {
    return (
      <div
        className="upload__item"
        // prevent file dialog showing
        onClick={(evt) => evt.stopPropagation()}
      >
        <img src={this.props.file.preview} />
        {this.props.url ? (
          this.renderResult()
        ) : (
          <div className="upload__loading">
            <span>上传中...</span>

            <Loading />
          </div>
        )}
      </div>
    )
  }
}
