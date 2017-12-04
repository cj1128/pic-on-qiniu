import "./style"
import React from "react"
import Clipboard from "clipboard"
import { fetch } from "qiniu"
import { getItem } from "db"
import toastr from "toastr"
import swal from "sweetalert"

const mock = [
  {
    "key": "Fhq6c2u8pQXbTQkA3vX7kY4d-vje.jpg",
    "hash": "Fhq6c2u8pQXbTQkA3vX7kY4d-vje",
    "fsize": 26808,
    "mimeType": "image/jpeg",
    "putTime": 14849949941887208
  },
  {
    "key": "Fvz6TZ0eNyDH3r7iZrRmk5jTeHxT.jpg",
    "hash": "Fvz6TZ0eNyDH3r7iZrRmk5jTeHxT",
    "fsize": 91019,
    "mimeType": "image/jpeg",
    "putTime": 14849074411365324
  }
]

function formateTime(ts) {
  const d = new Date(ts)
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
}

export default class History extends React.Component {
  state = {
    layout: "list",
    items: null,
  }

  componentDidMount() {
    this.clipboard = new Clipboard(".history__grid__item", {
      text: function(trigger) {
        return trigger.children[0].getAttribute("src")
      },
    })
    this.clipboard.on("success", function(e) {
      toastr.success("拷贝成功")
    })
    this.clipboard.on("error", function() {
      toastr.error("拷贝失败")
    })
    fetch().then(res => {
      this.setState({
        items: res.data.items,
      })
    })
      .catch(error => {
        swal(error.message, "", "error")
      })
  }

  componentWillUnmount() {
    this.clipboard.destroy()
  }

  renderItem(item) {
    const url = `http://${getItem("bucketDomain")}/${item.key}`
    return (
      <div key={ item.hash } className="history__grid__item">
        <img src={ url} />
        <div className="history__grid__item-info">
          <p>
            { formateTime(item.putTime / 1e4) }
          </p>
        </div>
      </div>
    )
  }

  renderGrid(items) {
    items.sort((a, b) => b.putTime - a.putTime)
    const data1 = items.filter((d, i) => i % 3 === 0)
    const data2 = items.filter((d, i) => i % 3 === 1)
    const data3 = items.filter((d, i) => i % 3 === 2)
    return (
      <div className="history__items">
        <div
          className="history__grid"
        >
          { data1.map(this.renderItem) }
        </div>
        <div
          className="history__grid"
        >
          { data2.map(this.renderItem) }
        </div>
        <div
          className="history__grid"
        >
          { data3.map(this.renderItem) }
        </div>
      </div>
    )
  }

  render() {
    const { items } = this.state
    return (
      <div className="history">
        {
          items == null ?
            <p className="history__loading">
              正在从七牛获取数据...
            </p>
            :
            items.length === 0 ?
              <p className="history__tip">
              目前没有任何上传记录
              </p>
              :
              this.renderGrid(items)
        }
      </div>
    )
  }
}
