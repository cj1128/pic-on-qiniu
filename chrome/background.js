chrome.browserAction.onClicked.addListener(function() {
  var url = chrome.extension.getURL("app.html")
  chrome.tabs.create({ url: url })
})
