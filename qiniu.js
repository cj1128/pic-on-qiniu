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

const UPLOAD_URL = "http://up.qiniu.com"

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
  const formData = new FormData()
  formData.append("file", file)
  formData.append("token", getUpToken())
  axios.post(UPLOAD_URL, formData)
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
          cb(new Error("授权失败，请检查七牛Access Key, Secret Key配置"))
        }
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
}
