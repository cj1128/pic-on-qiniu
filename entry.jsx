/*
* @Author: dingxijin
* @Date:   2016-03-24 12:22:03
* @Last Modified by:   dingxijin
* @Last Modified time: 2016-03-24 12:23:34
*/

import "normalize.css/normalize.css"
import "toastr/build/toastr.min.css"
import React from "react"
import DOM from "react-dom"

import "global.js"
import App from "./app.jsx"

DOM.render(<App />, document.getElementById("app-container"))

if(__DEV__) {
  module.hot.accept()
}
