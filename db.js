/*
* @Author: CJ Ting
* @Date: 2017-01-20 14:34:12
* @Email: fatelovely1128@gmail.com
*/

const db = {}
const DB_KEY = "_data"

export const REGION_HUABEI = 1
export const REGION_HUANAN = 2
export const REGION_HUADONG = 3
export const REGION_BEIMEI = 4

const ALLOWED_ITEMS = [
  "accessKey",
  "secretKey",
  "bucket",
  "bucketDomain",
  "token",
  "tokenTime",
  "region",
]

const item = localStorage.getItem(DB_KEY)
if(item != null) {
  const obj = JSON.parse(item)
  for(var k in obj) {
    db[k] = obj[k]
  }
}

export function getItem(k) {
  return db[k]
}

export function setItem(k, v) {
  if(ALLOWED_ITEMS.indexOf(k) === -1) {
    throw new Error(`item ${k} is not allowed`)
  }
  db[k] = v
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}
