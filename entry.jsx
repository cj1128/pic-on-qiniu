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
