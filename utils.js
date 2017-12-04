export function utf16to8(str) {
  var out, i, len, c
  out = ""
  len = str.length
  for(i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >>  6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >>  6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >>  0) & 0x3F))
    }
  }
  return out
}

export function safe64(base64) {
  base64 = base64.replace(/\+/g, "-")
  base64 = base64.replace(/\//g, "_")
  return base64
}

export function stringPresent(str) {
  return typeof str === "string" && str.length > 0
}

export function isDescendant(parent, child) {
  var node = child.parentNode
  while (node != null) {
    if (node == parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export const IconCopy = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAllBMVEUAAAAAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/cAh/f+/svYAAAAMXRSTlMAAQIDBQYHCAkLDBEUFRgZHh8gIUJFS1ZYYmNmjpSbnaCytMXO0dXZ2uTm6e/z+fv9ErSjVQAAAJ1JREFUGFeVzkkWgkAUQ9GAJYgWonxFbBDseyT735wDQCg9DnzDO8gJAADwtNa6h3ZqS5IsVMu6e9K2bY/9xpzDbkIAqoXucdOREn0/CIKhApxTaqHCJ0nyDCQkyQuAMYsZACGQxyISuoB+zLMaKeX04L5A+oHebYkvXJMkpybmkYiMLBOp698/8coyA91QRERMrPoDI6mKG1zxXYIX1fwXXesnfg0AAAAASUVORK5CYII="
