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
  "saveKey",
]


const data = localStorage.getItem(DB_KEY) ?
  JSON.parse(localStorage.getItem(DB_KEY))
  :
  {}

const db = {}

ALLOWED_ITEMS.forEach(name => {
  Object.defineProperty(db, name, {
    get() {
      return data[name]
    },
    set(newValue) {
      data[name] = newValue
      localStorage.setItem(DB_KEY, JSON.stringify(data))
    },
  })
})

export default db
