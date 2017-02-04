/*
* @Author: CJ Ting
* @Date: 2017-01-19 18:37:35
* @Email: fatelovely1128@gmail.com
*/

import { getItem, setItem } from "db"
import { safe64, utf16to8, stringPresent } from "utils"
import axios from "axios"
import CryptoJS from "crypto-js"
import { stringify } from "qs"
import { REGION_HUADONG, REGION_HUANAN, REGION_HUABEI, REGION_BEIMEI } from "db"

const UPLOAD_URL = {
  [REGION_HUADONG]: "http://up.qiniu.com",
  [REGION_HUANAN]: "http://up-z2.qiniu.com",
  [REGION_HUABEI]: "http://up-z1.qiniu.com",
  [REGION_BEIMEI]: "http://up-na0.qiniu.com",
}

// for uploading file
function genUpToken(accessKey, secretKey, policy) {
  var policyStr = JSON.stringify(policy)
  var encoded = btoa(utf16to8(policyStr))
  var hash = CryptoJS.HmacSHA1(encoded, secretKey)
  var encodedSign = hash.toString(CryptoJS.enc.Base64)
  var uploadToken = accessKey + ":" + safe64(encodedSign) + ":" + encoded
  return uploadToken
}

// for get files list
function genManageToken(accessKey, secretKey, pathAndQuery, body) {
  const str = pathAndQuery + "\n" + body
  const hash = CryptoJS.HmacSHA1(str, secretKey)
  const encodedSign = safe64(hash.toString(CryptoJS.enc.Base64))
  return accessKey + ":" + encodedSign
}

function getUpToken() {
  if(getItem("token") && (new Date().getTime() - getItem("tokenTime")) < 12*3600000) {
    return getItem("token")
  }
  const policy = {
    scope: getItem("bucket"),
    deadline: Math.round(new Date().getTime() / 1000) + 12 * 3600, // 12 hours
    saveKey: "$(etag)$(ext)",
  }
  const time = new Date().getTime()
  const token =  genUpToken(getItem("accessKey"), getItem("secretKey"), policy)
  setItem("token", token)
  setItem("tokenTime", time)
  return token
}

export function fetch() {
  const path = "/list?bucket=" + getItem("bucket")
  return axios.post("http://rsf.qbox.me" + path, null, {
    headers: {
      Authorization: "QBox " + genManageToken(
        getItem("accessKey"),
        getItem("secretKey"),
        path,
        "",
      ),
    },
  })
}

export function upload(file, cb) {
  const url = UPLOAD_URL[getItem("region")]
  const formData = new FormData()
  formData.append("file", file)
  formData.append("token", getUpToken())
  axios.post(url, formData)
    .then(res => {
      const obj = res.data
      if(obj.error != null) {
        cb(new Error(obj.error))
        return
      }
      cb(null, `http://${getItem("bucketDomain")}/${obj.key}`)
    })
    .catch(error => {
      if(error.response) {
        if(error.response.status === 401) {
          cb(new Error("授权失败，请检查七牛Access Key, Secret Key设置"))
          return
        }
        const msg = error.response.data.error
        if(msg.indexOf("incorrect region") !== -1) {
          cb(new Error("区域选择错误，请检查存储空间区域设置"))
          return
        }
        cb(new Error(error.response.data.error))
      } else {
        cb(error)
      }
    })
}

export function isConfigOk() {
  return stringPresent(getItem("accessKey"))
    && stringPresent(getItem("secretKey"))
    && stringPresent(getItem("bucket"))
    && stringPresent(getItem("bucketDomain"))
    && getItem("region")
}
