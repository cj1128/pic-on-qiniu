/*
* @Author: dingxijin
* @Date:   2016-03-24 11:52:04
* @Last Modified by:   dingxijin
* @Last Modified time: 2016-03-24 12:15:22
*/

chrome.browserAction.onClicked.addListener(function() {
  var url = chrome.extension.getURL("app.html")
  chrome.tabs.create({ url: url })
})
